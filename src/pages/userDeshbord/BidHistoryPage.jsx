import React, { useState } from 'react';
import SummaryApi from '../../common/SummerAPI';
import Axios from '../../utils/axios';
import { useEffect } from 'react';
const BidHistoryPage = () => {
  const [bids, setBids] = useState([]);



  const featchBidHistory = async () => {
    try {
      const response = await Axios({
        url:SummaryApi.getUserBids.url,
        method:SummaryApi.getUserBids.method
      });
      if (response.data.bids) {
        setBids(response.data.bids);
      }
      console.log(response.data.bids);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    featchBidHistory();
  }, []);
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bid History</h1>
          <p className="text-sm text-gray-500 mt-1">View all your recent game bids</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Bids Placed</p>
          <p className="text-2xl font-bold text-green-600">{bids.length}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <th className="p-4 border-b">Bidder</th>
              <th className="p-4 border-b">Bid Amount</th>
              <th className="p-4 border-b">Date & Time</th>
              <th className="p-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => (
              <tr key={bid._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    {(bid.game_type || bid.market_id?.name || 'G').charAt(0)}
                  </div>
                  <span className="font-medium text-gray-800">{bid.market_id?.name || bid.game_type}</span>
                </td>
                <td className="p-4 border-b font-semibold text-gray-800">
                  ₹{bid.amount}
                </td>
                <td className="p-4 border-b text-gray-500 text-sm">
                  {formatDate(bid.createdAt)}
                </td>
                <td className="p-4 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      bid.status === 'Winner'
                        ? 'bg-green-100 text-green-700'
                        : bid.status === 'Loser' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {bid.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {bids.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No bids have been placed yet. Be the first!
        </div>
      )}
    </div>
  );
};

export default BidHistoryPage;