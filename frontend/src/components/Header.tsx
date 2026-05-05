import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Branding */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
              Dev
            </div>
            <span className="text-xl font-black tracking-tight text-slate-100">
              Stack<span className="text-blue-400">Insights</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Articles</Link>
            <Link to="/topics" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Machine Learning</Link>
            <Link to="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link 
              to="/auth" 
              className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link 
              to="/create" 
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 hover:shadow-blue-500/20 transition-all"
            >
              Write Post
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}