
import React, { useState } from 'react';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, Navigation } from 'lucide-react';

interface AgentLiveMapProps {
  isExpanded?: boolean;
}

export const AgentLiveMap: React.FC<AgentLiveMapProps> = ({ isExpanded = false }) => {
  const [expanded, setExpanded] = useState(isExpanded);

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 transition-all duration-300 ${expanded ? 'h-[500px]' : 'h-64'}`}>
      
      {/* Map Background (Placeholder) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ 
            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png)',
            filter: 'invert(1) hue-rotate(180deg) saturate(0.5) contrast(1.2)' 
        }} 
      >
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/72.8777,19.0760,12,0/800x400?access_token=Pk.eyJ1IjoiZGVtbyIsImEiOiJjamJ4d2NsM3QwZ3QwMzN0ZTVpb2c1bW1mIn0.SC4sF7lQ8L2z7A6t85w7_g')] bg-cover bg-center mix-blend-overlay"></div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-10 h-10 bg-slate-900/90 backdrop-blur rounded-lg flex items-center justify-center text-slate-300 hover:text-white shadow-lg border border-slate-700"
        >
          {expanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
        <div className="flex flex-col rounded-lg overflow-hidden border border-slate-700 shadow-lg">
            <button className="w-10 h-10 bg-slate-900/90 backdrop-blur flex items-center justify-center text-slate-300 hover:bg-slate-800">
                <ZoomIn className="w-5 h-5" />
            </button>
            <div className="h-[1px] bg-slate-700 w-full"></div>
            <button className="w-10 h-10 bg-slate-900/90 backdrop-blur flex items-center justify-center text-slate-300 hover:bg-slate-800">
                <ZoomOut className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Overlay Information */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 pt-12">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-900/50 animate-bounce">
                    <Navigation className="w-5 h-5 fill-current" />
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Next Stop</p>
                    <p className="text-white font-bold text-lg leading-none">Varsha Patel</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-2xl font-bold text-white">2.1 <span className="text-sm text-slate-400 font-normal">km</span></p>
                <p className="text-xs text-green-400 font-medium">5 mins away</p>
            </div>
        </div>
      </div>
    </div>
  );
};
