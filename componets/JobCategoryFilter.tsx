"use client";

import React, { useState } from 'react';

interface JobCategoryFilterProps {
  onChangeCategory: (categories: string[]) => void;
}

const JobCategoryFilter: React.FC<JobCategoryFilterProps> = ({ onChangeCategory }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let updatedCategories = [...selectedCategories];
    if (e.target.checked) {
      updatedCategories.push(value);
    } else {
      updatedCategories = updatedCategories.filter((category) => category !== value);
    }
    setSelectedCategories(updatedCategories);
    onChangeCategory(updatedCategories);
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-lg">
      <h3 className="text-lg font-bold mb-4">求人カテゴリ</h3>
      <div className="space-y-2">
        <label className="flex items-center">
          <input type="checkbox" value="sales" className="mr-2" onChange={handleCategoryChange} />
          <span>営業</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" value="engineer" className="mr-2" onChange={handleCategoryChange} />
          <span>エンジニア</span>
        </label>
        {/* 他のカテゴリも追加可能 */}
      </div>
    </div>
  );
};

export default JobCategoryFilter;