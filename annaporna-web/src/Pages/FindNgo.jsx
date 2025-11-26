import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { Loader2, MapPin, Phone, Mail } from 'lucide-react'; // Added Phone/Mail icons


const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

const FindNgo = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });

  const [donorLocation, setDonorLocation] = useState(null);
  const [allNgos, setAllNgos] = useState([]);
  const [range, setRange] = useState(15);
  const [selectedNgo, setSelectedNgo] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDonorLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
            console.error("Error getting location", error);
            setDonorLocation({ lat: 28.4744, lng: 77.5040 }); 
        }
      );
    } else {
        setDonorLocation({ lat: 28.4744, lng: 77.5040 });
    }

    const fetchNgos = async () => {
      try {
        setAllNgos([
          { 
            _id: 1, 
            name: 'Ranganathan Society for Social Welfare', 
            address: 'Plot No. 5, Knowledge Park III, Greater Noida', 
            latitude: 28.4795, 
            longitude: 77.4918, 
            phone: '+91-98XXXXXXXX', 
            email: 'info@ranganathansociety.org' 
          },
          { 
            _id: 2, 
            name: 'Udayan Care', 
            address: 'FGM3+XJM, Greater Noida',
            latitude: 28.4700, 
            longitude: 77.5100, 
            phone: '+91-11-XXXXXXXX', 
            email: 'contact@udayancare.org' 
          },
          { 
            _id: 3, 
            name: 'SEMS Foundation', 
            address: 'd, 180, Alpha 1 Block, Greater Noida', 
            latitude: 28.5105, 
            longitude: 77.5220, 
            phone: 'N/A', 
            email: 'semsfoundation@example.com' 
          },
          { 
            _id: 4, 
            name: 'HELPFUL FOUNDATION', 
            address: 'A-BLOCK, Chi II, Greater Noida', 
            latitude: 28.4427, 
            longitude: 77.5308, 
            phone: 'N/A', 
            email: 'support@helpfulfoundation.org' 
          },
          { 
            _id: 5, 
            name: 'Social Action For Forest & Environment (SAFE)', 
            address: 'Senior Citizen Home Complex, Greater Noida', 
            latitude: 28.4800, 
            longitude: 77.5000, 
            phone: 'N/A', 
            email: 'safe.india@example.com' 
          },
          { 
            _id: 6, 
            name: 'PAYODHI WELFARE FOUNDATION', 
            address: 'Amit Nagar, Greater Noida', 
            latitude: 28.4900, 
            longitude: 77.5150, 
            phone: 'N/A', 
            email: 'payodhi@example.com' 
          },
          { 
            _id: 7, 
            name: 'Basic Shiksha Foundation', 
            address: 'Ist, C-288, Gamma I, Greater Noida', 
            latitude: 28.4955, 
            longitude: 77.5112, 
            phone: 'N/A', 
            email: 'basicshiksha@example.com' 
          },
           { 
            _id: 8, 
            name: 'Ramlal Old Age Home', 
            address: 'FF4R+HH7, Knowledge Park III, Greater Noida', 
            latitude: 28.4720, 
            longitude: 77.4880, 
            phone: 'N/A', 
            email: 'N/A' 
          },
          { 
            _id: 9, 
            name: 'National Media Council', 
            address: 'AVJ Heights, F-1602, Zeta I, Greater Noida', 
            latitude: 28.5000, 
            longitude: 77.5400, 
            phone: 'N/A', 
            email: 'N/A' 
          },
          { 
            _id: 10, 
            name: 'Saniddhya Ngo', 
            address: 'AWHO Rd, Greater Noida', 
            latitude: 28.4600, 
            longitude: 77.5200, 
            phone: 'N/A', 
            email: 'N/A' 
          },
          { 
            _id: 11, 
            name: 'Anahad Foundation', 
            address: 'Top Floor, A-42, Greater Noida', 
            latitude: 28.4850, 
            longitude: 77.5050, 
            phone: 'N/A', 
            email: 'N/A' 
          },
          { 
            _id: 12, 
            name: 'Sai Welfare Society (NGO)', 
            address: 'Haldoni Mood, Greater Noida', 
            latitude: 28.5500, 
            longitude: 77.4500, 
            phone: 'N/A', 
            email: 'N/A' 
          },
          { 
            _id: 13, 
            name: 'Ishan Ngo', 
            address: 'House No 243, Shiv Mandir, Stree 22', 
            latitude: 28.4900, 
            longitude: 77.5100, 
            phone: 'N/A', 
            email: 'N/A' 
          },
          { 
            _id: 14, 
            name: 'Jax Foundation NGO', 
            address: 'Near Amity University, Greater Noida', 
            latitude: 28.4640, 
            longitude: 77.4840, 
            phone: 'N/A', 
            email: 'N/A' 
          },
          { 
            _id: 15, 
            name: 'Parbhat - An Awakening NGO', 
            address: 'Faridabad, Haryana (Approx 15km away)', 
            latitude: 28.4089, 
            longitude: 77.3178, 
            phone: 'N/A', 
            email: 'N/A' 
          }
        ]);
      } catch (error) {
        console.error("Failed to fetch NGOs", error);
      }
    };
    fetchNgos();
  }, []);

  const visibleNgos = allNgos
    .map(ngo => {
      if (!ngo.latitude || !ngo.longitude || !donorLocation) return null;
      
      const distance = getDistance(
        donorLocation.lat, donorLocation.lng,
        parseFloat(ngo.latitude), parseFloat(ngo.longitude)
      );
      
      return { ...ngo, distance };
    })
    .filter(ngo => ngo && ngo.distance <= range);

  if (loadError) return <div className="p-4 text-center text-red-500">Error loading maps</div>;
  if (!isLoaded) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-green" size={48} /></div>;

  return (
    <div className="flex flex-col h-screen page-fade-in">
      <div className="bg-white p-4 shadow-md z-10 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <label htmlFor="range" className="font-medium text-gray-700">
            Show NGOs within: <span className="font-bold text-brand-green">{range} km</span>
          </label>
          <input
            type="range"
            id="range"
            min="1"
            max="50"
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
            className="w-32 md:w-64 accent-brand-green"
          />
        </div>
        <span className="text-gray-600 font-semibold bg-gray-100 px-3 py-1 rounded-full">
          {visibleNgos.length} NGOs found
        </span>
      </div>
      <div className="flex-1 relative">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={donorLocation}
          zoom={12}
          options={{
             mapTypeControl: false,
             streetViewControl: false,
             fullscreenControl: false
          }}
        >
          {donorLocation && (
            <MarkerF
              position={donorLocation}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#3b82f6",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "white",
              }}
            />
          )}
          {visibleNgos.map((ngo) => (
            <MarkerF
              key={ngo._id}
              position={{ lat: parseFloat(ngo.latitude), lng: parseFloat(ngo.longitude) }}
              onClick={() => setSelectedNgo(ngo)}
              animation={window.google.maps.Animation.DROP}
            />
          ))}
          {selectedNgo && (
            <InfoWindowF
              position={{ lat: parseFloat(selectedNgo.latitude), lng: parseFloat(selectedNgo.longitude) }}
              onCloseClick={() => setSelectedNgo(null)}
            >
              <div className="p-2 max-w-sm min-w-[200px]">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-2">{selectedNgo.name}</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-gray-700">
                     <MapPin size={16} className="text-brand-orange shrink-0 mt-0.5" />
                     <span>{selectedNgo.address}</span>
                  </div>
                  
                  {selectedNgo.phone && selectedNgo.phone !== 'N/A' && (
                    <div className="flex items-center gap-2 text-gray-700">
                       <Phone size={16} className="text-green-600 shrink-0" />
                       <a href={`tel:${selectedNgo.phone}`} className="hover:underline">{selectedNgo.phone}</a>
                    </div>
                  )}
                  
                  {selectedNgo.email && selectedNgo.email !== 'N/A' && (
                    <div className="flex items-center gap-2 text-gray-700">
                       <Mail size={16} className="text-blue-600 shrink-0" />
                       <a href={`mailto:${selectedNgo.email}`} className="hover:underline">{selectedNgo.email}</a>
                    </div>
                  )}

                  <p className="text-brand-green font-semibold mt-2 bg-green-50 p-1 rounded text-center">
                    {selectedNgo.distance.toFixed(1)} km away
                  </p>
                </div>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg text-xs space-y-1 opacity-90">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 border border-white shadow-sm"></div>
                <span>You are here</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-white shadow-sm"></div>
                <span>NGO Location</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FindNgo;