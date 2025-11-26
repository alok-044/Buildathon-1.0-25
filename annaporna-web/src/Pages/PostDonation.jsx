import React, { useState } from 'react';
import { ChefHat, Clock, Package, MapPin, Loader2, ArrowLeft, Sparkles } from 'lucide-react';
import SmartScan from '../components/SmartScan';
import { FileUpload } from '../components/aceternity/FileUpload';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config';

const InputGroup = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      {Icon && <Icon size={16} className="text-brand-orange" />}
      {label}
    </label>
    <div className="relative group">
      <input
        {...props}
        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green block p-3 outline-none transition-all duration-200 group-hover:bg-white"
      />
    </div>
  </div>
);

const SelectGroup = ({ label, icon: Icon, children, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      {Icon && <Icon size={16} className="text-brand-orange" />}
      {label}
    </label>
    <div className="relative">
        <select
            {...props}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green block p-3 outline-none transition-all duration-200 appearance-none"
        >
            {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
    </div>
  </div>
);

const PostDonation = () => {
  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    pickupTime: '',
    foodType: 'Veg',
    address: '',
  });

  const [foodImageFile, setFoodImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('smart');

  const { authToken } = useAuth();
  const navigate = useNavigate();

  const handleScanData = (aiData, file) => {
    const now = new Date();
    try {
      now.setHours(now.getHours() + parseInt(aiData.expiry || '2'));
      const timeString = now.toTimeString().slice(0, 5);

      setFormData(prev => ({
        ...prev,
        title: aiData.title || prev.title,
        quantity: aiData.quantity || prev.quantity,
        foodType: aiData.type || prev.foodType,
        pickupTime: timeString,
      }));
    } catch (e) { console.error(e); }
    
    setFoodImageFile(file);
    setActiveTab('manual');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!foodImageFile) {
      alert("Please upload an image of the food.");
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    
    // Iterate over form data and map keys to backend expectations
    Object.keys(formData).forEach(key => {
        if (key === 'address') {
            data.append('location', JSON.stringify({ address: formData.address }));
        } else if (key === 'pickupTime') {
            data.append('expiry', `Today by ${formData.pickupTime}`);
        } else if (key === 'foodType') {
            // FIX: Map 'foodType' to 'type' as expected by the backend
            data.append('type', formData.foodType);
        } else {
            data.append(key, formData[key]);
        }
    });
    
    data.append('foodImage', foodImageFile);

    try {
        await axios.post(`${API_BASE_URL}/listings`, data, {
            headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': authToken }
        });
        navigate('/feed');
    } catch (err) {
            // Log detailed error for debugging
            console.error("Failed to post donation:", err);
            console.error('Axios error response:', err.response);

            // Prefer an informative server message when available
            const serverMsg = err?.response?.data?.message || err?.response?.data || err?.message || 'Server error';
            setError(`Failed to post donation: ${serverMsg}`);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 page-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
            <div>
                <Link to="/" className="text-sm text-gray-500 hover:text-brand-green flex items-center gap-1 mb-2 transition-colors">
                    <ArrowLeft size={14} /> Back to Home
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Post a Donation</h1>
                <p className="text-gray-600 mt-1">Share your surplus food with those in need.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-linear-to-br from-brand-green/10 to-emerald-500/5 rounded-3xl p-6 border border-brand-green/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-green/20 rounded-full blur-2xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-brand-green font-bold mb-4">
                            <Sparkles size={20} />
                            <h3>AI Smart Scan</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                            Skip the typing! Take a photo and let our AI automatically detect the food name, type, and quantity for you.
                        </p>
                        <SmartScan onScanComplete={handleScanData} />
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
                    <h3 className="font-semibold text-gray-900 mb-3">Donation Tips</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex gap-3">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
                            Ensure food is fresh and packed hygienically.
                        </li>
                        <li className="flex gap-3">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
                            Mention if the food contains allergens (nuts, dairy).
                        </li>
                        <li className="flex gap-3">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">3</span>
                            Set a realistic pickup time.
                        </li>
                    </ul>
                </div>
            </div>
            <div className="lg:col-span-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    <div className="bg-gray-50/50 border-b border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900">Donation Details</h2>
                        <p className="text-sm text-gray-500">Please confirm the details below.</p>
                    </div>

                    <div className="p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">Food Image</label>
                                <FileUpload onChange={setFoodImageFile} />
                                {foodImageFile && activeTab === 'smart' && (
                                    <p className="text-xs text-green-600 flex items-center gap-1">
                                        <Sparkles size={12} /> AI Image Captured
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup 
                                    label="Food Title" 
                                    icon={ChefHat}
                                    type="text" 
                                    placeholder="e.g., Paneer Butter Masala" 
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required 
                                />
                                
                                <InputGroup 
                                    label="Quantity" 
                                    icon={Package}
                                    type="text" 
                                    placeholder="e.g., Serves 15 people" 
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                                    required 
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SelectGroup 
                                    label="Food Type"
                                    value={formData.foodType}
                                    onChange={(e) => setFormData({...formData, foodType: e.target.value})}
                                >
                                    <option value="Veg">Vegetarian</option>
                                    <option value="Non-Veg">Non-Vegetarian</option>
                                    <option value="Mixed">Mixed</option>
                                </SelectGroup>

                                <InputGroup 
                                    label="Pickup By" 
                                    icon={Clock}
                                    type="time" 
                                    value={formData.pickupTime}
                                    onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                                    required 
                                />
                            </div>

                            <InputGroup 
                                label="Pickup Address" 
                                icon={MapPin}
                                type="text" 
                                placeholder="e.g., 123 Main St, Noida (Building A)" 
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                required 
                            />

                            {error && (
                                <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
                                    {error}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-linear-to-r from-brand-green to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Confirm & Post Donation'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PostDonation;