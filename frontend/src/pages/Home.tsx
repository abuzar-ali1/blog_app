import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/client';

// Define your TypeScript interfaces based on your Django models
interface Blog {
  id: number;
  title: string;
  desc: string;
  created_at: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Adjust '/users/' or '/blogs/' based on your actual Django URL configuration
        const response = await apiClient.get('/blogs/'); 
        setBlogs(response.data);
      } catch (err) {
        setError('Failed to load the feed. Is your Django server running?');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center text-slate-400 mt-20 animate-pulse">Loading amazing content...</div>;
  if (error) return <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded text-center">{error}</div>;

  return (
    <div className="space-y-8">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-2">Latest Insights</h1>
        <p className="text-slate-400 text-lg">Explore the newest engineering ideas and tutorials.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <article key={blog.id} className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/20 transition-all group flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
              {blog.title}
            </h2>
            <p className="text-slate-400 mb-6 flex-grow line-clamp-3">
              {blog.desc}
            </p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
              <span className="text-sm text-slate-500 font-medium">
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
              <Link 
                to={`/blog/${blog.id}`}
                className="text-sm font-bold text-blue-500 hover:text-blue-400"
              >
                Read Article →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}