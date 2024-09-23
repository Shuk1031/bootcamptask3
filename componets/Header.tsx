"use client"; 

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">求人検索アプリ</h1>
        <nav className="flex space-x-4">
          <Link href="/" className="hover:underline">
            求人検索
          </Link>
          <Link href="/post" className="hover:underline">
            求人投稿
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;