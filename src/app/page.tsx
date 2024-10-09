// app/page.t
/*

export const dynamic = 'force-dynamic'; // ページコンポーネントに配置

import React from 'react';
import JobSearch from '../../components/JobSearch'; // 'componets' → 'components' に修正

const HomePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">求人検索</h1>
      <JobSearch />
    </div>
  );
};

export default HomePage;*/
// src/app/page.tsx

export const dynamic = 'force-dynamic'; // ページコンポーネントに配置

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

export default HomePage;
