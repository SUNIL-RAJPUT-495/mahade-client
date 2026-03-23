import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaWallet, 
  FaDiceOne, 
  FaClone, 
  FaRegIdCard, 
  FaLayerGroup,
  FaLifeRing,
  FaClock,
  FaCogs
} from 'react-icons/fa';
import Axios from '../../utils/axios'; 
import SummaryApi from '../../common/SummerAPI'; 
import { useSelector } from 'react-redux';

const GamePlay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [gameDetails] = useState(location.state?.game || null);
  const [step, setStep] = useState(1); 
  const [gameType, setGameType] = useState('Single');
  const [session, setSession] = useState('Open'); 
  const [betNumber, setBetNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  
  const balance = useSelector((state) => state.user.walletBalance);

  if (!id) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-xl font-bold text-gray-600 mb-4">No Game Selected!</p>
        <button onClick={() => navigate(-1)} className="bg-mahadev text-white px-6 py-2 rounded-lg font-bold">Go Back</button>
      </div>
    );
  }

  // --- MATKA GAME CONFIGURATION (UPDATED FOR NEW GAMES) ---
  const getGameConfig = (type) => {
    switch(type) {
      case 'Single': 
      case 'OddEven': 
        return { maxLength: 1, placeholder: 'e.g., 5' };
      case 'Jodi': 
      case 'TwoDigitPana':
        return { maxLength: 2, placeholder: 'e.g., 45' };
      case 'Single Panna': 
      case 'Double Panna': 
      case 'Triple Panna': 
      case 'SP':
      case 'DP':
      case 'TP':
      case 'SPCOMMON':
      case 'DPCOMMON':
        return { maxLength: 3, placeholder: 'e.g., 146' };
      case 'SPMotor':
      case 'DPMotor':
        return { maxLength: 4, placeholder: 'e.g., 1234' }; // Motor games accept 4 digits
      default: 
        return { maxLength: 10, placeholder: 'Enter number' }; // Bulk fallback
    }
  };

  const { maxLength, placeholder } = getGameConfig(gameType);

  // --- GRID OPTIONS MAP ---
  const gameOptions = [
    { id: 'Single', label: 'SINGLE DIGIT', icon: <FaDiceOne /> },
    { id: 'SingleBulk', label: 'SINGLE DIGITS BULK', icon: <FaDiceOne /> },
    { id: 'Single Panna', label: 'SINGLE PANA', icon: <FaRegIdCard /> },
    { id: 'SinglePannaBulk', label: 'SINGLE PANA BULK', icon: <FaRegIdCard /> },
    { id: 'Double Panna', label: 'DOUBLE PANA', icon: <FaLayerGroup /> },
    { id: 'DoublePannaBulk', label: 'DOUBLE PANA BULK', icon: <FaLayerGroup /> },
    { id: 'Triple Panna', label: 'TRIPLE PANA', icon: <FaClone /> },
    { id: 'SP', label: 'SP', icon: <FaLifeRing /> },
    { id: 'DP', label: 'DP', icon: <FaLifeRing /> },
    { id: 'TP', label: 'TP', icon: <FaLifeRing /> },
    { id: 'TwoDigitPana', label: 'TWO DIGIT PANA', icon: <FaClock /> },
    { id: 'SPMotor', label: 'SP MOTOR', icon: <FaCogs /> },
    { id: 'DPMotor', label: 'DP MOTOR', icon: <FaCogs /> },
    { id: 'OddEven', label: 'ODD EVEN', icon: <FaCogs /> },
    { id: 'SPCOMMON', label: 'SP COMMON', icon: <FaCogs /> },
    { id: 'DPCOMMON', label: 'DP COMMON', icon: <FaCogs /> },
  ];

  // --- VALIDATION & HANDLERS ---
  const blockInvalidChar = (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const positiveValue = value.replace(/\D/g, ""); 
    setAmount(positiveValue);
  };

  const handleBetNumberChange = (e) => {
    const value = e.target.value;
    const positiveValue = value.replace(/\D/g, ""); 
    setBetNumber(positiveValue);
  };

  // --- STRICT VALIDATION FOR MATKA RULES (UPDATED) ---
  const validateMatkaRules = () => {
    // Allows flexible lengths for games like Bulk, Motor, and Common
    const isFlexibleLength = gameType.includes('Bulk') || gameType.includes('Motor') || gameType.includes('COMMON');

    if (!isFlexibleLength && betNumber.length !== maxLength) {
      alert(`Please enter exactly ${maxLength} digits for ${gameType}.`);
      return false;
    }

    const uniqueDigits = new Set(betNumber.split(''));

    if (gameType === 'Single Panna' && uniqueDigits.size !== 3) {
      alert("For Single Panna, all 3 digits must be different (e.g., 146).");
      return false;
    }
    if (gameType === 'Double Panna' && uniqueDigits.size !== 2) {
      alert("For Double Panna, exactly 2 digits must be the same (e.g., 112).");
      return false;
    }
    if (gameType === 'Triple Panna' && uniqueDigits.size !== 1) {
      alert("For Triple Panna, all 3 digits must be identical (e.g., 777).");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!betNumber || !amount) {
      alert("Please enter both Number and Amount!");
      return;
    }

    if (Number(amount) < 10) {
      alert("Minimum bet amount is ₹10!");
      return;
    }

    if (Number(amount) > balance) {
      alert(`Insufficient balance! Your wallet balance is ₹${balance}.`);
      return;
    }

    if (!validateMatkaRules()) return;

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
      setStep(1); 

    } catch (error) {
      console.error("Bid Error:", error);
      alert(error?.response?.data?.message || "Failed to place bid!");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1); 
      setBetNumber('');
      setAmount('');
    } else {
      navigate(-1); 
    }
  };

  return (
    <div className="w-full bg-gray-50 font-sans pb-10 min-h-screen">

      {/* HEADER */}
      <div className="bg-mahadev text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-30">
        <div className='flex items-center gap-3 cursor-pointer' onClick={handleBack}>
          <FaArrowLeft className="text-xl hover:-translate-x-1 transition-transform" />
          <h1 className="text-xl font-black tracking-widest uppercase">
            {gameDetails ? gameDetails.name : "PLAY GAME"} 
          </h1>
        </div>
        <div className="bg-white/20 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-inner border border-white/10 text-white">
          <FaWallet className="text-yellow-300 text-lg" />
          <span className="font-bold">₹ {balance}</span> 
        </div>
      </div>

      {/* STEP 1: GAME SELECTION GRID */}
      {step === 1 && (
        <div className="w-full max-w-7xl mx-auto px-4 mt-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {gameOptions.map((option) => (
              <div 
                key={option.id}
                onClick={() => {
                  setGameType(option.id);
                  setStep(2); 
                }}
                className="bg-mahadev rounded-xl flex flex-col items-center justify-center p-6 lg:p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-white/10 active:scale-95"
              >
                <div className="bg-white text-mahadev rounded-full w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-3 text-2xl lg:text-3xl shadow-inner">
                  {option.icon}
                </div>
                <span className="text-white font-bold text-xs lg:text-sm tracking-wide uppercase">
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: BETTING FORM */}
      {step === 2 && (
        <div className="w-full max-w-md mx-auto px-4 mt-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h2 className="text-xl font-black text-gray-800 mb-6 text-center border-b pb-4 uppercase text-mahadev flex items-center justify-center gap-3">
              {gameOptions.find(o => o.id === gameType)?.icon}
              {gameOptions.find(o => o.id === gameType)?.label || gameType}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* SESSION SELECTION */}
              {gameType !== 'Jodi' && !gameType.includes('Bulk') && (
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input type="radio" name="session" className="peer sr-only"
                      checked={session === 'Open'} onChange={() => setSession('Open')}
                    />
                    <div className="text-center py-3 rounded-xl border-2 font-bold peer-checked:border-mahadev peer-checked:bg-purple-50 peer-checked:text-mahadev text-gray-400 border-gray-200 transition-all hover:bg-gray-50">
                      OPEN
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input type="radio" name="session" className="peer sr-only"
                      checked={session === 'Close'} onChange={() => setSession('Close')}
                    />
                    <div className="text-center py-3 rounded-xl border-2 font-bold peer-checked:border-mahadev peer-checked:bg-purple-50 peer-checked:text-mahadev text-gray-400 border-gray-200 transition-all hover:bg-gray-50">
                      CLOSE
                    </div>
                  </label>
                </div>
              )}

              {/* NUMBER INPUT */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Enter Number</label>
                <input
                  type="text" 
                  inputMode="numeric"
                  value={betNumber}
                  maxLength={gameType.includes('Bulk') || gameType.includes('Motor') || gameType.includes('COMMON') ? 10 : maxLength}
                  onKeyDown={blockInvalidChar}
                  onChange={handleBetNumberChange}
                  placeholder={placeholder}
                  className="w-full text-2xl font-black text-center border-2 border-gray-200 rounded-xl py-4 outline-none focus:border-mahadev focus:ring-4 focus:ring-purple-100 transition-all placeholder:text-gray-300 placeholder:font-normal bg-gray-50 focus:bg-white"
                />
              </div>

              {/* AMOUNT INPUT */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Enter Amount (Points)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">₹</span>
                  <input
                    type="text" 
                    inputMode="numeric"
                    value={amount}
                    onKeyDown={blockInvalidChar}
                    onChange={handleAmountChange}
                    placeholder="Minimum ₹10"
                    className="w-full text-xl font-bold pl-10 pr-4 border-2 border-gray-200 rounded-xl py-4 outline-none focus:border-mahadev focus:ring-4 focus:ring-purple-100 transition-all placeholder:text-gray-300 placeholder:font-normal bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-lg uppercase tracking-wider rounded-xl py-4 mt-6 shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95"
              >
                {loading ? 'Processing...' : 'Place Bid Now'}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default GamePlay;