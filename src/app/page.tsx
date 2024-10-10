/// app/page.tsx

// app/page.tsx

import Header from '../../components/Header';
import JobList from '../../components/JobList';
import { Job } from '../../types/types';
import pool from '../../lib/db';

const getJobs = async (): Promise<Job[]> => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query<Job>('SELECT * FROM jobs ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  } finally {
    if (client) {
      client.release();
    }
  }
};

const HomePage = async () => {
  const jobs = await getJobs();

  return (
    <div>
      <Header />
      <JobList jobs={jobs} />
    </div>
  );
};

export default HomePage;

/*export const dynamic = 'force-dynamic'; // ページコンポーネントに配置

import React from 'react';
import JobSearch from '../../components/JobSearch'; // パスを修正

const HomePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">求人検索</h1>
      <JobSearch />
    </div>
  );
};

export default HomePage;*/
