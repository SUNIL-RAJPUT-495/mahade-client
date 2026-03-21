import React, { useState } from 'react';
import {
  QrCode,
  AlertTriangle,
  X,
  Info,
  Plus,
  User,
  RefreshCw,
  LayoutGrid
} from 'lucide-react';

export const UpiSettingsPage = () => {
  // States for interactive elements
  const [showError, setShowError] = useState(true);
  const [showDebug, setShowDebug] = useState(true);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-6 md:p-10 font-sans text-gray-800">

      {/* 1. Header Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-2">
          <LayoutGrid className="text-[#ef4444] w-8 h-8" />
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] tracking-tight">
            UPI Settings Management
          </h1>
        </div>
        <p className="text-gray-500 text-sm md:text-base">
          Configure and manage UPI payment options for your application
        </p>
      </div>

      <div className="max-w-6xl mx-auto">

        {/* 2. Error Alert */}
        {showError && (
          <div className="bg-[#ffebeb] border-l-[5px] border-[#ef4444] rounded-r-md p-4 mb-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2 text-[#b91c1c] font-medium">
              <AlertTriangle className="w-5 h-5" />
              <span>No response received from server</span>
            </div>
            <button onClick={() => setShowError(false)} className="text-[#b91c1c] hover:bg-red-100 p-1 rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* 3. Debug Information Alert */}
        {showDebug && (
          <div className="bg-[#e0f2fe] border-l-[5px] border-[#3b82f6] rounded-r-md p-4 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-[#1d4ed8] font-semibold">
                <Info className="w-5 h-5" />
                <span>Debug Information</span>
              </div>
              <button onClick={() => setShowDebug(false)} className="text-[#1d4ed8] hover:bg-blue-200 p-1 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-[#f0f9ff]/60 border border-blue-100 rounded-lg p-4 font-mono text-sm text-[#2563eb] whitespace-pre-wrap">
              {`{
  "request": "Request sent but no response received"
}`}
            </div>
          </div>
        )}

        {/* 4. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left Card: Add New UPI */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Plus className="w-6 h-6 text-[#10b981] stroke-[3]" />
              <h2 className="text-xl font-bold text-gray-800">Add New UPI</h2>
            </div>

            <div className="space-y-6">
              {/* UPI ID Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">UPI ID</label>
                <div className="relative flex items-center">
                  <QrCode className="w-5 h-5 text-gray-400 absolute left-3" />
                  <input
                    type="text"
                    placeholder="example@ybl"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Enter a valid UPI ID in the format username@provider</p>
              </div>

              {/* Display Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Display Name</label>
                <div className="relative flex items-center">
                  <User className="w-5 h-5 text-gray-400 absolute left-3" />
                  <input
                    type="text"
                    placeholder="LocalMart"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">This name will be displayed to users during payment</p>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center gap-4 py-2">
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Set as active UPI</h3>
                  <p className="text-xs text-gray-500">Only active UPIs can receive payments</p>
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2">
                <Plus className="w-5 h-5" />
                Add UPI
              </button>
            </div>
          </div>

          {/* Right Card: Manage UPI Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-6 h-6 text-[#3b82f6]" />
                <h2 className="text-xl font-bold text-gray-800">Manage UPI Settings</h2>
              </div>
              <button className="flex items-center gap-1.5 text-sm text-[#3b82f6] hover:text-blue-700 font-medium transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            {/* Empty State */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center text-center h-[350px]">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <QrCode className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">No UPI settings found</h3>
              <p className="text-sm text-gray-500 max-w-[250px]">
                Add your first UPI setting using the form
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};