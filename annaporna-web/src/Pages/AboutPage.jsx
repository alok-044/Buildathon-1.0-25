import { Link } from 'react-router-dom';
import { Leaf, HandHeart, Users, Globe, TrendingUp, } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import about from '../assets/about.png';

const AboutPage = () => {
  const { user } = useAuth();
  const isReceiver = user?.role === 'receiver';

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-100 via-white to-blue-200 py-16 px-4 sm:px-6 lg:px-8 page-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-brand-green mb-6 leading-tight animate-fade-in-down">
            Our Mission: Nourishing Communities, Ending Waste
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in delay-200">
            At Annapoorna, we believe that no good food should go to waste when there are those in need. We connect surplus food with hungry hearts.
          </p>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100 animate-slide-in-up">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <img
                src={about}
                alt="People sharing food"
                className="rounded-2xl shadow-lg object-cover w-full h-50 md:h-88"
              />
            </div>
            <div className="md:w-1/2 text-left">
              <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-4">
                <Leaf className="text-green-600" size={40} /> What We Do
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Annapoorna is a bridge. We empower individuals and businesses with surplus food to easily connect with those who need it most - shelters, NGOs, and food-insecure communities. Our platform simplifies the donation process, making it efficient and impactful.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From a single meal to bulk donations, we ensure that edible food doesn't end up in landfills, but instead reaches tables where it can make a difference.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mb-20 animate-fade-in delay-400">
          <h2 className="text-4xl font-bold text-gray-800 mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-red-200 p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-red-100 p-4 rounded-full mb-4 group-hover:bg-red-600 transition-colors">
                <HandHeart size={36} className="text-red-600 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Compassion</h3>
              <p className="text-gray-600">
                Driven by empathy, we strive to alleviate hunger and support those facing food insecurity.
              </p>
            </div>
            <div className="bg-green-200 p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-100 p-4 rounded-full mb-4 group-hover:bg-green-600 transition-colors">
                <Users size={36} className="text-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Community</h3>
              <p className="text-gray-600">
                We foster connections between donors, volunteers, and recipients, building stronger communities.
              </p>
            </div>
            <div className="bg-blue-200 p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-600 transition-colors">
                <Leaf size={36} className="text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                Reducing food waste is central to our mission, contributing to a healthier planet.
              </p>
            </div>
          </div>
        </div>
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Solving the Triple Crisis</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Food waste is not just a logistical problem—it's a complex challenge with three critical dimensions that our project actively addresses.
            </p>
          </div>

          <div className={`grid grid-cols-1 ${isReceiver ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8`}>
            
            <div className="bg-green-50 rounded-3xl p-8 border border-green-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-100 rounded-full opacity-50 blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                  <Globe size={32} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Environmental</h3>
                <h4 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-2">Methane Emissions</h4>
                <p className="text-gray-700 leading-relaxed">
                  When food rots in landfills, it produces methane—a greenhouse gas 25x more potent than CO2. By rescuing food, we directly prevent these harmful emissions and combat climate change.
                </p>
              </div>
            </div>
            <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-100 rounded-full opacity-50 blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                  <HandHeart size={32} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Social</h3>
                <h4 className="text-sm font-bold text-orange-700 uppercase tracking-wider mb-2">Zero Hunger</h4>
                <p className="text-gray-700 leading-relaxed">
                  In a world where millions go hungry, throwing away edible food is a tragedy. We redirect surplus meals to orphanages, shelters, and communities, turning waste into nutrition.
                </p>
              </div>
            </div>
            {!isReceiver && (
              <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                    <TrendingUp size={32} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Economic</h3>
                  <h4 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2">Waste Disposal</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Waste management is costly. By donating surplus, businesses significantly reduce their disposal fees and operational costs while gaining value through CSR and community goodwill.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
        <div className="text-center bg-green-50 text-gray-900 p-12 rounded-3xl shadow-sm border border-green-100 animate-scale-up-fade">
          <h2 className="text-4xl font-bold mb-4">Join the Annapoorna Movement</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600">
            Whether you're a donor, a recipient, or a volunteer, your participation helps us build a more food-secure world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {(!user || user.role === 'donor') && (
              <Link 
                to="/donate" 
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-500  hover:shadow-lg transition-all shadow-sm border border-gray-300 inline-flex items-center justify-center"
              >
                Donate Now
              </Link>
            )}
            {(!user || user.role !== 'donor') && (
              <Link 
                to="/feed" 
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-red-500  hover:shadow-lg transition-all shadow-sm border border-gray-300 inline-flex items-center justify-center"
              >
                Find Food
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;