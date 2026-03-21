import React, { useState } from 'react';
import { PlusCircle, Upload } from 'lucide-react';

export const HowToPlayManager = () => {
  const [pageTitle, setPageTitle] = useState('');

  const handleSave = () => {
    // Yahan aap apna API call ya save logic add kar sakte hain
    console.log("Saving Content with Title:", pageTitle);
    alert("Content save triggered! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] p-6 flex justify-center items-start pt-12 font-sans">
      
      {/* Main Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 p-8">
        
        {/* 1. Header */}
        <h1 className="text-[28px] font-bold text-[#0f172a] tracking-tight mb-8">
          Manage How To Play Content
        </h1>

        {/* 2. Page Title Input Area */}
        <div className="mb-8">
          <label htmlFor="pageTitle" className="block text-sm font-semibold text-[#334155] mb-2">
            Overall Page Title
          </label>
          <input 
            id="pageTitle"
            type="text" 
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            placeholder="e.g., Ultimate Guide to Our Games" 
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-800 text-base"
          />
        </div>

        {/* 3. Sections Area */}
        <div className="mb-8">
          <h2 className="text-[22px] font-bold text-[#0f172a] tracking-tight mb-4">
            Sections
          </h2>
          
          {/* Dashed 'Add New Section' Button */}
          <button 
            type="button"
            className="w-full py-4 border border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
          >
            <PlusCircle className="w-5 h-5" strokeWidth={1.5} />
            Add New Section
          </button>
        </div>

        {/* 4. Save Button */}
        <button 
          onClick={handleSave}
          className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm text-base"
        >
          <Upload className="w-5 h-5" />
          Save All Content
        </button>

      </div>
    </div>
  );
};
