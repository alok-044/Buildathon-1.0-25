import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { UtensilsCrossed, BellRing, Truck, Heart, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import RevealOnScroll from './RevealOnScroll';
import step1Img from '../assets/post.png';   
import step2Img from '../assets/notify.png';   
import step3Img from '../assets/pickup.png';     
import step4Img from '../assets/save.png';         

const Solution = () => {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 50%"],
  });

  const steps = [
    { 
      id: 1, 
      title: "Donors Post Food", 
      desc: "Restaurants, hotels, or individuals use our AI Smart Scan to list surplus food in seconds. Simply snap a photo, and our AI detects quantity and type.", 
      icon: UtensilsCrossed, 
      color: "bg-orange-100 text-orange-600",
      borderColor: "border-orange-200",
      image: step1Img,
      stat: "15 Sec",
      statLabel: "Average listing time"
    },
    { 
      id: 2, 
      title: "Instant Notification", 
      desc: "Nearby verified NGOs and volunteers receive a real-time alert on their mobile app. They can view details, distance, and claim the donation instantly.", 
      icon: BellRing, 
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-blue-200",
      image: step2Img,
      stat: "Real-time",
      statLabel: "Geo-fenced alerts"
    },
    { 
      id: 3, 
      title: "Swift Pickup", 
      desc: "A volunteer or NGO representative arrives at the donor's location to collect the food. We provide optimized routes to ensure the quickest pickup.", 
      icon: Truck, 
      color: "bg-green-100 text-green-600",
      borderColor: "border-green-200",
      image: step3Img,
      stat: "Optimized",
      statLabel: "Route navigation"
    },
    { 
      id: 4, 
      title: "Hunger Solved", 
      desc: "The rescued food is distributed to those in need—orphanages, shelters, or homeless communities—turning potential waste into a life-saving meal.", 
      icon: Heart, 
      color: "bg-red-100 text-red-600",
      borderColor: "border-red-200",
      image: step4Img,
      stat: "Zero",
      statLabel: "Food to landfill"
    }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <RevealOnScroll animation="animate-fade-in-up" delay={100}>
          <div className="text-center mb-24">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-6">
              How <span className="text-brand-green">Annapoorna</span> Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our technology creates a seamless bridge between abundance and need. 
              Here is the journey of a meal from surplus to sustenance.
            </p>
          </div>
        </RevealOnScroll>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-gray-100 -translate-x-1/2 hidden md:block rounded-full overflow-hidden">
            <motion.div 
              style={{ scaleY: scrollYProgress }}
              className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-brand-green via-brand-orange to-brand-green origin-top"
            />
          </div>
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-10">
                    <div className={`w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${step.color}`}>
                      <step.icon size={20} strokeWidth={3} />
                    </div>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`w-full md:w-1/2 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}
                  >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${step.color.replace('text-', 'bg-opacity-20 bg-')}`}>
                      Step 0{step.id}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">{step.desc}</p>
                    
                    <div className={`inline-flex flex-col p-3 rounded-xl border ${step.borderColor} bg-white shadow-sm ${isEven ? 'items-end' : 'items-start'}`}>
                       <span className={`font-bold text-xl ${step.color.split(' ')[1]}`}>{step.stat}</span>
                       <span className="text-xs text-gray-500 uppercase tracking-wide">{step.statLabel}</span>
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl group aspect-4/3 border border-gray-100">
                      <div className={`absolute inset-0 bg-linear-to-br ${step.color.replace('text-', 'from-').replace('100', '500/10')} to-transparent z-10 transition-opacity group-hover:opacity-75`}></div>
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 p-3 rounded-full bg-white shadow-md md:hidden z-20">
                        <step.icon size={20} className={step.color.split(' ')[1]} />
                      </div>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
        {!isAuthenticated && (
          <RevealOnScroll animation="animate-fade-in-up" delay={200}>
            <div className="mt-32 text-center bg-white rounded-3xl p-12 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-brand-green via-brand-orange to-brand-green"></div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Whether you have food to give or hands to help, your contribution matters. 
                Join thousands of others in the movement towards zero hunger.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl bg-brand-green hover:bg-green-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Join as a Donor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a href="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-brand-green bg-green-50 hover:bg-green-100 border border-green-200 transition-all transform hover:-translate-y-1">
                  Volunteer with Us
                </a>
              </div>
            </div>
          </RevealOnScroll>
        )}

      </div>
    </section>
  );
};

export default Solution;