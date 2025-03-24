import React, { useState } from 'react';
import SoldierDummyData from './SoldierDummyData.js';

function BN_Dashboard() {
  const Soldiers = SoldierDummyData();

  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue('');
  };

  // Filter the unit
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
      <h2>BDE Commander Dashboard</h2>
      <div>
        <span>Filter by: </span>
        <button onClick={() => handleFilterCategoryChange('first name')}>First Name</button>
        <button onClick={() => handleFilterCategoryChange('deployments')}>Deployment</button>
        <button onClick={() => handleFilterCategoryChange('mos')}>MOS</button>
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
      <ul>
        {filteredSoldiers.map((soldier) => (
          <li key={soldier.id}>
            {soldier.first_name} - {soldier.id_mos} - {soldier.id_deployments.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BN_Dashboard;