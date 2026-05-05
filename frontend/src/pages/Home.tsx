import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/client';

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

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-6">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]"></div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Architect the <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
              Future of Web.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Dive into deep technical tutorials, system architecture breakdowns, and the latest techniques in connecting robust backends with modern intelligent agents.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-slate-100">Latest Publications</h2>
          <span className="text-sm font-medium text-slate-500">{blogs.length} Articles</span>
        </div>

        {/* Status States */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-slate-800/50 animate-pulse border border-slate-700/50"></div>
            ))}
          </div>
        )}
        
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <article 
                key={blog.id} 
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-800/80 hover:shadow-2xl hover:shadow-blue-900/20"
              >
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
                      Engineering
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-100 leading-tight group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="line-clamp-3 text-sm text-slate-400 leading-relaxed">
                    {blog.desc}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-700/50">
                  <Link 
                    to={`/blog/${blog.id}`}
                    className="inline-flex items-center text-sm font-semibold text-slate-300 group-hover:text-blue-400 transition-colors"
                  >
                    Read full article 
                    <svg className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}