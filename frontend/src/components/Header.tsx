import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { isAuthenticated, username, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const avatarLetter = username ? username.charAt(0).toUpperCase() : 'U';
  console.log(username, avatarLetter); // Debugging line to check username and avatar letter

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/'); // Send them back to the feed after logging out
  };

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

        

          {/* Action Buttons & Auth Logic */}
          <div className="flex items-center gap-4">
            
            {isAuthenticated ? (
              // --- LOGGED IN STATE ---
              <>
                <Link 
                  to="/create" 
                  className="hidden md:block rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 hover:shadow-blue-500/20 transition-all"
                >
                  Write Post
                </Link>

                {/* Profile Dropdown Container */}
                <div className="relative ml-2" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-blue-500 text-lg font-bold text-white shadow-md hover:shadow-blue-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    {avatarLetter}
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-700 bg-slate-800 shadow-2xl py-2 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-3 border-b border-slate-700/50 mb-1">
                        <p className="text-sm text-white font-semibold">Signed in as</p>
                        <p className="text-sm text-slate-400 truncate">@{username}</p>
                      </div>
                      
                      <Link 
                        to="/profile" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                      >
                        Your Profile
                      </Link>
                      
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 font-medium hover:bg-red-500/10 transition-colors mt-1 border-t border-slate-700/50 pt-3"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  to="/auth" 
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="https://abuzarali.dev/" 
                  className="rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-white transition-all"
                >
                  Developer
                </Link>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </header>
  );
}