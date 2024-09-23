"use client"; 

import React from 'react';
import JobPostForm from '../../../componets/JobPostForm';

const JobPostPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">求人投稿ページ</h1>
      <JobPostForm />
    </div>
  );
};

export default JobPostPage;