import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);

  // Sync axios default header and auth state on authToken change
  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      setIsAuthenticated(true);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setIsAuthenticated(false);
    }
  }, [authToken]);

  // login function updates state and stores token in localStorage
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  // logout function clears token from state and localStorage
  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
