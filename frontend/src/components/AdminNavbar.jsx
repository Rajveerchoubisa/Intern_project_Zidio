import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center sticky top-0 z-50">
      {/* Left: Brand */}
      <h1 className="text-xl font-bold tracking-wide">
        🦸‍♂️ Zidio Admin Panel
      </h1>

      {/* Right: Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
