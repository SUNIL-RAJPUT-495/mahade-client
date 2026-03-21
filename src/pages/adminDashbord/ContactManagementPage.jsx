import React from 'react';
import { Plus, Phone } from 'lucide-react';

 export const ContactManagementPage = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] p-6 md:p-10 font-sans flex justify-center items-start">
      
      {/* Main Container Card */}
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* 1. Header Section */}
        <div className="bg-[#3b49df] px-6 py-5 text-white">
          <h1 className="text-2xl font-bold tracking-wide mb-1">Contact Management</h1>
          <p className="text-blue-100 text-sm">Manage your contact information</p>
        </div>

        {/* 2. Content Area */}
        <div className="p-6">
          
          {/* Top Full-width Button */}
          <button className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 mb-6 transition-colors shadow-sm">
            <Plus className="w-5 h-5 stroke-[3]" />
            Add New Contact
          </button>

          {/* 3. Empty State Box (Dashed Border) */}
          <div className="border border-dashed border-gray-300 bg-gray-50/30 rounded-lg p-12 flex flex-col items-center justify-center min-h-[350px]">
            
            {/* Phone Icon in Circle */}
            <div className="bg-[#e0e7ff] p-4 rounded-full mb-5">
              <Phone className="w-8 h-8 text-[#4f46e5]" fill="currentColor" />
            </div>
            
            {/* Text Information */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No contacts found
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Add your first contact to get started
            </p>
            
            {/* Smaller Action Button */}
            <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium py-2 px-5 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
              <Plus className="w-4 h-4 stroke-[3]" />
              Add Contact
            </button>
            
          </div>

        </div>
      </div>
    </div>
  );
};
