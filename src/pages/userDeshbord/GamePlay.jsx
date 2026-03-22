import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaWallet } from 'react-icons/fa';
import Axios from '../../utils/axios'; 
import SummaryApi from '../../common/SummerAPI'; 
import { useSelector } from 'react-redux';

const GamePlay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [gameDetails] = useState(location.state?.game || null);
  const [gameType, setGameType] = useState('Single');
  const [session, setSession] = useState('Open'); 
  const [betNumber, setBetNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
   const balance = useSelector((state) => state.user.walletBalance);

  if (!id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-xl font-bold text-gray-600 mb-4">No Game Selected!</p>
        <button onClick={() => navigate(-1)} className="bg-mahadev text-white px-6 py-2 rounded-lg font-bold">Go Back</button>
      </div>
    );
  }

  // 🚫 Symbols block karne ka function (+, -, e, .)
  const blockInvalidChar = (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };

  // ✅ Sirf positive integer allow karne ka function
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Sirf digits allow karein, negative sign hatane ke liye
    const positiveValue = value.replace(/\D/g, ""); 
    setAmount(positiveValue);
  };

  const handleBetNumberChange = (e) => {
    const value = e.target.value;
    const positiveValue = value.replace(/\D/g, ""); 
    setBetNumber(positiveValue);
  };

  const gameTypesList = ['Single', 'Jodi', 'Single Panna', 'Double Panna', 'Triple Panna'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final Validation
    if (!betNumber || !amount || Number(amount) <= 0) {
      alert("Please enter a valid Number and Amount (Greater than 0)!");
      return;
    }

    setLoading(true);
    try {
      const response = await Axios({
        url: SummaryApi.placeBid.url, 
        method: SummaryApi.placeBid.method,
        data: {
          market_id: id, 
          game_type: gameType,
          session: (gameType === 'Jodi') ? 'Full' : session,
          bet_number: betNumber,
          amount: Number(amount)
        }
      });

      alert(response.data.message || "Bid placed successfully!");
      setBetNumber('');
      setAmount('');

    } catch (error) {
      console.error("Bid Error:", error);
      alert(error?.response?.data?.message || "Failed to place bid!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">

      {/* HEADER */}
      <div className="bg-mahadev text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-40">
        <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate(-1)}>
          <FaArrowLeft className="text-xl" />
          <h1 className="text-xl font-black tracking-widest uppercase">
            {gameDetails ? gameDetails.name : "PLAY GAME"} 
          </h1>
        </div>
        <div className="bg-white/20 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-inner border border-white/10 text-white">
          <FaWallet className="text-yellow-300 text-lg" />
          <span className="font-bold">₹ {balance}</span> 
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-6">

        {/* GAME TYPE SELECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6 flex flex-wrap gap-2 justify-center">
          {gameTypesList.map((type) => (
            <button
              key={type}
              onClick={() => {
                setGameType(type);
                setBetNumber('');
              }}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${gameType === type
                  ? 'bg-mahadev text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* BETTING FORM */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-black text-gray-800 mb-6 text-center border-b pb-4">
            Place Your Bid
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* SESSION SELECTION */}
            {gameType !== 'Jodi' && (
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="session" className="peer sr-only"
                    checked={session === 'Open'} onChange={() => setSession('Open')}
                  />
                  <div className="text-center py-3 rounded-xl border-2 font-bold peer-checked:border-mahadev peer-checked:bg-blue-50 peer-checked:text-mahadev text-gray-500 border-gray-200 transition-all">
                    OPEN
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="session" className="peer sr-only"
                    checked={session === 'Close'} onChange={() => setSession('Close')}
                  />
                  <div className="text-center py-3 rounded-xl border-2 font-bold peer-checked:border-mahadev peer-checked:bg-blue-50 peer-checked:text-mahadev text-gray-500 border-gray-200 transition-all">
                    CLOSE
                  </div>
                </label>
              </div>
            )}

            {/* NUMBER INPUT */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Enter {gameType} Number</label>
              <input
                type="text" // Change to text for regex control
                inputMode="numeric"
                value={betNumber}
                maxLength={1}
                onKeyDown={blockInvalidChar}
                onChange={handleBetNumberChange}
                placeholder="e.g., 5"
                className="w-full text-2xl font-black text-center border-2 border-gray-200 rounded-xl py-3 outline-none focus:border-mahadev focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>

            {/* AMOUNT INPUT */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Enter Amount (Points)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">₹</span>
                <input
                  type="text" // Change to text for regex control
                  inputMode="numeric"
                  value={amount}
                  onKeyDown={blockInvalidChar}
                  onChange={handleAmountChange}
                  placeholder="Minimum ₹10"
                  className="w-full text-xl font-bold pl-10 pr-4 border-2 border-gray-200 rounded-xl py-3 outline-none focus:border-mahadev focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-gray-300 placeholder:font-normal"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-lg uppercase tracking-wider rounded-xl py-4 mt-4 shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Place Bid Now'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;