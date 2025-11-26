import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "expo-router";
import api from "../services/api";
import { storage } from "../utils/storage";
import { showToast } from "../utils/toast";
import { authService } from "../services/auth.service";

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;   // Added optional phone
  address?: string; // Added optional address
  role: "donor" | "receiver";
  onboardingCompleted?: boolean;
  avatar?: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  // ✅ NEW: Add update function type definition
  updateUserProfile: (data: { name?: string; phone?: string; address?: string }) => Promise<{ success: boolean; error?: string }>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await storage.getToken();
    if (token) {
      await refreshProfile();
    } else {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch (err) {
      console.log("Profile fetch failed", err);
      await storage.removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      if (res.token) {
        await storage.setToken(res.token);
        api.defaults.headers.common['x-auth-token'] = res.token;
        await refreshProfile();
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: "No token received" };
      }
    } catch (error: any) {
      setLoading(false);
      return { 
        success: false, 
        error: error.response?.data?.message || "Login failed" 
      };
    }
  };

  const signup = async (data: any) => {
    setLoading(true);
    try {
      const res = await authService.signup(data);
      if (res.token) {
          await storage.setToken(res.token);
          api.defaults.headers.common['x-auth-token'] = res.token;
          await refreshProfile();
          return { success: true };
      } else {
          setLoading(false);
          return { success: false, error: "No token received" };
      }
    } catch (error: any) {
      setLoading(false);
      return { 
        success: false, 
        error: error.response?.data?.message || "Signup failed" 
      };
    }
  };

  const logout = async () => {
    try {
      await storage.removeToken();
      setUser(null);
      delete api.defaults.headers.common['x-auth-token'];
      showToast("Logged out successfully", "info");
      router.replace("/auth/login"); 
    } catch (error) {
      console.error("Logout error:", error);
      showToast("Error logging out", "error");
    }
  };

  // ✅ NEW: Implementation of updateUserProfile
  const updateUserProfile = async (data: { name?: string; phone?: string; address?: string }) => {
    try {
      const updatedUser = await authService.updateProfile(data);
      // Merge updated fields into local user state immediately for snappy UI
      setUser((prev) => (prev ? { ...prev, ...data } : null));
      
      // Optionally refresh full profile from server to be safe
      // await refreshProfile(); 
      
      showToast("Profile updated!", "success");
      return { success: true };
    } catch (error: any) {
      console.error("Update profile error:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to update profile" 
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        loading, 
        login, 
        signup, 
        logout, 
        refreshProfile,
        updateUserProfile // ✅ Exposed here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}