import React, { useState } from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';

export const GameRatesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All Categories');

  return (
    <div className="min-h-screen bg-[#f4f5f7] p-6 md:p-10 font-sans text-gray-800 flex justify-center items-start">
      
      {/* Main Container Wrapper */}
      <div className="w-full max-w-5xl space-y-6">
        
        {/* 1. Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight mb-1">
              Game Rates Management
            </h1>
            <p className="text-gray-500 text-sm">
              Manage betting rates for main and starline games
            </p>
          </div>
          <button className="bg-[#f97316] hover:bg-[#ea580c] text-white font-medium py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm whitespace-nowrap">
            <Plus className="w-5 h-5" />
            Add New Rate
          </button>
        </div>

        {/* 2. Search and Filter Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-3" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search game rates..." 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder-gray-400 text-sm"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative min-w-[200px]">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-lg py-2.5 pl-4 pr-10 appearance-none outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm bg-white cursor-pointer"
            >
              <option value="All Categories">All Categories</option>
              <option value="Main Games">Main Games</option>
              <option value="Starline Games">Starline Games</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3.5 pointer-events-none" />
          </div>

        </div>

        {/* 3. Data View / Empty State Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Orange Table Header */}
          <div className="bg-[#f97316] px-6 py-4">
            <h2 className="text-white font-semibold text-lg">
              Game Rates (0)
            </h2>
          </div>

          {/* Empty State Body */}
          <div className="p-16 flex items-center justify-center text-center">
            <p className="text-gray-500">
              No game rates found
            </p>
          </div>
          
        </div>

      </div>
    </div>
  );
};
