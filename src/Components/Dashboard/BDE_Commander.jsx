import React, { useState } from 'react';
import SoldierDummyData from './SoldierDummyData.js';
import './Dashboard.css';

function BDE_Dashboard () {
  return<h2>BDE Commander Dashboard</h2>;
}


function Div_Dashboard() {
  // Call the function to get the array of equipment data
  const Soldiers = SoldierDummyData();

  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue('');
  };


  // Filter the unit
  const filteredSoldiers = Soldiers.filter((soldier) => {
    if (!filterCategory || !filterValue) {
      return true;
    }
    // Filter by first name
    if (filterCategory === 'first_name') {
      return soldier.first_name.toLowerCase().includes(filterValue.toLowerCase());
    }
    // Filter by deployment
    if (filterCategory === 'id_deployments') {
      return soldier.id_deployments.some(dep =>
        dep.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    // Filter by mos
    if (filterCategory === 'id_mos') {
      return soldier.id_mos.toLowerCase().includes(filterValue.toLowerCase());
    }
    return true;
  });

  return (
    <div>
      <h2>Soldier Status</h2>
      <div>
        <span>Filter by: </span>
        <button onClick={() => handleFilterCategoryChange('first_name')}>First Name</button>
        <button onClick={() => handleFilterCategoryChange('id_deployments')}>Deployment</button>
        <button onClick={() => handleFilterCategoryChange('id_mos')}>MOS</button>
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
            {soldier.first_name} - {soldier.id_mos}
          </li>
        ))}
      </ul>
    </div>
  );
}





export default BDE_Dashboard;