import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="text-xl font-black tracking-tight text-slate-100 mb-4 inline-block">
              Stack<span className="text-blue-400">Insights</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Exploring the intersection of full-stack engineering, scalable backend architecture, and applied artificial intelligence.
            </p>
          </div>
          
          <div>
            <h3 className="text-slate-100 font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">All Articles</Link></li>
              <li><Link to="/tutorials" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Django Tutorials</Link></li>
              <li><Link to="/api" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">API Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-100 font-semibold mb-4">Connect</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">GitHub</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} StackInsights. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-slate-500 hover:text-slate-300 text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-500 hover:text-slate-300 text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}