import { Award, ShieldCheck, Star, Activity, Utensils, Leaf, Zap } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../components/aceternity/BentoGrid';
import { HoverEffect } from '../components/aceternity/CardHoverEffect';
import RevealOnScroll from '../components/RevealOnScroll';

const donorStats = {
  totalDonations: 42,
  mealsServed: 850,
  kgWasteDiverted: 210,
};
const achievementsList = [
  {
    title: "First Donation",
    description: "You made your first contribution! The journey of a thousand miles begins with a single step.",
    icon: Utensils,
    earned: true,
  },
  {
    title: "Community Star",
    description: "You have made 10 donations. You are a shining example for others.",
    icon: Star,
    earned: true,
  },
  {
    title: "Annapoorna Hero",
    description: "Donate 500+ meals. You have fed a village!",
    icon: Award,
    earned: true,
  },
  {
    title: "Waste Warrior",
    description: "Divert 100kg of food waste from landfills. The planet thanks you.",
    icon: ShieldCheck,
    earned: true,
  },
  {
    title: "Consistent Contributor",
    description: "Donate 5 weeks in a row. Consistency is key to change.",
    icon: Activity,
    earned: false,
  },
  {
    title: "Platform Champion",
    description: "Donate 1000+ meals. The ultimate rank of generosity.",
    icon: Zap,
    earned: false,
  },
];

const Achievements = () => {
  const statsItems = [
    {
      title: "Total Donations",
      description: "Contributions made",
      header: (
        <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-orange-50 flex-col items-center justify-center">
           <span className="text-5xl font-extrabold text-brand-orange">{donorStats.totalDonations}</span>
        </div>
      ),
      icon: <Activity className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Meals Served",
      description: "Lives impacted",
      header: (
        <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-green-50 flex-col items-center justify-center">
           <span className="text-5xl font-extrabold text-brand-green">{donorStats.mealsServed}</span>
        </div>
      ),
      icon: <Utensils className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Waste Diverted",
      description: "Kg of CO2 prevented",
      header: (
        <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-blue-50 flex-col items-center justify-center">
           <span className="text-5xl font-extrabold text-blue-600">{donorStats.kgWasteDiverted}</span>
        </div>
      ),
      icon: <Leaf className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
  ];
  const formattedAchievements = achievementsList.map((badge) => ({
    title: badge.title,
    description: badge.description,
    icon: badge.icon,
    locked: !badge.earned,
    footer: (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase
                      ${badge.earned 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
        {badge.earned ? 'Unlocked' : 'Locked'}
      </div>
    ),
    onClick: () => {}
  }));

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 page-fade-in">
      <div className="max-w-7xl mx-auto">
        
        <RevealOnScroll animation="animate-fade-in-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-block p-3 rounded-full bg-yellow-100 mb-4">
                <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Your <span className="text-brand-green">Impact & Rewards</span></h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track your journey from a beginner donor to a Zero Waste Hero. Every meal shared unlocks a new level of impact.
            </p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll animation="animate-fade-in-up" delay={200}>
          <h2 className="text-xl font-bold text-gray-800 mb-6 ml-2">Overview</h2>
          <BentoGrid className="mb-16">
            {statsItems.map((item, i) => (
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
        </RevealOnScroll>
        <RevealOnScroll animation="animate-fade-in-up" delay={300}>
          <h2 className="text-xl font-bold text-gray-800 mb-2 ml-2">Badges Collection</h2>
          <HoverEffect items={formattedAchievements} />
        </RevealOnScroll>

      </div>
    </div>
  );
};

export default Achievements;