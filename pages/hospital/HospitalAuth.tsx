
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, ShieldCheck } from 'lucide-react';

export const HospitalAuth: React.FC = () => {
  const navigate = useNavigate();
  const [license, setLicense] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate Login Delay
    setTimeout(() => {
      setIsLoading(false);
      // Save Role
      localStorage.setItem('userType', 'hospital');
      navigate('/hospital');
    }, 1500);
  };

  const fillDemo = () => {
    setLicense('APOLLO-MUM-01');
    setPassword('demo2024');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* VIBRANT BACKGROUND PATTERN */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-100/50 blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-100/50 blur-3xl mix-blend-multiply"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md mb-8">
        {/* SAFE BACK BUTTON */}
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-slate-500 hover:text-teal-700 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Return to Home</span>
        </button>
        {/* VIBRANT HEADER SECTION */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-tr from-teal-100 to-cyan-100 rounded-2xl shadow-inner flex items-center justify-center transform rotate-3 hover:rotate-0 transition-all">
            <Building2 className="h-10 w-10 text-teal-600" />
          </div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-slate-900 tracking-tight">
            Hospital <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Partner Portal</span>
          </h2>
          <p className="mt-3 text-center text-lg text-slate-600 max-w-xs mx-auto">
            Secure clinical waste management dashboard.
          </p>
        </div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        {/* COLORFUL CARD WITH SHADOW */}
        <div className="bg-white py-10 px-6 shadow-2xl shadow-teal-100/50 rounded-3xl sm:px-12 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-2 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-30 blur-sm"></div>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="license" className="block text-sm font-semibold text-slate-700">
                Hospital License ID
              </label>
              <div className="mt-2">
                <input
                  id="license"
                  name="license"
                  type="text"
                  required
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm transition-all"
                  placeholder="e.g., HOS-LIC-1234"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Admin Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              {/* VIBRANT BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-teal-200/50 text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  'Secure Access Portal'
                )}
              </button>
            </div>
          </form>

          {/* COLORFUL DEMO BOX */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500 font-medium">
                  For Hackathon Judges
                </span>
              </div>
            </div>
            <div className="mt-6 p-5 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-100/50 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ShieldCheck className="h-6 w-6 text-teal-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-base font-bold text-teal-900">Quick Demo Access</h3>
                  <div className="mt-2 text-sm text-slate-700 space-y-1">
                    <p>License: <code className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-teal-200 text-teal-800">APOLLO-MUM-01</code></p>
                    <p>Password: <code className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-teal-200 text-teal-800">demo2024</code></p>
                  </div>
                  <button
                    type="button"
                    onClick={fillDemo}
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 border-2 border-teal-200 rounded-lg text-xs font-bold text-teal-700 bg-white hover:bg-teal-50 hover:border-teal-300 transition-colors uppercase tracking-wider"
                  >
                    ⚡ Auto-fill Credentials
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
