import React, { useState } from 'react';
import { Bell, Lock, Eye, EyeOff, Trash2, LogOut, AlertCircle, Check } from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    twoFactorAuth: false,
    profileVisibility: 'public',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  });

  const [message, setMessage] = useState('');

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
    setMessage(`${key} updated!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    setMessage('Password updated successfully!');
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '', showCurrent: false, showNew: false, showConfirm: false });
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-orange-50 py-12 px-4 {/* NEW */} page-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-brand-green mb-3">Settings</h1>
          <p className="text-lg text-gray-600">Manage your account preferences and security</p>
        </div>
        {message && (
          <div className="mb-8 p-4 bg-brand-green/10 border-2 border-brand-green rounded-lg flex items-center gap-3">
            <Check className="w-5 h-5 text-brand-green" />
            <p className="text-brand-green font-semibold">{message}</p>
          </div>
        )}

        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-lg p-8 {/* NEW */} transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-brand-green" />
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg {/* NEW */} transition-all duration-300 hover:bg-gray-100 hover:scale-[1.01]">
                <div>
                  <p className="font-semibold text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <button
                  onClick={() => handleToggle('emailNotifications')}
                  className={`w-12 h-7 rounded-full transition-colors ${settings.emailNotifications ? 'bg-brand-green' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${settings.emailNotifications ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg {/* NEW */} transition-all duration-300 hover:bg-gray-100 hover:scale-[1.01]">
                <div>
                  <p className="font-semibold text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates via text message</p>
                </div>
                <button
                  onClick={() => handleToggle('smsNotifications')}
                  className={`w-12 h-7 rounded-full transition-colors ${settings.smsNotifications ? 'bg-brand-green' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${settings.smsNotifications ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg {/* NEW */} transition-all duration-300 hover:bg-gray-100 hover:scale-[1.01]">
                <div>
                  <p className="font-semibold text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-600">Receive browser notifications</p>
                </div>
                <button
                  onClick={() => handleToggle('pushNotifications')}
                  className={`w-12 h-7 rounded-full transition-colors ${settings.pushNotifications ? 'bg-brand-green' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${settings.pushNotifications ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-8 {/* NEW */} transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-brand-green" />
              <h2 className="text-2xl font-bold text-gray-900">Security</h2>
            </div>

            <div className="space-y-6">
              <form onSubmit={handlePasswordSubmit}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={passwords.showCurrent ? 'text' : 'password'}
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-green-200 outline-none transition"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setPasswords({ ...passwords, showCurrent: !passwords.showCurrent })}
                        className="absolute right-4 top-3.5 text-gray-500"
                      >
                        {passwords.showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-linear-to-r from-brand-green to-green-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-700 
                               {/* NEW */} transition-all transform active:scale-95"
                  >
                    Update Password
                  </button>
                </div>
              </form>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 
                                   {/* NEW */} transition-all transform active:scale-95">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-red-200">
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Danger Zone
            </h2>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-lg border-2 border-red-200 
                                 {/* NEW */} transition-all transform active:scale-98">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-600" />
                  <div className="text-left">
                    <p className="font-semibold text-red-900">Delete Account</p>
                    <p className="text-sm text-red-700">Permanently delete your account and data</p>
                  </div>
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-lg border-2 border-red-200 
                                 {/* NEW */} transition-all transform active:scale-98">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-red-600" />
                  <div className="text-left">
                    <p className="font-semibold text-red-900">Logout All Devices</p>
                    <p className="text-sm text-red-700">Logout from all your active sessions</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;