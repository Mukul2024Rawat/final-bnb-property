import React from 'react';
import { FaBars, FaBell } from 'react-icons/fa';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm z-20">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-gray-600 mr-4 md:hidden">
            <FaBars size={24} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">Host Dashboard</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
            <FaBell size={20} />
          </button>
          <button className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
