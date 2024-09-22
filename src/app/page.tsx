/*import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}*/
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
