import React from 'react';
import WasteInsights from '../components/WasteInsights';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DonorDashboard = () => {
  const { user } = useAuth();
  const isReceiver = user?.role === 'receiver';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 page-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
                {isReceiver ? 'Partners Waste Insights' : 'Donor Dashboard'}
            </h1>
            <p className="text-gray-600 mt-1">
                {isReceiver 
                    ? 'View aggregate waste reduction statistics.' 
                    : 'Track your waste reduction and donation efficiency.'}
            </p>
          </div>
          {!isReceiver && (
            <Link to="/donate" className="flex items-center gap-2 bg-brand-green  px-6 py-3 rounded-full font-bold hover:bg-green-400 transition-all shadow-lg active:scale-95">
                <PlusCircle size={20} />
                Post New Donation
            </Link>
          )}
        </div>
        <div className="mb-12">
          <WasteInsights />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center min-h-[200px]">
              <p className="text-gray-400 font-medium">More analytics coming soon...</p>
           </div>
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center min-h-[200px]">
              <p className="text-gray-400 font-medium">Donation History coming soon...</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default DonorDashboard;