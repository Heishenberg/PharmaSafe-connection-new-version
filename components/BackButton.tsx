import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate(-1)} 
      className="flex items-center text-gray-600 hover:text-green-600 mb-4 transition-colors font-medium text-sm"
    >
      <ArrowLeft className="w-4 h-4 mr-1" /> Back
    </button>
  );
};