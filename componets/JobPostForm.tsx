"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

const JobPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [category, setCategory] = useState('sales');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && salary && category) {
      const { error } = await supabase.from('jobs').insert([{ title, salary: Number(salary), category }]);
      if (error) {
        alert('投稿に失敗しました。');
        console.error(error);
      } else {
        router.push('/');
      }
    } else {
      alert('すべての項目を入力してください。');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white shadow-md rounded space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800">求人投稿</h3>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">タイトル:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">年収:</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">カテゴリ:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="sales">営業</option>
          <option value="engineer">エンジニア</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
      >
        投稿
      </button>
    </form>
  );
};

export default JobPostForm;