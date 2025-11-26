import React, { useState } from 'react';
import { Copy, Check, Award, Share2, Linkedin, Twitter, Layout, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ReputationWidget = ({ name = "Spice Garden", mealsSaved = 850 }) => {
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState('gradient'); 
  const { user } = useAuth();

  const embedCode = `<div 
  data-annapoorna-user="${name}" 
  data-meals="${mealsSaved}" 
  data-theme="${theme}">
</div>
<script src="https://annapoorna.org/widget.js"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const shareUrl = encodeURIComponent(`I just saved ${mealsSaved} meals on Annapoorna Connect! #ZeroWaste #Sustainability`);
  const handleShare = (platform) => {
    if (platform === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`);
    if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${shareUrl}`);
  };
  const themes = {
    gradient: {
      card: "bg-gradient-to-br from-[#86efac] to-[#15803d] text-white border-none",
      iconBg: "bg-white text-green-600",
      statsBox: "bg-white/20 backdrop-blur-md border-white/10",
      subtext: "text-white/90"
    },
    dark: {
      card: "bg-slate-900 text-white border border-slate-700",
      iconBg: "bg-slate-800 text-green-400",
      statsBox: "bg-slate-800 border-slate-700",
      subtext: "text-slate-400"
    },
    minimal: {
      card: "bg-white text-gray-900 border-2 border-gray-100",
      iconBg: "bg-green-50 text-green-600",
      statsBox: "bg-gray-50 border-gray-100",
      subtext: "text-gray-500"
    }
  };

  const currentStyle = themes[theme];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">Live Reputation Badge</h3>
          <p className="text-gray-500 mt-1">
            Customize and embed your impact badge. Verified partners see a <span className="font-bold text-green-600">15% increase</span> in customer trust.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          <div className="lg:col-span-3 bg-gray-50 p-6 border-r border-gray-100 flex flex-col gap-6">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Badge Style</label>
              <div className="space-y-2">
                <button 
                  onClick={() => setTheme('gradient')}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${theme === 'gradient' ? 'bg-white shadow-md ring-1 ring-green-500' : 'hover:bg-gray-200/50'}`}
                >
                  <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#86efac] to-[#15803d]"></div>
                  <span className="font-medium text-gray-700">Eco Gradient</span>
                </button>
                <button 
                  onClick={() => setTheme('dark')}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${theme === 'dark' ? 'bg-white shadow-md ring-1 ring-slate-500' : 'hover:bg-gray-200/50'}`}
                >
                  <div className="w-6 h-6 rounded-full bg-slate-900"></div>
                  <span className="font-medium text-gray-700">Midnight Dark</span>
                </button>
                <button 
                  onClick={() => setTheme('minimal')}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${theme === 'minimal' ? 'bg-white shadow-md ring-1 ring-gray-200' : 'hover:bg-gray-200/50'}`}
                >
                  <div className="w-6 h-6 rounded-full bg-white border border-gray-200"></div>
                  <span className="font-medium text-gray-700">Clean Minimal</span>
                </button>
              </div>
            </div>

            <div className="mt-auto">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Share Achievement</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleShare('linkedin')} className="flex items-center justify-center gap-2 p-2 bg-[#0077b5]/10 text-[#0077b5] rounded-lg hover:bg-[#0077b5]/20 transition">
                  <Linkedin size={18} /> <span className="text-sm font-bold">LinkedIn</span>
                </button>
                <button onClick={() => handleShare('twitter')} className="flex items-center justify-center gap-2 p-2 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-lg hover:bg-[#1DA1F2]/20 transition">
                  <Twitter size={18} /> <span className="text-sm font-bold">Twitter</span>
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 p-10 flex flex-col items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]">
            <span className="mb-8 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-500 shadow-sm">
              Live Preview
            </span>
            <div className={`relative w-64 h-80 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 text-center transition-all duration-500 ${currentStyle.card}`}>
               <div className={`w-14 h-14 rounded-full mb-4 flex items-center justify-center shadow-sm ${currentStyle.iconBg}`}>
                  <Award size={28} />
               </div>

               <h4 className="text-xl font-bold leading-tight mb-1">{name}</h4>
               <p className={`text-[10px] uppercase tracking-widest font-bold mb-8 ${currentStyle.subtext}`}>
                 Certified Waste Warrior
               </p>

               <div className={`rounded-xl py-4 w-full mb-auto border ${currentStyle.statsBox}`}>
                  <span className="block text-4xl font-extrabold leading-none mb-1">{mealsSaved}</span>
                  <span className={`text-xs font-bold uppercase tracking-wide ${currentStyle.subtext}`}>Meals Saved</span>
               </div>

               <div className={`text-[10px] font-medium mt-4 ${currentStyle.subtext}`}>
                 Verified by Annapoorna
               </div>
            </div>
          </div>
          <div className="lg:col-span-4 bg-gray-900 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Embed Code</label>
                  {copied ? (
                      <span className="flex items-center gap-1 text-xs text-green-400 font-bold"><Check size={12}/> Copied</span>
                  ) : (
                      <button onClick={handleCopy} className="text-gray-400 hover:text-white"><Copy size={16}/></button>
                  )}
              </div>
              <div className="relative flex-1 bg-black/50 rounded-lg p-4 font-mono text-xs text-green-400 overflow-hidden">
                  <pre className="break-all whitespace-pre-wrap">{embedCode}</pre>
              </div>
          </div>

        </div>
      </div>
      {(!user || user.role !== 'receiver') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
             <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
               <Share2 className="text-orange-600" size={20} />
             </div>
             <h4 className="font-bold text-gray-900">Boost Brand Loyalty</h4>
             <p className="text-sm text-gray-500 mt-2">64% of consumers prefer buying from sustainable brands. Show them you care.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
               <Layout className="text-green-600" size={20} />
             </div>
             <h4 className="font-bold text-gray-900">SEO Benefits</h4>
             <p className="text-sm text-gray-500 mt-2">Our widget links back to your sustainability profile, improving your search ranking.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
               <Award className="text-blue-600" size={20} />
             </div>
             <h4 className="font-bold text-gray-900">Verified Impact</h4>
             <p className="text-sm text-gray-500 mt-2">Real-time data verification ensures your customers trust your claims.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReputationWidget;