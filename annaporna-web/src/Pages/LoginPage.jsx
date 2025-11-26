import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import loginImg from '../assets/login.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setLoading(true); 

    try {
      await login(email, password); 
      navigate('/'); 
    } catch (err) {
      console.error('Login error details:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); 
      } else if (err.message === "Network Error") {
        setError("Cannot connect to server. Is the backend running on port 5001?");
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-green-50 page-fade-in">
      <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-brand-green-100 via-brand-green/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-lg text-white">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <img src={loginImg} alt="Login Visual" className=" mb-6 h-40 w-40" />
                <h1 className="text-5xl font-bold text-green-300 mb-6 leading-tight">
                    Turn Surplus into <span className="text-green-200">Sustenance.</span>
                </h1>
                <p className="text-lg text-green-400 leading-relaxed mb-8">
                    Join thousands of donors and volunteers who are bridging the gap between hunger and food waste. Your login is the first step to someone's next meal.
                </p>
            </motion.div>

            
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl"
            >
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                    </div>
                    <span className="text-sm font-medium text-green-500">Trusted by 500+ NGOs</span>
                </div>
                <p className="text-sm italic text-gray-500">
                    "Annapoorna made it incredibly easy for our hotel to donate leftover banquet food. The pickups are always on time."
                </p>
                <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-brand-green font-bold text-xs">SG</div>
                    <div>
                        <p className="text-sm font-bold">Spice Garden</p>
                        <p className="text-xs text-green-600">Restaurant Partner</p>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24  bg-linear-to-br from-white via-white to-green-200 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32 pointer-events-none lg:hidden"></div>

        <div className="w-full max-w-md space-y-8 relative z-10">
            
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
                <p className="mt-2 text-gray-600">
                    Please enter your details to sign in.
                </p>
            </div>

            {error && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3"
                >
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                    <div>
                        <h3 className="text-sm font-bold text-red-800">Login Failed</h3>
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </motion.div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700" htmlFor="email">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-brand-green transition-colors" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-gray-700" htmlFor="password">Password</label>
                        <a href="#" className="text-sm font-medium text-brand-green hover:text-green-700 hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-brand-green transition-colors" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold  bg-brand-green hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition-all transform active:scale-[0.98]"
                >
                    {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <>Sign in <ArrowRight size={18} /></>
                    )}
                </button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
                </div>
            </div>

            <div className="text-center">
                <Link 
                    to="/register" 
                    className="inline-flex items-center justify-center w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-200 transition-all"
                >
                    Create free account
                </Link>
            </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;