import React from 'react';
import { FaHome, FaList } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setActiveComponent: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar, setActiveComponent }) => {
  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0 -ml-64'} md:ml-0 md:w-64 fixed h-full z-30`}>
      <div className="flex items-center justify-between p-4 bg-pink-500">
        <h1 className="text-2xl font-bold text-white">airbnb</h1>
        <button onClick={toggleSidebar} className="text-white md:hidden">
          <IoIosArrowBack size={24} />
        </button>
      </div>
      <nav className="mt-6">
        <a href="#" onClick={() => setActiveComponent('dashboard')} className="flex items-center px-4 py-3 text-gray-700 bg-gray-200 bg-opacity-30">
          <FaHome className="mr-3" />
          Dashboards
        </a>
        <a href="#" onClick={() => setActiveComponent('myListings')} className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:bg-opacity-30 transition-colors duration-200">
          <FaList className="mr-3" />
          My listings
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
