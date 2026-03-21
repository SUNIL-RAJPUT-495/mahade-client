import React, { useState } from 'react';
import { 
  Banknote, 
  AlertTriangle, 
  Filter, 
  Check, 
  X, 
  Loader2 
} from 'lucide-react';

export const WithdrawalRequestsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All Requests');
  const [showError, setShowError] = useState(true); // Image mein error banner dikh raha hai
  const [testEmptyState, setTestEmptyState] = useState(false); // Toggle to test empty state

  // Dummy Data
  const initialData = [
    { id: '#WID-9012', user: 'Neha Gupta', method: 'Bank Transfer', account: 'XXXX-XXXX-1234', amount: '₹15,000', status: 'Pending', date: '18 Mar 2026, 11:30 AM' },
    { id: '#WID-9013', user: 'Rohan Sharma', method: 'UPI', account: 'rohan@ybl', amount: '₹4,500', status: 'Approved', date: '18 Mar 2026, 09:45 AM' },
    { id: '#WID-9014', user: 'Ayesha Khan', method: 'Paytm', account: '9876543210', amount: '₹2,000', status: 'Rejected', date: '17 Mar 2026, 07:20 PM' },
    { id: '#WID-9015', user: 'Kabir Singh', method: 'Bank Transfer', account: 'XXXX-XXXX-9876', amount: '₹50,000', status: 'Pending', date: '17 Mar 2026, 04:15 PM' },
    { id: '#WID-9016', user: 'Pooja Verma', method: 'UPI', account: 'pooja@okhdfcbank', amount: '₹8,000', status: 'Approved', date: '16 Mar 2026, 02:10 PM' },
  ];

  // Filtering Logic
  const filteredData = testEmptyState ? [] : initialData.filter((item) => {
    if (activeFilter === 'All Requests') return true;
    return item.status === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-6 md:p-10 font-sans text-gray-800">
      
      {/* 1. Header Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Banknote className="text-[#ef4444] w-9 h-9" />
          <h1 className="text-3xl font-bold text-[#1e293b] tracking-tight">Withdrawal Requests</h1>
        </div>
        <p className="text-gray-500 text-sm">Manage and process user withdrawal requests</p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* 2. Error Banner */}
        {showError && (
          <div className="bg-[#fef2f2] border-l-[4px] border-[#ef4444] rounded-r-lg p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#b91c1c]">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium">Failed to fetch withdraw requests.</span>
            </div>
            <button onClick={() => setShowError(false)} className="text-[#b91c1c] hover:bg-red-100 p-1 rounded transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 3. Filter Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-800">Filter Requests</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveFilter('All Requests')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'All Requests' ? 'bg-[#283548] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <Filter className="w-4 h-4" /> All Requests
            </button>
            <button 
              onClick={() => setActiveFilter('Approved')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'Approved' ? 'bg-[#dcfce7] text-[#166534] shadow-sm' : 'bg-[#f0fdf4] text-green-600 hover:bg-[#dcfce7]'}`}
            >
              <Check className="w-4 h-4" /> Approved
            </button>
            <button 
              onClick={() => setActiveFilter('Rejected')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'Rejected' ? 'bg-[#fee2e2] text-[#991b1b] shadow-sm' : 'bg-[#fef2f2] text-red-600 hover:bg-[#fee2e2]'}`}
            >
              <X className="w-4 h-4" /> Rejected
            </button>
            <button 
              onClick={() => setActiveFilter('Pending')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'Pending' ? 'bg-[#fef9c3] text-[#ca8a04] shadow-sm' : 'bg-[#fefce8] text-yellow-600 hover:bg-[#fef9c3]'}`}
            >
              <Loader2 className="w-4 h-4" /> Pending
            </button>
          </div>
        </div>

        {/* Dev Toggle for Testing */}
        <div className="flex justify-end">
          <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
            <input 
              type="checkbox" 
              checked={testEmptyState} 
              onChange={(e) => setTestEmptyState(e.target.checked)} 
              className="rounded text-blue-600"
            />
            Force Empty State (For Testing)
          </label>
        </div>

        {/* 4. Data View / Empty State */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[350px] flex flex-col">
          
          {filteredData.length === 0 ? (
            /* EMPTY STATE UI */
            <div className="flex flex-col items-center justify-center flex-1 p-12 text-center">
              <div className="bg-gray-50 p-5 rounded-full mb-5 border border-gray-100">
                <Banknote className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Withdrawal Requests</h3>
              <p className="text-gray-500 text-sm max-w-md">
                There are no withdrawal requests matching your current filter. Try selecting a different status.
              </p>
            </div>
          ) : (
            /* DATA TABLE UI */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Request ID</th>
                    <th className="px-6 py-4 font-semibold">User</th>
                    <th className="px-6 py-4 font-semibold">Method & Account</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredData.map((withdraw, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-[#ef4444]">{withdraw.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{withdraw.user}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">{withdraw.method}</div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">{withdraw.account}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-800">{withdraw.amount}</td>
                      <td className="px-6 py-4 text-gray-500">{withdraw.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center w-max gap-1.5
                          ${withdraw.status === 'Pending' ? 'bg-[#fef9c3] text-[#ca8a04]' : 
                            withdraw.status === 'Approved' ? 'bg-[#dcfce7] text-[#166534]' : 
                            'bg-[#fee2e2] text-[#991b1b]'}`}
                        >
                          {withdraw.status === 'Pending' && <Loader2 className="w-3 h-3" />}
                          {withdraw.status === 'Approved' && <Check className="w-3 h-3" />}
                          {withdraw.status === 'Rejected' && <X className="w-3 h-3" />}
                          {withdraw.status}
                        </span>
                      </td>
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
