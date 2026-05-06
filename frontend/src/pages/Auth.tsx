import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/client';

export default function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // UI State
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    email: '', // Usually required for registration
    password: '',
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    // Clear password when switching, keep username/email
    setFormData({ ...formData, password: '' }); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        // --- LOGIN FLOW ---
        const response = await apiClient.post('/login/', {
          username: formData.username,
          password: formData.password,
        });
        
        // Use the login function from AuthContext to save tokens and state
        login(response.data.access, response.data.refresh);
        
        // Send user back to the feed
        navigate('/');
        
      } else {
        // --- REGISTER FLOW ---
        // Assuming your UserRegisterView expects username, password, and email
        await apiClient.post('/register/', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        setSuccess('Account created successfully! You can now log in.');
        setIsLogin(true); // Switch toggle back to login automatically
        setFormData({ ...formData, password: '' }); // Clear password for safety
      }
    } catch (err: any) {
      // Handle Django's specific error formatting
      if (err.response?.data?.detail) {
        setError(err.response.data.detail); // Usually for invalid login
      } else if (err.response?.data?.username) {
        setError(`Username: ${err.response.data.username[0]}`); // Usually for taken username
      } else {
        setError('Something went wrong. Please check your network and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8">
        
        {/* Header / Toggle */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          
          <div className="flex p-1 bg-slate-900/80 rounded-xl border border-slate-700/50">
            <button
              onClick={() => !isLogin && toggleMode()}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                isLogin 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => isLogin && toggleMode()}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                !isLogin 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Success / Error Messages */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium text-center">
            {success}
          </div>
        )}

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="developer123"
            />
          </div>

          {/* Only show email if they are registering */}
          {!isLogin && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required={!isLogin}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="you@example.com"
              />
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              {isLogin && (
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </a>
              )}
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg px-4 py-3 mt-4 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex justify-center items-center"
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : isLogin ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}