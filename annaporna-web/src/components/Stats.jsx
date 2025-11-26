import React from 'react';
import { 
  Activity, Users, Utensils, HeartHandshake, 
  Leaf, IndianRupee, MapPin, Clock 
} from 'lucide-react';
import { useSpring, animated } from '@react-spring/web'; 
import RevealOnScroll from './RevealOnScroll'; 
import ShinyText from './react-bits/ShinyText';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'; 
import { BorderTrail } from './motion-primitives/BorderTrail';
import bgImage from '../assets/bridging.png'; 


const Stats = () => {
  

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <img 
          src={bgImage} 
          alt="Bridging the Gap" 
          className="w-full h-full object-cover opacity-100" 
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-white/70 via-white/60 to-orange-50/50 -z-10 backdrop-blur-[1px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll animation="animate-fade-in-up" delay={100}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              <ShinyText 
                text="Bridging the Gap Between Surplus and Hunger" 
                disabled={false} 
                speed={4} 
                className="font-extrabold text-4xl md:text-5xl" 
              />
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-medium mt-4">
              In India, a massive amount of food is wasted daily while millions face food insecurity. 
              <span className="font-semibold text-brand-green"> Annapoorna Connect </span> 
              uses technology to solve this logistical gap, turning potential waste into nourishment.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {statsData.map((stat, index) => (
            <RevealOnScroll key={stat.id} animation="animate-fade-in-up" delay={index * 100 + 200}>
              <div 
                className="relative h-full overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-lg border border-gray-200 
                           transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} 
                                  transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    <stat.icon size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-brand-orange flex items-center">
                    {stat.prefix}
                    <AnimatedNumber n={stat.value} />
                    {stat.suffix}
                  </h3>
                </div>
                
                <p className="text-base font-semibold text-gray-800">{stat.label}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.desc}</p>
                
                <div className={`absolute bottom-0 left-0 h-1 w-full ${stat.bg.replace('bg-', 'bg-opacity-50 bg-')} 
                               transition-all duration-300 group-hover:h-2`} />
              </div>
            </RevealOnScroll>
          ))}
        </div>

    
        <RevealOnScroll animation="animate-fade-in-up" delay={400}>
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gray-200 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">The Real World Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                            <Leaf size={24} />
                        </div>
                        <h4 className="font-bold text-lg text-gray-900">Environmental</h4>
                        <p className="text-sm text-gray-600">
                            Reducing methane emissions from landfills by diverting biodegradable waste.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-brand-orange">
                            <Users size={24} />
                        </div>
                        <h4 className="font-bold text-lg text-gray-900">Social</h4>
                        <p className="text-sm text-gray-600">
                            Directly supporting orphanages, shelters, and old-age homes with nutrition.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
                            <IndianRupee size={24} />
                        </div>
                        <h4 className="font-bold text-lg text-gray-900">Economic</h4>
                        <p className="text-sm text-gray-600">
                            Saving costs for donors while providing free resources to NGOs.
                        </p>
                    </div>

                </div>
            </div>
        </RevealOnScroll>

      </div>
    </section>
  );
};

export default Stats;