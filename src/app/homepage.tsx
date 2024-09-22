// app/page.tsx
import { supabase } from '../../lib/supabaseClient';
import JobList from '../../componets/JobList';
import JobCategoryFilter from '../../componets/JobCategoryFilter';
import SalaryFilter from '../../componets/SalaryFilter';
import { Job } from '../../types';
import { useState, useEffect } from 'react';

export default async function Home() {
  const { data: initialJobs, error } = await supabase.from('jobs').select('*');

  if (error) {
    console.error(error);
    return <p>データの取得に失敗しました。</p>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-6">
      {/* サイドバー（フィルターセクション） */}
      <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
        <h1 className="text-xl font-bold mb-6 text-gray-800">求人検索</h1>
        {/* クライアントコンポーネントを使用 */}
        <JobSearch initialJobs={initialJobs} />
      </aside>
    </div>
  );
}

// クライアントコンポーネント
function JobSearch({ initialJobs }: { initialJobs: Job[] }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [salary, setSalary] = useState<number>(0);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);

  useEffect(() => {
    let filtered = initialJobs;

    if (categories.length > 0) {
      filtered = filtered.filter((job) => categories.includes(job.category));
    }

    if (salary > 0) {
      filtered = filtered.filter((job) => job.salary >= salary);
    }

    setFilteredJobs(filtered);
  }, [categories, salary, initialJobs]);

  return (
    <>
      <JobCategoryFilter onChangeCategory={setCategories} />
      <SalaryFilter onChangeSalary={setSalary} />
      <main className="flex-1 bg-white p-6 rounded-lg shadow-lg ml-0 md:ml-6">
        <JobList jobs={filteredJobs} />
      </main>
    </>
  );
}