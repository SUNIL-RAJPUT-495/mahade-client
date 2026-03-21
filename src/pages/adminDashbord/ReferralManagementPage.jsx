import React from 'react';
import { 
  Users, 
  Flag, 
  Download, 
  Search, 
  Filter, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

export const ReferralManagementPage = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] p-6 md:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-[#ea580c]" />
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b]">Referral Management</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#fef3c7] hover:bg-[#fde68a] text-[#b45309] px-4 py-2.5 rounded-md font-medium text-sm transition-colors">
              <Flag className="w-4 h-4" />
              Show Flagged Only
            </button>
            <button className="flex items-center gap-2 bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-md font-medium text-sm transition-colors">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* 2. Search & Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-3" />
            <input 
              type="text" 
              placeholder="Search by user ID or referral code" 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors text-sm"
            />
          </div>
          
          <div className="flex gap-3">
            <button className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm">
              Search
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* 3. Error Banner */}
        <div className="bg-[#fff1f2] border-l-[4px] border-[#ef4444] rounded-r-md p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-2 text-[#e11d48]">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium text-sm">Failed to load referral data</span>
          </div>
        </div>

        {/* 4. Empty State Area */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-24 flex flex-col items-center justify-center mb-6">
          <div className="text-gray-300 mb-4">
            {/* Custom group of users icon to match the empty state style */}
            <Users className="w-16 h-16" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No referrals found</h3>
          <p className="text-gray-500 text-sm">No referral data is available at this time.</p>
        </div>

        {/* 5. Pagination Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 mt-4 px-2">
          <p>Showing page 1 of 1</p>
          <div className="flex items-center gap-1 mt-3 sm:mt-0">
            <button disabled className="flex items-center gap-1 px-3 py-1.5 text-gray-400 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button disabled className="flex items-center gap-1 px-3 py-1.5 text-gray-400 cursor-not-allowed">
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};