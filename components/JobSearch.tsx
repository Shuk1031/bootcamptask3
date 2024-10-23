
// components/JobSearch.tsx

// components/JobSearch.tsx

"use client";

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import JobList from './JobList';
import JobCategoryFilter from './JobCategoryFilter';
import SalaryFilter from './SalaryFilter';
import { Job } from '../types/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const JobSearch = () => {
  const { data: jobs, error } = useSWR<Job[]>('/api/jobs', fetcher);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [salary, setSalary] = useState<number>(0);

  useEffect(() => {
    if (jobs) {
      filterJobs(jobs);
    }
  }, [jobs, categories, salary]);

  const filterJobs = (jobs: Job[]) => {
    let filtered = [...jobs];

    if (categories.length > 0) {
      filtered = filtered.filter((job) => categories.includes(job.category));
    }

    if (salary > 0) {
      filtered = filtered.filter((job) => job.salary >= salary);
    }

    setFilteredJobs(filtered);
  };

  if (error) return <div>求人情報の取得に失敗しました。</div>;
  if (!jobs) return <div>読み込み中...</div>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-6">
      <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
        <JobCategoryFilter onChangeCategory={setCategories} />
        <SalaryFilter onChangeSalary={setSalary} />
      </aside>
      <main className="flex-1 bg-white p-6 rounded-lg shadow-lg ml-0 md:ml-6">
        <JobList jobs={filteredJobs} />
      </main>
    </div>
  );
};

export default JobSearch;

/**"use client";

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import JobList from './JobList';
import JobCategoryFilter from './JobCategoryFilter';
import SalaryFilter from './SalaryFilter';
import { Job } from '../types/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const JobSearch = () => {
  const { data: jobs, error } = useSWR<Job[]>('/api/jobs', fetcher, { refreshInterval: 5000 });
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [salary, setSalary] = useState<number>(0);

  useEffect(() => {
    if (jobs) {
      filterJobs(jobs);
    }
  }, [jobs, categories, salary]);

  const filterJobs = (jobs: Job[]) => {
    let filtered = [...jobs];

    if (categories.length > 0) {
      filtered = filtered.filter((job) => categories.includes(job.category));
    }

    if (salary > 0) {
      filtered = filtered.filter((job) => job.salary >= salary);
    }

    setFilteredJobs(filtered);
  };

  if (error) return <div>求人情報の取得に失敗しました。</div>;
  if (!jobs) return <div>読み込み中...</div>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-6">
      <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
        <JobCategoryFilter onChangeCategory={setCategories} />
        <SalaryFilter onChangeSalary={setSalary} />
      </aside>
      <main className="flex-1 bg-white p-6 rounded-lg shadow-lg ml-0 md:ml-6">
        <JobList jobs={filteredJobs} />
      </main>
    </div>
  );
};

export default JobSearch;*/