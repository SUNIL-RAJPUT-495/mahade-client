import React, { useState, useMemo } from 'react';
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
  FaCogs,
  FaChevronDown,
  FaTrashAlt
} from 'react-icons/fa';
import Axios from '../../utils/axios'; 
import SummaryApi from '../../common/SummerAPI'; 
import { useSelector } from 'react-redux';

// Utility Function: Automatically generate all 120 valid Single Panas
const generateSinglePannas = () => {
  const groups = { 0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[] };
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
  
  // Cart States (For all new UIs)
  const [activeMode, setActiveMode] = useState('easy');
  const [bids, setBids] = useState([]);

  // Grid States (Special Mode for Single Panna)
  const [gridBids, setGridBids] = useState({});
  const singlePannaGroups = useMemo(() => generateSinglePannas(), []);

  const balance = useSelector((state) => state.user.walletBalance);

  if (!id) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-xl font-bold text-gray-600 mb-4">No Game Selected!</p>
        <button onClick={() => navigate(-1)} className="bg-[#380e4b] text-white px-6 py-2 rounded-lg font-bold">Go Back</button>
      </div>
    );
  }

  // --- MATKA GAME CONFIGURATION ---
  const getGameConfig = (type) => {
    switch(type) {
      case 'Single': 
      case 'OddEven': return { maxLength: 1, placeholder: 'e.g., 5' };
      case 'Jodi': 
      case 'TwoDigitPana': return { maxLength: 2, placeholder: 'e.g., 45' };
      case 'Single Panna': 
      case 'Double Panna': 
      case 'Triple Panna': 
      case 'SP': case 'DP': case 'TP': case 'SPCOMMON': case 'DPCOMMON':
        return { maxLength: 3, placeholder: 'e.g., 146' };
      case 'SPMotor': case 'DPMotor': return { maxLength: 10, placeholder: 'Number' }; 
      default: return { maxLength: 10, placeholder: 'Enter number' }; 
    }
  };

  const { maxLength, placeholder } = getGameConfig(gameType);

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

  // --- HANDLERS ---
  const blockInvalidChar = (e) => { if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault(); };
  const handleAmountChange = (e) => setAmount(e.target.value.replace(/\D/g, ""));
  const handleBetNumberChange = (e) => setBetNumber(e.target.value.replace(/\D/g, ""));

  const validateMatkaRules = () => {
    const isFlexibleLength = gameType.includes('Bulk') || gameType.includes('Motor') || gameType.includes('COMMON');
    if (gameType !== 'OddEven' && !isFlexibleLength && betNumber.length !== maxLength) {
      alert(`Please enter exactly ${maxLength} digits for ${gameType}.`);
      return false;
    }
    if (gameType !== 'OddEven' && !gameType.includes('Bulk')) {
      const uniqueDigits = new Set(betNumber.split(''));
      if (gameType === 'Single Panna' && uniqueDigits.size !== 3) return alert("All 3 digits must be different (e.g., 146)."), false;
      if (gameType === 'Double Panna' && uniqueDigits.size !== 2) return alert("Exactly 2 digits must be same (e.g., 112)."), false;
      if (gameType === 'Triple Panna' && uniqueDigits.size !== 1) return alert("All 3 digits must be identical (e.g., 777)."), false;
    }
    return true;
  };

  // STANDARD SUBMIT (For Old Form UIs)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!betNumber || !amount) return alert("Please enter both Number and Amount!");
    if (Number(amount) < 10) return alert("Minimum bet amount is ₹10!");
    if (Number(amount) > balance) return alert(`Insufficient balance! Your wallet balance is ₹${balance}.`);
    if (!validateMatkaRules()) return;

    setLoading(true);
    try {
      const response = await Axios({
        url: SummaryApi.placeBid.url, 
        method: SummaryApi.placeBid.method,
        data: { market_id: id, game_type: gameType, session: (gameType === 'Jodi') ? 'Full' : session, bet_number: betNumber, amount: Number(amount) }
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
    if (betNumber === '' || amount === '') return alert(gameType === 'OddEven' ? 'Please select Odd/Even and enter points' : 'Please enter number and points');
    if (parseInt(amount) < 10) return alert('Minimum points is ₹10');
    if (gameType === 'Single' && (parseInt(betNumber) < 0 || parseInt(betNumber) > 9)) return alert('Digit must be between 0 and 9');
    if (gameType === 'Single Panna' && !validateMatkaRules()) return;

    const newBid = { id: Date.now(), session, digit: betNumber, points: parseFloat(amount) };
    setBids([...bids, newBid]);
    if(gameType !== 'OddEven') setBetNumber(''); 
    setAmount('');
  };

  const handleBulkDigitClick = (num) => {
    if (!amount || parseInt(amount) < 10) return alert('Please enter minimum 10 points first.');
    const newBid = { id: Date.now(), session, digit: num, points: parseFloat(amount) };
    setBids([...bids, newBid]);
  };

  const handleRemoveBid = (idToRemove) => setBids(bids.filter(bid => bid.id !== idToRemove));

  // --- GRID LOGIC (Special Mode for Single Panna) ---
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

  // CART & GRID SUBMIT
 // UPDATED CART & GRID SUBMIT (Bulk Payload)
  const handleSubmitCartOrGrid = async () => {
    // 1. Prepare Data
    const payloadBids = isSpecialGridActive 
      ? Object.keys(gridBids).map(pana => ({ digit: pana, points: gridBids[pana], session }))
      : bids;

    if (payloadBids.length === 0) return;
    if (displayTotalPoints > balance) return alert(`Insufficient balance! Your wallet balance is ₹${balance}.`);

    setLoading(true);
    try {
      // 2. Format JSON exactly for backend
      const formattedData = {
        market_id: id,
        game_type: gameType, // e.g., 'SPMotor', 'Single Panna', 'OddEven'
        total_amount: displayTotalPoints, 
        bids: payloadBids.map(bid => ({
          session: bid.session,
          bet_number: String(bid.digit), // Motor ke case me ye "1234" hoga
          amount: bid.points
        }))
      };

      // 3. Send ONLY ONE API Request
      const response = await Axios({
        url: SummaryApi.placeBid.url, 
        method: SummaryApi.placeBid.method,
        data: formattedData // Sending the whole array at once
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

  const isCartGame = ['Single', 'SPMotor', 'DPMotor', 'OddEven', 'Single Panna', 'SingleBulk', 'SinglePannaBulk', 'DoublePannaBulk'].includes(gameType);

  return (
    <div className="w-full bg-gray-50 font-sans pb-10 min-h-screen relative">
      <div className="bg-[#380e4b] text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-30">
        <div className='flex items-center gap-3 cursor-pointer' onClick={handleBack}>
          <FaArrowLeft className="text-xl hover:-translate-x-1 transition-transform" />
          <h1 className="text-[17px] font-black tracking-widest uppercase">
            {gameDetails ? gameDetails.name : "PLAY GAME"} {step === 2 && ` - ${gameOptions.find(o => o.id === gameType)?.label}`}
          </h1>
        </div>
        <div className="bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-inner border border-white/10 text-white">
          <FaWallet className="text-yellow-300 text-lg" />
          <span className="font-bold text-sm">₹ {balance}</span> 
        </div>
      </div>

      {step === 1 && (
        <div className="w-full max-w-7xl mx-auto px-4 mt-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {gameOptions.map((option) => (
              <div key={option.id} onClick={() => { setGameType(option.id); setBetNumber(''); setStep(2); setActiveMode('easy'); }} className="bg-[#380e4b] rounded-xl flex flex-col items-center justify-center p-6 lg:p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-white/10 active:scale-95">
                <div className="bg-white text-[#380e4b] rounded-full w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-3 text-2xl lg:text-3xl shadow-inner">{option.icon}</div>
                <span className="text-white font-bold text-xs lg:text-sm tracking-wide uppercase">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-md mx-auto px-4 mt-8 pb-16">
          
          {/* ========================================================= */}
          {/* UI 1: SINGLE PANNA & SINGLE DIGIT (Easy/Special Tabs)       */}
          {/* ========================================================= */}
          {['Single Panna', 'Single'].includes(gameType) ? (
            <div className="bg-[#f2f2f2] -mx-4 -mt-8 p-4 min-h-screen">
              <div className="flex gap-3 mb-4 bg-white p-2 rounded-xl shadow-sm mt-4">
                <button onClick={() => setActiveMode('easy')} className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${activeMode === 'easy' ? 'bg-[#380e4b] text-white' : 'bg-[#d1d5db] text-gray-700'}`}>Easy Mode</button>
                <button onClick={() => setActiveMode('special')} className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${activeMode === 'special' ? 'bg-[#380e4b] text-white' : 'bg-[#cfd3d8] text-gray-700'}`}>Special Mode</button>
              </div>

              {/* SPECIAL MODE (GRID) */}
              {isSpecialGridActive ? (
                <div className="bg-[#c2c2c2] rounded-2xl p-4 shadow-sm mb-24">
                  <div className="flex items-center gap-3 mb-5 mt-2">
                    <label className="text-[17px] font-bold text-gray-800">Session:</label>
                    <div className="relative flex-1">
                      <select value={session} onChange={(e) => setSession(e.target.value)} className="w-full bg-[#380e4b] text-white p-3.5 rounded-xl appearance-none outline-none font-bold text-[15px]">
                        <option value="Open">Open</option><option value="Close">Close</option>
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none text-sm" />
                    </div>
                  </div>

                  {Object.keys(singlePannaGroups).map(groupDigit => (
                    <div key={groupDigit} className="bg-white rounded-[14px] overflow-hidden mb-5 border-2 border-[#380e4b] shadow-sm">
                       <div className="bg-[#380e4b] text-white text-center py-2.5 font-bold text-[17px]">
                          Pana of {groupDigit}
                       </div>
                       <div className="grid grid-cols-3 gap-3 p-4">
                         {singlePannaGroups[groupDigit].map(pana => (
                            <div key={pana} className="flex flex-col items-center">
                              <span className="font-extrabold text-gray-800 mb-1.5 text-[15px]">{pana}</span>
                              <div className="relative w-full border border-gray-300 rounded-lg bg-white overflow-hidden focus-within:border-[#380e4b] focus-within:ring-1 focus-within:ring-[#380e4b] transition-all">
                                 <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[13px]">₹</span>
                                 <input type="text" inputMode="numeric" value={gridBids[pana] || ''} onChange={(e) => handleGridInputChange(pana, e.target.value)} className="w-full py-2 pl-6 pr-2 text-center font-bold text-gray-700 outline-none bg-transparent" />
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
                  <div className="bg-[#c2c2c2] rounded-xl p-5 shadow-sm mb-4">
                    <h2 className="text-[17px] font-bold text-gray-800 mb-4">Easy Mode - {gameOptions.find(o=>o.id===gameType)?.label}</h2>
                    <div className="mb-4">
                      <label className="block text-[15px] font-bold text-gray-800 mb-1.5">Session</label>
                      <div className="relative">
                        <select value={session} onChange={(e) => setSession(e.target.value)} className="w-full bg-[#380e4b] text-white p-3.5 rounded-lg appearance-none outline-none font-medium">
                          <option value="Open">Open</option><option value="Close">Close</option>
                        </select>
                        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-[15px] font-bold text-gray-800 mb-1.5">{gameType === 'Single' ? 'Digit (0-9)' : 'Pana (3 Digits)'}</label>
                      <input type="number" placeholder={`Enter ${gameType === 'Single' ? 'digit' : 'pana'}`} value={betNumber} onChange={handleBetNumberChange} className="w-full bg-white p-3.5 rounded-lg outline-none focus:ring-2 focus:ring-[#380e4b]" />
                    </div>
                    <div className="mb-5">
                      <label className="block text-[15px] font-bold text-gray-800 mb-1.5">Points (₹)</label>
                      <input type="number" placeholder="Min: ₹10" value={amount} onChange={handleAmountChange} className="w-full bg-white p-3.5 rounded-lg outline-none focus:ring-2 focus:ring-[#380e4b]" />
                    </div>
                    <button onClick={handleAddBid} className="bg-[#380e4b] text-white font-bold py-3 px-6 rounded-lg active:scale-95">Add Bid</button>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm min-h-[120px] mb-24">
                    <h2 className="text-[18px] font-extrabold text-[#3d3d3d] mb-4">Placed Bids (Easy Mode)</h2>
                    {bids.length === 0 ? <div className="text-gray-500 font-medium">No bids added yet.</div> : (
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {bids.map((bid) => (
                          <div key={bid.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <div>
                              <span className="bg-[#380e4b] text-white text-xs px-2 py-1 rounded font-bold mr-2 uppercase">{bid.session}</span>
                              <span className="font-bold text-gray-800">Num: {bid.digit}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-bold text-green-600">₹{bid.points}</span>
                              <button onClick={() => handleRemoveBid(bid.id)} className="text-red-500"><FaTrashAlt size={14}/></button>
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

          /* ========================================================= */
          /* UI 2: BULK GAMES (SinglePannaBulk, SingleBulk etc.)         */
          /* ========================================================= */
          gameType.includes('Bulk') ? (
            <div className="bg-[#f2f2f2] -mx-4 -mt-8 p-4 min-h-screen">
              <div className="bg-[#c2c2c2] rounded-2xl p-5 shadow-sm mt-4 mb-4 border border-gray-200">
                <div className="flex gap-4 mb-5">
                  <div className="flex-1">
                    <label className="block text-[15px] font-bold text-[#1a3636] mb-2">Session</label>
                    <div className="relative">
                      <select value={session} onChange={(e) => setSession(e.target.value)} className="w-full bg-[#380e4b] text-white p-3.5 rounded-xl appearance-none outline-none font-bold text-[15px]">
                         <option value="Open">Open</option><option value="Close">Close</option>
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-sm" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-[15px] font-bold text-[#1a3636] mb-2">Points</label>
                    <input type="number" value={amount} onChange={handleAmountChange} placeholder="Min: ₹10" className="w-full bg-white p-3.5 rounded-xl outline-none font-medium text-[15px]" />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-3">
                   {[1,2,3,4,5,6,7,8,9,0].map(num => (
                      <button key={num} onClick={() => handleBulkDigitClick(num)} className="bg-[#380e4b] text-white font-bold py-3.5 rounded-lg text-lg active:scale-95 shadow-md">
                        {num}
                      </button>
                   ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm mb-24 border border-gray-100 min-h-[140px]">
                 <h2 className="text-[17px] font-bold text-gray-800 mb-3 border-b pb-2">Placed Bids</h2>
                 {bids.length === 0 ? (
                   <div className="text-gray-500 text-[15px] font-medium pt-2">No bids added yet. Use the digit groups above to add bets.</div>
                 ) : (
                   <div className="space-y-2 max-h-48 overflow-y-auto mt-3">
                     {bids.map((bid) => (
                       <div key={bid.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                         <div>
                           <span className="bg-[#380e4b] text-white text-[10px] px-2 py-1 rounded font-bold mr-2 uppercase">{bid.session}</span>
                           <span className="font-bold text-gray-800 text-sm">Group: {bid.digit}</span>
                         </div>
                         <div className="flex items-center gap-3">
                           <span className="font-bold text-green-600">₹{bid.points}</span>
                           <button onClick={() => handleRemoveBid(bid.id)} className="text-red-500 p-1.5"><FaTrashAlt size={13}/></button>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
              </div>
            </div>
          ) :

          /* ============================================== */
          /* UI 3: ODD / EVEN UI                            */
          /* ============================================== */
          gameType === 'OddEven' ? (
             <div className="bg-[#f2f2f2] -mx-4 -mt-8 p-4 min-h-screen">
               <div className="bg-[#c2c2c2] rounded-2xl p-5 shadow-sm mt-4 mb-4 border border-gray-200">
                 <label className="block text-[15px] font-bold text-[#1a3636] mb-2">Session</label>
                 <div className="relative mb-3">
                   <select value={session} onChange={(e) => setSession(e.target.value)} className="w-full bg-[#380e4b] text-white p-3.5 rounded-xl appearance-none outline-none font-bold text-[15px]">
                     <option value="Open">Open</option><option value="Close">Close</option>
                   </select>
                   <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none text-sm" />
                 </div>
                 <div className="w-full bg-white p-3.5 rounded-xl font-bold text-gray-900 mb-6 shadow-sm">{session}</div>
                 <label className="block text-[15px] font-bold text-[#1a3636] mb-3">Choose Parity</label>
                 <div className="flex gap-4">
                   {['Odd', 'Even'].map(parity => (
                      <label key={parity} className="flex-1 cursor-pointer">
                        <input type="radio" className="peer sr-only" checked={betNumber === parity} onChange={() => setBetNumber(parity)} />
                        <div className="flex items-center gap-3 bg-white py-3.5 px-5 rounded-full font-extrabold text-[#380e4b] shadow-sm">
                          <div className={`w-4 h-4 rounded-full border-[3px] flex items-center justify-center ${betNumber === parity ? 'border-[#380e4b]' : 'border-gray-300'}`}>
                            {betNumber === parity && <div className="w-1.5 h-1.5 rounded-full bg-[#380e4b]"></div>}
                          </div> {parity}
                        </div>
                      </label>
                   ))}
                 </div>
               </div>
               <div className="bg-[#c2c2c2] rounded-2xl p-5 shadow-sm mb-4">
                 <label className="block text-[15px] font-bold text-[#1a3636] mb-3">Points & Add</label>
                 <div className="flex gap-3">
                   <input type="number" placeholder="Enter points, min ₹10" value={amount} onChange={handleAmountChange} className="flex-1 bg-white p-3.5 rounded-xl outline-none font-medium text-[15px] shadow-sm" />
                   <button onClick={handleAddBid} className="bg-[#380e4b] text-white font-bold px-8 rounded-xl active:scale-95 shadow-sm">Add</button>
                 </div>
               </div>
               {bids.length > 0 && (
                 <div className="bg-white rounded-2xl p-4 shadow-sm mt-2 mb-24 border border-gray-100">
                   <h2 className="text-[16px] font-bold text-gray-800 mb-3 border-b pb-2">Your Bets</h2>
                   <div className="space-y-2 max-h-48 overflow-y-auto">
                     {bids.map((bid) => (
                       <div key={bid.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                         <div><span className="bg-[#380e4b] text-white text-[10px] px-2 py-1 rounded font-bold mr-2 uppercase">{bid.session}</span><span className="font-bold text-gray-800 text-sm">Parity: {bid.digit}</span></div>
                         <div className="flex items-center gap-3"><span className="font-bold text-green-600">₹{bid.points}</span><button onClick={() => handleRemoveBid(bid.id)} className="text-red-500 p-1.5"><FaTrashAlt size={13}/></button></div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
             </div>
          ) : 

          /* ============================================== */
          /* UI 4: SP MOTOR & DP MOTOR                      */
          /* ============================================== */
          ['SPMotor', 'DPMotor'].includes(gameType) ? (
            <div className="bg-[#f2f2f2] -mx-4 -mt-8 p-4 min-h-screen">
              <div className="bg-[#e4e4e4] rounded-2xl p-5 shadow-sm mt-4 border border-gray-200">
                <div className="flex items-center justify-between mb-5">
                  <label className="text-[16px] font-bold text-[#333] w-1/3">Session</label>
                  <div className="relative w-2/3">
                    <select value={session} onChange={(e) => setSession(e.target.value)} className="w-full bg-[#380e4b] text-white p-3 rounded-xl appearance-none outline-none font-medium text-[15px]">
                      <option value="Open">Open</option><option value="Close">Close</option>
                    </select>
                    <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none text-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <label className="text-[16px] font-bold text-[#333] w-1/3">Digits</label>
                  <div className="w-2/3"><input type="number" placeholder="Number" value={betNumber} onChange={handleBetNumberChange} className="w-full bg-white p-3 rounded-xl outline-none font-medium text-[15px]" /></div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <label className="text-[16px] font-bold text-[#333] w-1/3">Points</label>
                  <div className="w-2/3"><input type="number" placeholder="Min: ₹10" value={amount} onChange={handleAmountChange} className="w-full bg-white p-3 rounded-xl outline-none font-medium text-[15px]" /></div>
                </div>
                <div className="flex justify-end"><button onClick={handleAddBid} className="bg-[#380e4b] text-white font-bold py-2.5 px-8 rounded-xl active:scale-95 transition-transform">Add</button></div>
              </div>
              {bids.length > 0 && (
                <div className="bg-white rounded-2xl p-4 shadow-sm mt-6 mb-24 border border-gray-100">
                  <h2 className="text-[16px] font-bold text-gray-800 mb-3 border-b pb-2">Added Motors</h2>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {bids.map((bid) => (
                      <div key={bid.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div><span className="bg-[#380e4b] text-white text-[10px] px-2 py-1 rounded font-bold mr-2 uppercase">{bid.session}</span><span className="font-bold text-gray-800 text-sm">Number: {bid.digit}</span></div>
                        <div className="flex items-center gap-3"><span className="font-bold text-green-600">₹{bid.points}</span><button onClick={() => handleRemoveBid(bid.id)} className="text-red-500 p-1.5"><FaTrashAlt size={13}/></button></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (

          /* ============================================== */
          /* UI 5: STANDARD OLD UI FOR ALL OTHER GAMES      */
          /* ============================================== */
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h2 className="text-xl font-black text-gray-800 mb-6 text-center border-b pb-4 uppercase flex items-center justify-center gap-3">
                {gameOptions.find(o => o.id === gameType)?.icon} {gameOptions.find(o => o.id === gameType)?.label || gameType}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer"><input type="radio" className="peer sr-only" checked={session === 'Open'} onChange={() => setSession('Open')} /><div className="text-center py-3 rounded-xl border-2 font-bold peer-checked:border-[#380e4b] peer-checked:bg-purple-50 peer-checked:text-[#380e4b] text-gray-400">OPEN</div></label>
                  <label className="flex-1 cursor-pointer"><input type="radio" className="peer sr-only" checked={session === 'Close'} onChange={() => setSession('Close')} /><div className="text-center py-3 rounded-xl border-2 font-bold peer-checked:border-[#380e4b] peer-checked:bg-purple-50 peer-checked:text-[#380e4b] text-gray-400">CLOSE</div></label>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Enter Number</label>
                  <input type="text" inputMode="numeric" value={betNumber} maxLength={maxLength} onKeyDown={blockInvalidChar} onChange={handleBetNumberChange} placeholder={placeholder} className="w-full text-2xl font-black text-center border-2 border-gray-200 rounded-xl py-4 outline-none focus:border-[#380e4b] focus:ring-4 focus:ring-purple-100 tracking-[0.2em] bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Enter Amount (Points)</label>
                  <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">₹</span><input type="text" inputMode="numeric" value={amount} onKeyDown={blockInvalidChar} onChange={handleAmountChange} placeholder="Minimum ₹10" className="w-full text-xl font-bold pl-10 pr-4 border-2 border-gray-200 rounded-xl py-4 outline-none focus:border-[#380e4b] focus:ring-4 focus:ring-purple-100 bg-gray-50" /></div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[#380e4b] text-white font-black text-lg uppercase tracking-wider rounded-xl py-4 mt-6 shadow-lg active:scale-95">
                  {loading ? 'Processing...' : 'Place Bid Now'}
                </button>
              </form>
            </div>
          )}

          {/* ============================================== */
          /* BOTTOM FIXED BAR (For Cart/Grid UI games)      */
          /* ============================================== */}
          {isCartGame && (
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3.5 flex justify-center shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-40">
              <div className="max-w-md w-full flex justify-between items-center px-2">
                <div className="flex gap-4 sm:gap-6">
                  <div className="flex flex-col"><span className="text-gray-500 text-[11px] font-bold uppercase">Total Points</span><span className="text-[16px] font-black text-[#2e0b3d]">₹{displayTotalPoints}</span></div>
                  <div className="flex flex-col"><span className="text-gray-500 text-[11px] font-bold uppercase">Total Bids</span><span className="text-[16px] font-black text-[#2e0b3d]">{displayTotalBids}</span></div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  {(['SPMotor', 'DPMotor', 'SingleBulk', 'SinglePannaBulk', 'DoublePannaBulk'].includes(gameType) || isSpecialGridActive) && (
                    <button onClick={() => isSpecialGridActive ? setGridBids({}) : setBids([])} className="bg-[#ff4d4f] text-white py-2.5 px-4 rounded-xl font-bold text-[13px] sm:text-sm active:scale-95 shadow-sm">
                      Clear All
                    </button>
                  )}
                  <button onClick={handleSubmitCartOrGrid} disabled={displayTotalBids === 0 || loading} className={`py-2.5 px-5 sm:px-8 rounded-xl font-bold text-[13px] sm:text-sm transition-all shadow-sm ${displayTotalBids > 0 ? 'bg-[#380e4b] text-white active:scale-95' : 'bg-[#e0e0e0] text-gray-500 cursor-not-allowed'}`}>
                    {loading ? 'Wait...' : 'Submit'}
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