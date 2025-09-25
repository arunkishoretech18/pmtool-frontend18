import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white backdrop-blur-md bg-opacity-20 rounded-3xl shadow-2xl p-12 w-96 text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-6">Dashboard</h1>
        <p className="text-white mb-6">Welcome to PM TOOL</p>
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Logout
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
