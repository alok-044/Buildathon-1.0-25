// src/components/ImpactCharts.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { AlertTriangle, Leaf } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import imgWaste from '../assets/waste.jpeg';
import imgNeed from '../assets/food-need.png';
import imgSolution from '../assets/food-solution.png';

const ImpactCharts = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const wasteData = [
    { name: 'Food Produced', amount: 100, label: '100% Produced', color: '#60A5FA' },
    { name: 'Consumed', amount: 60, label: '60% Eaten', color: '#16A34A' },
    { name: 'Wasted', amount: 40, label: '40% Wasted!', color: '#EF4444' },
  ];
  const sourceData = [
    { name: 'Households', value: 61, color: '#10B981' },
    { name: 'Food Service', value: 26, color: '#3B82F6' },
    { name: 'Retail', value: 13, color: '#F59E0B' },
  ];

  return (
    <section 
      ref={ref} 
      className={`py-20 bg-gray-50 transition-all duration-1000 ease-out
                  ${isVisible ? 'page-fade-in' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            The Stark <span className="text-red-600">Reality</span> of Food Waste
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Globally, a third of all food produced goes to waste, while millions go hungry.
            Annapoorna Connect addresses this critical imbalance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <AlertTriangle className="text-red-500 w-6 h-6" />
              Food Production vs. Waste Cycle
            </h3>
            <div className="h-80 w-full" aria-label="Bar chart showing food production, consumption, and waste percentages.">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wasteData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis />
                  <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                  <Bar dataKey="amount" isAnimationActive={true} animationDuration={1200}>
                    {wasteData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center leading-relaxed">
              Nearly <span className="font-bold text-red-500">40% of food produced globally</span> is lost or wasted
              every year, highlighting a massive inefficiency in our food systems.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Leaf className="text-brand-green w-6 h-6" />
              Primary Sources of Food Waste
            </h3>
            <div className="h-80 w-full" aria-label="Pie chart showing where food waste primarily occurs by sector.">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={true}
                    animationDuration={1200}
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center leading-relaxed">
              The majority of food waste occurs at the <span className="font-bold text-green-600">household level</span> and within the <span className="font-bold text-blue-600">food service industry</span>.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="relative group overflow-hidden rounded-xl h-72 shadow-lg hover:shadow-2xl transition-all duration-300">
            <img 
              src={imgWaste}
             
              alt="Hands holding coins and a note that says 'Make a Change'" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent flex items-end p-6">
              <p className="text-white font-bold text-xl drop-shadow-lg">Millions of tons wasted</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-xl h-72 shadow-lg hover:shadow-2xl transition-all duration-300">
            <img 
              src={imgNeed}
              alt="Two young children sitting outdoors in front of a historic building" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent flex items-end p-6">
              <p className="text-white font-bold text-xl drop-shadow-lg">While millions go hungry</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-xl h-72 shadow-lg hover:shadow-2xl transition-all duration-300">
            <img 
              src={imgSolution}
              alt="A group of smiling children looking at the camera" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent flex items-end p-6">
              <p className="text-white font-bold text-xl drop-shadow-lg">We bridge this gap</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ImpactCharts;