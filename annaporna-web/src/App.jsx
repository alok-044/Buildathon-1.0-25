import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/cursor';

import HomePage from './Pages/HomePage'; 
import LoginPage from './Pages/LoginPage'; 
import RegisterPage from './Pages/RegisterPage'; 
import AboutPage from './Pages/AboutPage'; 
import ContactPage from './Pages/ContactPage'; 
import FindNgo from './Pages/FindNgo'; 
import ProfilePage from './Pages/ProfilePage'; 
import SettingsPage from './Pages/SettingsPage'; 
import InAppChat from './Pages/InAppChat'; 
import ReceiverFeed from './Pages/ReceiverFeed'; 
import DonorDashboard from './Pages/DonorDashboard'; 
import PostDonation from './Pages/PostDonation';     
import ImpactDashboard from './Pages/ImpactDashboard'; 
import Achievements from './Pages/Achievements'; 
import Reviews from './Pages/Reviews'; 
import AdminDashboard from './Pages/AdminDashboard'; 
import NotFoundPage from './Pages/NotFoundPage'; 

import AdminRoute from './Pages/AdminRoute';       
import PrivateRoute from './Pages/PrivateRoute';   
import Leaderboard from './Pages/Leaderboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Cursor />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/find-ngo" element={<FindNgo />} /> 
              <Route path="/impact-dashboard" element={<ImpactDashboard />} /> 
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/chat" element={<InAppChat />} />
                <Route path="/feed" element={<ReceiverFeed />} />
                <Route path="/donate" element={<PostDonation />} />           
                <Route path="/donor-dashboard" element={<DonorDashboard />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/reviews" element={<Reviews />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;