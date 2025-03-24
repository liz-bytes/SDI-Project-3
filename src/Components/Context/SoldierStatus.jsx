// import { useContext } from "react";
// import { SoldierDataContext} from '/SoldierContext.jsx';

// const SoldierStatus = () => {
//   const {
//     filterCategory,
//     filterValue,
//     setFilterValue,
//     handleFilterCategoryChange,
//     filteredSoldiers,
//     setFilterCategory,
//   } = useContext(SoldierDataContext);

//   return (
//     <div>
//       <h2>Soldier Status</h2>
//       <div>
//         <span>Filter by: </span>
//         <button onClick={() => handleFilterCategoryChange('first_name')}>First Name</button>
//         <button onClick={() => handleFilterCategoryChange('id_deployments')}>Deployment</button>
//         <button onClick={() => handleFilterCategoryChange('id_mos')}>MOS</button>
//       </div>
//       {filterCategory && (
//         <div>
//           <input
//             type="text"
//             placeholder={`Enter ${filterCategory} to filter`}
//             value={filterValue}
//             onChange={(e) => setFilterValue(e.target.value)}
//           />
//           <button onClick={() => { setFilterCategory(''); setFilterValue(''); }}>
//             Clear Filter
//           </button>
//         </div>
//       )}
//       <ul>
//         {filteredSoldiers.map((soldier) => (
//           <li key={soldier.id}>
//             {soldier.first_name} - {soldier.id_mos}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SoldierStatus;
