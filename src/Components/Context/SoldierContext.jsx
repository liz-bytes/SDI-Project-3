// import React, { createContext, useState } from 'react';
// import SoldierDummyData from '../Dashboard/SoldierDummyData.js';

//  const SoldierDataContext = createContext();

//  const SoldierProvider = ({ children }) => {
//   // Get the soldier data
//   const Soldiers = SoldierDummyData();
//   console.log(Soldiers);

//   // Define filter states
//   const [filterCategory, setFilterCategory] = useState('');
//   const [filterValue, setFilterValue] = useState('');

//   // Handle filter category changes
//   const handleFilterCategoryChange = (category) => {
//     setFilterCategory(category);
//     setFilterValue('');
//   };

//   // Compute filtered soldiers based on current filter state
//   const filteredSoldiers = Soldiers.filter((soldier) => {
//     if (!filterCategory || !filterValue) {
//       return true;
//     }
//     if (filterCategory === 'first_name') {
//       return soldier.first_name.toLowerCase().includes(filterValue.toLowerCase());
//     }
//     if (filterCategory === 'id_deployments') {
//       return soldier.id_deployments.some(dep =>
//         dep.toLowerCase().includes(filterValue.toLowerCase())
//       );
//     }
//     if (filterCategory === 'id_mos') {
//       return soldier.id_mos.toLowerCase().includes(filterValue.toLowerCase());
//     }
//     return true;
//   });
//   // Bundle all states and functions in a value object
//   const value = {
//     Soldiers,
//     filterCategory,
//     filterValue,
//     setFilterValue,
//     setFilterCategory,
//     handleFilterCategoryChange,
//     filteredSoldiers,
//   };

//   return (
//     <SoldierDataContext.Provider value={value}>
//       {children}
//     </SoldierDataContext.Provider>
//   );
// };

// export default {SoldierDataContext, SoldierProvider}