import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadAuthData = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setAuthToken(storedToken);
        try {
          const response = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: { 'x-auth-token': storedToken }
          });
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to verify token:', error);
          logout(); 
        }
      }
      setLoading(false);
    };
    loadAuthData();
  }, []);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
      axios.defaults.headers.common['x-auth-token'] = authToken;
    } else {
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [authToken]);

  const login = async (email, password) => {
    try {
      console.log(`Attempting login to: ${API_BASE_URL}/auth/login`); 
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      
      const { token, user: userData } = response.data; 
      
      setAuthToken(token);
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login API error:', error);
      setIsAuthenticated(false);
      setUser(null);
      setAuthToken(null);
      throw error; 
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    authToken,
    loading,
    login,
    logout,
    setAuthToken,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};