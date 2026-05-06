import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/client';
import type {FormEvent} from 'react';


export default function CreateBlog() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/blogs/', {
        title: title,
        desc: desc,
      });

      navigate(`/blog/${response.data.id}`);
      
    } catch (err: any) {
      setError('Failed to publish the article. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null; 

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Area */}
      <div className="mb-10 border-b border-slate-800 pb-6">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
          Draft a New Article
        </h1>
        <p className="text-slate-400 text-lg">
          Share your latest engineering insights, tutorials, or architectural breakthroughs.
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium flex items-center gap-3">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      )}

      {/* The Editor Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Title Input */}
        <div className="group relative">
          <label className="block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            Article Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={150} // Protects against massively long titles
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-bold"
            placeholder="e.g., Integrating LLMs with Django REST Framework..."
          />
        </div>

        {/* Content/Description Input */}
      <div className="group relative">
          <label className="block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            Article Content
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            rows={12}
            maxLength={5000} // <-- THE FIX: Stops typing at 5000 exactly
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all leading-relaxed resize-y"
            placeholder="Write your brilliant content here. You can use markdown in the future..."
          />
          
          {/* UX Upgrade: Dynamic Character Counter */}
          <div className={`text-xs mt-2 text-right font-medium transition-colors ${
            desc.length >= 5000 ? 'text-red-500' : 
            desc.length > 4500 ? 'text-amber-400' : 
            'text-slate-500'
          }`}>
            {desc.length} / 5000 characters
          </div>
        </div>

        {/* Submission Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-800">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading || !title.trim() || !desc.trim()}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl px-8 py-3 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </>
            ) : (
              <>
                Publish Article
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}