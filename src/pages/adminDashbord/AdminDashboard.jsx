import React, { useState } from 'react';
import {
  FiCalendar,
  FiRefreshCw,
  FiUsers,
  FiDollarSign,
  FiCreditCard,
  FiActivity,
  FiTrendingUp,
  FiClock,
  FiGift,
  FiBarChart2,
  FiDownload,
  FiSearch,
  FiFilter
} from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";

export const AdminDashboard = () => {
  // 1. Tab switch karne ke liye state banayi
  const [activeTab, setActiveTab] = useState('overview');

  const statCards = [
    { title: "TOTAL USERS", value: "0", subtitle: "↗ +0 today", subtitleColor: "text-green-500", headerColor: "bg-blue-600", iconBg: "bg-blue-100", iconColor: "text-blue-600", icon: FiUsers },
    { title: "TOTAL DEPOSITS", value: "₹0", subtitle: "Total deposits", subtitleColor: "text-gray-500", headerColor: "bg-green-700", iconBg: "bg-green-100", iconColor: "text-green-700", icon: FiDownload },
    { title: "TOTAL WITHDRAWALS", value: "₹0", subtitle: "Total withdrawals", subtitleColor: "text-gray-500", headerColor: "bg-purple-600", iconBg: "bg-purple-100", iconColor: "text-purple-600", icon: FiCreditCard },
    { title: "TOTAL BETS", value: "₹0", subtitle: "Total game bets placed", subtitleColor: "text-gray-500", headerColor: "bg-blue-500", iconBg: "bg-cyan-100", iconColor: "text-cyan-500", icon: FiActivity },
    { title: "TOTAL WINNINGS", value: "₹0", subtitle: "Total game winnings paid", subtitleColor: "text-gray-500", headerColor: "bg-green-500", iconBg: "bg-green-100", iconColor: "text-green-500", icon: FiTrendingUp },
    { title: "ADMIN PROFIT/LOSS", value: "₹0", subtitle: "Profit for selected period", subtitleColor: "text-gray-500", headerColor: "bg-green-600", iconBg: "bg-green-100", iconColor: "text-green-600", icon: FiDollarSign },
    { title: "PENDING WITHDRAWALS", value: "₹0", subtitle: "0 requests", subtitleColor: "text-orange-500", headerColor: "bg-orange-500", iconBg: "bg-orange-100", iconColor: "text-orange-500", icon: FiClock },
    { title: "TOTAL BONUSES GIVEN", value: "₹0", subtitle: "Amount given as bonuses", subtitleColor: "text-gray-500", headerColor: "bg-pink-600", iconBg: "bg-pink-100", iconColor: "text-pink-600", icon: FiGift }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans ">

      {/* Top Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, Sunil! Here's what's happening today.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-100">
              <FiCalendar className="text-blue-500" />
              <span>Friday, 13 March 2026</span>
            </div>

            <select className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              <option>All Time</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>

            <button className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-100">
              <FiRefreshCw className="text-blue-500" />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

      {/* Tabs Section - Isme activeTab ke hisaab se colors change honge */}
      <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex flex-wrap gap-2 w-max border border-gray-100">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-gray-600 hover:bg-gray-50'}`}
        >
          <FiBarChart2 size={18} /> Overview
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-gray-600 hover:bg-gray-50'}`}
        >
          <FiUsers size={18} /> Users
        </button>
        <button onClick={() => setActiveTab('transactions')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'transactions' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-gray-600 hover:bg-gray-50'}`}>
          <FiDollarSign size={18} /> transactions
        </button>
        <button onClick={() => setActiveTab('Withdrawal')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'Withdrawal' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-gray-600 hover:bg-gray-50'}`}>
          <BiMoneyWithdraw size={18} /> Withdrawals
        </button>
      </div>

      {/* 2. Conditional Rendering: Agar tab 'overview' hai toh pichla design dikhega */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`${card.headerColor} text-white text-xs font-bold px-5 py-2.5 tracking-wider`}>
                  {card.title}
                </div>
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{card.value}</h3>
                    <p className={`text-sm mt-1.5 font-medium ${card.subtitleColor}`}>
                      {card.subtitle}
                    </p>
                  </div>
                  <div className={`p-3.5 rounded-xl ${card.iconBg} ${card.iconColor}`}>
                    <card.icon size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2 min-h-[300px] flex flex-col border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
                <a href="#" className="text-blue-500 text-sm hover:underline font-medium">View All</a>
              </div>
              <div className="flex-1 flex items-center justify-center text-gray-500 text-sm font-medium">
                No recent transactions found
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-between p-3.5 rounded-xl bg-[#fff8e6] text-[#b37400] hover:bg-[#ffeec2] transition-colors w-full border border-yellow-100">
                  <div className="flex items-center gap-3 font-semibold text-sm">
                    <FiClock size={18} /> Pending Withdrawals
                  </div>
                  <span className="bg-[#f0c14b] text-yellow-900 text-xs py-0.5 px-2.5 rounded-full font-bold">0</span>
                </button>
                <button className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors w-full font-semibold text-sm border border-blue-100">
                  <FiUsers size={18} /> Manage Users
                </button>
                <button className="flex items-center gap-3 p-3.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors w-full font-semibold text-sm border border-green-100">
                  <FiDollarSign size={18} /> View Transactions
                </button>
                <button className="flex items-center gap-3 p-3.5 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors w-full font-semibold text-sm border border-purple-100">
                  <FiBarChart2 size={18} /> Analytics
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 mt-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Transaction Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {['Total Deposits', 'Total Withdrawals', 'Game Winnings', 'Game Losses'].map((title, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
                  <p className={`text-2xl font-bold ${i % 2 === 0 ? 'text-green-500' : 'text-red-500'} mb-1`}>₹0</p>
                  <p className="text-xs font-medium text-gray-400">0 transactions</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 3. Conditional Rendering: Agar tab 'users' hai toh Naya Design dikhega */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col min-h-[250px]">

          {/* Header Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="text-xl font-bold text-gray-900">User Management</h2>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search Box */}
              <div className="relative w-full md:w-64">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>

              {/* Filter Dropdown */}
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
                <span>All Users</span>
                <FiFilter className="text-gray-400" size={16} />
              </button>
            </div>
          </div>

          {/* Empty State / Body */}
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-base">No users found matching your search criteria</p>
          </div>

          {/* Footer Pagination */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-700">0</span> of <span className="font-semibold text-gray-700">0</span> users</p>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-1.5 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
                Next
              </button>
            </div>
          </div>

        </div>
      )}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col min-h-[250px]">

          {/* Header Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center">
                <select

                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  {/* Dropdown ke options */}
                  <option value="pending" className="bg-white text-gray-700 font-medium">All Types</option>
                  <option value="pending" className="bg-white text-gray-700 font-medium">Deposites</option>
                  <option value="confirm" className="bg-white text-gray-700 font-medium">Withdrawals</option>
                  <option value="reject" className="bg-white text-gray-700 font-medium">Game Wins</option>
                  <option value="reject" className="bg-white text-gray-700 font-medium">Game Losses</option>
                  <option value="reject" className="bg-white text-gray-700 font-medium">Game Bets</option>
                  <option value="reject" className="bg-white text-gray-700 font-medium">Bonuses</option>
                  <option value="reject" className="bg-white text-gray-700 font-medium">Admin Added Funds</option>
                  <option value="reject" className="bg-white text-gray-700 font-medium">Admin deductednFunds</option>
                </select>
              </div>
              <div className="flex items-center">
                <select

                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  {/* Dropdown ke options */}
                  <option value="pending" className="bg-white text-gray-700 font-medium">All Status</option>
                  <option value="pending" className="bg-white text-gray-700 font-medium">Pending</option>
                  <option value="confirm" className="bg-white text-gray-700 font-medium">Confirm</option>
                  <option value="reject" className="bg-white text-gray-700 font-medium">Reject</option>
                </select>
              </div>


            </div>
          </div>

          {/* Empty State / Body */}
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-base">No transactions found</p>
          </div>

          {/* Footer Pagination */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-700">0</span> of <span className="font-semibold text-gray-700">0</span> users</p>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-1.5 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
                Next
              </button>
            </div>
          </div>

        </div>)}

      {activeTab === 'Withdrawal' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col min-h-[250px]">

          {/* Header Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="text-xl font-bold text-gray-900">Withdrawal Requests</h2>

            <div className="flex items-center gap-3 w-full md:w-auto">

              <div className="flex items-center">
                <select

                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  <option value="pending" className="bg-white text-gray-700 font-medium">All Status</option>
                  <option value="pending" className="bg-white text-gray-700 font-medium">Pending</option>
                  <option value="confirm" className="bg-white text-gray-700 font-medium">Approved</option>
                  <option value="reject" className="bg-white text-gray-700 font-medium">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-base"> No withdrawal requests found</p>
            
          </div>

          {/* Footer Pagination */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-700">0</span> of <span className="font-semibold text-gray-700">0</span> users</p>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-1.5 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
                Next
              </button>
            </div>
          </div>

        </div>)}



    </div>
  );
};