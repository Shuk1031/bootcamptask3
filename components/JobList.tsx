/*

"use client";  

import React from 'react';
import { Job } from '../types/types';

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800">求人一覧</h3>
      <ul className="space-y-2">
        {jobs.map((job) => (
          <li key={job.id} className="border border-gray-300 p-4 rounded bg-gray-50">
            <span className="font-semibold">{job.title}</span> | 年収:
            <span className="text-blue-500"> {job.salary}万円</span>   
            <p className="text-sm text-gray-600">カテゴリ: {job.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;*/
"use client";

import React from 'react';
import { Job } from '../types/types';

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800">求人一覧</h3>
      <ul className="space-y-2">
        {jobs.map((job) => (
          <li key={job.id} className="border border-gray-300 p-4 rounded bg-gray-50">
            <span className="font-semibold">{job.title}</span> | 年収:
            <span className="text-blue-500"> {job.salary}万円</span>
            <p className="text-sm text-gray-600">カテゴリ: {job.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;