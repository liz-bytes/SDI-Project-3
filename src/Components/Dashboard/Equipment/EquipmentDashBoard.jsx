import React, { useState } from 'react';
import EquipmentData from './EquipmentDummyData.js';

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
    if (filterCategory === 'id_deployments') {
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
      {/* filter section */}
      <div>
        <span>Filter by: </span>
        <button onClick={() => handleFilterCategoryChange('name')}>Name</button>
        <button onClick={() => handleFilterCategoryChange('id_deployments')}>Deployment</button>
        <button onClick={() => handleFilterCategoryChange('status')}>Status</button>
      </div>
      {filterCategory && (
        <div>
          <input
            type="text"
            placeholder={`Enter ${filterCategory} to filter`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <button onClick={() => { setFilterCategory(''); setFilterValue(''); }}>Clear Filter</button>
        </div>
      )}
      {/* search results */}
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
