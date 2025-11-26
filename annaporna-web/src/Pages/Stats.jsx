import { Activity, Users, Utensils, HeartHandshake, Leaf, IndianRupee, MapPin, Clock } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web'; 
import RevealOnScroll from './RevealOnScroll'; 
import ShinyText from './react-bits/ShinyText';
import AnimatedBorderCard from './react-bits/AnimatedBorderCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'; 

import bgImage from '../assets/bridging.png'; 

const AnimatedNumber = ({ n }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const targetValue = parseFloat(n.replace(/,/g, ''));

  const { number } = useSpring({
    from: { number: 0 },
    number: isVisible ? targetValue : 0,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <animated.span ref={ref}>
      {number.to(val => Math.floor(val).toLocaleString())}
    </animated.span>
  );
};

const Stats = () => {
  const statsData = [
    { id: 1, label: "Meals Served", value: "15,000", prefix: "", suffix: "+", icon: Utensils, color: "text-orange-600", bg: "bg-orange-100", desc: "Fresh meals delivered to the needy" },
    { id: 2, label: "Food Saved", value: "4,500", prefix: "", suffix: " kg", icon: Activity, color: "text-green-600", bg: "bg-green-100", desc: "Perfectly edible surplus rescued" },
    { id: 3, label: "Partner NGOs", value: "45", prefix: "", suffix: "+", icon: Users, color: "text-blue-600", bg: "bg-blue-100", desc: "Verified organizations in our network" },
    { id: 4, label: "Active Donors", value: "120", prefix: "", suffix: "+", icon: HeartHandshake, color: "text-purple-600", bg: "bg-purple-100", desc: "Restaurants & caterers contributing" },
    { id: 5, label: "CO2 Prevented", value: "8,200", prefix: "", suffix: " kg", icon: Leaf, color: "text-emerald-600", bg: "bg-emerald-100", desc: "Greenhouse emissions stopped" },
    { id: 6, label: "Value Recovered", value: "12.5", prefix: "₹", suffix: " L", icon: IndianRupee, color: "text-yellow-600", bg: "bg-yellow-100", desc: "Worth of food saved from bins" },
    { id: 7, label: "Cities Covered", value: "12", prefix: "", suffix: "", icon: MapPin, color: "text-red-600", bg: "bg-red-100", desc: "Operating across major hubs" },
    { id: 8, label: "Volunteer Hours", value: "3,400", prefix: "", suffix: "+", icon: Clock, color: "text-indigo-600", bg: "bg-indigo-100", desc: "Time dedicated by our heroes" }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <img src={bgImage} alt="Bridging the Gap" className="w-full h-full object-cover opacity-100" />
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-white/70 via-white/60 to-orange-50/50 -z-10 backdrop-blur-[1px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <RevealOnScroll animation="animate-fade-in-up" delay={100}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              <ShinyText text="Bridging the Gap Between Surplus and Hunger" disabled={false} speed={4} className="font-extrabold text-4xl md:text-5xl" />
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
              <div className="relative h-full overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] group">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
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
                <div className={`absolute bottom-0 left-0 h-1 w-full ${stat.bg.replace('bg-', 'bg-opacity-50 bg-')} transition-all duration-300 group-hover:h-2`} />
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll animation="animate-fade-in-up" delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatedBorderCard>
                    <div className="space-y-3 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                            <Leaf size={24} />
                        </div>
                        <h4 className="font-bold text-lg text-gray-900">Environmental</h4>
                        <p className="text-sm text-gray-600">Reducing methane emissions from landfills by diverting biodegradable waste.</p>
                    </div>
                </AnimatedBorderCard>

                <AnimatedBorderCard>
                    <div className="space-y-3 text-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-brand-orange">
                            <Users size={24} />
                        </div>
                        <h4 className="font-bold text-lg text-gray-900">Social</h4>
                        <p className="text-sm text-gray-600">Directly supporting orphanages, shelters, and old-age homes with nutrition.</p>
                    </div>
                </AnimatedBorderCard>

                <AnimatedBorderCard>
                    <div className="space-y-3 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
                            <IndianRupee size={24} />
                        </div>
                        <h4 className="font-bold text-lg text-gray-900">Economic</h4>
                        <p className="text-sm text-gray-600">Saving costs for donors while providing free resources to NGOs.</p>
                    </div>
                </AnimatedBorderCard>
            </div>
        </RevealOnScroll>

      </div>
    </section>
  );
};

export default Stats;