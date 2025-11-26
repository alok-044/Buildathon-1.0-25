import { BarChart2, Award, CheckCircle, Leaf, TrendingUp, Users, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import ReputationWidget from '../components/ReputationWidget';
import { useAuth } from '../contexts/AuthContext';
import { BentoGrid, BentoGridItem } from '../components/aceternity/BentoGrid';
import { HoverEffect } from '../components/aceternity/CardHoverEffect';
const impactStats = {
  totalMeals: 850,
  totalDonations: 42,
  wasteDiverted: 210,
  ngoPartners: 12,
};

const monthlyData = [
  { name: 'Aug', meals: 60 },
  { name: 'Sep', meals: 110 },
  { name: 'Oct', meals: 300 },
  { name: 'Nov', meals: 380 },
];

const recentDonations = [
  { id: 1, title: "Paneer Curry", qty: "10kg", ngo: "Helping Hands", time: "2h ago" },
  { id: 2, title: "Assorted Breads", qty: "50 pcs", ngo: "City Shelter", time: "5h ago" },
  { id: 3, title: "Mixed Veg", qty: "8kg", ngo: "Helping Hands", time: "1d ago" },
  { id: 4, title: "Rice & Dal", qty: "15kg", ngo: "Udayan Care", time: "2d ago" },
];
const ImpactDashboard = () => {
  const { user } = useAuth();
  const isReceiver = user?.role === 'receiver';

  const bentoItems = [
    {
      title: isReceiver ? "Monthly Claims" : "Monthly Impact",
      description: "Meals served over time",
      header: (
        <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-green-50 to-emerald-50 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="meals" fill="#16A34A" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ),
      icon: <BarChart2 className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-2",
    },
    {
      title: isReceiver ? "Meals Received" : "Total Meals Served",
      description: "Lifetime impact count",
      header: (
        <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-orange-50 flex-col items-center justify-center">
           <span className="text-5xl font-extrabold text-brand-orange">{impactStats.totalMeals}</span>
           <span className="text-sm text-orange-600 font-medium mt-2">Meals</span>
        </div>
      ),
      icon: <Activity className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: isReceiver ? "Active Donors" : "Waste Diverted",
      description: isReceiver ? "Partners supporting you" : "Kg of food saved from landfill",
      header: (
        <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-green-50 flex-col items-center justify-center">
           <span className="text-5xl font-extrabold text-brand-green">
             {isReceiver ? impactStats.ngoPartners : impactStats.wasteDiverted}
           </span>
           <span className="text-sm text-green-700 font-medium mt-2">{isReceiver ? "Donors" : "Kg Saved"}</span>
        </div>
      ),
      icon: <Leaf className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Recent Activity",
      description: "Latest transactions",
      header: (
        <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-white border border-gray-100 overflow-hidden flex-col">
           <div className="overflow-y-auto p-2 space-y-2 custom-scrollbar">
             {recentDonations.map(item => (
               <div key={item.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition text-sm">
                 <div>
                   <p className="font-semibold text-gray-800">{item.title}</p>
                   <p className="text-xs text-gray-500">{item.qty} • {item.ngo}</p>
                 </div>
                 <span className="text-xs text-gray-400">{item.time}</span>
               </div>
             ))}
           </div>
        </div>
      ),
      icon: <TrendingUp className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Community Score",
      description: "Your platform reputation",
      header: (
        <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-blue-50 flex-col items-center justify-center">
           <div className="flex items-center gap-1">
             {[1,2,3,4,5].map(s => <span key={s} className="text-2xl">⭐</span>)}
           </div>
           <span className="text-sm text-blue-600 font-medium mt-2">Top Rated Partner</span>
        </div>
      ),
      icon: <Users className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
  ];
  const certificates = [
    {
      title: "Bronze Impact",
      description: "Unlock at 100kg waste diverted. Basic recognition for your initial contribution.",
      icon: Award,
      locked: impactStats.wasteDiverted < 100,
      footer: (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
           <div className="bg-brand-orange h-2 rounded-full" style={{width: '100%'}}></div>
        </div>
      ),
      onClick: () => alert("Downloading Bronze Certificate...")
    },
    {
      title: "Silver Tax Credit",
      description: "Unlock at 200kg. Eligible for 80G tax benefits and CSR reporting.",
      icon: Award,
      locked: impactStats.wasteDiverted < 200,
      footer: (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
           <div className="bg-gray-400 h-2 rounded-full" style={{width: '100%'}}></div>
        </div>
      ),
      onClick: () => impactStats.wasteDiverted >= 200 && alert("Downloading Tax Credit Report...")
    },
    {
      title: "Gold Sustainability",
      description: "Unlock at 500kg. Premier partner status with featured branding.",
      icon: Award,
      locked: impactStats.wasteDiverted < 500,
      footer: (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
           <div className="bg-yellow-400 h-2 rounded-full" style={{width: `${(impactStats.wasteDiverted/500)*100}%`}}></div>
        </div>
      ),
      onClick: () => {}
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12 page-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Impact <span className="text-brand-green">Dashboard</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            {isReceiver ? "Track your received aid and community impact." : "Visualize your contribution to a hunger-free world."}
          </p>
        </div>
        <BentoGrid className="mb-16">
          {bentoItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
        {!isReceiver && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-brand-green" /> Verified Certificates
            </h2>
            <p className="text-gray-500 mb-4">Download your verified impact reports and carbon credit certificates.</p>
            <HoverEffect items={certificates} />
          </div>
        )}
        {!isReceiver && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
             <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Impact</h2>
             <ReputationWidget name="Spice Garden" mealsSaved={impactStats.totalMeals} />
          </div>
        )}

      </div>
    </div>
  );
};

export default ImpactDashboard;