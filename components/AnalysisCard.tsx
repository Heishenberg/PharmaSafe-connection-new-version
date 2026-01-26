import React from 'react';
import { MedicineAnalysis, RiskLevel } from '../types';
import { AlertTriangle, CheckCircle, Trash2, ShieldAlert } from 'lucide-react';

interface AnalysisCardProps {
  data: MedicineAnalysis;
  onSchedule: () => void;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ data, onSchedule }) => {
  const isHighRisk = data.riskLevel === RiskLevel.HIGH;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className={`p-4 ${isHighRisk ? 'bg-red-50 border-b border-red-100' : 'bg-green-50 border-b border-green-100'} flex items-center gap-3`}>
        {isHighRisk ? (
          <ShieldAlert className="w-6 h-6 text-red-600" />
        ) : (
          <CheckCircle className="w-6 h-6 text-green-600" />
        )}
        <div>
          <h3 className={`font-bold text-lg ${isHighRisk ? 'text-red-800' : 'text-green-800'}`}>
            {data.riskLevel}
          </h3>
          <p className={`text-xs ${isHighRisk ? 'text-red-600' : 'text-green-600'}`}>
            {isHighRisk ? 'Professional disposal required' : 'Safe for standard disposal protocols'}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medicine Name</label>
          <p className="text-lg font-medium text-slate-900">{data.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Composition</label>
            <p className="text-sm text-slate-700">{data.composition}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expiry</label>
            <p className="text-sm text-slate-700">{data.expiryDate}</p>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Why is this {data.riskLevel}?</label>
          <p className="text-sm text-slate-700 mt-1">{data.riskReason}</p>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <label className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Disposal Recommendation</label>
          <p className="text-sm text-blue-800 mt-1">{data.disposalRecommendation}</p>
        </div>

        <button
          onClick={onSchedule}
          className="w-full mt-4 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Schedule Pickup
        </button>
      </div>
    </div>
  );
};