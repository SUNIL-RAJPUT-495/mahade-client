import React, { useState } from 'react';
import { Sidebar } from '../pages/userDeshbord/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className='flex h-screen overflow-hidden bg-gray-50 relative'>

      <div className="hidden md:block h-full z-20">
        <Sidebar closeSidebar={() => {}} /> 
      </div>

      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden w-64 shadow-2xl h-full`}
      >
        <Sidebar closeSidebar={() => setIsMobileSidebarOpen(false)} />
      </div>

      {/* 4. MAIN CONTENT */}
      <main className='flex-1 overflow-y-auto pb-20 md:pb-0'>
        <div className='max-w-7xl mx-auto w-full h-full'>
          <Outlet context={{ toggleSidebar }} />
        </div>
      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;