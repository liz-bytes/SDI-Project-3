import React, { useState } from 'react';
import SoldierDummyData from './SoldierDummyData.js';
import './Dashboard.css';

function BN_Dashboard() {
  const Soldiers = SoldierDummyData();

  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue('');
  };

  const filteredSoldiers = Soldiers.filter((soldier) => {
    if (!filterCategory || !filterValue) return true;

    const searchTerm = filterValue.toLowerCase();

    switch (filterCategory) {
      case 'first name':
        return soldier.first_name.toLowerCase().includes(searchTerm);
      case 'deployments':
        return soldier.id_deployments.some(dep =>
          dep.toLowerCase().includes(searchTerm)
        );
      case 'mos':
        return (soldier.id_mos?.toString().toLowerCase() || '').includes(searchTerm);
      default:
        return true;
    }
  });

  return (
    <div>
      <h2>BN Commander Dashboard</h2>

      {/* Filter Section with Dropdown */}
      <div className="filter-section">
        <h3>Filter by:</h3>
        <select
          className="filter-dropdown"
          value={filterCategory}
          onChange={(e) => handleFilterCategoryChange(e.target.value)}
        >
          <option value="">Select a filter</option>
          <option value="first name">First Name</option>
          <option value="deployments">Deployment</option>
          <option value="mos">MOS</option>
        </select>
      </div>

      {/* Results Container */}
      <div className="results-container">
        {/* Filter Input Group */}
        {filterCategory && (
          <div className="filter-input-group">
            <input
              type="text"
              placeholder={`Enter ${filterCategory} to filter`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
            <button onClick={() => { setFilterCategory(''); setFilterValue(''); }}>
              Clear Filter
            </button>
          </div>
        )}
        <br />
        <table>
          <thead>
            <tr>
              <th>Soldier First Name</th>
              <th>MOS</th>
              <th>Deployment</th>
            </tr>
          </thead>
          <tbody>
            {filteredSoldiers.map((soldier, index) => (
              <tr key={index}>
                <td>{soldier.first_name}</td>
                <td>{soldier.id_mos.join(', ')}</td>
                <td>{soldier.id_deployments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BN_Dashboard;
