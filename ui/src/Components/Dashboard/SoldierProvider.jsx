import React, { useState } from 'react';
import SoldierDummyData from '../Dashboard/SoldierDummyData.js';
import { SoldierContext } from './SoldierContext';

export const SoldierProvider = ({ children }) => {
const Soldiers = SoldierDummyData();


  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue('');
  };

  const filteredSoldiers = Soldiers.filter((soldier) => {
    if (!filterCategory || !filterValue) return true;

    const searchTerm = filterValue.toLowerCase();

    switch (filterCategory) {
      case 'first name':
        return soldier.first_name.toLowerCase().includes(searchTerm);
      case 'last name':
        return soldier.last_name.toLowerCase().includes(searchTerm);
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

  const value = {
    Soldiers,
    filterCategory,
    filterValue,
    setFilterValue,
    setFilterCategory,
    handleFilterCategoryChange,
    filteredSoldiers,
  };

  return (
    <SoldierContext.Provider value={value}>
      {children}
    </SoldierContext.Provider>
  );
};
