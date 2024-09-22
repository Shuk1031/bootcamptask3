"use client";

import React from 'react';

interface SalaryFilterProps {
  onChangeSalary: (salary: number) => void;
}

const SalaryFilter: React.FC<SalaryFilterProps> = ({ onChangeSalary }) => {
  const handleSalaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeSalary(Number(e.target.value));
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-4">年収</h3>
      <select
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleSalaryChange}
      >
        <option value="0">指定なし</option>
        <option value="300">300万円以上</option>
        <option value="500">500万円以上</option>
        <option value="700">700万円以上</option>
      </select>
    </div>
  );
};

export default SalaryFilter;