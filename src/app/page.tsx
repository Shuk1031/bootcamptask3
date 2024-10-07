// app/page.tsx

// app/page.tsx

export const dynamic = 'force-dynamic'; // ページコンポーネントに配置

import React from 'react';
import JobSearch from '../../componets/JobSearch'; // 'componets' → 'components' に修正

const HomePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">求人検索</h1>
      <JobSearch />
    </div>
  );
};

export default HomePage;
/*export const dynamic = 'force-dynamic';
import React from 'react';
import JobSearch from '../../componets/JobSearch';

const HomePage: React.FC =() => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">求人検索</h1>
      <JobSearch />
    </div>
  );
};
export default HomePage;*/
