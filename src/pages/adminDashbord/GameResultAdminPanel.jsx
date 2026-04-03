import React, { useState, useEffect } from 'react';
import { XCircle, History, Calendar, Gamepad2 } from 'lucide-react';
import { fetchGame } from '../../utils/api';
import SummaryApi from '../../common/SummerAPI';
import AxiosAdmin from '../../utils/axiosAdmin';

export const GameResultAdminPanel = () => {
  const [activeTab, setActiveTab] = useState('Calculate Results');
  const [showError, setShowError] = useState(false);
  const [games, setGames] = useState([]);

  // Form states
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [openPana, setOpenPana] = useState('');
  const [closePana, setClosePana] = useState('');

  const handleOpenPanaChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setOpenPana(value);
  };

  const handleClosePanaChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setClosePana(value);
  };

  const tabs = ['Calculate Results', 'Winners', 'Losers', 'History'];

  useEffect(() => {
    const loadGames = async () => {
      try {
        const gameData = await fetchGame();
        if (gameData) {
          setGames(gameData);
        }
      } catch (error) {
        console.error("Failed to fetch games:", error);
        setShowError(true);
      }
    };
    loadGames();
  }, []);

  const handleResult = async () => {
    try {
      const res = await AxiosAdmin({
        url: SummaryApi.declareResult.url,
        method: SummaryApi.declareResult.method,
        data: {
          market_id: selectedGame,
          date: selectedDate,
          open_panna: openPana,
          close_panna: closePana
        }
      });
      alert(res.data.message || "Result generated successfully!");
      setOpenPana('');
      setClosePana('');
    } catch (error) {
      console.error("Failed to declare result:", error);
      alert(error?.response?.data?.message || "Failed to declare result!");
    }
  };

  const isValidSubmission = selectedGame && selectedDate && (openPana.length === 3 || closePana.length === 3);

  return (
    // Outer Wrapper
    <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8 flex justify-center items-start">
      
      {/* Main Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        
        {/* 1. Header Section - Updated to purple theme */}
        <div className="bg-[#210c2e] text-white py-8 text-center shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide mb-2 text-gray-300">Game Result Admin Panel</h1>
          <p className="text-gray-400 text-sm font-medium">Calculate and manage game results</p>
        </div>

        {/* 2. Tabs Navigation */}
        <div className="px-6 md:px-10 pt-6 border-b border-gray-200 flex items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 pb-4 text-sm font-semibold transition-colors relative whitespace-nowrap
                ${activeTab === tab 
                  ? 'text-[#380e4b]' 
                  : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              {tab === 'History' && <History className="w-4 h-4" />}
              {tab}
              
              {/* Active Tab Indicator - Updated color */}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] rounded-t-full bg-[#380e4b] transition-all duration-300"></span>
              )}
            </button>
          ))}
        </div>

        {/* 3. Main Content Area */}
        <div className="p-6 md:p-10">
          
          {/* Error Banner */}
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
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Game</label>
              <div className="relative">
                <select 
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#380e4b] transition-all cursor-pointer font-medium"
                >
                  <option value="" disabled>Choose a game...</option>
                  {games.map((game) => (
                    <option key={game._id} value={game._id}>
                      {game.name}
                    </option>
                  ))}
                </select>
                <Gamepad2 className="w-5 h-5 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Select Date */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Date</label>
              <div className="relative">
                <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#380e4b] transition-all cursor-pointer font-medium"
                />
              </div>
            </div>

            {/* Open Pana */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Open Pana</label>
              <input 
                type="text" 
                inputMode="numeric"
                maxLength={3}
                placeholder="e.g., 123" 
                value={openPana}
                onChange={handleOpenPanaChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#380e4b] transition-all placeholder-gray-400 font-medium"
              />
            </div>

            {/* Close Pana */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Close Pana</label>
              <input 
                type="text" 
                inputMode="numeric"
                maxLength={3}
                placeholder="e.g., 456" 
                value={closePana}
                onChange={handleClosePanaChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#380e4b] transition-all placeholder-gray-400 font-medium"
              />
            </div>
            
          </div>

          {/* 5. Action Buttons - Updated colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6 pt-6 border-t border-gray-100">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 rounded-xl transition-all shadow-sm text-sm w-full border border-gray-200">
              Calculate Results
            </button>
            <button 
              onClick={handleResult}
              disabled={!isValidSubmission}
              className={`font-black tracking-wider py-3.5 rounded-xl text-sm w-full transition-all uppercase ${
                (!isValidSubmission) 
                  ? 'border-2 border-purple-100 text-purple-300 bg-purple-50/50 cursor-not-allowed' 
                  : 'bg-[#380e4b] hover:bg-[#210c2e] text-white shadow-md hover:shadow-lg active:scale-95'
              }`}
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