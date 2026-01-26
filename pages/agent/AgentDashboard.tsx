
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Map, Wallet, LifeBuoy, LogOut, 
  Bell, Home, Search, ChevronRight, Play, MapPin, 
  Clock, ShieldCheck, AlertCircle, Package, Award, 
  Truck
} from 'lucide-react';
import { Logo } from '../../components/Logo';

interface AgentProfile {
  name: string;
  photo?: string;
  id?: string;
}

export const AgentDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<AgentProfile>({ name: 'Rahul Sharma', id: 'AG-8821' });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('agentProfile');
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
      }
    } catch (e) {
      // Default to Rahul if error or empty
    }
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans overflow-hidden text-slate-100">
      
      {/* 1. LEFT SIDEBAR (Fixed) */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 z-20">
        <div className="p-6">
          <div className="flex items-center gap-3">
             <div className="bg-white/10 p-2 rounded-lg">
                <Logo className="h-10 w-auto" />
             </div>
             <div className="leading-tight">
                <span className="text-white font-bold text-lg block">Planet</span>
                <span className="text-white font-bold text-lg block">Prescription <span className="text-orange-500">Agent</span></span>
             </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={Map} label="My Routes" />
          <NavItem icon={Wallet} label="Earnings" />
          <NavItem icon={LifeBuoy} label="Support" />
        </nav>

        {/* Sidebar Footer Profile */}
        <div className="p-6 border-t border-slate-800">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                {profile.photo ? (
                    <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                        <Truck className="w-5 h-5" />
                    </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-white">{profile.name}</p>
                <p className="text-xs text-slate-500 truncate">ID: {profile.id || 'AG-8821'}</p>
              </div>
              <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
           </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8 relative">
         
         {/* Background Decoration - Subtle Glow */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Top Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Good morning, <span className="text-orange-500">{profile.name.split(' ')[0]}</span>
                </h1>
                <p className="text-slate-400 text-sm mt-1">Here's your schedule for today.</p>
              </div>

              <div className="flex items-center gap-4">
                 <div className="hidden md:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Online</span>
                 </div>
                 <HeaderIcon icon={Home} />
                 <HeaderIcon icon={Award} /> {/* Credits */}
                 <div className="relative">
                    <HeaderIcon icon={Bell} />
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-slate-900 rounded-full"></span>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 shadow-sm overflow-hidden cursor-pointer hover:border-orange-500 transition-all">
                    {profile.photo ? (
                        <img src={profile.photo} alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                            <Truck className="w-5 h-5" />
                        </div>
                    )}
                 </div>
              </div>
            </header>

            {/* WIDGET GRID */}
            <div className="grid grid-cols-12 gap-6">
                
                {/* --- LEFT COLUMN (8 cols) --- */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    
                    {/* Widget A: Profile & Status */}
                    <div className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800 relative overflow-hidden">
                       {/* Abstract Shape */}
                       <div className="absolute top-0 right-0 p-24 bg-orange-500/5 rounded-full -mr-12 -mt-12 blur-3xl"></div>
                       
                       <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start">
                          <div className="flex-shrink-0">
                             <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-900/20">
                                <div className="w-full h-full rounded-full border-4 border-slate-900 overflow-hidden bg-slate-800">
                                    {profile.photo ? (
                                        <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                                            <Truck className="w-10 h-10" />
                                        </div>
                                    )}
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex-1 text-center md:text-left space-y-4">
                             <div>
                                <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                                <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                                   <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-900/20 px-2 py-0.5 rounded-full border border-green-900/30">
                                      <ShieldCheck className="w-3 h-3" /> Eco Champion (Level 3)
                                   </span>
                                   <span className="text-xs font-medium text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full">
                                      Verified Agent
                                   </span>
                                </div>
                             </div>
                             
                             <div className="flex items-center justify-center md:justify-start gap-8 border-t border-slate-800 pt-4">
                                <div>
                                   <p className="text-2xl font-bold text-white">12</p>
                                   <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Scheduled</p>
                                </div>
                                <div>
                                   <p className="text-2xl font-bold text-white">₹920</p>
                                   <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">This Week</p>
                                </div>
                                <div>
                                   <p className="text-2xl font-bold text-white">4.6 <span className="text-sm text-slate-500 font-normal">kg</span></p>
                                   <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Collected</p>
                                </div>
                             </div>
                          </div>

                          <div className="flex-shrink-0 self-center">
                             <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-orange-900/30 font-bold flex items-center gap-2 transition-all hover:scale-105">
                                <Play className="w-5 h-5 fill-current" />
                                Start Route
                             </button>
                          </div>
                       </div>
                    </div>

                    {/* Widget C: Map Section */}
                    <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden">
                       <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                          <h3 className="font-bold text-white flex items-center gap-2">
                             <MapPin className="w-4 h-4 text-orange-500" /> Today's Route
                          </h3>
                          <span className="text-xs text-slate-500 font-mono">900qp8. Vishattpep ></span>
                       </div>
                       <div className="h-48 bg-slate-800 relative w-full overflow-hidden group">
                          {/* Map Placeholder - Dark Mode Style */}
                          <div 
                             className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-700"
                             style={{ 
                                 backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png)',
                                 filter: 'invert(1) hue-rotate(180deg) saturate(0.5)' 
                             }} 
                          >
                             <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/72.8777,19.0760,12,0/800x400?access_token=Pk.eyJ1IjoiZGVtbyIsImEiOiJjamJ4d2NsM3QwZ3QwMzN0ZTVpb2c1bW1mIn0.SC4sF7lQ8L2z7A6t85w7_g')] bg-cover bg-center mix-blend-overlay"></div>
                          </div>

                          {/* Map Overlays */}
                          <div className="absolute inset-0 bg-slate-950/20 pointer-events-none"></div>
                          
                          {/* Pin 1 */}
                          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                             <div className="w-8 h-8 bg-orange-600 rounded-full border-4 border-slate-900 shadow-lg flex items-center justify-center animate-bounce">
                                <Package className="w-3 h-3 text-white" />
                             </div>
                             <div className="mt-1 bg-slate-800 px-2 py-0.5 rounded shadow text-[10px] font-bold text-slate-300 text-center border border-slate-700">Stop 1</div>
                          </div>

                          {/* Pin 2 */}
                          <div className="absolute top-1/2 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                             <div className="w-8 h-8 bg-slate-700 rounded-full border-4 border-slate-900 shadow-lg flex items-center justify-center">
                                <AlertCircle className="w-3 h-3 text-orange-500" />
                             </div>
                             <div className="mt-1 bg-slate-800 px-2 py-0.5 rounded shadow text-[10px] font-bold text-slate-300 text-center border border-slate-700">Stop 2</div>
                          </div>
                          
                          <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold shadow-sm border border-slate-700 text-slate-300">
                             9 stops remaining
                          </div>
                       </div>
                    </div>

                    {/* Widget D: Route List */}
                    <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-6">
                       <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-white flex items-center gap-2">
                             <Clock className="w-4 h-4 text-orange-500" /> Schedule
                          </h3>
                          <span className="text-xs text-slate-500">3 stops shown</span>
                       </div>

                       <div className="space-y-3">
                          {/* Item 1 */}
                          <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group border border-slate-800 hover:border-slate-700">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-900/20 flex items-center justify-center text-green-500 border border-green-900/30">
                                   <CheckMark />
                                </div>
                                <div>
                                   <p className="font-bold text-slate-200 text-sm">Varsha Patel</p>
                                   <p className="text-xs text-slate-500">9:00 - 9:30 AM</p>
                                </div>
                             </div>
                             <span className="px-3 py-1 bg-green-900/20 text-green-400 text-xs font-bold rounded-full border border-green-900/30">Collected</span>
                          </div>

                          {/* Item 2 */}
                          <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group border border-slate-800 hover:border-slate-700">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                                    <span className="font-bold text-xs">AV</span>
                                </div>
                                <div>
                                   <p className="font-bold text-slate-200 text-sm">Ashish Verma</p>
                                   <p className="text-xs text-slate-500">10:30 - 11:00 AM</p>
                                </div>
                             </div>
                             <span className="px-3 py-1 bg-orange-900/20 text-orange-400 text-xs font-bold rounded-full border border-orange-900/30">Low Risk</span>
                          </div>

                          {/* Item 3 */}
                          <div className="flex items-center justify-between p-3 bg-slate-800 border border-red-900/30 shadow-sm rounded-xl hover:bg-slate-700 transition-all cursor-pointer relative overflow-hidden">
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                             <div className="flex items-center gap-3 pl-2">
                                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400">
                                    <span className="font-bold text-xs">JP</span>
                                </div>
                                <div>
                                   <p className="font-bold text-slate-100 text-sm">Jagdish Pillai</p>
                                   <p className="text-xs text-slate-400">11:00 - 11:30 AM</p>
                                </div>
                             </div>
                             <span className="px-3 py-1 bg-red-900/20 text-red-400 text-xs font-bold rounded-full border border-red-900/30">High Risk</span>
                          </div>
                       </div>
                    </div>

                </div>

                {/* --- RIGHT COLUMN (4 cols) --- */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    
                    {/* Widget B: Alert Card */}
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 shadow-sm relative overflow-hidden group cursor-pointer hover:bg-orange-500/20 transition-colors">
                       <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0 border border-orange-500/30">
                             <Package className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-xs font-bold text-orange-400 uppercase tracking-wide mb-1">Upcoming Pickup</p>
                             <h3 className="font-bold text-white text-sm">Swati Mehta</h3>
                             <p className="text-xs text-slate-400 mt-1">10:00 - 10:30 AM</p>
                          </div>
                       </div>
                       <div className="mt-3 flex items-center gap-2 text-xs font-bold text-red-400 bg-red-900/20 px-3 py-2 rounded-lg border border-red-900/30">
                          <AlertCircle className="w-4 h-4" />
                          High Risk: Antibiotics
                       </div>
                       <ChevronRight className="absolute top-4 right-4 w-4 h-4 text-orange-500/50" />
                    </div>

                    {/* Widget E: Earnings */}
                    <div className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800">
                       <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-orange-500" /> Earnings
                       </h3>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-orange-500 border border-slate-700">
                             <span className="font-bold text-lg">₹</span>
                          </div>
                          <div>
                             <p className="text-3xl font-bold text-white">1,120</p>
                             <p className="text-xs text-slate-500">Pickups this week</p>
                          </div>
                       </div>
                       <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                          <div className="bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                             <span className="text-sm font-bold text-slate-400 flex items-center gap-1">
                                <Package className="w-3 h-3 text-slate-600" /> 18 Pickups
                             </span>
                          </div>
                          <span className="text-xs font-bold text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-900/30">+12% vs last week</span>
                       </div>
                    </div>
                    
                    {/* Zone Status - Re-styled for Dark Mode */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden border border-slate-700">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Map className="w-32 h-32 text-white" />
                        </div>
                        <h3 className="font-bold text-lg relative z-10 flex items-center gap-2">
                            <Truck className="w-5 h-5 text-orange-500" /> Zone Status
                        </h3>
                        <p className="text-slate-400 text-xs mt-1 relative z-10 mb-4">North Mumbai Sector 4</p>
                        
                        <div className="space-y-3 relative z-10">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Traffic</span>
                                <span className="font-bold text-green-400">Light</span>
                            </div>
                            <div className="w-full bg-slate-950 rounded-full h-1.5 border border-slate-800">
                                <div className="bg-green-500 h-1.5 rounded-full w-[20%] shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                            </div>
                            
                            <div className="flex justify-between text-sm pt-2">
                                <span className="text-slate-400">Demand</span>
                                <span className="font-bold text-orange-400">High</span>
                            </div>
                            <div className="w-full bg-slate-950 rounded-full h-1.5 border border-slate-800">
                                <div className="bg-orange-500 h-1.5 rounded-full w-[85%] shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
         </div>
      </main>
    </div>
  );
};

// Helper Components
const NavItem = ({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) => (
  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${active ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
    <Icon className="w-5 h-5" />
    <span className="text-sm">{label}</span>
  </button>
);

const HeaderIcon = ({ icon: Icon }: { icon: any }) => (
  <button className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 hover:text-orange-500 hover:bg-slate-700 flex items-center justify-center transition-all shadow-sm border border-slate-700">
     <Icon className="w-5 h-5" />
  </button>
);

const CheckMark = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
