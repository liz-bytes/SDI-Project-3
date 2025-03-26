import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const API_BASE = 'http://localhost:8080';

const commanderCredentials = [
  {
    firstName: 'michael',
    password: 'Password',
    home_unit_name: 'Deep Space Temporal Command Center',
  },
];

const Div_Commander = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    id_mos: '',
    id_deployments: '',
    unit_name: '',
  });
  const [commander, setCommander] = useState(null);
  const [soldiers, setSoldiers] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mosList, setMosList] = useState([]);
  const [deploymentList, setDeploymentList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const LIMIT = 10;

  const handleLogin = () => {
    const match = commanderCredentials.find(
      (c) =>
        c.firstName.toLowerCase() === form.username.toLowerCase() &&
        c.password === form.password
    );

    if (!match) {
      alert('Invalid credentials.');
      return;
    }

    setCommander(match);
    setIsLoggedIn(true);
  };

  const fetchSoldiers = async () => {
    setIsLoading(true);
    try {
      let query = `?limit=${LIMIT}&offset=${offset}`;
      if (filterCategory && filterValue) {
        const fieldMap = {
          'first name': 'first_name',
          'last name': 'last_name',
          'mos': 'id_mos',
          'deployments': 'id_deployments',
        };
        const field = fieldMap[filterCategory];
        if (field) {
          query += `&${field}=${encodeURIComponent(filterValue)}`;
        }
      }

      const res = await fetch(`${API_BASE}/soldiers${query}`);
      const data = await res.json();
      setSoldiers(data);
    } catch (err) {
      console.error('Error fetching soldiers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSoldiers();
  }, [offset, filterCategory, filterValue]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [mosRes, deploymentRes] = await Promise.all([
          fetch(`${API_BASE}/mos`),
          fetch(`${API_BASE}/deployments`)
        ]);
        const mosData = await mosRes.json();
        const deploymentData = await deploymentRes.json();

        setMosList(mosData);
        setDeploymentList(deploymentData);
      } catch (err) {
        console.error('Failed to fetch dropdowns:', err);
      }
    };

    fetchOptions();
  }, []);

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue('');
    setOffset(0);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-bg">
        <h2 className="login-header">Division Commander Login</h2>
        <input
          type="text"
          placeholder="First Name"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="login-bg">
      <h2>Division Commander Dashboard</h2>
      <button onClick={() => setShowModal(true)}>Add New Soldier</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Soldier</h3>

            <input
              type="text"
              placeholder="First Name"
              value={form.first_name || ''}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={form.last_name || ''}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Unit Name"
              value={form.unit_name || ''}
              onChange={(e) => setForm({ ...form, unit_name: e.target.value })}
            />

            <select
              value={form.id_mos || ''}
              onChange={(e) => setForm({ ...form, id_mos: e.target.value })}
            >
              <option value="">Select MOS</option>
              {mosList.map((mos) => (
                <option key={mos.id} value={mos.id}>
                  {mos.name}
                </option>
              ))}
            </select>

            <select
              value={form.id_deployments || ''}
              onChange={(e) => setForm({ ...form, id_deployments: e.target.value })}
            >
              <option value="">Select Deployment (optional)</option>
              {deploymentList.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </select>

            <div className="modal-buttons">
              <button
                onClick={async () => {
                  try {
                    const res = await fetch(`${API_BASE}/soldiers`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        first_name: form.first_name,
                        last_name: form.last_name,
                        id_mos: parseInt(form.id_mos),
                        id_deployments: form.id_deployments
                          ? parseInt(form.id_deployments)
                          : null,
                        unit_name: form.unit_name,
                        parent_division_id: 1,
                      }),
                    });

                    const data = await res.json();

                    if (!res.ok) {
                      console.error("API Error:", data);
                      alert(`Error: ${data.error || 'Something went wrong'}`);
                      return;
                    }

                    alert('Soldier added successfully!');
                    setForm({
                      first_name: '',
                      last_name: '',
                      id_mos: '',
                      id_deployments: '',
                      unit_name: '',
                    });
                    setOffset(0);
                    setShowModal(false);
                    fetchSoldiers();
                  } catch (err) {
                    console.error('Failed to add soldier:', err);
                    alert('Something went wrong');
                  }
                }}
              >
                Submit
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Div_Commander;
