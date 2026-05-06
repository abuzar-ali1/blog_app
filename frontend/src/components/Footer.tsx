import { Link } from 'react-router-dom';

export default function Footer() {
  return (
   <footer className="border-t border-slate-800 bg-slate-900 pt-16 pb-8">
  <div className="mx-auto max-w-7xl px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      {/* Brand and Mission */}
      <div className="md:col-span-2">
        <Link to="/" className="text-xl font-black tracking-tight text-slate-100 mb-4 inline-block">
          Stack<span className="text-blue-400">Insights</span>
        </Link>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md">
          A dedicated space for exploring full-stack engineering, scalable backend architecture, 
          and applied artificial intelligence. Built to document the journey of mastering modern web technologies.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
          <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
          <p className="text-xs font-medium text-blue-300">
            Practice Project by AbuZar Ali
          </p>
        </div>
      </div>
      
      {/* Professional Links */}
      <div className="flex flex-col md:items-end">
        <h3 className="text-slate-100 font-semibold mb-4">Connect & Portfolio</h3>
        <ul className="space-y-3 md:text-right">
          <li>
            <a href="https://github.com/abuzar-ali1" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center md:justify-end gap-2">
              GitHub Repository
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </li>
          <li>
            <a href="https://abuzarali.dev/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center md:justify-end gap-2">
              Personal Portfolio
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </a>
          </li>
        
        </ul>
      </div>
    </div>
    
    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-slate-500 text-xs text-center md:text-left italic">
        "This is a simple blog site built for practice and learning purposes by AbuZar Ali."
      </p>
      <p className="text-slate-500 text-sm">
        © {new Date().getFullYear()} StackInsights.
      </p>
    </div>
  </div>
</footer>
  );
}