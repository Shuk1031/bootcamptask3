
/*"use client"; //Next.js 13以降で使われるディレクティブ。コンポーネントがサーバーサイドではなく、クライアントサイドで実行されることを指定。
import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import JobCategoryFilter from './JobCategoryFilter';
import SalaryFilter from './SalaryFilter';
import { Job } from '../types/types';

const JobSearch: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [salary, setSalary] = useState<number>(0);
  const [error, setError] = useState<string>('');
  //コンポーネントが初回レンダリングされたときにfetchJobs関数を実行。求人情報を取得。
  useEffect(() => {
    fetchJobs();
  }, []);
  //カテゴリー、年収、求人情報が変わるたびにfilterJobs関数を実行。求人情報をフィルタリング
  useEffect(() => {
    filterJobs();
  }, [categories, salary, jobs]);
  //非同期関数でAPIから求人情報を取得。
  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs', { cache: 'no-store' }); //APIエンドポイントにリクエストを送り、キャッシュを使用せず最新のデータを取得。
      console.log('Fetch response status:', res.status);
      const data = await res.json(); //取得したデータをjson形式に変換。
      console.log('Fetched jobs:', data.jobs);
      if (res.ok) {
        setJobs(data.jobs);    //データ取得が成功した場合、求人情報をjobs状態に格納。
        setFilteredJobs(data.jobs); //フィルタリング前のきゅうじんじょうほうをfilteredJobs状態に格納
      } else {
        setError(data.error || '求人情報の取得に失敗しました。');
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('求人情報の取得中にエラーが発生しました。');
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (categories.length > 0) {
      filtered = filtered.filter((job) => categories.includes(job.category));
    }

    if (salary > 0) {
      filtered = filtered.filter((job) => job.salary >= salary);
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-6">
      <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
        <JobCategoryFilter onChangeCategory={setCategories} />
        <SalaryFilter onChangeSalary={setSalary} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </aside>
      <main className="flex-1 bg-white p-6 rounded-lg shadow-lg ml-0 md:ml-6">
        <JobList jobs={filteredJobs} />
      </main>
    </div>
  );
};

export default JobSearch;*/
"use client";

import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import JobCategoryFilter from './JobCategoryFilter';
import SalaryFilter from './SalaryFilter';
import { Job } from '../types/types';

const JobSearch: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [salary, setSalary] = useState<number>(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [categories, salary, jobs]);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs', { cache: 'no-store' });
      if (res.ok) {
        const data: Job[] = await res.json();
        setJobs(data);
        setFilteredJobs(data);
      } else {
        const errorData = await res.json();
        setError(errorData.error || '求人情報の取得に失敗しました。');
      }
    } catch (err) {
      console.error('求人情報の取得中にエラーが発生しました:', err);
      setError('求人情報の取得中にエラーが発生しました。');
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (categories.length > 0) {
      filtered = filtered.filter((job) => categories.includes(job.category));
    }

    if (salary > 0) {
      filtered = filtered.filter((job) => job.salary >= salary);
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-6">
      <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
        <JobCategoryFilter onChangeCategory={setCategories} />
        <SalaryFilter onChangeSalary={setSalary} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </aside>
      <main className="flex-1 bg-white p-6 rounded-lg shadow-lg ml-0 md:ml-6">
        <JobList jobs={filteredJobs} />
      </main>
    </div>
  );
};

export default JobSearch;