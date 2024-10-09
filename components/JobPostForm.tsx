// JobPostForm.tsx

/*"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const JobPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState<number | ''>('');
  const [category, setCategory] = useState('営業');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // バリデーション
    if (!title || !salary || !category ) {
      setError('すべてのフィールドを入力してください。');
      return;
    }

    try {
      const res = await fetch('/api/postJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, salary, category })
      });

      const data = await res.json();

      if (res.ok) {
        // 投稿成功後に一覧ページにリダイレクト
        router.push('/');
        router.refresh();
        // フォームのリセット
        setTitle('');
        setSalary('');
        setCategory('営業');
      } else {
        setError(data.error || '投稿に失敗しました。');
      }
    } catch (err) {
      console.error(err);
      setError('投稿中にエラーが発生しました。');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white shadow-md rounded space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800">求人投稿</h3>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">タイトル:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="例: フロントエンドエンジニア"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">年収 (万円):</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="例: 600"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">カテゴリ:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="営業">営業</option>
          <option value="エンジニア">エンジニア</option>
          
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

export default JobPostForm;*/
// JobPostForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Job } from '../types/types';

const fetchJobs = async (): Promise<Job[]> => {
  try {
    const res = await fetch('/api/jobs', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('求人情報の取得に失敗しました。');
    }
    const data = await res.json();
    return data.jobs; // jobs配列を返す
  } catch (error) {
    console.error('求人情報の取得中にエラーが発生しました:', error);
    return []; // エラーが発生した場合は空の配列を返す
  }
};
const JobPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState<number | ''>('');
  const [category, setCategory] = useState('営業');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    

    // バリデーション
    if (!title || salary === '' || !category) {
      setError('すべてのフィールドを入力してください。');
      return;
    }

    try {
      const res = await fetch('/api/postJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, salary: Number(salary), category }),
      });

      if (res.ok) {
        setTimeout(async () => {
          await fetchJobs();
        }, 2000)
        // POST後にデータをリフレッシュ
        router.refresh();
        router.push('/'); // 一覧ページへリダイレクト
      } else {
        const data = await res.json();
        setError(data.error || '投稿に失敗しました。');
      }
    } catch (err) {
      console.error('投稿中にエラーが発生しました:', err);
      setError('投稿中にエラーが発生しました。');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white shadow-md rounded space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800">求人投稿</h3>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">タイトル:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="例: フロントエンドエンジニア"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">年収 (万円):</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="例: 600"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">カテゴリ:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="営業">営業</option>
          <option value="エンジニア">エンジニア</option>
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