import { useState, useEffect } from 'react';
import { MapPin, Clock, User, Heart, AlertTriangle, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import defaultListingImage from '../assets/mixed-vegetable-curry.jpg'; 

const ListingCard = ({ title, quantity, distance, time, donor, image, type, phone }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const { user } = useAuth();
  const isDonor = user?.role === 'donor'; 

  const imgSrc = image || defaultListingImage;
  useEffect(() => {
    if (!time) return;
    const timeMatch = time.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      const [_, hours, minutes] = timeMatch;
      const now = new Date();
      const expiryDate = new Date();
      expiryDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      const diffHours = (expiryDate - now) / (1000 * 60 * 60);

      if (diffHours > 0 && diffHours < 2) {
        setIsUrgent(true);
      }
    }
  }, [time]);
  const handleWhatsApp = () => {
    const text = `Hi ${donor}, I am interested in claiming the ${title} (${quantity}) listed on Annapoorna Connect. Is it still available?`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full">
      <div className="relative overflow-hidden h-40 shrink-0">
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = defaultListingImage; }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
          {isUrgent && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 animate-pulse border border-red-500">
               <AlertTriangle size={12} className="fill-white stroke-red-600" /> SOS: Expires Soon
            </span>
          )}
          <span className="bg-white text-brand-green text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Available
          </span>
        </div>

        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg 
                     transition-all active:scale-90"
        >
          <Heart
            size={18}
            className={`transition-colors ${isFavorited ? 'fill-brand-orange text-brand-orange' : 'text-gray-600 hover:text-brand-orange'}`}
          />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-green transition line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">Quantity: <span className="font-semibold text-gray-800">{quantity}</span></p>
        </div>

        <div className="space-y-2 border-t border-gray-100 pt-3 mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="bg-green-100 rounded-full p-2 shrink-0">
              <User size={16} className="text-brand-green" />
            </div>
            <span className="truncate">{donor}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="bg-orange-100 rounded-full p-2 shrink-0">
              <MapPin size={16} className="text-brand-orange" />
            </div>
            <span className="truncate">{distance}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className={`rounded-full p-2 shrink-0 ${isUrgent ? 'bg-red-100' : 'bg-blue-100'}`}>
              <Clock size={16} className={isUrgent ? 'text-red-600' : 'text-blue-600'} />
            </div>
            <span className={isUrgent ? 'text-red-600 font-bold' : ''}>Pickup by {time}</span>
          </div>
        </div>
        <div className="mt-auto grid grid-cols-5 gap-2">
            <button 
                onClick={handleWhatsApp}
                className="col-span-1 flex items-center justify-center bg-green-100 text-green-600 rounded-lg border border-green-200 hover:bg-green-200 transition active:scale-95"
                title="Chat on WhatsApp"
            >
                <MessageCircle size={20} />
            </button>
            {!isDonor ? (
              <button className={`col-span-4 text-white py-3 rounded-lg font-bold 
                                 transition-all shadow-md hover:shadow-lg transform active:scale-95
                                 ${isUrgent ? 'bg-red-600 hover:bg-red-700' : 'bg-brand-green hover:bg-green-700'}`}>
                {isUrgent ? 'Rescue Now' : 'Claim Now'}
              </button>
            ) : (
              <button disabled className="col-span-4 bg-gray-100 text-gray-400 py-3 rounded-lg font-bold cursor-not-allowed border border-gray-200">
                 View Details
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;