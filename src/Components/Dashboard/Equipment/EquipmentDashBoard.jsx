import React, { useState } from 'react';
import EquipmentData from './EquipmentDummyData.js';
import '/src/index.css';

function Equipment_Data() {
  // Call the function to get the array of equipment data
  const Equipments = EquipmentData();

  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue('');
  };

  // Filter options
  const filteredEquipments = Equipments.filter((equipment) => {
    if (!filterCategory || !filterValue) {
      return true;
    }
    // Filter by name
    if (filterCategory === 'name') {
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
      <span>Filter by: </span>
      {/* filter section */}
      <div className="filter-section">
      <div className="button-group">

        <button onClick={() => handleFilterCategoryChange('name')}>Name</button>
        <button onClick={() => handleFilterCategoryChange('deployment')}>Deployment</button>
        <button onClick={() => handleFilterCategoryChange('status')}>Status</button>
        <button className="clear-filter" onClick={() => { setFilterCategory(''); setFilterValue(''); }}>Clear Filter</button>
      </div>
      {filterCategory && (
        <div className="input-group">
          <input
            type="text"
            placeholder={`Enter ${filterCategory} to filter`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />

        </div>
      )}
      </div>
      {/* search results */}
      <br></br>
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
  );
}

export default Equipment_Data;
