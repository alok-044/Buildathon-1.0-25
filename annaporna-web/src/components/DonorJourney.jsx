import React from 'react';
import { WobbleCard } from './aceternity/WobbleCard';
import { FileText, Award, Gift } from 'lucide-react';

      

const DonorJourney = () => {

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Donate with Annapoorna?</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
                
                <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-brand-green min-h-[300px]">
                    <div className="max-w-xs">
                        <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            Tax Benefits & CSR
                        </h2>
                        <p className="mt-4 text-left text-base/6 text-neutral-200">
                            Get 80G tax exemption certificates for every kilo of food donated. 
                            Perfect for meeting Corporate Social Responsibility (CSR) goals.
                        </p>
                    </div>
                    <FileText className="absolute -right-4 lg:-right-[10%] -bottom-10 object-contain rounded-2xl text-white/10" size={300} />
                </WobbleCard>
                <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-brand-orange">
                    <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Community Badge
                    </h2>
                    <p className="mt-4 max-w-104 text-left text-base/6 text-neutral-200">
                        Earn the "Zero Waste Partner" badge. Display it on your restaurant door or website to show customers you care.
                    </p>
                    <Award className="absolute -right-4 -bottom-10 object-contain rounded-2xl text-white/10" size={200} />
                </WobbleCard>
                <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[300px]">
                    <div className="max-w-2xl">
                        <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            Save Disposal Costs
                        </h2>
                        <p className="mt-4 text-left text-base/6 text-neutral-200">
                            Waste management services charge by weight. By donating surplus food, you significantly reduce your garbage disposal fees while feeding the hungry. It's a win-win for your wallet and the world.
                        </p>
                    </div>
                    <Gift className="absolute -right-4 -bottom-10 object-contain rounded-2xl text-white/10" size={300} />
                </WobbleCard>
            </div>
        </div>

      </div>
    </section>
  );
};

export default DonorJourney;