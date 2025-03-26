import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const API_BASE = 'http://localhost:5173';

const divCommander = {
  firstName: 'Michael',
  password: 'Password',
  home_unit_name: 'Deep Space Temporal Command Center',
};

function Div_Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    id_mos: '',
    id_deployments: '',
  });  
  const [soldiers, setSoldiers] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mosList, setMosList] = useState([]);
  const [deploymentList, setDeploymentList] = useState([]);

  const LIMIT = 10;

  const handleLogin = () => {
    const isValid =
      form.username.toLowerCase() === divCommander.firstName.toLowerCase() &&
      form.password === divCommander.password;

    if (isValid) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials.');
    }
  };

  const fetchSoldiers = async () => {
    try {
      setIsLoading(true);

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
      console.error('Failed to fetch soldiers:', err);
    } finally {
      setIsLoading(false);
    }
  };
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
        console.error('Failed to fetch MOS or deployments:', err);
      }
    };
  
    fetchOptions();
  }, []);
  
  useEffect(() => {
    if (isLoggedIn) {
      fetchSoldiers();
    }
  }, [offset, filterCategory, filterValue, isLoggedIn]);

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue('');
    setOffset(0); // Reset to first page on filter change
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Division Commander Login</h2>
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
    <div>
      <h2>Division Commander Dashboard</h2>
  
      {/* Add Soldier Section */}
      <div className="filter-section">
        <h3>Add New Soldier</h3>
        <input
          type="text"
          placeholder="Unit Name"
          value={form.unit_name || ''}
          onChange={(e) => setForm({ ...form, unit_name: e.target.value })}
        />
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
  value={form.id_mos || ''}
  onChange={(e) => setForm({ ...form, id_mos: e.target.value })}
>
  <option value="">Select MOS</option>
  {mosList.map((mos) => (
    <option key={mos.id} value={mos.id}>{mos.name}</option>
  ))}
</select>

<select
  value={form.id_deployments || ''}
  onChange={(e) => setForm({ ...form, id_deployments: e.target.value })}
>
  <option value="">Select Deployment (optional)</option>
  {deploymentList.map((dep) => (
    <option key={dep.id} value={dep.id}>{dep.name}</option>
  ))}
</select>

        <button onClick={async () => {
          try {
            const res = await fetch('http://localhost:5173/api/soldiers', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                first_name: form.first_name,
                last_name: form.last_name,
                id_mos: parseInt(form.id_mos),
                id_deployments: form.id_deployments ? parseInt(form.id_deployments) : null,
                unit_name: form.unit_name,
                parent_division_id: 1 // You could pass the actual DIV ID if you map it
              }),
            });
  
            if (!res.ok) {
              const error = await res.json();
              alert(`Error: ${error.error}`);
              return;
            }
  
            alert('Soldier added successfully!');
            setForm({});
            fetchSoldiers();
          } catch (err) {
            console.error('Failed to add soldier:', err);
            alert('Something went wrong');
          }
        }}>
          Add Soldier
        </button>
      </div>
  
      {/* Filter Section */}
      <div className="filter-section">
        <h3>Filter by:</h3>
        <select
          className="filter-dropdown"
          value={filterCategory}
          onChange={(e) => handleFilterCategoryChange(e.target.value)}
        >
          <option value="">Select a filter</option>
          <option value="first name">First Name</option>
          <option value="last name">Last Name</option>
          <option value="deployments">Deployment</option>
          <option value="mos">MOS</option>
        </select>
      </div>
  
      {filterCategory && (
        <div className="filter-input-group">
          <input
            type="text"
            placeholder={`Enter ${filterCategory} to filter`}
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
              setOffset(0);
            }}
          />
          <button onClick={() => { setFilterCategory(''); setFilterValue(''); }}>
            Clear Filter
          </button>
        </div>
      )}
  
      {/* Results Table */}
      <div className="results-container">
        {isLoading ? (
          <p>Loading soldiers...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Edit</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Deployment</th>
                <th>MOS</th>
              </tr>
            </thead>
            <tbody>
              {soldiers.map((soldier, index) => (
                <tr key={index}>
                  <td>
                    <a href={`/edit-soldier/${soldier.id}`}>
                      <img
                        src="https://favicon.io/emoji-favicons/pencil"
                        alt="Edit"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </a>
                  </td>
                  <td>{soldier.last_name}</td>
                  <td>{soldier.first_name}</td>
                  <td>{soldier.deployment_name || 'N/A'}</td>
                  <td>{soldier.mos_name || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
  
        <div className="pagination">
          <button
            disabled={offset === 0}
            onClick={() => setOffset(Math.max(offset - LIMIT, 0))}
          >
            Previous
          </button>
          <span>Showing {offset + 1} – {offset + soldiers.length}</span>
          <button
            disabled={soldiers.length < LIMIT}
            onClick={() => setOffset(offset + LIMIT)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Div_Dashboard;
