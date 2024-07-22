"use client"
import React, { useState } from 'react';
import Sidebar from '@/components/host/Sidebar'
import Header from '@/components/host/Header'
import DashboardContent from '@/components/host/DashboardContent'
import MyListings from '@/components/host/MyListings'; // New component

const ProfessionalDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <DashboardContent />;
      case 'myListings':
        return <MyListings />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        setActiveComponent={setActiveComponent} 
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-64">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Conditional content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
