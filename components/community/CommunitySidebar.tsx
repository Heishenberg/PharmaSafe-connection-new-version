
import React from 'react';
import { TrendingUp, Award, ChevronRight } from 'lucide-react';
import { TRENDING_TOPICS, TOP_CONTRIBUTORS } from '../../data/communityData';

export const CommunitySidebar: React.FC = () => {
  return (
    <div className="sticky top-24 space-y-6">
      
      {/* Trending Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-teal-600" /> Trending Now
        </h3>
        <div className="space-y-3">
          {TRENDING_TOPICS.map((tag, idx) => (
            <div key={idx} className="flex justify-between items-center group cursor-pointer">
              <span className="text-sm font-medium text-slate-600 group-hover:text-teal-600 transition-colors">
                {tag}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
          <Award className="w-4 h-4 text-orange-500" /> Community Champions
        </h3>
        <div className="space-y-4">
          {TOP_CONTRIBUTORS.map((user, idx) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-slate-100" />
                <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-sm bg-white border border-slate-100">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.role}</p>
              </div>
              <div className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">
                {user.points} pts
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 border-t border-slate-50 transition-colors">
          View Full Leaderboard
        </button>
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400 px-2">
        <a href="#" className="hover:underline">Guidelines</a>
        <a href="#" className="hover:underline">Safety</a>
        <a href="#" className="hover:underline">Privacy</a>
        <span>© 2024 Planet Prescription</span>
      </div>

    </div>
  );
};
