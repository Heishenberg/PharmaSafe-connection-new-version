import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ScanPage } from './pages/ScanPage';
import DashboardPage from './pages/DashboardPage'; // Changed to default import
import { AgentDashboard } from './pages/AgentDashboard';
import { MedicineAnalysis, PickupRequest } from './types';
import { Calendar } from 'lucide-react';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [pickupRequests, setPickupRequests] = useState<PickupRequest[]>([
    {
      id: '1',
      medicine: {
        name: 'Amoxicillin 500mg',
        composition: 'Amoxicillin Trihydrate',
        expiryDate: '10/2023',
        riskLevel: 'High Risk' as any,
        riskReason: 'Antibiotic resistance risk',
        disposalRecommendation: 'Chemical neutralization required'
      },
      address: '123 Main St, Springfield',
      date: '2024-05-15',
      status: 'Scheduled'
    }
  ]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState<MedicineAnalysis | null>(null);

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

    const newRequest: PickupRequest = {
      id: Date.now().toString(),
      medicine: pendingAnalysis,
      address: '123 Tech Park, Innovation Way', // Mock address for demo
      date: new Date().toISOString().split('T')[0],
      status: 'Scheduled'
    };

    setPickupRequests([newRequest, ...pickupRequests]);
    setShowScheduleModal(false);
    setPendingAnalysis(null);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 
         Main Layout Container
         - min-h-screen & bg-slate-50: Ensures full height and background color.
         - md:pt-20: Adds top padding ONLY on desktop to clear the fixed-top Navbar (h-16 + spacing).
           On mobile, the Navbar is fixed at the bottom, so no top padding is needed.
      */}
      <main className="min-h-screen bg-slate-50 md:pt-20">
        <Routes>
          <Route path="/" element={<HomePage onStart={() => navigate('/scan')} />} />
          <Route path="/scan" element={<ScanPage onSchedulePickup={handleSchedulePickup} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/agent" element={<AgentDashboard />} />
        </Routes>
      </main>

      <Navbar />

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