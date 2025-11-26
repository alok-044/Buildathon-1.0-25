import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Loader2, FileText, User, Mail, Lock, Phone, MapPin, ArrowRight, Heart, HandHeart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import registerImg from '../assets/reg.png';

import { API_BASE_URL } from '../config';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    role: 'donor'
  });
  const [ngoDocument, setNgoDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setAuthToken, setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setNgoDocument(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', formData.role);
    data.append('phone', formData.phone);
    data.append('address', formData.address);

    if (formData.role === 'receiver') {
      if (!ngoDocument) {
        setError("Please upload your NGO verification document (PDF).");
        setLoading(false);
        return;
      }
      data.append('ngoDocument', ngoDocument); 
    }

    try {
      // ✅ FIX: Changed '/auth/register' to '/auth/signup' to match backend
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const { token, user: registeredUser } = response.data;
      setAuthToken(token);
      setUser(registeredUser);
      alert("Registration Successful!");
      navigate('/'); 
      
    } catch (err) {
      console.error('Registration Detailed Error:', err);
      if (err.response) {
          const serverMsg = err.response.data.message || err.response.data.error;
          // Handling validation array errors if they exist
          if (err.response.data.errors) {
             setError(err.response.data.errors.map(e => e.msg).join(', '));
          } else {
             setError(serverMsg || `Server Error (${err.response.status})`);
          }
      } else {
          setError("Request failed. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isDonor = formData.role === 'donor';

  return (
    <div className="min-h-screen w-full flex bg-linear-to-br from-blue-100 via-white to-white page-fade-in">
      <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12 transition-colors duration-700 ${isDonor ? 'bg-brand-green' : 'bg-brand-orange'}`}>
        
        {/* Background Pattern */}
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[4rem_4rem]" />
            <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t ${isDonor ? 'from-brand-green via-brand-green/50' : 'from-brand-orange via-brand-orange/50'} to-transparent`}></div>
        </div>

        <div className="relative z-10 max-w-lg text-blue-500">
            <img src={registerImg} alt="Register Visual" className=" mb-6 rounded-full h-40 w-40" />
            
            <motion.div
                key={formData.role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                    {isDonor ? "Share Surplus, Spread Joy." : "Bridge the Gap to Hunger."}
                </h1>
                <p className="text-lg text-violet-300 leading-relaxed mb-10">
                    {isDonor 
                        ? "Join our network of restaurants and individuals turning food waste into life-saving meals. Get tax benefits and community recognition."
                        : "Connect directly with verified donors in your area. We streamline the logistics so you can focus on serving your community."
                    }
                </p>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-violet-300/80" size={20} />
                        <span>{isDonor ? "AI-powered food listing" : "Real-time donation alerts"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-violet-300/80" size={20} />
                        <span>{isDonor ? "Verified NGO partners" : "Quality-checked food sources"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-violet-300/80" size={20} />
                        <span>{isDonor ? "Tax exemption certificates" : "Volunteer delivery support"}</span>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-16 bg-linear-to-br from-white via-white to-blue-200 relative overflow-y-auto h-screen custom-scrollbar">
        
        <div className="max-w-md mx-auto w-full pt-10 lg:pt-0">
            <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                <p className="mt-2 text-gray-600">Join the Annapoorna family today.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'donor' })}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-300
                        ${isDonor 
                            ? 'border-brand-green bg-green-50 text-brand-green shadow-sm' 
                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'}`}
                >
                    <Heart size={24} className={isDonor ? "fill-brand-green" : ""} />
                    <span className="font-bold text-sm">Donor</span>
                </button>
                <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'receiver' })}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-300
                        ${!isDonor 
                            ? 'border-brand-orange bg-orange-50 text-brand-orange shadow-sm' 
                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'}`}
                >
                    <HandHeart size={24} className={!isDonor ? "fill-brand-orange" : ""} />
                    <span className="font-bold text-sm">Receiver</span>
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6 text-red-700 text-sm">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-5">
                    <div className="relative group">
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors" />
                        <input name="name" type="text" required
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                            placeholder={isDonor ? "Restaurant / Business Name" : "NGO / Organization Name"}
                            value={formData.name} onChange={handleChange} />
                    </div>

                    <div className="relative group">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors" />
                        <input name="email" type="email" required
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                            placeholder="Email Address"
                            value={formData.email} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative group">
                        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors" />
                        <input name="phone" type="tel" required
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                            placeholder="Phone Number"
                            value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="relative group">
                        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors" />
                        <input name="address" type="text" required
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                            placeholder="City / Location"
                            value={formData.address} onChange={handleChange} />
                    </div>
                </div>
                <div className="space-y-5">
                    <div className="relative group">
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors" />
                        <input name="password" type="password" required
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                            placeholder="Create Password"
                            value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors" />
                        <input name="confirmPassword" type="password" required
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword} onChange={handleChange} />
                    </div>
                </div>
                {!isDonor && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-orange-50 border border-orange-100 rounded-xl p-4"
                    >
                        <label className="block text-sm font-bold text-gray-700 mb-2 items-center gap-2">
                            <FileText size={16} /> Upload NGO Verification (PDF)
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-orange-50 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {ngoDocument ? (
                                        <>
                                            <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                                            <p className="text-sm text-gray-600 font-medium">{ngoDocument.name}</p>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-8 h-8 mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        </>
                                    )}
                                </div>
                                <input name="ngoDocument" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                    </motion.div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2
                        ${isDonor ? 'bg-white hover:bg-green-500' : 'bg-white hover:bg-red-400'}`}
                >
                    {loading ? <Loader2 className="animate-spin" /> : (
                        <>Create Account <ArrowRight size={20} /></>
                    )}
                </button>
            </form>

            <p className="text-center text-gray-600 mt-8">
                Already have an account?{' '}
                <Link to="/login" className={`font-bold hover:underline ${isDonor ? 'text-green-500' : 'text-red-500'}`}>
                    Log in here
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;