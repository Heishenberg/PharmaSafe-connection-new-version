
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, X, Building2 } from 'lucide-react';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 text-center border-b border-slate-100 relative">
          <h2 className="text-2xl font-bold text-slate-900">Choose Your Role</h2>
          <p className="text-slate-500 text-sm mt-1">Select your access portal</p>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Household User Card */}
          <button 
            onClick={() => handleNavigation('/user-login')}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition-all group text-center h-full"
          >
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
              <ShieldCheck className="w-10 h-10 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Household</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Scan medicines, schedule pickups, and earn green credits.
            </p>
            <span className="mt-6 text-teal-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              User Login &rarr;
            </span>
          </button>

          {/* Hospital / Clinic Card (New) */}
          <button 
            onClick={() => handleNavigation('/hospital-login')}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-slate-100 hover:border-cyan-600 hover:bg-cyan-50 transition-all group text-center h-full"
          >
            <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
              <Building2 className="w-10 h-10 text-cyan-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Hospital / Clinic</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Bulk waste management, compliance tracking, and certificates.
            </p>
            <span className="mt-6 text-cyan-700 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Partner Login &rarr;
            </span>
          </button>

          {/* Agent Partner Card */}
          <button 
            onClick={() => handleNavigation('/agent-login')}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-slate-800 bg-slate-900 hover:border-orange-500 hover:shadow-xl transition-all group text-center h-full"
          >
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-slate-700">
              <Truck className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Logistics Agent</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Manage fleets, view routes, and track collection efficiency.
            </p>
            <span className="mt-6 text-orange-500 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Agent Login &rarr;
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};
