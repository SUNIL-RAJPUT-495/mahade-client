import React, { useState } from 'react';
import { XCircle, History, Calendar, Gamepad2 } from 'lucide-react';

export const GameResultAdminPanel = () => {
  const [activeTab, setActiveTab] = useState('Calculate Results');
  const [showError, setShowError] = useState(true);

  // Form states
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-03-17');
  const [openPana, setOpenPana] = useState('');
  const [closePana, setClosePana] = useState('');

  const tabs = ['Calculate Results', 'Winners', 'Losers', 'History'];

  return (
    // Outer Wrapper with padding so the card doesn't touch the screen edges
    <div className="min-h-screen bg-[#f3f4f6] font-sans p-4 md:p-8 flex justify-center items-start">
      
      {/* Main Card Container - Added max-w, rounded corners, soft shadow, and hidden overflow */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* 1. Header Section - Added subtle gradient */}
        <div className="bg-gradient-to-r from-[#1d4ed8] to-[#3b82f6] text-white py-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide mb-2">Game Result Admin Panel</h1>
          <p className="text-blue-100 text-sm font-medium">Calculate and manage game results</p>
        </div>

        {/* 2. Tabs Navigation */}
        <div className="px-6 md:px-10 pt-6 border-b border-gray-100 flex items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 pb-4 text-sm font-semibold transition-colors relative whitespace-nowrap
                ${activeTab === tab 
                  ? 'text-[#1d4ed8]' 
                  : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              {tab === 'History' && <History className="w-4 h-4" />}
              {tab}
              
              {/* Active Tab Indicator */}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] rounded-t-full bg-[#1d4ed8] transition-all duration-300"></span>
              )}
            </button>
          ))}
        </div>

        {/* 3. Main Content Area */}
        <div className="p-6 md:p-10">
          
          {/* Error Banner - Smoother rounded corners */}
          {showError && (
            <div className="bg-[#fff1f2] border-l-[4px] border-[#ef4444] rounded-lg p-4 mb-8 flex flex-col gap-1.5 shadow-sm">
              <div className="flex items-center gap-2 text-[#ef4444]">
                <XCircle className="w-5 h-5 fill-current text-white border-2 border-[#ef4444] rounded-full bg-[#ef4444] stroke-white p-0.5" />
                <span className="font-bold text-sm">Error</span>
              </div>
              <p className="text-[#ef4444] text-sm ml-7">Error fetching mechanics. Please check your connection.</p>
            </div>
          )}

          {/* 4. Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
            
            {/* Select Game */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Game</label>
              <div className="relative">
                <select 
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none transition-all cursor-pointer"
                >
                  <option value="" disabled>Choose a game...</option>
                  <option value="game1">Game 1</option>
                  <option value="game2">Game 2</option>
                </select>
                <Gamepad2 className="w-5 h-5 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Select Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
              <div className="relative">
                <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Open Pana */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Open Pana</label>
              <input 
                type="text" 
                placeholder="e.g., 123" 
                value={openPana}
                onChange={(e) => setOpenPana(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400"
              />
            </div>

            {/* Close Pana */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Close Pana</label>
              <input 
                type="text" 
                placeholder="e.g., 456" 
                value={closePana}
                onChange={(e) => setClosePana(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400"
              />
            </div>
            
          </div>

          {/* 5. Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6 pt-6 border-t border-gray-100">
            <button className="bg-[#1d4ed8] hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm w-full">
              Calculate Results
            </button>
            <button 
              disabled
              className="border-2 border-blue-200 text-blue-400 font-semibold py-3.5 rounded-xl bg-blue-50/50 cursor-not-allowed text-sm w-full transition-all"
            >
              Declare Results
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GameResultAdminPanel;