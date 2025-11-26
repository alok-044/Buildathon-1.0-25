import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Utensils, Zap, ArrowRight, Star } from 'lucide-react';
import ShinyText from './react-bits/ShinyText';
import SpotlightCard from './react-bits/SpotlightCard';
import ThreeDCarousel from './ThreeDCarousel';
import { BorderTrail } from './motion-primitives/BorderTrail';
import heroBgImage from '../assets/hero.png'; 
import img1 from '../assets/food-solution.png';
import img2 from '../assets/bridging.png';
import img3 from '../assets/food-waste.png';
import img4 from '../assets/about.png';
import img5 from '../assets/hero.png';

const Hero = () => {
    return (
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-20">
            <img src={heroBgImage} alt="Background" className="w-full h-full object-cover opacity-100" />
          </div>
          <div className="absolute inset-0 bg-linear-to-br from-green-50/90 via-white/80 to-orange-50/85 -z-10 backdrop-blur-[2px]"></div>
    
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 ref={headingRef} className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight drop-shadow-sm opacity-0">
                    Share Food, <br />
                    <ShinyText text="Save Lives" disabled={false} speed={3} className="text-brand-green" />
                  </h1>
                  <p ref={textRef} className="text-xl font-bold text-gray-800 leading-relaxed opacity-0"> 
                    Connect surplus food from restaurants and homes with communities in need. 
                    Together, we reduce food waste and fight hunger.
                  </p>
                </div>
    
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0">
                  {showDonate && (
                    <Link to="/donate" className="px-8 py-4 bg-linear-to-r from-red-200 to-orange-600 text-white rounded-lg font-bold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-500 transition-all text-center transform hover:scale-110 active:scale-95 duration-300">
                      Start Donating Food
                    </Link>
                  )}
                  {showFindFood && (
                    <Link to="/feed" className="px-8 py-4 bg-linear-to-r from-green-200 to-green-600 border-brand-green text-brand-green rounded-lg font-bold hover:from-green-600 hover:to-green-500 transition-all text-center transform hover:scale-110 active:scale-95 duration-300 shadow-sm">
                      Find Food Near You
                    </Link>
                  )}
                </div>
    
                <div ref={statsRef} className="grid grid-cols-3 gap-6 pt-8 opacity-0">
                  <BorderTrail className="h-full rounded-xl bg-white/50 backdrop-blur-sm">
                    <SpotlightCard className="p-4 text-center h-full border-none shadow-none bg-transparent" spotlightColor="rgba(22, 163, 74, 0.2)">
                      <div className="text-3xl font-bold text-brand-green">1000+</div>
                      <p className="text-sm text-gray-700 font-semibold">Meals Shared</p>
                    </SpotlightCard>
                  </BorderTrail>
                  
                  <BorderTrail className="h-full rounded-xl bg-white/50 backdrop-blur-sm" transition={{ duration: 7, repeat: Infinity, ease: "linear" }}>
                    <SpotlightCard className="p-4 text-center h-full border-none shadow-none bg-transparent" spotlightColor="rgba(22, 163, 74, 0.2)">
                      <div className="text-3xl font-bold text-brand-green">500+</div>
                      <p className="text-sm text-gray-700 font-semibold">Active Members</p>
                    </SpotlightCard>
                  </BorderTrail>
    
                  <BorderTrail className="h-full rounded-xl bg-white/50 backdrop-blur-sm" transition={{ duration: 9, repeat: Infinity, ease: "linear" }}>
                    <SpotlightCard className="p-4 text-center h-full border-none shadow-none bg-transparent" spotlightColor="rgba(22, 163, 74, 0.2)">
                      <div className="text-3xl font-bold text-brand-green">50+</div>
                      <p className="text-sm text-gray-700 font-semibold">Cities</p>
                    </SpotlightCard>
                  </BorderTrail>
                </div>
              </div>
    
              
              <div ref={cardRef} className="hidden lg:flex justify-center items-center opacity-0">
                 <div className="bg-blue-200 backdrop-blur-xl p-8 rounded-3xl border border-blue-100 shadow-2xl max-w-md w-full relative overflow-hidden group hover:shadow-green-200/50 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl -ml-16 -mb-16"></div>
    
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Annapoorna</h3>
                                <p className="text-xs font-bold text-brand-green tracking-wider uppercase">Zero Hunger Initiative</p>
                            </div>
                            <div className="bg-white p-2 rounded-full shadow-sm">
                                 <Star className="text-yellow-400 fill-yellow-400" size={20} />
                            </div>
                        </div>
    
                        <p className="text-gray-700 mb-6 text-sm font-bold leading-relaxed">
                            Our platform empowers you to turn surplus food into smiles. 
                            Join our community of donors and volunteers making a real difference every day.
                        </p>
                        
                        <div className="mb-6">
                            <ThreeDCarousel images={carouselImages} />
                        </div>
    
                        <Link to="/about" className="mt-10 flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-blue-400 rounded-xl transition-colors group/btn">
                            <span className="font-bold text-gray-900">Explore Our Mission</span>
                            <div className="bg-white p-2 rounded-full shadow-sm group-hover/btn:translate-x-1 transition-transform">
                                <ArrowRight size={16} className="text-brand-green" />
                            </div>
                        </Link>
                    </div>
                 </div>
              </div>
    
            </div>
          </div>
    
          
          <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div ref={addToRefs} className="h-full">
                <SpotlightCard className="p-6 h-full group" spotlightColor="rgba(22, 163, 74, 0.2)">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-6">
                    <Zap className="w-6 h-6 text-brand-green" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Quick & Easy</h3>
                  <p className="text-gray-600 text-sm">Post food in seconds with our AI-powered SmartScan feature.</p>
                </SpotlightCard>
              </div>
              <div ref={addToRefs} className="h-full">
                <SpotlightCard className="p-6 h-full group" spotlightColor="rgba(234, 88, 12, 0.2)">
                  <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-6">
                    <Heart className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Make an Impact</h3>
                  <p className="text-gray-600 text-sm">Help those in need by sharing excess food from your kitchen.</p>
                </SpotlightCard>
              </div>
              <div ref={addToRefs} className="h-full">
                <SpotlightCard className="p-6 h-full group" spotlightColor="rgba(22, 163, 74, 0.2)">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-6">
                    <Users className="w-6 h-6 text-brand-green" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Community</h3>
                  <p className="text-gray-600 text-sm">Join a global community of food donors and receivers.</p>
                </SpotlightCard>
              </div>
              <div ref={addToRefs} className="h-full">
                <SpotlightCard className="p-6 h-full group" spotlightColor="rgba(234, 88, 12, 0.2)">
                  <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-6">
                    <Utensils className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Fresh Meals</h3>
                  <p className="text-gray-600 text-sm">Access fresh, home-cooked meals from verified donors.</p>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </section>
      );
    }
    
    export default Hero;