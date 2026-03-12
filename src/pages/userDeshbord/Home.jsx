import React from 'react';
import { 
  FaWallet, FaWhatsapp, FaStar, FaPlusCircle, 
  FaRegClock, FaHome, FaBook, FaHeadset, FaListAlt,
  FaBars // <-- Yahan FaBars import kiya hai
} from "react-icons/fa";
import { BiMoney, BiMoneyWithdraw } from 'react-icons/bi';
import { IoMdNotifications } from "react-icons/io";
import { useOutletContext } from 'react-router-dom';

const gamesData = [
  // ... (Aapka dummy data same rahega)
  { id: 1, time: "10:00 AM - 11:00 AM", name: "SRIDEVI MORNING", number: "119-10-118", status: "Market Closed", isClosed: true },
  { id: 2, time: "11:30 AM - 12:30 PM", name: "TIME BAZAR", number: "120-20-119", status: "Market Running", isClosed: false },
  { id: 3, time: "01:00 PM - 02:00 PM", name: "MILAN DAY", number: "145-10-120", status: "Market Running", isClosed: false },
  { id: 4, time: "03:00 PM - 04:00 PM", name: "KALYAN", number: "***-**-***", status: "Market Closed", isClosed: true }
];

const Home = () => {
  const { toggleSidebar } = useOutletContext();
  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      
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
            <span className="font-bold">₹ 5</span>
          </div>
          <IoMdNotifications className="text-2xl cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-6 space-y-4">
        
        <div className='flex justify-between gap-3 sm:gap-4'>
          <button className="flex-1 bg-mahadev flex items-center justify-center gap-2 p-3 sm:p-4 text-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <FaWhatsapp className="text-green-400 text-2xl" />
            <span className="font-bold tracking-wide text-sm sm:text-base">WhatsApp</span>
          </button>
          <button className="flex-1 bg-mahadev flex items-center justify-center gap-2 p-3 sm:p-4 text-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <FaStar className="text-yellow-400 text-xl" />
            <span className="font-bold tracking-wide text-sm sm:text-base">STARLINE</span>
          </button>
        </div>

        <div className='flex justify-between gap-3 sm:gap-4'>
          <button className="flex-1 bg-green-500 flex items-center justify-center gap-2 p-3 sm:p-4 text-white rounded-xl shadow-md hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <FaPlusCircle className="text-xl" />
            <span className="font-bold text-sm sm:text-base">Add Cash</span>
          </button>
          <button className="flex-1 bg-red-500 flex items-center justify-center gap-2 p-3 sm:p-4 text-white rounded-xl shadow-md hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <BiMoneyWithdraw className="text-2xl" />
            <span className="font-bold text-sm sm:text-base">Withdraw</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {gamesData.map((game) => (
            <div 
              key={game.id} 
              className='bg-white border border-gray-100 shadow-md rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
            >
              
              <div className='border-b border-gray-100 w-full pb-3 mb-3 flex items-center justify-center gap-1.5 sm:gap-2 text-gray-500 font-medium bg-gray-50/50 rounded-t-xl'>
                <FaRegClock className="text-sm sm:text-base text-mahadev opacity-70" />
                <p className="text-[11px] sm:text-sm tracking-wide">{game.time}</p>
              </div>
              
              <h2 className='text-sm sm:text-xl font-black text-gray-800 mb-1 tracking-wide'>{game.name}</h2>
              <p className='text-green-600 font-black text-xl sm:text-3xl tracking-widest mb-1 drop-shadow-sm'>{game.number}</p>
              
              <div className={`font-bold mb-4 sm:mb-6 tracking-wide text-xs sm:text-sm ${game.isClosed ? 'text-red-500' : 'text-green-500'}`}>
                {game.status}
              </div>
              
              <button 
                className={`w-full rounded-xl py-2.5 sm:py-3 font-extrabold uppercase tracking-wider text-xs sm:text-sm transition-all shadow-sm ${
                  game.isClosed 
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-white border-2 border-mahadev text-mahadev hover:bg-mahadev hover:text-white hover:shadow-md active:scale-95'
                }`}
                disabled={game.isClosed}
              >
                {game.isClosed ? 'Closed Game' : 'Play Now'}
              </button>
              
            </div>
          ))}

        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)] z-50">
        <ul className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
            
            <li className="flex flex-col items-center justify-center text-gray-500 hover:text-mahadev transition cursor-pointer group w-16">
                <FaListAlt className="text-xl mb-1 group-hover:-translate-y-1 transition-transform" />
                <span className="text-[10px] font-bold tracking-wide">My Bids</span>
            </li>

            <li className="flex flex-col items-center justify-center text-gray-500 hover:text-mahadev transition cursor-pointer group w-16">
                <FaBook className="text-xl mb-1 group-hover:-translate-y-1 transition-transform" />
                <span className="text-[10px] font-bold tracking-wide">Passbook</span>
            </li>

            <li className="flex flex-col items-center justify-center text-mahadev cursor-pointer w-16 -mt-2">
                <div className="bg-mahadev/10 p-2 rounded-full mb-0.5">
                  <FaHome className="text-2xl" />
                </div>
                <span className="text-[11px] font-black tracking-wide">Home</span>
            </li>

            <li className="flex flex-col items-center justify-center text-gray-500 hover:text-mahadev transition cursor-pointer group w-16">
                <BiMoney className="text-2xl mb-1 group-hover:-translate-y-1 transition-transform" />
                <span className="text-[10px] font-bold tracking-wide">Funds</span>
            </li>

            <li className="flex flex-col items-center justify-center text-gray-500 hover:text-mahadev transition cursor-pointer group w-16">
                <FaHeadset className="text-xl mb-1 group-hover:-translate-y-1 transition-transform" />
                <span className="text-[10px] font-bold tracking-wide">Support</span>
            </li>
            
        </ul>
      </footer>
      
    </div>
  )
}

export default Home;