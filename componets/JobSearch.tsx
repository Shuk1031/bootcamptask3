"use client"; // クライアントコンポーネントとして指定

import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import JobCategoryFilter from './JobCategoryFilter';
import SalaryFilter from './SalaryFilter';
import { supabase } from '../lib/supabaseClient';
import { Job } from '../types';

const JobSearch = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [salary, setSalary] = useState<number>(0);

  // データ取得をuseEffect内で行う
  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase.from('jobs').select('*');
      if (error) {
        console.error('データ取得エラー:', error);
      } else {
        setJobs(data || []);
        setFilteredJobs(data || []);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (categories.length > 0) {
      filtered = filtered.filter((job) => categories.includes(job.category));
    }

    if (salary > 0) {
      filtered = filtered.filter((job) => job.salary >= salary);
    }

    setFilteredJobs(filtered);
  }, [categories, salary, jobs]);

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="w-full md:w-1/4 p-4 bg-white shadow-md">
        <JobCategoryFilter onChangeCategory={setCategories} />
        <SalaryFilter onChangeSalary={setSalary} />
      </aside>
      <main className="flex-1 p-4">
        <JobList jobs={filteredJobs} />
      </main>
    </div>
  );
};

export default JobSearch;