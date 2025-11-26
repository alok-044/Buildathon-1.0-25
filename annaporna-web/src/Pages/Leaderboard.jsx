import React, { useState } from 'react';
import { Trophy, Medal, MapPin, ArrowUp } from 'lucide-react';
import ShinyText from '../components/react-bits/ShinyText';
import { useAuth } from '../contexts/AuthContext';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('hostels');
  const { user } = useAuth();
  const isReceiver = user?.role === 'receiver';
  const leagues = {
    hostels: [
      { rank: 1, name: "Alpha Boys Hostel", location: "Greater Noida", score: 1250, change: "+2" },
      { rank: 2, name: "Stanza Living", location: "Knowledge Park III", score: 980, change: "+1" },
      { rank: 3, name: "Gamma House", location: "Sector 62", score: 850, change: "-1" },
      { rank: 4, name: "Delta Residency", location: "Greater Noida", score: 620, change: "0" },
    ],
    restaurants: [
      { rank: 1, name: "Spice Garden", location: "Sector 18", score: 2100, change: "0" },
      { rank: 2, name: "The Yellow Chilli", location: "Greater Noida", score: 1800, change: "+3" },
      { rank: 3, name: "Pizza Haven", location: "Noida Ext", score: 1500, change: "-1" },
    ]
  };

  const currentData = leagues[activeTab];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 page-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            The <ShinyText text="Zero-Waste Trophy" className="text-yellow-500" />
          </h1>
          <p className="text-lg text-gray-600">
            {isReceiver 
              ? "Celebrate the top contributors making a difference in your community." 
              : "Compete with local communities to make the biggest impact."}
          </p>
        </div>
        <div className="flex justify-center gap-4 mb-8">
          {['hostels', 'restaurants'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold text-sm capitalize transition-all duration-300
                ${activeTab === tab 
                  ? 'bg-brand-green text-red-500 shadow-lg scale-105' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
            >
              {tab} League
            </button>
          ))}
        </div>
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-12 bg-gray-50 p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-6">Participant</div>
            <div className="col-span-4 text-right pr-4">Impact Score</div>
          </div>

          {currentData.map((item, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-12 items-center p-4 border-b border-gray-50 transition-colors hover:bg-green-50/30
                         ${index === 0 ? 'bg-yellow-50/50' : ''}`}
            >
              <div className="col-span-2 flex justify-center">
                {index === 0 ? (
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Trophy size={16} className="text-yellow-600" />
                  </div>
                ) : index === 1 ? (
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Medal size={16} className="text-gray-600" />
                  </div>
                ) : index === 2 ? (
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Medal size={16} className="text-orange-600" />
                  </div>
                ) : (
                  <span className="font-bold text-gray-400">#{item.rank}</span>
                )}
              </div>
              <div className="col-span-6">
                <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={12} />
                  {item.location}
                </div>
              </div>
              <div className="col-span-4 text-right pr-4">
                <span className="block font-bold text-2xl text-brand-green">{item.score}</span>
                <div className="flex items-center justify-end gap-1 text-xs text-green-600">
                  <ArrowUp size={10} />
                  {item.change} this week
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;