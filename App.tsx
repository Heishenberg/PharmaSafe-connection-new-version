
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { FloatingHelpline } from './components/common/FloatingHelpline';
import { LandingPage } from './pages/public/LandingPage';
import { UserAuth } from './pages/auth/UserAuth';
import { AgentAuth } from './pages/auth/AgentAuth';
import { AdminAuth } from './pages/auth/AdminAuth';
import { HospitalAuth } from './pages/hospital/HospitalAuth';
import { ScanPage } from './pages/user/ScanPage';
import DashboardPage from './pages/user/DashboardPage';
import { HomePage } from './pages/user/HomePage';
import { RewardsPage } from './pages/user/RewardsPage';
import { CommunityPage } from './pages/community/CommunityPage';
import { LeaderboardPage } from './pages/common/LeaderboardPage';
import { AgentDashboard } from './pages/agent/AgentDashboard';
import { AgentProfile } from './pages/agent/AgentProfile';
import { EarningsPage } from './pages/agent/EarningsPage';
import { SupportPage } from './pages/agent/SupportPage';
import { PickupHistoryPage } from './pages/agent/PickupHistoryPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminOverview } from './pages/admin/sections/AdminOverview';
import { AdminUsers } from './pages/admin/sections/AdminUsers';
import { AdminFleet } from './pages/admin/sections/AdminFleet';
import { AdminAnalytics } from './pages/admin/sections/AdminAnalytics';
import { AdminSettings } from './pages/admin/sections/AdminSettings';
import { AdminHospitals } from './pages/admin/sections/AdminHospitals';
import { AdminProfile } from './pages/admin/sections/AdminProfile';
import { HospitalDashboard } from './pages/hospital/HospitalDashboard';
import { HospitalProfile } from './pages/hospital/HospitalProfile';
import { HospitalAnalytics } from './pages/hospital/HospitalAnalytics';
import { BulkPickupForm } from './pages/hospital/BulkPickupForm';
import { ComplianceCerts } from './pages/hospital/ComplianceCerts';
import { HospitalInventory } from './pages/hospital/HospitalInventory';
import { HospitalOxygen } from './pages/hospital/HospitalOxygen';
import { HospitalRewards } from './pages/hospital/HospitalRewards';
import { HospitalCash } from './pages/hospital/HospitalCash';
import { MedicineAnalysis } from './types';
import { Calendar } from 'lucide-react';
import { saveUserPickup } from './utils/storage';
import { AgentLayout } from './layouts/AgentLayout';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState<MedicineAnalysis | null>(null);
  // Form state for date
  const [selectedDate, setSelectedDate] = useState('');

  // Routes where the User Navbar should be hidden
  const hideNavbarRoutes = [
    '/user-login', '/agent-login', '/admin', '/admin-login', 
    '/hospital-login', '/hospital', '/hospital/schedule', 
    '/hospital/compliance', '/hospital/inventory', '/hospital/analytics', '/hospital/profile', 
    '/hospital/oxygen', '/hospital/rewards', '/hospital/cash',
    '/community', '/agent', '/agent/dashboard', '/agent/profile', '/agent/support', '/agent/earnings', '/agent/history',
    '/leaderboard' // Leaderboard handles its own layout
  ];
  
  // Logic to determine context
  const isAgentPortal = location.pathname.startsWith('/agent') && location.pathname !== '/agent-login';
  const isAdminPortal = location.pathname.startsWith('/admin') || location.pathname === '/admin-login';
  const isHospitalPortal = location.pathname.startsWith('/hospital') || location.pathname === '/hospital-login';
  
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname) && !isAgentPortal && !isAdminPortal && !isHospitalPortal;

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
      saveUserPickup(newRequest);
    } catch (err) {
      console.error("Failed to save pickup", err);
    }

    setShowScheduleModal(false);
    setPendingAnalysis(null);
    setSelectedDate('');
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen font-sans ${isAgentPortal || isAdminPortal ? 'bg-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Conditionally render Navbar at the TOP */}
      {shouldShowNavbar && <Navbar />}

      <main className={`min-h-screen ${shouldShowNavbar ? '' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user-login" element={<UserAuth />} />
          <Route path="/agent-login" element={<AgentAuth />} />
          <Route path="/admin-login" element={<AdminAuth />} />
          <Route path="/hospital-login" element={<HospitalAuth />} />
          
          {/* User App Routes */}
          <Route path="/user-home" element={<HomePage onStart={() => navigate('/scan')} />} />
          <Route path="/scan" element={<ScanPage onSchedulePickup={handleSchedulePickup} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user/rewards" element={<RewardsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          
          {/* Agent App Routes */}
          <Route path="/agent" element={<AgentLayout />}>
             <Route index element={<AgentDashboard />} />
             <Route path="dashboard" element={<AgentDashboard />} />
             <Route path="profile" element={<AgentProfile />} />
             <Route path="earnings" element={<EarningsPage />} />
             <Route path="support" element={<SupportPage />} />
             <Route path="history" element={<PickupHistoryPage />} />
          </Route>

          {/* Hospital App Routes */}
          <Route path="/hospital" element={<HospitalDashboard />} />
          <Route path="/hospital/profile" element={<HospitalProfile />} />
          <Route path="/hospital/schedule" element={<BulkPickupForm />} />
          <Route path="/hospital/compliance" element={<ComplianceCerts />} />
          <Route path="/hospital/inventory" element={<HospitalInventory />} />
          <Route path="/hospital/analytics" element={<HospitalAnalytics />} />
          <Route path="/hospital/rewards" element={<HospitalRewards />} />
          <Route path="/hospital/oxygen" element={<HospitalOxygen />} />
          <Route path="/hospital/cash" element={<HospitalCash />} />

          {/* Admin App Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
             <Route index element={<AdminOverview />} />
             <Route path="users" element={<AdminUsers />} />
             <Route path="hospitals" element={<AdminHospitals />} />
             <Route path="fleet" element={<AdminFleet />} />
             <Route path="analytics" element={<AdminAnalytics />} />
             <Route path="settings" element={<AdminSettings />} />
             <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Routes>
      </main>

      {/* Persistent Accessibility Button */}
      {!isAdminPortal && !isHospitalPortal && <FloatingHelpline />}

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
