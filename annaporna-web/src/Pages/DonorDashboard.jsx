import React, { useState, useEffect } from 'react';
import WasteInsights from '../components/WasteInsights';
import ListingCard from '../components/ListingCard'; // Import ListingCard
import { Link } from 'react-router-dom';
import { PlusCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const DonorDashboard = () => {
  const { user } = useAuth();
  const isReceiver = user?.role === 'receiver';
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isReceiver) {
      fetchMyDonations();
    }
  }, [isReceiver]);

  const fetchMyDonations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/listings/donor`);
      setMyListings(response.data);
    } catch (err) {
      console.error("Failed to fetch donor listings:", err);
    } finally {
      setLoading(false);
    }
  };

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
                    : 'Track your active donations and waste reduction.'}
            </p>
          </div>
          {!isReceiver && (
            <Link to="/donate" className="flex items-center gap-2 bg-brand-green text-gray-500 px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-all shadow-lg active:scale-95">
                <PlusCircle size={20} />
                Post New Donation
            </Link>
          )}
        </div>

        <div className="mb-12">
          <WasteInsights />
        </div>

        {!isReceiver && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Active Donations</h2>
            
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-brand-green" size={32} />
              </div>
            ) : myListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.map(item => (
                  <ListingCard 
                    key={item._id}
                    title={item.title}
                    quantity={item.quantity}
                    distance={item.location?.address || "My Location"}
                    time={item.expiry}
                    donor={user.name} // Your name
                    phone={user.phone}
                    image={item.image}
                    type={item.type}
                  />
                ))}
              </div>
            ) : (
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[200px] text-center">
                  <p className="text-gray-500 font-medium mb-4">You haven't posted any donations yet.</p>
                  <Link to="/donate" className="text-brand-green font-bold hover:underline">Create your first donation</Link>
               </div>
            )}
          </div>
        )}

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