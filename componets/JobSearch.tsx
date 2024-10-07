
"use client";

import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import JobCategoryFilter from './JobCategoryFilter';
import SalaryFilter from './SalaryFilter';
import { Job } from '../types/types';
export const dynamic = 'force-dynamic'

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
      const res = await fetch('/api/jobs', {cache:'no-store'});
      const data = await res.json();
      if (res.ok) {
        setJobs(data.jobs);
        setFilteredJobs(data.jobs);
      } else {
        setError(data.error || '求人情報の取得に失敗しました。');
      }
    } catch (err) {
      console.error(err);
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