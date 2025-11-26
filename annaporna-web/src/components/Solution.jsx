import React from 'react'
import {  AlertCircle, DollarSign, Lightbulb } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const WasteInsights = () => {
  const wasteTrend = [
    { day: 'Mon', waste: 12, predicted: 10 },
    { day: 'Tue', waste: 15, predicted: 14 },
    { day: 'Wed', waste: 8, predicted: 8 },
    { day: 'Thu', waste: 25, predicted: 12 }, 
    { day: 'Fri', waste: 18, predicted: 16 },
    { day: 'Sat', waste: 30, predicted: 20 },
    { day: 'Sun', waste: 22, predicted: 18 },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Lightbulb className="text-yellow-500 fill-yellow-500" /> 
            AI Waste Forecast
          </h2>
          <p className="text-gray-500 mt-1">
            Based on your last 30 donations, here is how you can save money.
          </p>
        </div>
        <span className="px-4 py-1 bg-brand-green/10 text-brand-green text-xs font-bold uppercase rounded-full">
          Beta Feature
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        
        <div className="p-8 space-y-6 border-r border-gray-100 bg-gray-50/50">
          
          <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-transform">
            <div className="absolute right-0 top-0 w-16 h-16 bg-red-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-red-100"></div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 rounded-xl text-red-500">
                <AlertCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-700">Thursday Spike</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  You consistently donate <span className="font-bold text-gray-900">~13kg of Rice</span> on Thursdays.
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                   Action: Cook 15% Less
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-transform">
             <div className="absolute right-0 top-0 w-16 h-16 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-green-100"></div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <DollarSign size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-700">Potential Savings</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Reducing waste by 20% could save you approximately:
                </p>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">₹12,500<span className="text-xs font-normal text-gray-400">/mo</span></p>
              </div>
            </div>
          </div>

        </div>
        <div className="col-span-2 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Waste vs. Optimal Production</h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="text-gray-500">Actual Waste</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-green"></span>
                <span className="text-gray-500">Recommended</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wasteTrend}>
                <defs>
                  <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F87171" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F87171" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="waste" 
                  stroke="#F87171" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorWaste)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#16A34A" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  fillOpacity={1} 
                  fill="url(#colorPred)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WasteInsights;