import React, { useEffect, useState } from 'react';
import { MapPin, Package, CheckCircle, Truck, User, Calendar, Clock, Navigation } from 'lucide-react';
import { BackButton } from '../components/BackButton';

interface AgentJob {
  id: string;
  medicineName: string;
  pickupDate: string;
  timeSlot: string;
  status: string;
  riskLevel: string;
  address?: string;
  landmark?: string;
}

export const AgentDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<AgentJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    try {
      const savedData = localStorage.getItem('userPickups');
      if (savedData) {
        const allPickups: AgentJob[] = JSON.parse(savedData);
        // Filter only active scheduled jobs
        const activeJobs = allPickups.filter(job => job.status === 'Scheduled');
        setJobs(activeJobs);
      }
    } catch (error) {
      console.error("Failed to load jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCollected = (jobId: string) => {
    try {
      // 1. Get all data
      const savedData = localStorage.getItem('userPickups');
      if (savedData) {
        const allPickups: AgentJob[] = JSON.parse(savedData);
        
        // 2. Update the specific job status
        const updatedPickups = allPickups.map(job => 
          job.id === jobId ? { ...job, status: 'Collected' } : job
        );

        // 3. Save back to localStorage
        localStorage.setItem('userPickups', JSON.stringify(updatedPickups));

        // 4. Update local state to remove the job from the active list
        setJobs(prev => prev.filter(job => job.id !== jobId));
        
        alert("Pickup marked as collected!");
      }
    } catch (error) {
      console.error("Error updating job status", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6 pb-24 md:pb-8">
      <BackButton />

      {/* Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-800 rounded-full">
            <User className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Vikram Singh</h1>
            <p className="text-xs text-slate-400">ID: AGT-2024-098</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-xs font-bold border border-green-800">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Online
        </div>
      </div>

      {/* Stats/Title */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Truck className="w-5 h-5 text-teal-600" />
          Active Pickups
        </h2>
        <span className="text-sm font-medium text-slate-500">{jobs.length} assigned</span>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 text-slate-500">Loading schedules...</div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">All caught up!</h3>
            <p className="text-slate-500 text-sm max-w-xs mt-1">
              No active pickups scheduled in your zone currently.
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 animate-in slide-in-from-bottom-4 duration-500">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{job.medicineName}</h3>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                      job.riskLevel === 'High Risk' 
                        ? 'bg-red-50 text-red-600 border-red-100' 
                        : 'bg-green-50 text-green-600 border-green-100'
                    }`}>
                      {job.riskLevel}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</div>
                  <span className="inline-block px-2 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-md">
                    {job.status}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-700 font-medium">
                      {job.address || "12/B, Green Park Main Road, Near Central Market"}
                    </p>
                    {job.landmark && (
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <Navigation className="w-3 h-3" /> {job.landmark}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{job.pickupDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{job.timeSlot}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={() => handleMarkCollected(job.id)}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Collected
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};