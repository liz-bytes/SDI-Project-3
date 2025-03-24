import React, { useState } from 'react';
import EquipmentData from './EquipmentDummyData.js';
import '/src/index.css';

function Equipment_Data() {
  // Get the array of equipment data
  const Equipments = EquipmentData();

  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue('');
  };

  // Filter the equipment based on the selected category and input value
  const filteredEquipments = Equipments.filter((equipment) => {
    if (!filterCategory || !filterValue) {
      return true;
    }
    // Filter by name
    if (filterCategory === 'equipment name') {
      return equipment.name.toLowerCase().includes(filterValue.toLowerCase());
    }
    // Filter by deployment
    if (filterCategory === 'deployment') {
      return equipment.id_deployments.some(dep =>
        dep.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    // Filter by status
    if (filterCategory === 'status') {
      return equipment.status.toLowerCase().includes(filterValue.toLowerCase());
    }
    return true;
  });

  return (
    <div>
      <h2>Equipment Status</h2>

      {/* Filter Section with Dropdown */}
      <div className="filter-section">
        <h3>Filter by:</h3>
        <select
          className="filter-dropdown"
          value={filterCategory}
          onChange={(e) => handleFilterCategoryChange(e.target.value)}
        >
          <option value="">Select a filter</option>
          <option value="equipment name">Equipment Name</option>
          <option value="deployment">Deployment</option>
          <option value="status">Status</option>
        </select>
      </div>

      {/* Container to standardize width for the filter input and table */}
      <div className="results-container">
        {/* Show filter input if a category is selected */}
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
                <p className="results-info">
                Showing {filteredEquipments.length} of {Equipments.length} results:
              </p>
        <table>
          <thead>
            <tr>
              <th>Equipment Name</th>
              <th>Deployment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipments.map((equipment) => (
              <tr key={equipment.id}>
                <td>{equipment.name}</td>
                <td>{equipment.id_deployments.join(', ')}</td>
                <td>{equipment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Equipment_Data;
