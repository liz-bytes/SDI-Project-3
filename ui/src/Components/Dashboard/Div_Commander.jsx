import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const API_BASE = 'http://localhost:5173'; // Update if using proxy

function Div_Dashboard() {
  const [soldiers, setSoldiers] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const LIMIT = 10;

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
    fetchSoldiers();
  }, [offset, filterCategory, filterValue]);

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue('');
    setOffset(0); // Reset to first page on filter change
  };

  return (
    <div>
      <h2>Soldier Status</h2>

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
              setOffset(0); // Reset to first page on filter text change
            }}
          />
          <button onClick={() => { setFilterCategory(''); setFilterValue(''); }}>
            Clear Filter
          </button>
        </div>
      )}

      <div className="results-container">
        {isLoading ? (
          <p>Loading soldiers...</p>
        ) : (
          <table>
            <thead>
              <tr>
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
}

export default Div_Dashboard;
