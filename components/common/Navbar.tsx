
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pill, LayoutDashboard, ScanLine, LogOut, Bell, Menu, X, Gift, Users, Lock } from 'lucide-react';
import { Logo } from '../Logo';
import { RoleSelectionModal } from '../auth/RoleSelectionModal';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const isLanding = location.pathname === '/';

  const handleLogout = () => {
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getActiveId = (path: string) => {
    if (path === '/user-home') return 'HOME';
    if (path.startsWith('/scan')) return 'SCAN';
    if (path.startsWith('/dashboard')) return 'DASHBOARD';
    if (path.startsWith('/user/rewards')) return 'REWARDS';
    if (path.startsWith('/community')) return 'COMMUNITY';
    return '';
  };

  const currentView = getActiveId(location.pathname);

  // Links for the Landing Page
  const landingLinks = [
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Impact', id: 'impact' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'FAQs', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  // Links for the App (LoggedIn)
  const appLinks = [
    { id: 'HOME', icon: Pill, label: 'Home', path: '/user-home' },
    { id: 'SCAN', icon: ScanLine, label: 'Scan', path: '/scan' },
    { id: 'DASHBOARD', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'REWARDS', icon: Gift, label: 'Rewards', path: '/user/rewards' },
    { id: 'COMMUNITY', icon: Users, label: 'Community', path: '/community' },
  ];

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
              
            {/* Logo Section */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(isLanding ? '/' : '/user-home')}>
              <Logo className="h-9 w-auto" />
              <div className="hidden md:block">
                <span className="font-bold text-xl text-slate-900 block leading-none tracking-tight">Planet Prescription</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {isLanding ? (
                // Landing Page Links
                <>
                  <div className="flex items-center gap-6">
                    {landingLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => handleScroll(link.id)}
                        className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                  <div className="pl-6 border-l border-slate-200 flex items-center gap-3">
                    <button
                        onClick={() => navigate('/admin-login')}
                        className="px-4 py-2 border border-emerald-600 text-emerald-700 rounded-xl text-sm font-bold hover:bg-emerald-50 transition-all"
                    >
                        Admin
                    </button>
                    <button 
                      onClick={() => setIsRoleModalOpen(true)}
                      className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95"
                    >
                      Login / Get Started
                    </button>
                  </div>
                </>
              ) : (
                // App Links
                <>
                  <div className="flex items-center gap-2">
                    {appLinks.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                          currentView === item.id 
                            ? 'bg-teal-50 text-teal-700 font-bold' 
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-medium'
                        }`}
                      >
                        <item.icon className={`w-4 h-4 ${currentView === item.id ? 'stroke-[2.5px]' : ''}`} />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="pl-4 border-l border-slate-200 flex items-center gap-4">
                     <button className="text-slate-400 hover:text-teal-600">
                        <Bell className="w-5 h-5" />
                     </button>
                     <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-4 duration-200">
            {isLanding ? (
              <>
                {landingLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleScroll(link.id)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 font-medium"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="h-px bg-slate-100 my-2"></div>
                <button 
                  onClick={() => { setMobileMenuOpen(false); navigate('/admin-login'); }}
                  className="w-full py-3 text-emerald-700 font-bold border border-emerald-200 rounded-xl bg-emerald-50 mb-2"
                >
                  Admin Portal
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); setIsRoleModalOpen(true); }}
                  className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold"
                >
                  Login / Get Started
                </button>
              </>
            ) : (
              <>
                {appLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                      currentView === item.id ? 'bg-teal-50 text-teal-700' : 'text-slate-600'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
                <div className="h-px bg-slate-100 my-2"></div>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-medium">
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Role Selection Modal */}
      <RoleSelectionModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} />
    </>
  );
};
