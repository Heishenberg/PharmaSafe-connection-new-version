
import React, { useState } from 'react';
import { Home, Bookmark, Bell, Grid, User } from 'lucide-react';
import { CreatePostWidget } from '../../components/community/CreatePostWidget';
import { PostCard } from '../../components/community/PostCard';
import { CommunitySidebar } from '../../components/community/CommunitySidebar';
import { COMMUNITY_POSTS } from '../../data/communityData';

export const CommunityPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const navItems = [
    { label: 'Feed', icon: Home, id: 'All' },
    { label: 'My Posts', icon: User, id: 'My' },
    { label: 'Saved', icon: Bookmark, id: 'Saved' },
    { label: 'Announcements', icon: Bell, id: 'Announce' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Navigation (Hidden on mobile, sticky on desktop) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveFilter(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm ${
                    activeFilter === item.id 
                      ? 'bg-white text-teal-700 shadow-sm border border-slate-100 translate-x-2' 
                      : 'text-slate-500 hover:bg-white hover:text-slate-700'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${activeFilter === item.id ? 'stroke-[2.5px]' : ''}`} />
                  {item.label}
                </button>
              ))}
              
              <div className="pt-6 mt-6 border-t border-slate-200 px-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Your Groups</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600 hover:text-teal-600 cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-lg">💊</div>
                    <span className="text-sm font-medium">Pharma Safety</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 hover:text-teal-600 cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-lg">🌊</div>
                    <span className="text-sm font-medium">Clean Water</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Feed (Wide) */}
          <div className="col-span-1 lg:col-span-6">
            
            {/* Mobile Filter Tabs */}
            <div className="lg:hidden flex overflow-x-auto pb-4 gap-2 scrollbar-hide mb-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveFilter(item.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                    activeFilter === item.id
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white text-slate-500 border-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <CreatePostWidget />

            <div className="space-y-6">
              {COMMUNITY_POSTS.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium">
                <Grid className="w-4 h-4" />
                You're all caught up!
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (Hidden on small/medium tablets, visible on large) */}
          <div className="hidden lg:block lg:col-span-3">
            <CommunitySidebar />
          </div>

        </div>
      </div>
    </div>
  );
};
