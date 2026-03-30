import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from "react-icons/fa";
import {
  FaArrowLeft,
  FaWallet,
  FaClone,
  FaLayerGroup,
  FaCogs,
  FaChevronDown,
  FaTrashAlt, 
  FaBalanceScale,
  FaCheckCircle
} from "react-icons/fa";
import { GiCardExchange, GiSwapBag } from "react-icons/gi";

import Axios from '../../utils/axios';
import SummaryApi from '../../common/SummerAPI';
import { useSelector } from 'react-redux';

const generateSinglePannas = () => {
  const groups = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
  for (let i = 1; i <= 9; i++) {
    for (let j = i + 1; j <= 9; j++) {
      for (let k = j + 1; k <= 10; k++) {
        const sum = i + j + (k === 10 ? 0 : k);
        const lastDigit = sum % 10;
        const pana = `${i}${j}${k === 10 ? 0 : k}`;
        groups[lastDigit].push(pana);
      }
    }
  }
  return groups;
};

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

  const [activeMode, setActiveMode] = useState('easy');
  const [bids, setBids] = useState([]);
  const [gridBids, setGridBids] = useState({});
  const singlePannaGroups = useMemo(() => generateSinglePannas(), []);

  const balance = useSelector((state) => state.user.walletBalance);

  if (!id) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-xl font-bold text-gray-600 mb-4">No Game Selected!</p>
        <button onClick={() => navigate(-1)} className="bg-gradient-to-r from-[#380e4b] to-[#5a1b75] text-white px-8 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-all">Go Back</button>
      </div>
    );
  }

  // --- MATKA GAME CONFIGURATION ---
  const getGameConfig = (type) => {
    switch (type) {
      case 'Single':
      case 'OddEven': return { maxLength: 1, exact: 1, placeholder: 'e.g., 5' };
      case 'Jodi':
      case 'RedJodi':
      case 'TwoDigitPana': return { maxLength: 2, exact: 2, placeholder: 'e.g., 45' };
      case 'Single Panna':
      case 'Double Panna':
      case 'Triple Panna':
      case 'SP': case 'DP': case 'TP': case 'SPCOMMON': case 'DPCOMMON':
        return { maxLength: 3, exact: 3, placeholder: 'e.g., 146' };
      case 'HalfSangamA': return { maxLength: 5, exact: 0, placeholder: 'e.g., 125-9' };
      case 'HalfSangamB': return { maxLength: 5, exact: 0, placeholder: 'e.g., 9-125' };
      case 'FullSangam': return { maxLength: 7, exact: 0, placeholder: 'e.g., 125-340' };
      case 'SPMotor': case 'DPMotor': return { maxLength: 10, exact: 4, placeholder: 'Min 4 Digits' };
      default: return { maxLength: 10, exact: 0, placeholder: 'Enter number' };
    }
  };

  const { maxLength, exact, placeholder } = getGameConfig(gameType);

  const gameOptions = [
    { id: 'Single', label: 'SINGLE DIGIT', icon: <FaDiceOne /> },
    { id: 'SingleBulk', label: 'SINGLE DIGITS BULK', icon: <FaDiceTwo /> },
    { id: 'Jodi', label: 'JODI', icon: <FaDiceThree /> },
    { id: 'JodiBulk', label: 'JODI BULK', icon: <FaDiceFour /> },
    { id: 'Single Panna', label: 'SINGLE PANA', icon: <FaDiceFive /> },
    { id: 'SinglePannaBulk', label: 'SINGLE PANA BULK', icon: <FaDiceSix /> },
    { id: 'Double Panna', label: 'DOUBLE PANA', icon: <FaLayerGroup /> },
    { id: 'DoublePannaBulk', label: 'DOUBLE PANA BULK', icon: <FaLayerGroup /> },
    { id: 'Triple Panna', label: 'TRIPLE PANA', icon: <FaClone /> },
    { id: 'FullSangam', label: 'FULL SANGAM', icon: <FaDiceSix /> },
    { id: 'HalfSangamA', label: 'HALF SANGAM A', icon: <GiCardExchange /> },
    { id: 'HalfSangamB', label: 'HALF SANGAM B', icon: <GiSwapBag /> },
    { id: 'SP', label: 'SP', icon: <FaDiceOne /> },
    { id: 'DP', label: 'DP', icon: <FaDiceTwo /> },
    { id: 'TP', label: 'TP', icon: <FaDiceThree /> },
    { id: 'TwoDigitPana', label: 'TWO DIGIT PANA', icon: <FaDiceFour /> },
    { id: 'SPMotor', label: 'SP MOTOR', icon: <FaCogs /> },
    { id: 'DPMotor', label: 'DP MOTOR', icon: <FaCogs /> },
    { id: 'RedJodi', label: 'RED JODI', icon: <FaDiceFive /> },
    { id: 'OddEven', label: 'ODD EVEN', icon: <FaBalanceScale /> },
    { id: 'SPCOMMON', label: 'SP COMMON', icon: <FaDiceOne /> },
    { id: 'DPCOMMON', label: 'DP COMMON', icon: <FaDiceTwo /> },
  ];

  // --- HANDLERS ---
  const blockInvalidChar = (e) => { 
    const blocked = ['e', 'E', '+', '.'];
    if (!gameType.includes('Sangam') && e.key === '-') blocked.push('-');
    if (blocked.includes(e.key)) e.preventDefault(); 
  };

  const handleAmountChange = (e) => setAmount(e.target.value.replace(/\D/g, ""));
  
  const handleBetNumberChange = (e) => {
    if (gameType.includes('Sangam')) {
      setBetNumber(e.target.value.replace(/[^\d-]/g, ""));
    } else {
      setBetNumber(e.target.value.replace(/\D/g, ""));
    }
  };

  const validateMatkaRules = () => {
    // Sangam specific validations
    if (gameType === 'HalfSangamA') {
      if (!/^\d{3}-\d{1}$/.test(betNumber)) return alert("Format must be: 3 digits - 1 digit (e.g., 125-9)"), false;
      return true;
    }
    if (gameType === 'HalfSangamB') {
      if (!/^\d{1}-\d{3}$/.test(betNumber)) return alert("Format must be: 1 digit - 3 digits (e.g., 9-125)"), false;
      return true;
    }
    if (gameType === 'FullSangam') {
      if (!/^\d{3}-\d{3}$/.test(betNumber)) return alert("Format must be: 3 digits - 3 digits (e.g., 125-340)"), false;
      return true;
    }

    // Red Jodi specific validation
    if (gameType === 'RedJodi') {
      if (betNumber.length !== 2) return alert("Enter exactly 2 digits for Red Jodi."), false;
      const redList = ['00', '11', '22', '33', '44', '55', '66', '77', '88', '99']; 
      if (!redList.includes(betNumber)) return alert("Invalid Red Jodi. Must be doubles like 00, 11, 22..."), false;
      return true;
    }

    // Motor games specific validation
    if (['SPMotor', 'DPMotor'].includes(gameType)) {
      if (betNumber.length < 4) return alert(`Please enter at least 4 digits for ${gameType} combinations.`), false;
      return true;
    }

    // Strict Length Validation for standard games
    const isFlexibleLength = gameType.includes('Bulk') || gameType.includes('COMMON');
    if (exact > 0 && !isFlexibleLength && betNumber.length !== exact) {
      alert(`Invalid length! Please enter exactly ${exact} digit(s) for ${gameType}.`);
      return false;
    }
    
    // Unique Digits constraints
    if (['Single Panna', 'Double Panna', 'Triple Panna'].includes(gameType)) {
      const uniqueDigits = new Set(betNumber.split(''));
      if (gameType === 'Single Panna' && uniqueDigits.size !== 3) return alert("All 3 digits must be different (e.g., 146)."), false;
      if (gameType === 'Double Panna' && uniqueDigits.size !== 2) return alert("Exactly 2 digits must be same (e.g., 112)."), false;
      if (gameType === 'Triple Panna' && uniqueDigits.size !== 1) return alert("All 3 digits must be identical (e.g., 777)."), false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!betNumber || !amount) return alert("Please enter both Number and Amount!");
    if (Number(amount) < 10) return alert("Minimum bet amount is ₹10!");
    if (Number(amount) > balance) return alert(`Insufficient balance! Your wallet balance is ₹${balance}.`);
    if (!validateMatkaRules()) return;

    const fullSessionGames = ['Jodi', 'RedJodi', 'HalfSangamA', 'HalfSangamB', 'FullSangam'];
    const finalSession = fullSessionGames.includes(gameType) ? 'Full' : session;

    setLoading(true);
    try {
      const response = await Axios({
        url: SummaryApi.placeBid.url,
        method: SummaryApi.placeBid.method,
        data: { 
          market_id: id, 
          game_type: gameType, 
          session: finalSession, 
          bet_number: betNumber, 
          amount: Number(amount) 
        }
      });
      alert(response.data.message || "Bid placed successfully!");
      setBetNumber(''); setAmount(''); setStep(1);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to place bid!");
    } finally {
      setLoading(false);
    }
  };

  // --- CART LOGIC ---
  const handleAddBid = () => {
    if (gameType === 'OddEven') {
      if (betNumber === '') return alert('Please select Odd/Even');
    } else {
      if (betNumber === '') return alert('Please enter number');
      if (!validateMatkaRules()) return; 
    }

    if (amount === '' || parseInt(amount) < 10) return alert('Minimum points is ₹10');

    const fullSessionGames = ['Jodi', 'RedJodi', 'HalfSangamA', 'HalfSangamB', 'FullSangam'];
    const cartSession = fullSessionGames.includes(gameType) ? 'Full' : session;

    const newBid = { id: Date.now(), session: cartSession, digit: betNumber, points: parseFloat(amount) };
    setBids([...bids, newBid]);
    if (gameType !== 'OddEven') setBetNumber('');
    setAmount('');
  };

  // 🚀 BULK LOGIC ENGINE UPDATED HERE 🚀
  const handleBulkDigitClick = (num) => {
    if (!amount || parseInt(amount) < 10) return alert('Please enter minimum 10 points first.');
    
    let generatedBids = [];
    const baseDigit = String(num);

    if (gameType === 'JodiBulk') {
      // Create 10 Pairs (e.g. 40, 41, 42...49)
      for (let i = 0; i <= 9; i++) {
        generatedBids.push({
          id: Date.now() + Math.random(),
          session: 'Full', // Jodi is always Full Session
          digit: baseDigit + String(i),
          points: parseFloat(amount)
        });
      }
    } 
    else if (gameType === 'SinglePannaBulk') {
      // Fetch all pannas related to the clicked digit
      const pannasForDigit = singlePannaGroups[baseDigit] || [];
      pannasForDigit.forEach(pana => {
        generatedBids.push({
          id: Date.now() + Math.random(),
          session,
          digit: pana,
          points: parseFloat(amount)
        });
      });
    }
    else if (gameType === 'DoublePannaBulk') {
      alert("Double Panna Bulk generation logic is pending.");
      return;
    }
    else {
      // Normal SingleBulk (Just adds the 1 digit)
      generatedBids.push({
        id: Date.now() + Math.random(),
        session,
        digit: baseDigit,
        points: parseFloat(amount)
      });
    }

    // Add all generated bids to cart at once
    setBids([...bids, ...generatedBids]);
  };

  const handleRemoveBid = (idToRemove) => setBids(bids.filter(bid => bid.id !== idToRemove));

  const handleGridInputChange = (pana, value) => {
    const val = value.replace(/\D/g, "");
    setGridBids(prev => {
      const newBids = { ...prev };
      if (val === "" || parseInt(val) === 0) delete newBids[pana];
      else newBids[pana] = parseInt(val);
      return newBids;
    });
  };

  const totalGridPoints = Object.values(gridBids).reduce((acc, val) => acc + val, 0);
  const totalGridBets = Object.keys(gridBids).length;
  const totalCartPoints = bids.reduce((acc, curr) => acc + curr.points, 0);
  const totalCartBids = bids.length;

  const isSpecialGridActive = gameType === 'Single Panna' && activeMode === 'special';
  const displayTotalPoints = isSpecialGridActive ? totalGridPoints : totalCartPoints;
  const displayTotalBids = isSpecialGridActive ? totalGridBets : totalCartBids;

  const handleSubmitCartOrGrid = async () => {
    const payloadBids = isSpecialGridActive
      ? Object.keys(gridBids).map(pana => ({ digit: pana, points: gridBids[pana], session }))
      : bids;

    if (payloadBids.length === 0) return;
    if (displayTotalPoints > balance) return alert(`Insufficient balance! Your wallet balance is ₹${balance}.`);

    setLoading(true);
    try {
      const formattedData = {
        market_id: id,
        game_type: gameType, 
        total_amount: displayTotalPoints,
        bids: payloadBids.map(bid => ({
          session: bid.session,
          bet_number: String(bid.digit), 
          amount: bid.points
        }))
      };

      const response = await Axios({
        url: SummaryApi.placeBid.url,
        method: SummaryApi.placeBid.method,
        data: formattedData 
      });

      alert(response.data.message || "All bids placed successfully!");
      setBids([]); setGridBids({}); setStep(1);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to place bids!");
    } finally { setLoading(false); }
  };

  const handleBack = () => {
    if (step === 2) { setStep(1); setBetNumber(''); setAmount(''); setBids([]); setGridBids({}); }
    else navigate(-1);
  };

  const isCartGame = ['Single', 'SPMotor', 'DPMotor', 'OddEven', 'Single Panna'].includes(gameType) || gameType.includes('Bulk');

  return (
    <div className="w-full bg-[#f4f6f8] font-sans pb-10 min-h-screen relative">
      <div className="bg-gradient-to-r from-[#380e4b] to-[#5a1b75] text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-30">
        <div className='flex items-center gap-3 cursor-pointer group' onClick={handleBack}>
          <FaArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
          <h1 className="text-[17px] font-black tracking-widest uppercase text-white drop-shadow-sm">
            {gameDetails ? gameDetails.name : "PLAY GAME"} {step === 2 && ` - ${gameOptions.find(o => o.id === gameType)?.label}`}
          </h1>
        </div>
        <div className="bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 shadow-inner border border-white/10 text-white">
          <FaWallet className="text-[#ffd700] text-lg" />
          <span className="font-extrabold text-sm tracking-wide">₹ {balance}</span>
        </div>
      </div>

      {step === 1 && (
        <div className="w-full max-w-7xl mx-auto px-4 mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {gameOptions.map((option) => (
              <div 
                key={option.id} 
                onClick={() => { setGameType(option.id); setBetNumber(''); setStep(2); setActiveMode('easy'); }} 
                className="bg-white rounded-2xl flex flex-col items-center justify-center p-6 lg:p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 group"
              >
                <div className="bg-gradient-to-br from-[#380e4b] to-[#5a1b75] text-white rounded-full w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-4 text-2xl lg:text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </div>
                <span className="text-gray-800 font-extrabold text-xs lg:text-sm tracking-wide uppercase">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-md mx-auto px-4 mt-8 pb-20">

          {/* UI 1: SINGLE PANNA & SINGLE DIGIT */}
          {['Single Panna', 'Single'].includes(gameType) ? (
            <div className="bg-transparent -mx-4 -mt-8 p-4 min-h-screen">
              <div className="flex gap-2 mb-4 bg-white p-2 rounded-2xl shadow-sm mt-4 border border-gray-100">
                <button onClick={() => setActiveMode('easy')} className={`flex-1 py-3 rounded-xl font-extrabold text-sm transition-all duration-300 ${activeMode === 'easy' ? 'bg-[#380e4b] text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-50'}`}>Easy Mode</button>
                <button onClick={() => setActiveMode('special')} className={`flex-1 py-3 rounded-xl font-extrabold text-sm transition-all duration-300 ${activeMode === 'special' ? 'bg-[#380e4b] text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-50'}`}>Special Mode</button>
              </div>

              {/* SPECIAL MODE (GRID) */}
              {isSpecialGridActive ? (
                <div className="bg-white rounded-2xl p-5 shadow-sm mb-24 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6 mt-2">
                    <label className="text-[16px] font-black text-gray-800">Session:</label>
                    <div className="relative flex-1">
                      <select value={session} onChange={(e) => setSession(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-[#380e4b] p-3.5 rounded-xl appearance-none outline-none font-bold text-[15px] focus:ring-2 focus:ring-[#380e4b]/20">
                        <option value="Open">Open</option><option value="Close">Close</option>
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#380e4b] pointer-events-none text-sm" />
                    </div>
                  </div>

                  {Object.keys(singlePannaGroups).map(groupDigit => (
                    <div key={groupDigit} className="bg-white rounded-[16px] overflow-hidden mb-5 border border-gray-200 shadow-sm hover:border-[#380e4b]/50 transition-colors">
                      <div className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 py-3 px-4 font-black text-[16px] border-b border-gray-200 flex justify-between items-center">
                        <span>Pana of {groupDigit}</span>
                        <FaLayerGroup className="text-gray-400" />
                      </div>
                      <div className="grid grid-cols-3 gap-3 p-4">
                        {singlePannaGroups[groupDigit].map(pana => (
                          <div key={pana} className="flex flex-col items-center">
                            <span className="font-extrabold text-[#380e4b] mb-1.5 text-[15px]">{pana}</span>
                            <div className="relative w-full border-2 border-gray-200 rounded-xl bg-gray-50 overflow-hidden focus-within:border-[#380e4b] focus-within:bg-white transition-all">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[13px]">₹</span>
                              <input type="text" inputMode="numeric" value={gridBids[pana] || ''} onChange={(e) => handleGridInputChange(pana, e.target.value)} className="w-full py-2.5 pl-7 pr-2 text-center font-bold text-gray-800 outline-none bg-transparent" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* EASY MODE */
                <>
                  <div className="bg-white rounded-2xl p-6 shadow-sm mb-4 border border-gray-100">
                    <div className="mb-5">
                      <label className="block text-[14px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Session</label>
                      <div className="relative">
                        <select value={session} onChange={(e) => setSession(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-xl appearance-none outline-none font-bold focus:ring-2 focus:ring-[#380e4b]/20 transition-all">
                          <option value="Open">Open</option><option value="Close">Close</option>
                        </select>
                        <FaChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[14px] font-bold text-gray-500 uppercase tracking-wider">{gameType === 'Single' ? 'Digit (0-9)' : 'Pana (3 Digits)'}</label>
                        {exact > 0 && <span className="text-[10px] bg-purple-100 text-[#380e4b] font-bold px-2 py-1 rounded-md">Exact {exact} digit(s)</span>}
                      </div>
                      <input type="text" inputMode="numeric" placeholder={`Enter ${gameType === 'Single' ? 'digit' : 'pana'}`} value={betNumber} onChange={handleBetNumberChange} maxLength={maxLength} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none font-bold text-lg text-center tracking-widest focus:bg-white focus:border-[#380e4b] focus:ring-2 focus:ring-[#380e4b]/20 transition-all" />
                    </div>
                    <div className="mb-6">
                      <label className="block text-[14px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Points (₹)</label>
                      <div className="relative">
                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">₹</span>
                         <input type="text" inputMode="numeric" placeholder="Min: 10" value={amount} onChange={handleAmountChange} className="w-full bg-gray-50 border border-gray-200 p-4 pl-10 rounded-xl outline-none font-bold text-lg focus:bg-white focus:border-[#380e4b] focus:ring-2 focus:ring-[#380e4b]/20 transition-all" />
                      </div>
                    </div>
                    <button onClick={handleAddBid} className="w-full bg-gradient-to-r from-[#380e4b] to-[#5a1b75] text-white font-black py-4 px-6 rounded-xl active:scale-95 transition-transform shadow-md uppercase tracking-wide">Add Bid</button>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm min-h-[140px] mb-24 border border-gray-100">
                    <h2 className="text-[16px] font-black text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3"><FaCheckCircle className="text-green-500"/> Cart Summary</h2>
                    {bids.length === 0 ? <div className="text-gray-400 font-medium text-center py-4 text-sm">No bids added yet.</div> : (
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                        {bids.map((bid) => (
                          <div key={bid.id} className="flex justify-between items-center bg-[#f8f9fa] p-3.5 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex flex-col gap-1">
                              <span className="bg-[#380e4b] text-white text-[10px] px-2 py-0.5 rounded shadow-sm font-black w-max uppercase tracking-wider">{bid.session}</span>
                              <span className="font-black text-gray-800 text-base">{bid.digit}</span>
                            </div>
                            <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
                              <span className="font-black text-green-600 text-lg">₹{bid.points}</span>
                              <button onClick={() => handleRemoveBid(bid.id)} className="text-red-400 hover:text-red-600 transition-colors p-2 bg-red-50 rounded-lg"><FaTrashAlt size={14} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ) :

            /* UI 2: BULK GAMES */
            gameType.includes('Bulk') ? (
              <div className="bg-transparent -mx-4 -mt-8 p-4 min-h-screen">
                <div className="bg-white rounded-2xl p-6 shadow-sm mt-4 mb-4 border border-gray-100">
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Session</label>
                      <div className="relative">
                        <select value={session} onChange={(e) => setSession(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-xl appearance-none outline-none font-bold focus:ring-2 focus:ring-[#380e4b]/20 transition-all">
                          <option value="Open">Open</option><option value="Close">Close</option>
                        </select>
                        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Points</label>
                      <div className="relative">
                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                         <input type="text" inputMode="numeric" value={amount} onChange={handleAmountChange} placeholder="Min: 10" className="w-full bg-gray-50 border border-gray-200 p-4 pl-8 rounded-xl outline-none font-bold focus:bg-white focus:border-[#380e4b] focus:ring-2 focus:ring-[#380e4b]/20 transition-all" />
                      </div>
                    </div>
                  </div>
                  <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3">Tap to Add Bid</label>
                  <div className="grid grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
                      <button key={num} onClick={() => handleBulkDigitClick(num)} className="bg-gradient-to-b from-[#380e4b] to-[#250932] text-white font-black py-4 rounded-xl text-xl active:scale-95 shadow-md hover:shadow-lg transition-all border border-purple-800">
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm mb-24 border border-gray-100 min-h-[140px]">
                  <h2 className="text-[16px] font-black text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3"><FaCheckCircle className="text-green-500"/> Added Bids</h2>
                  {bids.length === 0 ? (
                    <div className="text-gray-400 font-medium text-center py-4 text-sm">No bids added yet. Use the pad above.</div>
                  ) : (
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {bids.map((bid) => (
                        <div key={bid.id} className="flex justify-between items-center bg-[#f8f9fa] p-3.5 rounded-xl border border-gray-200 shadow-sm">
                           <div className="flex flex-col gap-1">
                              <span className="bg-[#380e4b] text-white text-[10px] px-2 py-0.5 rounded shadow-sm font-black w-max uppercase tracking-wider">{bid.session}</span>
                              <span className="font-black text-gray-800 text-base">Num: {bid.digit}</span>
                            </div>
                            <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
                              <span className="font-black text-green-600 text-lg">₹{bid.points}</span>
                              <button onClick={() => handleRemoveBid(bid.id)} className="text-red-400 hover:text-red-600 transition-colors p-2 bg-red-50 rounded-lg"><FaTrashAlt size={14} /></button>
                            </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) :

              /* UI 3: ODD / EVEN UI */
              gameType === 'OddEven' ? (
                <div className="bg-transparent -mx-4 -mt-8 p-4 min-h-screen">
                  <div className="bg-white rounded-2xl p-6 shadow-sm mt-4 mb-4 border border-gray-100">
                    <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Session</label>
                    <div className="relative mb-5">
                      <select value={session} onChange={(e) => setSession(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-xl appearance-none outline-none font-bold focus:ring-2 focus:ring-[#380e4b]/20 transition-all">
                        <option value="Open">Open</option><option value="Close">Close</option>
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm" />
                    </div>
                    <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3">Choose Parity</label>
                    <div className="flex gap-4 mb-6">
                      {['Odd', 'Even'].map(parity => (
                        <label key={parity} className="flex-1 cursor-pointer group">
                          <input type="radio" className="peer sr-only" checked={betNumber === parity} onChange={() => setBetNumber(parity)} />
                          <div className="flex items-center justify-center gap-3 bg-gray-50 border-2 border-gray-200 py-4 px-5 rounded-xl font-black text-gray-500 peer-checked:border-[#380e4b] peer-checked:bg-purple-50 peer-checked:text-[#380e4b] transition-all">
                            <div className={`w-5 h-5 rounded-full border-[4px] flex items-center justify-center transition-all ${betNumber === parity ? 'border-[#380e4b]' : 'border-gray-300'}`}>
                              {betNumber === parity && <div className="w-2 h-2 rounded-full bg-[#380e4b]"></div>}
                            </div> {parity}
                          </div>
                        </label>
                      ))}
                    </div>
                    <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3">Points & Add</label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                         <input type="text" inputMode="numeric" placeholder="Min: 10" value={amount} onChange={handleAmountChange} className="w-full bg-gray-50 border border-gray-200 p-4 pl-8 rounded-xl outline-none font-bold focus:bg-white focus:border-[#380e4b] focus:ring-2 focus:ring-[#380e4b]/20 transition-all" />
                      </div>
                      <button onClick={handleAddBid} className="bg-gradient-to-r from-[#380e4b] to-[#5a1b75] text-white font-black px-8 rounded-xl active:scale-95 shadow-md uppercase tracking-wider">Add</button>
                    </div>
                  </div>
                  {bids.length > 0 && (
                    <div className="bg-white rounded-2xl p-5 shadow-sm mt-2 mb-24 border border-gray-100">
                      <h2 className="text-[16px] font-black text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3"><FaCheckCircle className="text-green-500"/> Your Bets</h2>
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                        {bids.map((bid) => (
                           <div key={bid.id} className="flex justify-between items-center bg-[#f8f9fa] p-3.5 rounded-xl border border-gray-200 shadow-sm">
                             <div className="flex flex-col gap-1">
                                <span className="bg-[#380e4b] text-white text-[10px] px-2 py-0.5 rounded shadow-sm font-black w-max uppercase tracking-wider">{bid.session}</span>
                                <span className="font-black text-gray-800 text-base">Parity: {bid.digit}</span>
                              </div>
                              <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
                                <span className="font-black text-green-600 text-lg">₹{bid.points}</span>
                                <button onClick={() => handleRemoveBid(bid.id)} className="text-red-400 hover:text-red-600 transition-colors p-2 bg-red-50 rounded-lg"><FaTrashAlt size={14} /></button>
                              </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) :

                /* UI 4: SP MOTOR & DP MOTOR */
                ['SPMotor', 'DPMotor'].includes(gameType) ? (
                  <div className="bg-transparent -mx-4 -mt-8 p-4 min-h-screen">
                    <div className="bg-white rounded-2xl p-6 shadow-sm mt-4 border border-gray-100">
                      <div className="mb-5">
                        <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Session</label>
                        <div className="relative">
                          <select value={session} onChange={(e) => setSession(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-xl appearance-none outline-none font-bold focus:ring-2 focus:ring-[#380e4b]/20 transition-all">
                            <option value="Open">Open</option><option value="Close">Close</option>
                          </select>
                          <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm" />
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider">Base Digits</label>
                          <span className="text-[10px] bg-purple-100 text-[#380e4b] font-bold px-2 py-1 rounded-md">Min 4 digits</span>
                        </div>
                        <input type="text" inputMode="numeric" placeholder="e.g. 1468" value={betNumber} onChange={handleBetNumberChange} maxLength={maxLength} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none font-bold tracking-[0.2em] focus:bg-white focus:border-[#380e4b] focus:ring-2 focus:ring-[#380e4b]/20 transition-all" />
                      </div>
                      <div className="mb-6">
                        <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Points (₹)</label>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">₹</span>
                           <input type="text" inputMode="numeric" placeholder="Min: 10" value={amount} onChange={handleAmountChange} className="w-full bg-gray-50 border border-gray-200 p-4 pl-10 rounded-xl outline-none font-bold focus:bg-white focus:border-[#380e4b] focus:ring-2 focus:ring-[#380e4b]/20 transition-all" />
                        </div>
                      </div>
                      <button onClick={handleAddBid} className="w-full bg-gradient-to-r from-[#380e4b] to-[#5a1b75] text-white font-black py-4 rounded-xl active:scale-95 transition-transform shadow-md uppercase tracking-wide">Generate Motor Bets</button>
                    </div>
                    {bids.length > 0 && (
                      <div className="bg-white rounded-2xl p-5 shadow-sm mt-4 mb-24 border border-gray-100">
                        <h2 className="text-[16px] font-black text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3"><FaCheckCircle className="text-green-500"/> Added Motors</h2>
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                          {bids.map((bid) => (
                             <div key={bid.id} className="flex justify-between items-center bg-[#f8f9fa] p-3.5 rounded-xl border border-gray-200 shadow-sm">
                             <div className="flex flex-col gap-1">
                                <span className="bg-[#380e4b] text-white text-[10px] px-2 py-0.5 rounded shadow-sm font-black w-max uppercase tracking-wider">{bid.session}</span>
                                <span className="font-black text-gray-800 text-base">Num: {bid.digit}</span>
                              </div>
                              <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
                                <span className="font-black text-green-600 text-lg">₹{bid.points}</span>
                                <button onClick={() => handleRemoveBid(bid.id)} className="text-red-400 hover:text-red-600 transition-colors p-2 bg-red-50 rounded-lg"><FaTrashAlt size={14} /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (

                  /* UI 5: STANDARD OLD UI FOR ALL OTHER GAMES */
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-4">
                    <h2 className="text-xl font-black text-[#380e4b] mb-6 text-center border-b border-gray-100 pb-4 uppercase flex items-center justify-center gap-3">
                      <span className="bg-purple-50 p-3 rounded-full">{gameOptions.find(o => o.id === gameType)?.icon}</span>
                      {gameOptions.find(o => o.id === gameType)?.label || gameType}
                    </h2>
                    
                    {!['Jodi', 'RedJodi', 'HalfSangamA', 'HalfSangamB', 'FullSangam'].includes(gameType) && (
                      <div className="flex gap-4 mb-6">
                        <label className="flex-1 cursor-pointer">
                          <input type="radio" className="peer sr-only" checked={session === 'Open'} onChange={() => setSession('Open')} />
                          <div className="text-center py-3.5 rounded-xl border-2 border-gray-200 font-bold peer-checked:border-[#380e4b] peer-checked:bg-purple-50 peer-checked:text-[#380e4b] text-gray-400 transition-all">OPEN</div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                          <input type="radio" className="peer sr-only" checked={session === 'Close'} onChange={() => setSession('Close')} />
                          <div className="text-center py-3.5 rounded-xl border-2 border-gray-200 font-bold peer-checked:border-[#380e4b] peer-checked:bg-purple-50 peer-checked:text-[#380e4b] text-gray-400 transition-all">CLOSE</div>
                        </label>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                           <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                             {gameType.includes('Sangam') ? 'Enter Format' : 'Enter Number'}
                           </label>
                           {exact > 0 && <span className="text-[10px] bg-purple-100 text-[#380e4b] font-bold px-2 py-1 rounded-md">Exact {exact} digit(s)</span>}
                        </div>
                        <input 
                          type="text" 
                          value={betNumber} 
                          maxLength={maxLength} 
                          onKeyDown={blockInvalidChar} 
                          onChange={handleBetNumberChange} 
                          placeholder={placeholder} 
                          className="w-full text-2xl font-black text-center bg-gray-50 border-2 border-gray-200 rounded-xl py-4 outline-none focus:border-[#380e4b] focus:bg-white focus:ring-4 focus:ring-[#380e4b]/10 tracking-[0.2em] transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Enter Amount (Points)</label>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">₹</span>
                          <input 
                            type="text" 
                            inputMode="numeric" 
                            value={amount} 
                            onKeyDown={blockInvalidChar} 
                            onChange={handleAmountChange} 
                            placeholder="Minimum 10" 
                            className="w-full text-xl font-black pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl py-4 outline-none focus:border-[#380e4b] focus:bg-white focus:ring-4 focus:ring-[#380e4b]/10 transition-all" 
                          />
                        </div>
                      </div>
                      <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#380e4b] to-[#5a1b75] text-white font-black text-lg uppercase tracking-wider rounded-xl py-4 mt-6 shadow-lg active:scale-95 transition-transform disabled:opacity-70 disabled:active:scale-100">
                        {loading ? 'Processing...' : 'Place Bid Now'}
                      </button>
                    </form>
                  </div>
                )}

          {/* BOTTOM FIXED BAR (For Cart/Grid UI games) */}
          {isCartGame && (
            <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 flex justify-center shadow-[0_-10px_30px_rgba(0,0,0,0.08)] z-40">
              <div className="max-w-md w-full flex justify-between items-center px-1">
                <div className="flex gap-6 sm:gap-8">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Total Points</span>
                    <span className="text-[18px] font-black text-[#380e4b]">₹{displayTotalPoints}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Total Bids</span>
                    <span className="text-[18px] font-black text-[#380e4b]">{displayTotalBids}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  {(['SPMotor', 'DPMotor', 'SingleBulk', 'SinglePannaBulk', 'DoublePannaBulk'].includes(gameType) || isSpecialGridActive) && (
                    <button onClick={() => isSpecialGridActive ? setGridBids({}) : setBids([])} className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors py-3 px-4 rounded-xl font-black text-[13px] sm:text-sm active:scale-95">
                      Clear
                    </button>
                  )}
                  <button onClick={handleSubmitCartOrGrid} disabled={displayTotalBids === 0 || loading} className={`py-3 px-6 sm:px-8 rounded-xl font-black text-[14px] uppercase tracking-wider transition-all shadow-md ${displayTotalBids > 0 ? 'bg-gradient-to-r from-[#380e4b] to-[#5a1b75] text-white active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}>
                    {loading ? 'Wait...' : 'Submit Bids'}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default GamePlay;