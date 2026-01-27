
import React from 'react';
import { Truck, Wifi, Battery, AlertCircle, Signal, FileSpreadsheet } from 'lucide-react';
import { exportToExcel } from '../../../utils/excelExport';

interface AgentCardProps {
  id: string;
  name: string;
  status: 'Online' | 'Busy' | 'Offline';
  battery: number;
  load: number; // in kg
  maxLoad: number; // in kg
}

const AgentCard: React.FC<AgentCardProps> = ({ id, name, status, battery, load, maxLoad }) => {
  const isOnline = status === 'Online';
  const isBusy = status === 'Busy';
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Status Stripe */}
      <div className={`absolute top-0 left-0 w-1 h-full ${
        isOnline ? 'bg-green-500' : isBusy ? 'bg-orange-500' : 'bg-slate-400'
      }`}></div>

      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
             <Truck className="w-6 h-6 text-slate-500" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{name}</h3>
            <p className="text-xs text-slate-400 font-mono">{id}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
           isOnline ? 'bg-green-50 text-green-600' : isBusy ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-500'
        }`}>
          {status}
        </span>
      </div>

      <div className="space-y-3">
        {/* Battery / Fuel */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500 flex items-center gap-1"><Battery className="w-3 h-3" /> Battery Level</span>
            <span className="font-bold text-slate-700">{battery}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${battery > 20 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${battery}%` }}></div>
          </div>
        </div>

        {/* Load Capacity */}
        <div>
           <div className="flex justify-between text-xs mb-1">
             <span className="text-slate-500">Current Load</span>
             <span className="font-bold text-slate-700">{load}kg <span className="text-slate-400 font-normal">/ {maxLoad}kg</span></span>
           </div>
           <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(load/maxLoad)*100}%` }}></div>
           </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex gap-2">
        <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
           <Signal className="w-3 h-3" /> Remote Ping
        </button>
        <button className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-lg transition-colors">
           View Route
        </button>
      </div>
    </div>
  );
};

export const AdminFleet: React.FC = () => {
  const agents = [
    { id: 'AG-101', name: 'Rahul Sharma', status: 'Online', battery: 85, load: 4.2, maxLoad: 15 },
    { id: 'AG-204', name: 'Vikram Singh', status: 'Busy', battery: 62, load: 12.5, maxLoad: 15 },
    { id: 'AG-305', name: 'Amit Verma', status: 'Offline', battery: 0, load: 0, maxLoad: 15 },
    { id: 'AG-112', name: 'Sneha Reddy', status: 'Online', battery: 92, load: 2.1, maxLoad: 15 },
    { id: 'AG-404', name: 'Rajesh Kumar', status: 'Busy', battery: 45, load: 8.0, maxLoad: 15 },
    { id: 'AG-501', name: 'Priya Malik', status: 'Online', battery: 78, load: 1.5, maxLoad: 15 },
  ] as const;

  const handleExport = () => {
    const exportData = agents.map(agent => ({
        "Agent ID": agent.id,
        "Name": agent.name,
        "Status": agent.status,
        "Battery Level": `${agent.battery}%`,
        "Current Load": `${agent.load} kg`,
        "Max Load": `${agent.maxLoad} kg`
    }));
    exportToExcel(exportData, 'Planet_Prescription_Fleet');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Agent Fleet Monitoring</h2>
            <p className="text-slate-500">Live status of logistics workforce.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Updating live every 30s
             </div>
             <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold shadow-sm transition-colors"
             >
                <FileSpreadsheet className="w-4 h-4" /> Export Report
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map(agent => (
            <AgentCard key={agent.id} {...agent} />
          ))}
       </div>
    </div>
  );
};
