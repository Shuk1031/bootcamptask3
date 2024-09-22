import JobPostForm from '../../../componets/JobPostForm';

export default function PostPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">求人投稿ページ</h1>
        <JobPostForm />
      </div>
    </div>
  );
}