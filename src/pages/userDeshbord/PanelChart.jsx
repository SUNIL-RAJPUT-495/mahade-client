import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Calendar } from 'lucide-react';

const PanelChart = () => {
  const navigate = useNavigate();
  const [selectedMarket, setSelectedMarket] = useState('Kalyan');
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  // Dummy Markets List
  const markets = ['Kalyan', 'Milan Day', 'Rajdhani Night', 'Main Bazar'];

  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          week: '10 Feb - 16 Feb',
          mon: { open: '128', jodi: '14', close: '239' },
          tue: { open: '345', jodi: '28', close: '189' },
          wed: { open: '145', jodi: '03', close: '148' },
          thu: { open: '246', jodi: '21', close: '245' },
          fri: { open: '358', jodi: '67', close: '124' },
          sat: { open: '123', jodi: '68', close: '170' },
          sun: { open: '***', jodi: '**', close: '***' },
        },
        {
          week: '03 Feb - 09 Feb',
          mon: { open: '237', jodi: '25', close: '140' },
          tue: { open: '159', jodi: '55', close: '230' },
          wed: { open: '248', jodi: '49', close: '450' },
          thu: { open: '369', jodi: '82', close: '138' },
          fri: { open: '135', jodi: '90', close: '460' },
          sat: { open: '234', jodi: '91', close: '380' },
          sun: { open: '124', jodi: '74', close: '158' },
        },
        {
          week: '27 Jan - 02 Feb',
          mon: { open: '346', jodi: '31', close: '560' },
          tue: { open: '147', jodi: '24', close: '239' },
          wed: { open: '258', jodi: '51', close: '146' },
          thu: { open: '129', jodi: '27', close: '340' },
          fri: { open: '458', jodi: '76', close: '123' },
          sat: { open: '247', jodi: '32', close: '138' },
          sun: { open: '138', jodi: '28', close: '260' },
        }
      ];
      setChartData(mockData);
      setLoading(false);
    }, 800);
  }, [selectedMarket]);

  // ✨ UPDATED FUNCTION: For Traditional Vertical-Horizontal-Vertical Layout ✨
  const renderCell = (dayData, isSunday = false) => {
    const isPending = dayData.jodi === '**';
    
    // String ko array mein convert kar rahe hain taaki ek ke niche ek dikha sakein
    const openDigits = dayData.open.split('');
    const closeDigits = dayData.close.split('');

    return (
      <td className={`p-1.5 sm:p-2 border-r border-gray-200 min-w-[80px] sm:min-w-[110px] align-middle ${isSunday ? 'bg-red-50/30' : ''}`}>
        <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-2.5">
          
          {/* Left: Open Pana (Vertical line) */}
          <div className={`flex flex-col items-center justify-center text-[10px] sm:text-xs font-bold leading-[1.2] ${isPending ? 'text-red-400' : 'text-gray-500'}`}>
            {openDigits.map((digit, i) => (
              <span key={`open-${i}`}>{digit}</span>
            ))}
          </div>

          {/* Center: Jodi Result */}
          <span className={`text-base sm:text-2xl font-black ${isPending ? 'text-red-500' : (isSunday ? 'text-red-600' : 'text-gray-900')}`}>
            {dayData.jodi}
          </span>

          {/* Right: Close Pana (Vertical line) */}
          <div className={`flex flex-col items-center justify-center text-[10px] sm:text-xs font-bold leading-[1.2] ${isPending ? 'text-red-400' : 'text-gray-500'}`}>
            {closeDigits.map((digit, i) => (
              <span key={`close-${i}`}>{digit}</span>
            ))}
          </div>

        </div>
      </td>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      
      {/* HEADER */}
      <div className="bg-[#210c2e] text-white p-4 flex items-center gap-3 shadow-md sticky top-0 z-40">
        <button 
          onClick={() => navigate(-1)} 
          className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition"
        >
          <FaArrowLeft className="text-lg text-gray-300" />
        </button>
        <h1 className="text-xl font-bold tracking-wide text-white flex-1">Panel Chart</h1>
      </div>

      <div className="max-w-7xl mx-auto p-4 mt-2">
        
        {/* MARKET SELECTOR */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#380e4b] font-bold">
            <Calendar className="w-5 h-5" />
            <span>Select Market Panel</span>
          </div>
          
          <select 
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="w-full sm:w-auto bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#380e4b] font-bold cursor-pointer transition-all"
          >
            {markets.map((market, index) => (
              <option key={index} value={market}>{market}</option>
            ))}
          </select>
        </div>

        {/* CHART CONTAINER */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          
          <div className="bg-gradient-to-r from-[#380e4b] to-[#210c2e] p-4 text-center">
            <h2 className="text-xl sm:text-2xl font-black text-yellow-400 tracking-wider uppercase">
              {selectedMarket} PANEL CHART
            </h2>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-500 font-bold animate-pulse">
              Loading Panel Data...
            </div>
          ) : (
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-center border-collapse min-w-[750px]">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-xs sm:text-sm uppercase tracking-wide border-b-2 border-gray-300">
                    <th className="p-3 border-r border-gray-200 font-black">Mon</th>
                    <th className="p-3 border-r border-gray-200 font-black">Tue</th>
                    <th className="p-3 border-r border-gray-200 font-black">Wed</th>
                    <th className="p-3 border-r border-gray-200 font-black">Thu</th>
                    <th className="p-3 border-r border-gray-200 font-black">Fri</th>
                    <th className="p-3 border-r border-gray-200 font-black">Sat</th>
                    <th className="p-3 font-black text-red-600">Sun</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-purple-50/50 transition-colors">
                      {renderCell(row.mon)}
                      {renderCell(row.tue)}
                      {renderCell(row.wed)}
                      {renderCell(row.thu)}
                      {renderCell(row.fri)}
                      {renderCell(row.sat)}
                      {renderCell(row.sun, true)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PanelChart;