import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Gift, 
  UserPlus, 
  Users, 
  AlertTriangle,
  RefreshCw,
  Save,
  ChevronDown,
  Wallet 
} from 'lucide-react';
import SummaryApi from '../../common/SummerAPI';
import AxiosAdmin from '../../utils/axiosAdmin';

export const BonusManagementPage = () => {
  // States
  const [signupBonus, setSignupBonus] = useState(0);
  const [referrerBonus, setReferrerBonus] = useState(0);
  const [referredBonus, setReferredBonus] = useState(0);
  const [maxReferrals, setMaxReferrals] = useState(0);
  const [isPercentage, setIsPercentage] = useState(false);
  const [minDeposit, setMinDeposit] = useState(0);
  const [minWithdrawal, setMinWithdrawal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  
  const fetchSettings = async () => {
    try {
      const response = await AxiosAdmin({
        url: SummaryApi.getTransactionSettings.url,
        method: SummaryApi.getTransactionSettings.method
      });
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        setSignupBonus(data.signupBonus || 0);
        setReferrerBonus(data.referralBonus || 0); 
        setReferredBonus(data.referredBonus || 0);
        setMaxReferrals(data.maxReferrals || 0);
        setIsPercentage(data.isPercentage || false);
        setMinDeposit(data.minDeposit || 0);
        setMinWithdrawal(data.minWithdrawal || 0);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // --- Update Settings Logic ---
  const handalUpdateSettings = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosAdmin({
        url: SummaryApi.updateTransactionSettings.url,
        method: SummaryApi.updateTransactionSettings.method,
        data:{
          signupBonus,
          referralBonus: referrerBonus, 
          referredBonus,
          maxReferrals,
          isPercentage,
          minDeposit,      
          minWithdrawal    
        }
      })
      if (response.data.success) {
        alert(response.data.message || "Settings Updated Successfully!");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update settings.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-6 font-sans text-gray-800">
      
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-7 h-7 text-[#8b5cf6]" />
        <h1 className="text-2xl font-bold text-[#1e293b]">Bonus & Limits Management</h1>
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
              <Settings className="w-5 h-5" />
              <h2 className="text-lg font-bold">App Settings</h2>
            </div>
            <p className="text-purple-200 text-sm">Configure bonuses and transaction limits</p>
          </div>

          <div className="p-6">
            
            {/* Form Fields */}
            <div className="space-y-6">
              
              {/* --- SECTION 1: TRANSACTION LIMITS --- */}
              <h3 className="font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-purple-600"/> Transaction Limits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Minimum Deposit */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Minimum Deposit</label>
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50 focus-within:border-[#7c3aed] focus-within:ring-1 focus-within:ring-[#7c3aed] transition-all">
                    <span className="px-3 text-gray-500">₹</span>
                    <input 
                      type="number" 
                      value={minDeposit}
                      onChange={(e) => setMinDeposit(e.target.value)}
                      className="w-full py-2 outline-none bg-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Min amount user can add</p>
                </div>

                {/* Minimum Withdrawal */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Minimum Withdrawal</label>
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50 focus-within:border-[#7c3aed] focus-within:ring-1 focus-within:ring-[#7c3aed] transition-all">
                    <span className="px-3 text-gray-500">₹</span>
                    <input 
                      type="number" 
                      value={minWithdrawal}
                      onChange={(e) => setMinWithdrawal(e.target.value)}
                      className="w-full py-2 outline-none bg-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Min amount user can withdraw</p>
                </div>
              </div>

              {/* --- SECTION 2: BONUS SETTINGS --- */}
              <h3 className="font-bold text-gray-800 border-b pb-2 mt-4 flex items-center gap-2">
                <Gift className="w-4 h-4 text-purple-600"/> Bonus Settings
              </h3>

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

              {/* Toggle: Referral Bonus Type */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm text-gray-700">Referral Bonus Type</label>
                  <p className="text-xs text-gray-500">Choose whether referral bonuses are fixed amounts or percentages</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className={`font-medium ${!isPercentage ? 'text-[#8b5cf6]' : 'text-gray-500'}`}>Fixed</span>
                  
                  {/* Custom Toggle Switch */}
                  <button 
                    onClick={() => setIsPercentage(!isPercentage)}
                    className={`w-11 h-6 rounded-full relative transition-colors ${isPercentage ? 'bg-[#8b5cf6]' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isPercentage ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </button>

                  <span className={`font-medium ${isPercentage ? 'text-[#8b5cf6]' : 'text-gray-500'}`}>Percent</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Awarded to the user who refers</p>
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
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Awarded to the referred user</p>
                </div>
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
              {/* Reset button ab fetchSettings ko call karega taaki purana data wapas aa jaye */}
              <button 
                onClick={fetchSettings} 
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
              
              <button 
                onClick={handalUpdateSettings} 
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-[#9333ea] hover:bg-[#7e22ce] text-white rounded-md transition-colors text-sm font-medium disabled:opacity-70"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Right Column: Settings Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
          {/* Header */}
          <div className="bg-[#f97316] p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-5 h-5" />
              <h2 className="text-lg font-bold">App Rules Preview</h2>
            </div>
            <p className="text-orange-100 text-sm">See how your rules will be applied to users</p>
          </div>

          <div className="p-6 space-y-4">
            
            {/* Box 1: Transaction Limits Preview */}
            <div className="border border-indigo-200 bg-indigo-50/50 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-800 mb-1">Transaction Limits</h3>
              <ul className="text-sm text-indigo-700 list-disc list-inside space-y-1">
                <li>Users must deposit at least <span className="font-bold">₹{minDeposit || 0}</span></li>
                <li>Users can only withdraw if they have <span className="font-bold">₹{minWithdrawal || 0}</span></li>
              </ul>
            </div>

            {/* Box 2: New User Signup */}
            <div className="border border-orange-200 bg-orange-50/50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-1">New User Signup</h3>
              <p className="text-sm text-orange-700">
                A new user will receive <span className="font-bold">{signupBonus || 0} points</span> upon signup.
              </p>
            </div>

            {/* Box 3: Referral Scenario */}
            <div className="border border-purple-200 bg-purple-50/50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Referral Scenario</h3>
              <p className="text-sm text-purple-700 mb-1">
                When a user refers someone:
              </p>
              <ul className="text-sm text-purple-700 list-disc list-inside space-y-1">
                <li>Referrer gets <span className="font-bold">{referrerBonus || 0}{isPercentage ? '%' : ' points'}</span></li>
                <li>Referred user gets <span className="font-bold">{referredBonus || 0}{isPercentage ? '%' : ' points'}</span></li>
              </ul>
            </div>

            {/* Box 4: Referral Limits */}
            <div className="border border-blue-200 bg-blue-50/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-1">Referral Limits</h3>
              <p className="text-sm text-blue-700">
                Each user can refer up to <span className="font-bold">{maxReferrals || 0} users</span>. After reaching this limit, their code will not award bonuses.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};