import React, { useState } from 'react';
import SoldierDummyData from './SoldierDummyData.js';

// Don't forget SoldierDummyData needs the parentathis after it so that it is treated like a array ex. "SoldierDummyData()"


//If soldier unit = unit selected then show those units

function Div_Dashboard() {
  // Call the function to get the array of soldier data
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
        // Convert MOS to string and handle potential null/undefined
        return (soldier.id_mos?.toString().toLowerCase() || '').includes(searchTerm);
      default:
        return true;
    }
  });

  return (
    <div>
      <h2>Soldier Status</h2>
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
      {/* search results */}
      <br></br>
      <table>
        <thead>
          <tr>
            <th>Soldier First Name</th>
            <th>MOS</th>
            <th>Deployment</th>
          </tr>
        </thead>
        <tbody>
          {filteredSoldiers.map((soldier) => (
            <tr>
              <td>{soldier.first_name}</td>
              <td>{soldier.id_mos.join(', ')}</td>
              <td>{soldier.id_deployments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Div_Dashboard;