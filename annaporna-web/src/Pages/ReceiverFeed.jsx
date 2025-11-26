import ListingCard from '../components/ListingCard';
import { Search, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import imgGen from '../assets/logo.png';
import imgVeg from '../assets/mixed-vegetable-curry.jpg';
import imgBreads from '../assets/assorted breads.jpg';
import imgGrill from '../assets/grilled chicken.jpg';
import imgBiryani from '../assets/chicken-hyderabadi-biryani-01.jpg';

const ReceiverFeed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/listings`);
        setListings(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
        if (err.code === "ERR_NETWORK") {
            setError("Network Error: Ensure Backend is running on port 5001");
        } else {
            setError("Could not load listings. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);
  const imagesMap = {
    'mixed veg curry': imgVeg,
    'assorted breads': imgBreads,
    'grilled chicken': imgGrill,
    'biryani': imgBiryani,
  };

  const filteredListings = listings.filter(item => {
    const donorName = item.user?.name || 'Unknown Donor'; 
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-green-50 py-12 px-4 page-fade-in">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-brand-green mb-3">Find Food Near You</h1>
          <p className="text-lg text-gray-600">Discover available food donations in your area</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-10 transition-all duration-300 hover:shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search food or donor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300"
              />
            </div>

            <div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 bg-white"
              >
                <option value="all">All Foods</option>
                <option value="Veg">Vegetarian</option>
                <option value="Non-Veg">Non-Vegetarian</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 font-medium">
            {filteredListings.length} donation{filteredListings.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {loading && (
          <div className="text-center py-16">
            <Loader2 className="animate-spin h-12 w-12 text-brand-green mx-auto" />
            <p className="mt-4 text-gray-600">Loading listings...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16 bg-red-50 text-red-700 p-4 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filteredListings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((item) => {
              const key = item.title?.toLowerCase().trim();
              const localImageFallback = imagesMap[key] || imgGen;
              
              const cardProps = {
                id: item._id, 
                title: item.title,
                quantity: item.quantity,
                distance: item.location?.address || "Unknown location",
                time: item.expiry,
                donor: item.user?.name || "Anonymous Donor",
                phone: item.user?.phone || "919876543210", 
                image: item.image || localImageFallback, 
                type: item.type,
              };
              
              return <ListingCard key={cardProps.id} {...cardProps} />;
            })}
          </div>
        )}

        {!loading && !error && filteredListings.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No donations found</h3>
            <p className="text-gray-600">Try adjusting your search or filters, or check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiverFeed;