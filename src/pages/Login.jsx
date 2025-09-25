import React from 'react';
import { motion } from 'framer-motion';

const Login = () => {
  const handleLogin = () => {
    localStorage.setItem('authToken', 'mockToken');
    window.location.href = '/dashboard';
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white backdrop-blur-md bg-opacity-20 rounded-3xl shadow-2xl p-12 w-96"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Welcome Back</h1>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl border border-white bg-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-xl border border-white bg-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Sign In
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Login;
