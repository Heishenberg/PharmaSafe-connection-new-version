
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { UserAuth } from './pages/UserAuth';
import { AgentAuth } from './pages/AgentAuth';
import { ScanPage } from './pages/ScanPage';
import DashboardPage from './pages/DashboardPage';
import { HomePage } from './pages/HomePage';
import { AgentDashboard } from './pages/agent/AgentDashboard';
import { MedicineAnalysis } from './types';
import { Calendar } from 'lucide-react';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState<MedicineAnalysis | null>(null);
  // Form state for date
  const [selectedDate, setSelectedDate] = useState('');

  // Routes where the User Navbar should be hidden
  const hideNavbarRoutes = ['/', '/user-login', '/agent-login'];
  // Also hide if in agent portal
  const isAgentPortal = location.pathname.startsWith('/agent') && location.pathname !== '/agent-login';
  
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname) && !isAgentPortal;

  useEffect(() => {
    console.log('App running');
  }, []);

  const handleSchedulePickup = (analysis: MedicineAnalysis) => {
    setPendingAnalysis(analysis);
    setShowScheduleModal(true);
  };

  const confirmSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingAnalysis) return;

    // Create a record compatible with DashboardPage's StoredPickup interface
    const newRequest = {
      id: Date.now().toString(),
      medicineName: pendingAnalysis.name,
      pickupDate: selectedDate || new Date().toISOString().split('T')[0],
      timeSlot: '10:00 AM - 12:00 PM',
      status: 'Scheduled',
      riskLevel: pendingAnalysis.riskLevel,
      timestamp: new Date().toISOString()
    };

    try {
      // 1. Get existing pickups
      const existingData = localStorage.getItem('userPickups');
      const pickups = existingData ? JSON.parse(existingData) : [];
      
      // 2. Add new pickup
      const updatedPickups = [newRequest, ...pickups];
      localStorage.setItem('userPickups', JSON.stringify(updatedPickups));

      // 3. Increment usage count
      const currentUsage = parseInt(localStorage.getItem('lifetimeUsage') || '0', 10);
      localStorage.setItem('lifetimeUsage', (currentUsage + 1).toString());
      
    } catch (err) {
      console.error("Failed to save pickup", err);
    }

    setShowScheduleModal(false);
    setPendingAnalysis(null);
    setSelectedDate('');
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen font-sans ${isAgentPortal ? 'bg-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <main className={`min-h-screen ${shouldShowNavbar ? 'md:pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user-login" element={<UserAuth />} />
          <Route path="/agent-login" element={<AgentAuth />} />
          
          {/* User App Routes */}
          <Route path="/user-home" element={<HomePage onStart={() => navigate('/scan')} />} />
          <Route path="/scan" element={<ScanPage onSchedulePickup={handleSchedulePickup} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Agent App Routes */}
          <Route path="/agent" element={<AgentDashboard />} />
        </Routes>
      </main>

      {/* Conditionally render Navbar */}
      {shouldShowNavbar && <Navbar />}

      {/* Schedule Modal Overlay */}
      {showScheduleModal && pendingAnalysis && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-teal-600 px-6 py-4 text-white flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              <h2 className="text-lg font-bold">Confirm Pickup</h2>
            </div>
            
            <form onSubmit={confirmSchedule} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medicine Item</label>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-900 font-medium">
                  {pendingAnalysis.name}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Address</label>
                <input 
                  type="text" 
                  defaultValue="123 Tech Park, Innovation Way"
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-3 px-4 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-lg font-medium bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
