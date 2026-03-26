import React, { useState, useEffect } from 'react';
import {
  FaWallet, FaWhatsapp, FaStar, FaPlusCircle,
  FaRegClock, FaHome, FaBook, FaHeadset, FaListAlt,
  FaBars, FaChartBar, FaTimes
} from "react-icons/fa";
import { BiMoney, BiMoneyWithdraw } from 'react-icons/bi';
import { IoMdNotifications } from "react-icons/io";
import { BsGraphUp, BsTable } from "react-icons/bs"; // Naye icons chart buttons ke liye
import { useOutletContext, useNavigate } from 'react-router-dom';
import { fetchGame } from '../../utils/api';
import { useSelector } from 'react-redux';

const Home = () => {
  const { toggleSidebar } = useOutletContext();
  const navigate = useNavigate();
  const balance = useSelector((state) => state.user.walletBalance);
  const [gamesList, setGamesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [selectedChartGame, setSelectedChartGame] = useState(null);
  const loadAllGames = async () => {
    setLoading(true);
    try {
      const response = await fetchGame();
      if (response && response.data) {
        setGamesList(response.data);
      } else if (Array.isArray(response)) {
        setGamesList(response);
      }
      console.log(gamesList)
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllGames();
  }, []);

  // Modal handlers
  const openChartModal = (game) => {
    setSelectedChartGame(game);
    setIsChartModalOpen(true);
  };

  const closeChartModal = () => {
    setIsChartModalOpen(false);
    setSelectedChartGame(null);
  };

  const goToJodiChart = () => {
    // URL mein game name ya id bhej sakte hain
    navigate(`/jodi-chart?market=${selectedChartGame?.name}`);
    closeChartModal();
  };

  const goToPanelChart = () => {
    navigate(`/panel-chart?market=${selectedChartGame?.name}`);
    closeChartModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans relative">

      {/* HEADER SECTION */}
      <div className="bg-mahadev text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-40">
        <div className='flex items-center gap-3'>
          <div
            onClick={toggleSidebar}
            className="md:hidden cursor-pointer p-1.5 hover:bg-white/20 rounded-md transition-colors"
          >
            <FaBars className="text-xl" />
          </div>
          <h1 className="text-2xl font-black tracking-widest drop-shadow-sm">MAHADEV</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/20 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-inner border border-white/10 text-white cursor-pointer hover:bg-white/30 transition">
            <FaWallet className="text-yellow-300 text-lg" />
            <span className="font-bold">₹ {balance}</span>
          </div>
          <IoMdNotifications className="text-2xl cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* ACTION BUTTONS SECTION */}
      <div className="max-w-3xl mx-auto px-4 mt-6 space-y-4">
        <div className='flex justify-between gap-3 sm:gap-4'>
          {/* WhatsApp Button */}
          <button 
  onClick={() => navigate('/ChatSupport')}
  className="flex-1 bg-mahadev flex items-center justify-center gap-2 p-3 sm:p-4 text-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
>
  <FaHeadset className="text-blue-300 text-2xl" /> 
  <span className="font-bold tracking-wide text-sm sm:text-base">Chat Support</span>
</button>
          {/* Starline Button */}
          <button 
            onClick={() => navigate('/starline')}
            className="flex-1 bg-mahadev flex items-center justify-center gap-2 p-3 sm:p-4 text-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <FaStar className="text-yellow-400 text-xl" />
            <span className="font-bold tracking-wide text-sm sm:text-base">STARLINE</span>
          </button>
        </div>

        <div className='flex justify-between gap-3 sm:gap-4'>
          {/* Add Cash Button */}
          <button 
            onClick={() => navigate('/add-funds')}
            className="flex-1 bg-green-500 flex items-center justify-center gap-2 p-3 sm:p-4 text-white rounded-xl shadow-md hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <FaPlusCircle className="text-xl" />
            <span className="font-bold text-sm sm:text-base">Add Cash</span>
          </button>
          {/* Withdraw Button */}
          <button 
            onClick={() => navigate('/withdrawal')}
            className="flex-1 bg-red-500 flex items-center justify-center gap-2 p-3 sm:p-4 text-white rounded-xl shadow-md hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <BiMoneyWithdraw className="text-2xl" />
            <span className="font-bold text-sm sm:text-base">Withdraw</span>
          </button>
        </div>
      </div>

      {/* GAMES GRID SECTION */}
      <div className="max-w-7xl mx-auto px-4 mt-8">

        {loading ? (
          <div className="text-center py-10 font-bold text-gray-500">
            Loading Live Games...
          </div>
        ) : gamesList.length === 0 ? (
          <div className="text-center py-10 font-bold text-gray-500">
            No Active Games Found.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {gamesList.map((game) => (
              <div
                key={game._id}
                className='bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-2xl p-4 flex flex-col transition-all duration-300'
              >

                {/* Header: Time & Chart Icon */}
                <div className='flex justify-between items-center pb-2 border-b border-gray-200 mb-3'>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                    {game.open_time} - {game.close_time}
                  </span>
                  
                  {/* ✨ CHART ICON BUTTON */}
                  <button 
                    onClick={() => openChartModal(game)}
                    className="p-1.5 hover:bg-purple-50 rounded-full transition-colors active:scale-90"
                  >
                    <FaChartBar className="text-mahadev text-sm sm:text-base" />
                  </button>
                </div>

                {/* Game Name */}
                <h2 className='text-[13px] sm:text-[15px] font-bold text-mahadev uppercase mb-1'>
                  {game.name}
                </h2>

                {/* Results Number */}
                <p className='text-sm sm:text-base font-bold text-black tracking-widest mb-1.5'>
                  {game.open_pana || '***'}_{game.jodi_result || '**'}_{game.close_pana || '***'}
                </p>

                {/* Status Indicator */}
                <div className={`font-medium mb-4 text-[11px] sm:text-xs ${game.status !== 'Active' ? 'text-red-500' : 'text-green-600'}`}>
                  {game.status === 'Active' ? 'Market is Running' : 'Market Closed'}
                </div>

                {/* Play Now Button */}
                <button
                  onClick={() => navigate(`/play/${game._id}`, { state: { game: game } })}
                  className={`w-full rounded-xl py-2 sm:py-2.5 font-bold text-xs sm:text-sm transition-all ${
                    game.status !== 'Active'
                      ? 'bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed'
                      : 'bg-white border-2 border-mahadev text-mahadev hover:bg-mahadev hover:text-white'
                  }`}
                  disabled={game.status !== 'Active'}
                >
                  {game.status !== 'Active' ? 'Closed' : 'Play Now'}
                </button>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER SECTION */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)] z-50">
        <ul className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">

          {/* My Bids */}
          <li onClick={() => navigate('/history')} className="flex flex-col items-center justify-center text-gray-500 hover:text-mahadev transition cursor-pointer group w-16">
            <FaListAlt className="text-xl mb-1 group-hover:-translate-y-1 transition-transform" />
            <span className="text-[10px] font-bold tracking-wide">My Bids</span>
          </li>

          {/* Passbook */}
          <li onClick={() => navigate('/passbook')} className="flex flex-col items-center justify-center text-gray-500 hover:text-mahadev transition cursor-pointer group w-16">
            <FaBook className="text-xl mb-1 group-hover:-translate-y-1 transition-transform" />
            <span className="text-[10px] font-bold tracking-wide">Passbook</span>
          </li>

          {/* Home */}
          <li onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center justify-center text-mahadev cursor-pointer w-16 -mt-2">
            <div className="bg-mahadev/10 p-2 rounded-full mb-0.5">
              <FaHome className="text-2xl" />
            </div>
            <span className="text-[11px] font-black tracking-wide">Home</span>
          </li>

          {/* Funds */}
          <li onClick={() => navigate('/wallet')} className="flex flex-col items-center justify-center text-gray-500 hover:text-mahadev transition cursor-pointer group w-16">
            <BiMoney className="text-2xl mb-1 group-hover:-translate-y-1 transition-transform" />
            <span className="text-[10px] font-bold tracking-wide">Funds</span>
          </li>

          {/* Support */}
          <li onClick={() => navigate('/support')} className="flex flex-col items-center justify-center text-gray-500 hover:text-mahadev transition cursor-pointer group w-16">
            <FaHeadset className="text-xl mb-1 group-hover:-translate-y-1 transition-transform" />
            <span className="text-[10px] font-bold tracking-wide">Support</span>
          </li>

        </ul>
      </footer>

      {/* ✨ CHART MODAL OVERLAY ✨ */}
      {isChartModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl relative pt-10 pb-6 px-6 overflow-visible">
            
            {/* Close Cross Button (Top Right Absolute) */}
            <button 
              onClick={closeChartModal}
              className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full border-2 border-white shadow-md hover:bg-red-600 transition-colors z-10"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* Modal Title (Game Name) */}
            <h2 className="text-center text-xl font-black text-[#210c2e] mb-6 tracking-wide uppercase">
              {selectedChartGame?.name}
            </h2>

            {/* Buttons Container */}
            <div className="flex flex-col gap-4">
              {/* Jodi Chart Button */}
              <button 
                onClick={goToJodiChart}
                className="w-full bg-[#380e4b] hover:bg-[#210c2e] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors active:scale-95 text-base shadow-sm"
              >
                <BsGraphUp className="text-xl font-bold" />
                Jodi Chart
              </button>

              {/* Panel Chart Button */}
              <button 
                onClick={goToPanelChart}
                className="w-full bg-[#380e4b] hover:bg-[#210c2e] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors active:scale-95 text-base shadow-sm"
              >
                <BsTable className="text-xl font-bold" />
                Panel Chart
              </button>

              {/* Red Close Button */}
              <button 
                onClick={closeChartModal}
                className="w-full bg-[#df3937] hover:bg-red-700 text-white py-3.5 rounded-xl font-bold mt-2 transition-colors active:scale-95 text-base shadow-sm"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Home;