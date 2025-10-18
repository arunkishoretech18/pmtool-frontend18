import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        login(response.data.token);
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-[96%] max-w-md"
        aria-label="Login form"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Sign In
        </h2>
        {error && (
          <div
            role="alert"
            className="bg-red-100 text-red-700 rounded p-2 mb-4 text-center"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition"
          aria-required="true"
        />

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition"
          aria-required="true"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition mb-2 disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label="Login button"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-2 text-gray-700">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}