import React, { useState } from 'react';
import SoldierDummyData from './SoldierDummyData.js';

// Don't forget SoldierDummyData needs the parentathis after it so that it is treated like a array ex. "SoldierDummyData()"


//If soldier unit = unit selected then show those units

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


// function Div_Dashboard () {
//   return (
//     <>
//     <h2>Division Commander Dashboard</h2>

//     <form onsubmit="">
//       <select name="Unit">
//         <option value="Test">Test</option>
//       </select>
//       <input type="submit"></input>
//     </form>

//     <div>{SoldierDummyData().map((iterate) => (
//       <>


//       <p key={iterate.first_name}>First Name: {iterate.first_name}</p>
//       <p key={iterate.last_name}>Last Name: {iterate.last_name}</p>
//       <p key={iterate.id_deployments}>Current Deployment: {iterate.id_deployments}</p>
//       <p key={iterate.home_unit}>Home Unit: {iterate.home_unit}</p>
//       <p key={iterate.id_mos}>MOS: {iterate.id_mos}</p>
//       <br></br>
//       </>
//     ))}
//     </div>
//     </>
//   )
// }

export default Div_Dashboard;