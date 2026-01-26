import React from 'react';
import { BackButton } from '../components/BackButton';

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <BackButton />
      
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Dashboard (Safe Mode)</h1>
        <p className="text-slate-500 max-w-md mx-auto">
          The dashboard has been temporarily reset to a static version to resolve the display crash. 
          Your data is safe, but dynamic features are currently disabled.
        </p>
      </div>
    </div>
  );
}