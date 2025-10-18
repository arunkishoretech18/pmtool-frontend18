import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));
  const [error, setError] = useState("");

  useEffect(() => {
    const syncAuthState = () => {
      if (authToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
        setIsAuthenticated(true);
        setError("");
      } else {
        delete axios.defaults.headers.common["Authorization"];
        setIsAuthenticated(false);
      }
    };

    syncAuthState();
  }, [authToken]);

  const login = (token) => {
    if (token) {
      localStorage.setItem("authToken", token);
      setAuthToken(token);
    } else {
      setError("No token provided for login.");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};