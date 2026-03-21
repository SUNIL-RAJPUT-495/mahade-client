import React, { useState } from 'react';
import { 
  Settings, 
  Gift, 
  UserPlus, 
  Users, 
  AlertTriangle,
  RefreshCw,
  Save,
  ChevronDown
} from 'lucide-react';

export const BonusManagementPage = () => {
  // State management to make the preview card dynamic
  const [signupBonus, setSignupBonus] = useState(500);
  const [referrerBonus, setReferrerBonus] = useState(25);
  const [referredBonus, setReferredBonus] = useState(25);
  const [maxReferrals, setMaxReferrals] = useState(50);
  const [isPercentage, setIsPercentage] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-6 font-sans text-gray-800">
      
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-7 h-7 text-[#8b5cf6]" />
        <h1 className="text-2xl font-bold text-[#1e293b]">Bonus Management</h1>
      </div>

      {/* 1. Top Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 border-l-[4px] border-l-[#8b5cf6] p-5 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg text-[#8b5cf6]">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Bonus Awarded</p>
            <p className="text-xl font-bold text-gray-800">0</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 border-l-[4px] border-l-[#10b981] p-5 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-[#10b981]">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Signup Bonuses</p>
            <p className="text-xl font-bold text-gray-800">0</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 border-l-[4px] border-l-[#f59e0b] p-5 flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-lg text-[#f59e0b]">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Referral Bonuses</p>
            <p className="text-xl font-bold text-gray-800">0</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 border-l-[4px] border-l-[#3b82f6] p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-[#3b82f6]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Active Users</p>
            <p className="text-xl font-bold text-gray-800">0</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Settings (Left) & Preview (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1.2fr] gap-6 items-start">
        
        {/* 2. Left Column: Bonus Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-[#7c3aed] p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-5 h-5" />
              <h2 className="text-lg font-bold">Bonus Settings</h2>
            </div>
            <p className="text-purple-200 text-sm">Configure the bonus amounts awarded to users</p>
          </div>

          <div className="p-6">
            {/* Error Banner */}
            <div className="bg-[#fff1f2] border-l-[4px] border-[#ef4444] p-4 mb-6 flex items-center gap-2 text-[#e11d48] text-sm font-medium">
              <AlertTriangle className="w-4 h-4" />
              Failed to load bonus settings
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              
              {/* Signup Bonus */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">Signup Bonus</label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50 focus-within:border-[#7c3aed] focus-within:ring-1 focus-within:ring-[#7c3aed] transition-all">
                  <span className="px-3 text-gray-500">₹</span>
                  <input 
                    type="number" 
                    value={signupBonus}
                    onChange={(e) => setSignupBonus(e.target.value)}
                    className="w-full py-2 outline-none bg-transparent"
                  />
                  <span className="px-3 text-gray-500 text-sm">points</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Bonus points awarded to new users upon signup</p>
              </div>

              {/* Referral Bonus Recipients Dropdown */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">Referral Bonus Recipients</label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] bg-white">
                    <option>Both Referrer and Referred User</option>
                    <option>Only Referrer</option>
                    <option>Only Referred User</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Choose who receives the referral bonus</p>
              </div>

              <hr className="border-gray-200" />

              {/* Toggle: Referral Bonus Type */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm text-gray-700">Referral Bonus Type</label>
                  <p className="text-xs text-gray-500">Choose whether referral bonuses are fixed amounts or percentages of the referred user's deposit</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className={`font-medium ${!isPercentage ? 'text-[#8b5cf6]' : 'text-gray-500'}`}>Fixed Amount</span>
                  
                  {/* Custom Toggle Switch */}
                  <button 
                    onClick={() => setIsPercentage(!isPercentage)}
                    className={`w-11 h-6 rounded-full relative transition-colors ${isPercentage ? 'bg-[#8b5cf6]' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isPercentage ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </button>

                  <span className={`font-medium ${isPercentage ? 'text-[#8b5cf6]' : 'text-gray-500'}`}>Percentage of Deposit</span>
                </div>
              </div>

              {/* Referrer Bonus */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">Referrer Bonus</label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50 focus-within:border-[#7c3aed] focus-within:ring-1 focus-within:ring-[#7c3aed] transition-all">
                  <span className="px-3 text-gray-500">{isPercentage ? '%' : '₹'}</span>
                  <input 
                    type="number" 
                    value={referrerBonus}
                    onChange={(e) => setReferrerBonus(e.target.value)}
                    className="w-full py-2 outline-none bg-transparent"
                  />
                  <span className="px-3 text-gray-500 text-sm">points</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Fixed bonus points awarded to the user who refers someone</p>
              </div>

              {/* Referred User Bonus */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">Referred User Bonus</label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50 focus-within:border-[#7c3aed] focus-within:ring-1 focus-within:ring-[#7c3aed] transition-all">
                  <span className="px-3 text-gray-500">{isPercentage ? '%' : '₹'}</span>
                  <input 
                    type="number" 
                    value={referredBonus}
                    onChange={(e) => setReferredBonus(e.target.value)}
                    className="w-full py-2 outline-none bg-transparent"
                  />
                  <span className="px-3 text-gray-500 text-sm">points</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Fixed bonus points awarded to the user who was referred</p>
              </div>

              {/* Maximum Referral Limit */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">Maximum Referral Limit</label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50 focus-within:border-[#7c3aed] focus-within:ring-1 focus-within:ring-[#7c3aed] transition-all">
                  <input 
                    type="number" 
                    value={maxReferrals}
                    onChange={(e) => setMaxReferrals(e.target.value)}
                    className="w-full py-2 px-3 outline-none bg-transparent"
                  />
                  <span className="px-3 text-gray-500 text-sm">users</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Maximum number of referrals allowed per user</p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-8">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#9333ea] hover:bg-[#7e22ce] text-white rounded-md transition-colors text-sm font-medium">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* 3. Right Column: Bonus Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
          {/* Header */}
          <div className="bg-[#f97316] p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-5 h-5" />
              <h2 className="text-lg font-bold">Bonus Preview</h2>
            </div>
            <p className="text-orange-100 text-sm">See how bonuses will be applied to users</p>
          </div>

          <div className="p-6 space-y-4">
            
            {/* Box 1: New User Signup */}
            <div className="border border-orange-200 bg-orange-50/50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-1">New User Signup</h3>
              <p className="text-sm text-orange-700">
                A new user will receive <span className="font-bold">{signupBonus || 0} points</span> upon signup.
              </p>
            </div>

            {/* Box 2: Referral Scenario */}
            <div className="border border-purple-200 bg-purple-50/50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Referral Scenario</h3>
              <p className="text-sm text-purple-700 mb-1">
                When a user refers someone, <span className="font-bold">both users</span> receive bonuses:
              </p>
              <ul className="text-sm text-purple-700 list-disc list-inside space-y-1">
                <li>Referrer gets <span className="font-bold">{referrerBonus || 0} {isPercentage ? '%' : 'points'}</span></li>
                <li>Referred user gets <span className="font-bold">{referredBonus || 0} {isPercentage ? '%' : 'points'}</span> (plus the signup bonus of {signupBonus || 0} points)</li>
              </ul>
            </div>

            {/* Box 3: Referral Limits */}
            <div className="border border-blue-200 bg-blue-50/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-1">Referral Limits</h3>
              <p className="text-sm text-blue-700">
                Each user can refer up to <span className="font-bold">{maxReferrals || 0} users</span> to earn referral bonuses. <br/>
                After reaching this limit, their referral code will no longer award bonuses.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
