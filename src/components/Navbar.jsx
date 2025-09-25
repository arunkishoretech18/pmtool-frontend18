import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-lg rounded-b-2xl">
      <div className="text-2xl font-bold text-indigo-600">ProDashboard</div>
      <div className="flex space-x-6">
        <Link className="text-indigo-500 hover:text-indigo-700 font-semibold" to="/login">Login</Link>
        <Link className="text-green-500 hover:text-green-700 font-semibold" to="/register">Register</Link>
        <Link className="text-pink-500 hover:text-pink-700 font-semibold" to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
