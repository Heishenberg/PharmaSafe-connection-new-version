
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, ArrowRight, LayoutDashboard } from 'lucide-react';
import { Logo } from '../../components/Logo';

export const AdminAuth: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.id === 'ADMIN01' && credentials.password === 'secure123') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin');
    } else {
      setError('Unauthorized Access: Invalid Credentials');
      setCredentials({ ...credentials, password: '' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
             <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                <Logo className="h-10 w-auto" />
             </div>
             <div className="text-left">
                <h1 className="text-2xl font-bold text-white tracking-tight">Control Tower</h1>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Admin Access Only</p>
             </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-2 mb-6 text-slate-300 border-b border-slate-700 pb-4">
             <Lock className="w-5 h-5 text-blue-400" />
             <span className="font-semibold">Secure Login</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Admin ID</label>
              <input 
                type="text" 
                value={credentials.id}
                onChange={(e) => setCredentials({...credentials, id: e.target.value})}
                className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                placeholder="ENTER ID"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Password</label>
              <input 
                type="password" 
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm font-medium animate-pulse">
                <ShieldAlert className="w-4 h-4" />
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 group mt-2"
            >
              Access Dashboard
              <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
           <button onClick={() => navigate('/')} className="text-slate-500 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto">
              Return to Public Site <ArrowRight className="w-4 h-4" />
           </button>
        </div>

      </div>
    </div>
  );
};
