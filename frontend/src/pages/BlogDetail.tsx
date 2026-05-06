import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../api/client';

interface BlogDetailData {
  id: number;
  title: string;
  desc: string;
  created_at: string;

}

export default function BlogDetail() {
  // Grab the :id from the URL string
  const { id } = useParams<{ id: string }>();
  
  const [blog, setBlog] = useState<BlogDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await apiClient.get(`/blogs/${id}/`);
        setBlog(response.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setError('This article could not be found. It may have been deleted.');
        } else {
          setError('Failed to load the article. Please check your connection.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 animate-pulse">
        <div className="h-4 w-32 bg-slate-800 rounded mb-8"></div>
        <div className="h-12 w-3/4 bg-slate-800 rounded mb-6"></div>
        <div className="h-4 w-48 bg-slate-800 rounded mb-12"></div>
        <div className="space-y-4">
          <div className="h-4 bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-800 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            &larr; Return to Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      
      {/* Back Navigation */}
      <div className="mb-10">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-blue-400 transition-colors group"
        >
          <svg className="mr-2 h-4 w-4 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to articles
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-12 border-b border-slate-800 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 tracking-wide uppercase">
            Engineering
          </span>
          <span className="text-sm font-medium text-slate-500">
            {new Date(blog.created_at).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          {blog.title}
        </h1>
        
        {/* Author Avatar/Info (Placeholder - updates if backend sends author info) */}
        <div className="flex items-center gap-4 mt-8">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            A
          </div>
          <div>
            <p className="text-slate-200 font-medium leading-none mb-1">Author</p>
            <p className="text-slate-500 text-sm">Full-Stack Developer</p>
          </div>
        </div>
      </header>

      {/* Article Body */}
      {/* whitespace-pre-wrap ensures that line breaks from the textarea are respected */}
      <div className="prose prose-invert prose-lg max-w-none">
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-[1.1rem]">
          {blog.desc}
        </p>
      </div>

      {/* End of Article marker */}
      <div className="mt-16 pt-8 border-t border-slate-800 flex justify-center">
        <div className="h-1.5 w-1.5 rounded-full bg-slate-700 mx-1"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-slate-700 mx-1"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-slate-700 mx-1"></div>
      </div>
    </article>
  );
}