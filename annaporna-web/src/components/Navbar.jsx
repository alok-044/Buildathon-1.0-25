import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';
import { 
  Menu, X, User, LogOut, Settings, Star, Award, 
  BarChart2, ChevronDown, MessageSquare, LayoutDashboard,
  Info, Phone, Heart, Search, Trophy
} from 'lucide-react'; 

import { ExpandableTabs } from './react-bits/ExpandableTabs';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    logout();
    navigate('/login');
  };

  const getTabsData = () => {
    let tabs = [
      { title: "About", icon: Info, to: "/about" },
      { title: "Contact", icon: Phone, to: "/contact" },
    ];

    if (isAuthenticated) {
      if (user.role === 'donor') {
        // DONOR TABS
        tabs = [
          { title: "Donate", icon: Heart, to: "/donate" },
          { title: "Find NGOs", icon: Search, to: "/find-ngo" },
          { title: "Leaderboard", icon: Trophy, to: "/leaderboard" },
          { type: "separator" },
          ...tabs 
        ];
      } else {
    
        tabs = [
          { title: "Find Food", icon: Search, to: "/feed" },
          { title: "Chat", icon: MessageSquare, to: "/chat" },
          { type: "separator" },
          ...tabs 
        ];
      }
    }
    return tabs;
  };

  const renderMobileNavLinks = () => {
    const commonClasses = "block px-4 py-3 text-lg text-gray-700 hover:bg-green-50 hover:text-brand-green rounded-xl transition-all duration-300 font-medium border-l-4 border-transparent hover:border-brand-green";
    
    const tabs = getTabsData().filter(t => t.type !== 'separator');
    
    return tabs.map(link => (
      <NavLink 
        key={link.to} 
        to={link.to} 
        className={({isActive}) => `${commonClasses} ${isActive ? 'bg-green-50 text-brand-green border-brand-green' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {link.title}
      </NavLink>
    ));
  };

  const renderProfileDropdown = (isMobile = false) => {
    let links = [
      { to: "/profile", icon: User, label: "My Profile" },
    ];

    if (user.role === 'donor') {
        links.push(
            { to: "/impact-dashboard", icon: BarChart2, label: "Impact Dashboard" },
            { to: "/donor-dashboard", icon: LayoutDashboard, label: "Donor Dashboard" },
            { to: "/achievements", icon: Award, label: "Achievements" }
        );
    }

    links.push(
        { to: "/reviews", icon: Star, label: "Reviews" },
        { to: "/settings", icon: Settings, label: "Settings" }
    );

    const commonClasses = "flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-all duration-200";

    return (
      <div className={isMobile ? "space-y-1 pt-4 border-t border-gray-100 mt-4 animate-fade-in-down" 
                   : `absolute right-0 top-14 w-64 bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-20 overflow-hidden
                      transition-all ease-out duration-200 origin-top-right transform ${isProfileMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`
                  }
      >
        {isMobile && (
          <div className="px-4 py-3 bg-gray-50 mb-2 rounded-lg">
            <p className="font-bold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        )}
        
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({isActive}) => `${commonClasses} ${isActive ? 'bg-green-50 text-brand-green' : ''}`}
            onClick={() => { setIsMobileMenuOpen(false); setIsProfileMenuOpen(false); }}
          >
            <link.icon size={18} />
            <span>{link.label}</span>
          </NavLink>
        ))}
        
        <div className="border-t border-gray-100 my-1"></div>
        <button
          onClick={handleLogout}
          className={`${commonClasses} w-full text-red-600 hover:bg-red-50`}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    );
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg- backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-violet-200 border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-3xl transition-transform duration-500 group-hover:rotate-20">
              <img src={logoImg} alt="Annapoorna Logo" className="w-15 h-15 rounded-full" />
            </span>
            <span className="text-2xl font-bold text-brand-green tracking-tight group-hover:text-green-700 transition-colors">
              Annapoorna
            </span>
          </Link>

          
          <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <ExpandableTabs tabs={getTabsData()} />
          </div>

          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center">
              {loading ? (
                <span className="text-gray-500 animate-pulse">Loading...</span>
              ) : isAuthenticated ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-brand-green transition-all duration-300 active:scale-95"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center">
                       <User size={18} className="text-brand-green" />
                    </div>
                    <span className="font-medium text-gray-700">{user.name.split(' ')[0]}</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {renderProfileDropdown()}
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="px-6 py-2.5 bg-brand-green text-white rounded-full font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95">
                    Login
                  </Link>
                  <Link to="/register" className="px-6 py-2.5 bg-violet-300 text-brand-green border-brand-green rounded-full font-semibold hover:bg-blue-500 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:scale-95">
                    Register
                  </Link>
                </div>
              )}
            </div>

            
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-brand-green transition-colors p-2 rounded-md"
              >
                {isMobileMenuOpen ? <X className="w-7 h-7 animate-spin-once" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        
        <div className={`md:hidden bg-white border-t border-gray-100 overflow-hidden
                         transition-[max-height,opacity] duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="p-4 space-y-2">
             {isAuthenticated ? (
                <>
                  {renderMobileNavLinks()}
                  {renderProfileDropdown(true)}
                </>
              ) : (
                <div className="space-y-3 pt-2">
                  <Link to="/login" className="block w-full text-center px-6 py-3 text-gray-700 font-bold border-2 border-gray-200 rounded-xl hover:border-brand-green hover:text-brand-green transition-all active:scale-95">
                    Login
                  </Link>
                  <Link to="/register" className="block w-full text-center px-6 py-3 bg-brand-green text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition-all active:scale-95">
                    Register Now
                  </Link>
                </div>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;