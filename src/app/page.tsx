/// app/page.tsx

import React from 'react';
import Header from '../../components/Header';
import JobList from '../../components/JobList';
import { Job } from '../../types/types';
import pool from '../../lib/db';

export const getServerSideProps = async () => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query<Job>('SELECT * FROM jobs ORDER BY created_at DESC');
    return {
      props: {
        jobs: result.rows,
      },
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return {
      props: {
        jobs: [],
        error: '求人情報の取得に失敗しました。',
      },
    };
  } finally {
    if (client) {
      client.release();
    }
  }
};

const HomePage = ({ jobs, error }: { jobs: Job[]; error?: string }) => {
  return (
    <div>
      <Header />
      {error && <p className="text-red-500">{error}</p>}
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
