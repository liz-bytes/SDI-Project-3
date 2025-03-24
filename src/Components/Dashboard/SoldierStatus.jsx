import React, { useContext } from 'react';
import { SoldierContext } from "./SoldierContext"; 

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

      {/* Filter Section */}
      <div className="filter-section">
        <h3>Filter by:</h3>
        <div className="filter-buttons">
          <button onClick={() => handleFilterCategoryChange('last name')}>Last Name</button>
          <button onClick={() => handleFilterCategoryChange('deployments')}>Deployment</button>
          <button onClick={() => handleFilterCategoryChange('mos')}>MOS</button>
        </div>
      </div>

      {/* Input Group for Filter */}
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

      {/* Search results */}
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
  )
};

export default SoldierStatus;
