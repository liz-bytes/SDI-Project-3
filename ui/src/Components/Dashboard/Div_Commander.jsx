import React, { useState } from 'react';
import SoldierDummyData from './SoldierDummyData.js';
import './Dashboard.css';

function Div_Dashboard() {
  // Get the array of soldier data
  const Soldiers = SoldierDummyData();

  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue(''); // reset the text input when changing category
  };

  // Filter the soldiers based on the selected category and input value
  const filteredSoldiers = Soldiers.filter((soldier) => {
    // If no category is selected or no value is typed, show all soldiers
    if (!filterCategory || !filterValue) return true;

    const searchTerm = filterValue.toLowerCase();

    switch (filterCategory) {
      case 'first name':
        return soldier.first_name.toLowerCase().includes(searchTerm);
      case 'last name':
        return soldier.last_name.toLowerCase().includes(searchTerm);
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
      <h2>Soldier Status</h2>
      {/* Container for "Filter by:" label and the dropdown */}
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
      <div className="results-container">
        {/* Only show the text input and clear button if a filter category is selected */}
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
              <th>Last Name</th>
              <th>First Name</th>
              <th>Deployment</th>
              <th>MOS</th>
            </tr>
          </thead>
          <tbody>
            {filteredSoldiers.map((soldier, index) => (
              <tr key={index}>
                <td>{soldier.last_name}</td>
                <td>{soldier.first_name}</td>
                <td>{soldier.id_deployments}</td>
                <td>{soldier.id_mos.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Div_Dashboard;
