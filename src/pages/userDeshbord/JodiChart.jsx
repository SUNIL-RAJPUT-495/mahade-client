import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Calendar } from 'lucide-react';

const JodiChart = () => {
  const navigate = useNavigate();
  const [selectedMarket, setSelectedMarket] = useState('Kalyan');
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  // Dummy Markets List
  const markets = ['Kalyan', 'Milan Day', 'Rajdhani Night', 'Main Bazar'];

  // Dummy API Call Simulate karne ke liye
  useEffect(() => {
    setLoading(true);
    // Yahan aap apna actual API call lagayenge (e.g., fetchJodiChart(selectedMarket))
    setTimeout(() => {
      const mockData = [
        { week: '10 Feb - 16 Feb', mon: '12', tue: '45', wed: '89', thu: '00', fri: '34', sat: '78', sun: '**' },
        { week: '03 Feb - 09 Feb', mon: '67', tue: '23', wed: '11', thu: '90', fri: '56', sat: '44', sun: '19' },
        { week: '27 Jan - 02 Feb', mon: '05', tue: '88', wed: '32', thu: '71', fri: '29', sat: '65', sun: '40' },
        { week: '20 Jan - 26 Jan', mon: '54', tue: '10', wed: '99', thu: '43', fri: '87', sat: '21', sun: '66' },
        { week: '13 Jan - 19 Jan', mon: '33', tue: '76', wed: '08', thu: '52', fri: '14', sat: '95', sun: '27' },
      ];
      setChartData(mockData);
      setLoading(false);
    }, 800);
  }, [selectedMarket]);

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
        <h1 className="text-xl font-bold tracking-wide text-white flex-1">Jodi Chart</h1>
      </div>

      <div className="max-w-4xl mx-auto p-4 mt-2">
        
        {/* MARKET SELECTOR */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#380e4b] font-bold">
            <Calendar className="w-5 h-5" />
            <span>Select Market Chart</span>
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
              {selectedMarket} CHART
            </h2>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-500 font-bold animate-pulse">
              Loading Chart Data...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse min-w-[500px]">
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
                    <tr key={index} className="border-b border-gray-200 hover:bg-purple-50 transition-colors">
                      <td className={`p-3 sm:p-4 border-r border-gray-200 font-bold text-lg sm:text-xl ${row.mon === '**' ? 'text-red-500' : 'text-gray-800'}`}>{row.mon}</td>
                      <td className={`p-3 sm:p-4 border-r border-gray-200 font-bold text-lg sm:text-xl ${row.tue === '**' ? 'text-red-500' : 'text-gray-800'}`}>{row.tue}</td>
                      <td className={`p-3 sm:p-4 border-r border-gray-200 font-bold text-lg sm:text-xl ${row.wed === '**' ? 'text-red-500' : 'text-gray-800'}`}>{row.wed}</td>
                      <td className={`p-3 sm:p-4 border-r border-gray-200 font-bold text-lg sm:text-xl ${row.thu === '**' ? 'text-red-500' : 'text-gray-800'}`}>{row.thu}</td>
                      <td className={`p-3 sm:p-4 border-r border-gray-200 font-bold text-lg sm:text-xl ${row.fri === '**' ? 'text-red-500' : 'text-gray-800'}`}>{row.fri}</td>
                      <td className={`p-3 sm:p-4 border-r border-gray-200 font-bold text-lg sm:text-xl ${row.sat === '**' ? 'text-red-500' : 'text-gray-800'}`}>{row.sat}</td>
                      <td className={`p-3 sm:p-4 font-bold text-lg sm:text-xl ${row.sun === '**' ? 'text-red-500' : 'text-red-600'}`}>{row.sun}</td>
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

export default JodiChart;