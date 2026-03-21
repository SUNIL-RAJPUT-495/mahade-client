import React, { useState, useEffect } from 'react';
import { IoAdd, IoSettingsOutline, IoListOutline } from "react-icons/io5";
import Axios from '../../utils/axios';
import SummaryApi from '../../common/SummerAPI';
// Aapka external API function
import { fetchGame } from '../../utils/api'; 

export const AddGamesPages = () => {
  // --- STATE ---
  const [formData, setFormData] = useState({
    name: '',
    open_time: '',
    close_time: ''
  });
  
  // Games list aur loading indicator ka state
  const [gamesList, setGamesList] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- FETCH GAMES LOGIC ---
  const loadAllGames = async () => {
    setLoading(true);
    try {
      // Aapka function data la raha hai
      const response = await fetchGame(); 
      
      // Response check karke data set kar rahe hain. 
      // Agar backend directly array bhej raha hai to `response` chalega, 
      // agar axios format me bhej raha hai to `response.data` hoga.
      if (response && response.data) {
        setGamesList(response.data); 
      } else if (Array.isArray(response)) {
        setGamesList(response);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  // Component mount (load) hote hi list layega
  useEffect(() => {
    loadAllGames();
  }, []);

  // --- ADD GAME LOGIC ---
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.open_time || !formData.close_time) {
      alert("Please fill all the fields!");
      return;
    }

    try {
      const response = await Axios({
        url: SummaryApi.addGame.url,
        method: SummaryApi.addGame.method,
        data: {
          name: formData.name, 
          open_time: formData.open_time,
          close_time: formData.close_time
        }
      });

      alert(response.data.message || "Game added successfully!");
      
      // Form fields clear kar diye
      setFormData({ name: '', open_time: '', close_time: '' });
      
      // ✨ Naya game add hone ke baad list turant refresh hogi
      loadAllGames(); 

    } catch (error) {
      console.error("Error adding game:", error);
      alert(error?.response?.data?.message || "Something went wrong!");
    }
  };

  // --- TOGGLE GAME STATUS LOGIC ---
  const handleToggleStatus = async (gameId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Closed' : 'Active';
    
    try {
      await Axios({
        url: SummaryApi.updateGameStatus.url, 
        method: SummaryApi.updateGameStatus.method,
        data: {
          gameId: gameId,
          status: newStatus
        }
      });
      
      // Success hone par bina page refresh kiye list update ho jayegi
      setGamesList(prevGames => 
        prevGames.map(game => 
          game._id === gameId ? { ...game, status: newStatus } : game
        )
      );

    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  // --- UI RENDER ---
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4 gap-6">
      
      {/* ======================================= */}
      {/* TOP SECTION: ADD NEW GAME */}
      {/* ======================================= */}
      <div className="w-full max-w-4xl shadow-xl rounded-2xl bg-white overflow-hidden">
        
        <div className="bg-blue-50 p-6 border-b border-blue-100">
          <div className="flex items-center gap-3 mb-1">
            <span className='bg-blue-100 p-2 rounded-full'>
              <IoSettingsOutline className="text-blue-600 text-3xl" />
            </span> 
            <h2 className="text-blue-600 font-bold text-2xl">Admin Panel</h2>
          </div>
          <p className="text-gray-600 ml-12">Manage your Games/Markets and their timings</p>
        </div>

        <div className="p-6">
          <h3 className="font-bold text-xl mb-4 text-gray-800">Add New Game</h3>
          
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <div className="flex flex-col flex-1 gap-1">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Game Name</label>
              <input 
                id="name" value={formData.name} onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all w-full" 
                type="text" placeholder="e.g. Kalyan, Milan Day" 
              />
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <label htmlFor="open_time" className="text-sm font-medium text-gray-700">Opening Time</label>
              <input 
                id="open_time" value={formData.open_time} onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all w-full" 
                type="time" 
              />
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <label htmlFor="close_time" className="text-sm font-medium text-gray-700">Closing Time</label>
              <input 
                id="close_time" value={formData.close_time} onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all w-full" 
                type="time" 
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 flex justify-end border-t border-gray-100">
          <button 
            onClick={handleSubmit} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors font-medium shadow-sm"
          >
            Add Game <IoAdd className="text-xl" />
          </button>
        </div>
      </div>

      {/* ======================================= */}
      {/* BOTTOM SECTION: GAMES LIST TABLE */}
      {/* ======================================= */}
      <div className="w-full max-w-4xl shadow-xl rounded-2xl bg-white overflow-hidden mb-10">
        <div className="bg-gray-800 p-5 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <IoListOutline className="text-white text-2xl" />
            <h3 className="font-bold text-lg text-white">All Active & Closed Games</h3>
          </div>
        </div>

        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
                <th className="p-4 font-semibold">Game Name</th>
                <th className="p-4 font-semibold">Open Time</th>
                <th className="p-4 font-semibold">Close Time</th>
                <th className="p-4 font-semibold">Current Status</th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">Loading games...</td>
                </tr>
              ) : gamesList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">No games added yet.</td>
                </tr>
              ) : (
                gamesList.map((game) => (
                  <tr key={game._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">{game.name}</td>
                    <td className="p-4 text-gray-600">{game.open_time}</td>
                    <td className="p-4 text-gray-600">{game.close_time}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        game.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {game.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleToggleStatus(game._id, game.status)}
                        className={`px-4 py-1.5 rounded text-sm font-medium text-white transition-colors ${
                          game.status === 'Active' 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                      >
                        {game.status === 'Active' ? 'Stop Betting' : 'Start Betting'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};