import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { isAuthenticated, user } = useAuth();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <span className="text-3xl">🍛</span> Annapoorna
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Connecting surplus food from restaurants to those in need.
                            Join our mission to end hunger and reduce waste in your community.
                        </p>
                        <div className="flex space-x-3 pt-3">
                            <a href="#" className="p-2 rounded-md bg-gray-800 hover:bg-brand-green/10 transition-all hover:scale-110">
                                <Facebook size={18} className="text-gray-300" />
                            </a>
                            <a href="#" className="p-2 rounded-md bg-gray-800 hover:bg-brand-green/10 transition-all hover:scale-110">
                                <Twitter size={18} className="text-gray-300" />
                            </a>
                            <a href="https://www.instagram.com/annapoornaconnect/" className="p-2 rounded-md bg-gray-800 hover:bg-brand-green/10 transition-all hover:scale-110">
                                <Instagram size={18} className="text-gray-300" />
                            </a>
                            <a href="#" className="p-2 rounded-md bg-gray-800 hover:bg-brand-green/10 transition-all hover:scale-110">
                                <Linkedin size={18} className="text-gray-300" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-brand-green transition-all hover:pl-1">Home</Link></li>
                    
                            {isAuthenticated ? (
                                <>
                                    {user.role === 'receiver' && (
                                        <li><Link to="/feed" className="hover:text-brand-green transition-all hover:pl-1">Find Food</Link></li>
                                    )}
                                    {user.role === 'donor' && (
                                        <li><Link to="/donate" className="hover:text-brand-green transition-all hover:pl-1">Donate Food</Link></li>
                                    )}
                                </>
                            ) : (
                               
                                <>
                                    <li><Link to="/login" className="hover:text-brand-green transition-all hover:pl-1">Login</Link></li>
                                    <li><Link to="/register" className="hover:text-brand-green transition-all hover:pl-1">Register</Link></li>
                                </>
                            )}
                            
                            <li><Link to="/about" className="hover:text-brand-green transition-all hover:pl-1">About Us</Link></li>
                        </ul>
                    </div>

                    
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-brand-green mt-1" />
                                <address className="not-italic">123 Innovation Drive, Tech City, Noida, UP</address>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-brand-green" />
                                <a href="tel:+917075462040" className="hover:text-white transition-all hover:pl-1">+91 7075462040</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-brand-green" />
                                <a href="mailto:help@annapoorna.org" className="hover:text-white transition-all hover:pl-1">help@annapoorna.org</a>
                            </li>
                        </ul>
                    </div>

                   
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-white transition-all hover:pl-1">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-all hover:pl-1">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition-all hover:pl-1">Food Safety Guidelines</a></li>
                        </ul>
                        <div className="mt-6 md:mt-8">
                            <p className="text-xs text-gray-400 mb-2">Subscribe to our newsletter</p>
                            <NewsletterForm />

                            {!isAuthenticated && (
                                <div className="mt-4">
                                    <p className="text-xs text-gray-400 mb-2">Volunteer with us?</p>
                                    <Link to="/register" className="inline-block bg-linear-to-r from-brand-green to-green-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-700 transition transform hover:scale-105 active:scale-95">
                                        Join as Volunteer
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                

                
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                    <p className="flex items-center justify-center gap-1">
                        © {currentYear} Annapoorna Connect. Made with <Heart size={14} className="text-red-500 fill-current animate-pulse" /> in India.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
           
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage('Subscribed — thank you!');
            setEmail('');
        } catch (err) {
            console.error(err);
            setMessage('Subscription failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submit} className="flex gap-2">
            <input
                type="email"
                name="newsletter"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-linear-to-r from-brand-green to-green-600 text-white rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-700 transition disabled:opacity-60 transform active:scale-95"
            >
                {loading ? '...' : 'Subscribe'}
            </button>
            {message && <div className="text-sm text-gray-300 ml-3 self-center">{message}</div>}
        </form>
    );
}