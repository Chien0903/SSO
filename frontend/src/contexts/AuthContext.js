import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/authService';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await AuthService.checkAuth();
        setAuthenticated(result.authenticated);
        setUser(result.user || null);
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle login
  const login = async () => {
    try {
      const { auth_url } = await AuthService.getLoginUrl();
      window.location.href = auth_url;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Handle logout
  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      setAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Handle authentication callback
  const handleCallback = async (token) => {
    try {
      await AuthService.handleCallback(token);
      const userInfo = await AuthService.getUserInfo();
      
      if (userInfo.authenticated) {
        setUser(userInfo.user);
        setAuthenticated(true);
      }
      
      return userInfo.authenticated;
    } catch (error) {
      console.error('Authentication callback failed:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        loading,
        login,
        logout,
        handleCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
