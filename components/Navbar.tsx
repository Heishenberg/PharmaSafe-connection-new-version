import React from 'react';
import { Pill, LayoutDashboard, ScanLine, Truck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Pill, label: 'Home' },
    { path: '/scan', icon: ScanLine, label: 'Scan' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between md:justify-end md:gap-8 h-16 items-center">
            
          <div className="hidden md:flex items-center gap-2 mr-auto cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-teal-100 p-2 rounded-full">
              <Pill className="w-6 h-6 text-teal-600" />
            </div>
            <span className="font-bold text-xl text-teal-900">PharmaSafe Connect</span>
          </div>
          
          <div className="flex justify-around flex-1 md:flex-none md:gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-teal-600 md:bg-teal-50' 
                      : 'text-slate-500 hover:text-teal-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className={`w-6 h-6 md:w-5 md:h-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                  <span className="text-[10px] md:text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Agent Login Shortcut (Temporary Hack) */}
          <button 
             onClick={() => navigate('/agent')}
             className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 rounded-lg transition-colors ml-2 md:ml-0 ${location.pathname === '/agent' ? 'text-teal-600' : 'text-slate-400 hover:text-teal-600'}`}
          >
             <Truck className="w-6 h-6 md:w-5 md:h-5" />
             <span className="text-[10px] md:text-sm font-medium">Agent</span>
          </button>

        </div>
      </div>
    </nav>
  );
};