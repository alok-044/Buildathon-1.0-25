import Hero from '../components/Hero'; 
import Stats from '../components/Stats'; 
import Solution from '../components/Solution'; 
import DonorJourney from '../components/DonorJourney'; // Import the new component
import ImpactCharts from '../components/ImpactCharts'; 
import RevealOnScroll from '../components/RevealOnScroll'; 
import InfiniteMarquee from '../components/react-bits/InfiniteMarquee';

const HomePage = () => {
  const partners = [
    "Feeding India", "Zomato", "Swiggy", "Uber Eats", "Rotary Club", 
    "Robin Hood Army", "Save The Children", "UNICEF", "Red Cross"
  ];

  return (
    <div className="overflow-x-hidden bg-white">
      <RevealOnScroll animation="animate-zoom-in" delay={0} threshold={0}>
        <Hero />
      </RevealOnScroll>
      <div className="py-10 bg-white border-b border-gray-100">
        <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted by Organizations Worldwide</p>
        <InfiniteMarquee items={partners} />
      </div>

      <RevealOnScroll animation="animate-fade-in-up" delay={200}>
        <Stats />
      </RevealOnScroll>
      <RevealOnScroll animation="animate-fade-in-up" delay={200}>
        <Solution />
      </RevealOnScroll>
      <RevealOnScroll animation="animate-fade-in-up" delay={200}>
        <DonorJourney />
      </RevealOnScroll>

      <RevealOnScroll animation="animate-fade-in-up" delay={200}>
        <ImpactCharts />
      </RevealOnScroll>
    </div>
  );
};

export default HomePage;