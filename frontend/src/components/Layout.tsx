import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { isAuthenticated, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center shadow-lg">
        <Link to="/" className="text-2xl font-black text-blue-400 tracking-tighter">
          DevBlog<span className="text-white">.</span>
        </Link>
        
        <div className="flex gap-6 items-center font-medium">
          <Link to="/" className="hover:text-blue-400 transition-colors">Feed</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/create" className="hover:text-blue-400 transition-colors">Write Post</Link>
              <div className="flex items-center gap-4 ml-4 border-l border-slate-600 pl-4">
                <span className="text-slate-400">Hi, {username}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500/10 text-red-400 px-4 py-2 rounded border border-red-500/20 hover:bg-red-500/20 transition-all"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-3 ml-4 border-l border-slate-600 pl-4">
              <Link to="/auth" className="hover:text-white text-slate-300 transition-colors px-3 py-2">Log in</Link>
              <Link to="/auth" className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-500 transition-colors">Sign up</Link>
            </div>
          )}
        </div>
      </nav>

      {/* This is where your page components render */}
      <main className="max-w-5xl mx-auto p-6 mt-8">
        <Outlet />
      </main>
    </div>
  );
}