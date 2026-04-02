import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Using standard SVG instead of FaArrowLeft/Calendar to reduce dependencies, 
// but you can swap them back if you prefer lucide-react/react-icons.

// Reusable component for the complex day cells
const DayCell = ({ data }) => {
  if (!data || data.jodi === '**') {
    return (
      <div className="flex items-center justify-center gap-1.5 p-1 min-w-[90px]">
         <span className="text-gray-300 font-bold">-</span>
      </div>
    );
  }

  const openDigits = data.open.split('');
  const closeDigits = data.close.split('');
  
  // Handling cases where there might be 'X' or less than 3 digits
  const paddedOpen = [...openDigits, ...Array(Math.max(0, 3 - openDigits.length)).fill('X')].slice(0, 3);
  const paddedClose = [...closeDigits, ...Array(Math.max(0, 3 - closeDigits.length)).fill('X')].slice(0, 3);

  return (
    <div className="flex items-center justify-center gap-1.5 p-1 min-w-[90px]">
      {/* Left Stack (Open Pana) */}
      <div className="flex flex-col gap-1">
        {paddedOpen.map((num, i) => (
          <div key={`open-${i}`} className="w-6 h-6 border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-800 bg-white">
            {num}
          </div>
        ))}
      </div>

      {/* Middle Number (Jodi) */}
      <div className="w-4 flex items-center justify-center text-base font-bold text-gray-900">
        {data.jodi}
      </div>

      {/* Right Stack (Close Pana) */}
      <div className="flex flex-col gap-1">
        {paddedClose.map((val, i) => (
          <div key={`close-${i}`} className="w-6 h-6 border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-800 bg-white">
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

const PanelChart = () => {
  const navigate = useNavigate();
  const [selectedMarket, setSelectedMarket] = useState('Kalyan');
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const markets = ['Kalyan', 'Milan Day', 'Rajdhani Night', 'Main Bazar'];

  useEffect(() => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      const mockData = [
        {
          weekRange: '30/03 - 05/04/2026',
          mon: { open: '345', jodi: '2', close: 'XXX' },
          tue: { open: '678', jodi: '1', close: 'XXX' },
          wed: { open: '444', jodi: '2', close: '119' },
          thu: { open: '119', jodi: '1', close: 'XXX' },
          fri: null,
          sat: null,
          sun: null,
        },
        {
          weekRange: '23/03 - 29/03/2026',
          mon: { open: '456', jodi: '5', close: 'XXX' },
          tue: { open: '440', jodi: '8', close: 'XXX' },
          wed: { open: '456', jodi: '5', close: 'XXX' },
          thu: { open: '789', jodi: '4', close: 'XXX' },
          fri: { open: '444', jodi: '2', close: 'XXX' },
          sat: { open: '116', jodi: '8', close: 'XXX' },
          sun: { open: '990', jodi: '8', close: 'XXX' },
        },
        {
          weekRange: '16/03 - 22/03/2026',
          mon: { open: '116', jodi: '8', close: 'XXX' },
          tue: { open: '774', jodi: '8', close: 'XXX' },
          wed: { open: '555', jodi: '5', close: 'XXX' },
          thu: { open: '890', jodi: '7', close: 'XXX' },
          fri: { open: '123', jodi: '6', close: 'XXX' },
          sat: { open: '880', jodi: '6', close: 'XXX' },
          sun: { open: '123', jodi: '6', close: 'XXX' },
        }
      ];
      setChartData(mockData);
      setLoading(false);
    }, 800);
  }, [selectedMarket]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-10">
      
      {/* Sticky Header Section */}
      <div className="bg-[#2f0c4c] text-white px-4 py-3 flex items-center shadow-md sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="bg-white text-[#2f0c4c] rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="flex-1 text-center pr-8">
          <h1 className="text-xl font-bold tracking-wide">Panel Chart</h1>
          {/* Market Selector instead of static time */}
          <select 
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="mt-1 bg-transparent text-sm font-medium border-b border-white/30 focus:outline-none pb-0.5 cursor-pointer"
          >
            {markets.map((market, index) => (
              <option key={index} value={market} className="text-black">{market}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="p-2 md:p-4 overflow-x-auto mt-4">
        
        {loading ? (
           <div className="flex justify-center mt-20">
             <div className="animate-pulse text-[#2f0c4c] font-bold text-lg tracking-widest">
               LOADING {selectedMarket.toUpperCase()}...
             </div>
           </div>
        ) : (
          <div className="min-w-max bg-white border border-gray-200 shadow-sm">
            <table className="w-full text-center border-collapse">
              
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-200 p-3 text-sm font-semibold text-gray-700 min-w-[150px]">
                    Week Range
                  </th>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                    <th key={idx} className="bg-[#2f0c4c] border border-[#482069] p-3 text-sm font-semibold text-white min-w-[90px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {chartData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
                    
                    {/* Week Range Column */}
                    <td className="border border-gray-200 p-4 font-bold text-gray-700 text-sm whitespace-nowrap bg-gray-50/50">
                      {row.weekRange}
                    </td>
                    
                    {/* Daily Data Columns */}
                    <td className="border border-gray-200 p-1"><DayCell data={row.mon} /></td>
                    <td className="border border-gray-200 p-1"><DayCell data={row.tue} /></td>
                    <td className="border border-gray-200 p-1"><DayCell data={row.wed} /></td>
                    <td className="border border-gray-200 p-1"><DayCell data={row.thu} /></td>
                    <td className="border border-gray-200 p-1"><DayCell data={row.fri} /></td>
                    <td className="border border-gray-200 p-1"><DayCell data={row.sat} /></td>
                    <td className="border border-gray-200 p-1"><DayCell data={row.sun} /></td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default PanelChart; 