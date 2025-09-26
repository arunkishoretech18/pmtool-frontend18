import React from "react";
import { Navigate } from "react-router-dom";

// Check for a mock authentication token
export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("authToken"); // Placeholder token
  return token ? children : <Navigate to="/login" />;
}
