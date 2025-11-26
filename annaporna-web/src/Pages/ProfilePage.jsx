import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Heart, Package, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState({
    name: authUser?.name || 'User',
    email: authUser?.email || 'user@example.com',
    phone: authUser?.phone || '+91 98765 43210',
    address: authUser?.address || '123 Main Street, Noida, UP',
    bio: 'Passionate about reducing food waste and helping the community.',
    avatar: '👤',
    role: authUser?.role || 'donor'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    if (authUser) {
      setUser(prev => ({
        ...prev,
        name: authUser.name,
        email: authUser.email,
        role: authUser.role
      }));
    }
  }, [authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const isDonor = user.role === 'donor';

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-orange-50 py-12 px-4 page-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-brand-green mb-3">My Profile</h1>
          <p className="text-lg text-gray-600">Manage your Annapoorna account</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">{user.avatar}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
              <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold uppercase text-gray-500 mb-4">
                {user.role}
              </div>
              <p className="text-sm text-gray-600 mb-6">{user.bio}</p>
              
              <button
                onClick={() => setIsEditing(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-brand-green to-green-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-700 transition"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            </div>
            <div className="mt-8 space-y-4">
              {isDonor && (
                <div className="bg-white rounded-2xl shadow-md p-6 animate-fade-in-up">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-5 h-5 text-brand-orange" />
                    <p className="text-sm text-gray-600">Donations Made</p>
                  </div>
                  <p className="text-3xl font-bold text-brand-green">12</p>
                </div>
              )}
              {!isDonor && (
                <div className="bg-white rounded-2xl shadow-md p-6 animate-fade-in-up">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-5 h-5 text-brand-orange" />
                    <p className="text-sm text-gray-600">Items Received</p>
                  </div>
                  <p className="text-3xl font-bold text-brand-green">5</p>
                </div>
              )}
              {isDonor && (
                <div className="bg-white rounded-2xl shadow-md p-6 animate-fade-in-up">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-brand-orange" />
                    <p className="text-sm text-gray-600">Reputation</p>
                  </div>
                  <p className="text-3xl font-bold text-brand-green">⭐⭐⭐⭐⭐</p>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-2">
            {isEditing ? (
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex-1 px-6 py-3 bg-linear-to-r from-brand-green to-green-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-700 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <User className="w-6 h-6 text-brand-green" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-brand-green" />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-brand-green" />
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-lg font-semibold text-gray-900">{user.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-brand-green" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-lg font-semibold text-gray-900">{user.address}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h4>
                  <div className="space-y-4">
                    
                    {isDonor ? (
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Heart className="w-5 h-5 text-brand-orange" />
                            <div>
                            <p className="font-semibold text-gray-900">Donated Biryani</p>
                            <p className="text-sm text-gray-600">2 days ago</p>
                            </div>
                        </div>
                        <span className="text-brand-green font-semibold">+10 points</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-brand-orange" />
                            <div>
                            <p className="font-semibold text-gray-900">Received Mixed Vegetables</p>
                            <p className="text-sm text-gray-600">1 week ago</p>
                            </div>
                        </div>
                        <span className="text-brand-green font-semibold">+5 points</span>
                        </div>
                    )}

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;