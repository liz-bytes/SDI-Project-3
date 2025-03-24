import React, { useContext } from 'react';
import { SoldierContext } from "./SoldierContext";
import './Dashboard.css';

const SoldierStatus = () => {

  const {
    filterCategory,
    filterValue,
    setFilterValue,
    handleFilterCategoryChange,
    filteredSoldiers,
    setFilterCategory,
  } =useContext(SoldierContext);

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
  )
};

export default SoldierStatus;
