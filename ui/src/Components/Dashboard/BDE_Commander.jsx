import React, { useState, useEffect } from 'react';
import './Dashboard.css';

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

const API_BASE = 'http://localhost:5173';

const BDE_Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
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
      const unitsRes = await fetch(`${API_BASE}/units`);
      const allUnits = await unitsRes.json();

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

  useEffect(() => {
    if (!commander) return;

    const fetchUnitMapAndSoldiers = async () => {
      try {
        const mapRes = await fetch(`${API_BASE}/units/unit-map`);
        const unitMap = await mapRes.json();
        const filteredBNs = unitMap.filter(
          (entry) => entry.brigade_id === commander.brigade_id
        );
        setBnList(filteredBNs);

        // Build query string
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

        const soldierRes = await fetch(`${API_BASE}/soldiers${query}`);
        const soldierData = await soldierRes.json();
        setSoldiers(soldierData);
      } catch (err) {
        console.error('Error fetching BNs or Soldiers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchUnitMapAndSoldiers();
  }, [commander, filterCategory, filterValue, offset]);

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue('');
    setOffset(0); // reset page when changing filters
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
      <p>Location: {brigadeUnit?.location}</p>

      <h3>Battalions Under Your Command:</h3>
      <ul>
        {bnList.map((bn) => (
          <li key={bn.battalion_id}>
            {bn.battalion_name} — {bn.battalion_location}
          </li>
        ))}
      </ul>

      <h3>Soldiers Assigned to Your Brigade:</h3>

      {/* Filter Section */}
      <div className="filter-section">
        <h4>Filter by:</h4>
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
            placeholder={`Enter ${filterCategory}`}
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
              setOffset(0); // Reset page when typing new filter
            }}
          />
          <button onClick={() => { setFilterCategory(''); setFilterValue(''); }}>
            Clear Filter
          </button>
        </div>
      )}

      {isLoading ? (
        <p>Loading soldiers...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>Deployment</th>
                <th>MOS</th>
              </tr>
            </thead>
            <tbody>
              {soldiers.map((s, index) => (
                <tr key={index}>
                  <td>{s.first_name}</td>
                  <td>{s.last_name}</td>
                  <td>{s.deployment_name || 'N/A'}</td>
                  <td>{s.mos_name || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
        </>
      )}
    </div>
  );
};

export default BDE_Dashboard;
