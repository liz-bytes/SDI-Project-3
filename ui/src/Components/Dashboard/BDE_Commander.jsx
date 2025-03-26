import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const API_BASE = 'http://localhost:8080';

const commanderCredentials = [
  {
    firstName: 'Elizabeth',
    password: 'Password',
    home_unit_name: '2nd Temporal Vanguard Brigade',
  },
  {
    firstName: 'Lucien',
    password: 'Password',
    home_unit_name: '1st Shadow Brigade',
  },
  {
    firstName: 'Kira',
    password: 'Password',
    home_unit_name: '3rd Void Recon Brigade',
  },
];

const BDE_Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    id_mos: '',
    id_deployments: '',
    unit_id: '',
  });
  const [commander, setCommander] = useState(null);
  const [brigadeUnit, setBrigadeUnit] = useState(null);
  const [bnList, setBnList] = useState([]);
  const [soldiers, setSoldiers] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const LIMIT = 10;

  const handleLogin = async () => {
    const match = commanderCredentials.find(
      (c) =>
        c.firstName.toLowerCase() === form.username.toLowerCase() &&
        c.password === form.password
    );

    if (!match) {
      alert('Invalid credentials.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/units`);
      const allUnits = await res.json();

      const matchedUnit = allUnits.find(
        (unit) => unit.name === match.home_unit_name
      );

      if (!matchedUnit) {
        alert('Unit not found for this commander.');
        return;
      }

      setCommander({ ...match, brigade_id: matchedUnit.id });
      setBrigadeUnit(matchedUnit);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const fetchSoldiers = async () => {
    if (!commander?.brigade_id) return;
    setIsLoading(true);

    try {
      let query = `?limit=${LIMIT}&offset=${offset}&brigade_id=${commander.brigade_id}`;

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
      console.error('Failed to fetch soldiers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (commander?.brigade_id) {
      fetchSoldiers();
    }
  }, [commander, offset, filterCategory, filterValue]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [mosRes, depRes, mapRes] = await Promise.all([
          fetch(`${API_BASE}/mos`),
          fetch(`${API_BASE}/deployments`),
          fetch(`${API_BASE}/units/unit-map`)
        ]);

        setMosList(await mosRes.json());
        setDeploymentList(await depRes.json());

        const unitMap = await mapRes.json();
        const filtered = unitMap.filter(
          (entry) => entry.brigade_id === commander?.brigade_id
        );
        setBnList(filtered);
      } catch (err) {
        console.error('Error fetching dropdowns:', err);
      }
    };

    fetchOptions();
  }, [commander]);

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue('');
    setOffset(0);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-bg">
        <h2 className="login-header">BDE Commander Login</h2>
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
      <h2>Welcome, Commander {commander.firstName}</h2>
      <h3>Your Brigade: {brigadeUnit?.name}</h3>

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

            <select
              value={form.unit_id || ''}
              onChange={(e) => setForm({ ...form, unit_id: parseInt(e.target.value) })}
            >
              <option value="">Select Unit</option>
              {bnList.map((bn) => (
                <option key={bn.battalion_id} value={bn.battalion_id}>
                  {bn.battalion_name}
                </option>
              ))}
            </select>

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
                        unit_id: form.unit_id,
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
                      unit_id: '',
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

      {/* Filter section and soldier list same as BN_Dashboard */}
    </div>
  );
};

export default BDE_Dashboard;
