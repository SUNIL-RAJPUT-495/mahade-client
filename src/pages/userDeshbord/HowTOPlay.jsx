import React from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaPlayCircle, FaWallet, FaMoneyCheckAlt, FaGamepad, FaUserPlus } from "react-icons/fa";

export const HowTOPlay = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            {/* Header Area */}
            <div className="bg-mahadev text-white h-16 px-4 flex items-center shadow-md sticky top-0 z-50">
                <div className='flex items-center gap-4'>
                    <div
                        onClick={() => navigate("/")}
                        className='bg-white/20 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors'
                    >
                        <IoIosArrowRoundBack size={30} color="white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-widest mt-1 drop-shadow-sm uppercase">
                        How To Play
                    </h1>
                </div>
            </div>

            {/* 4 Full Width Buttons Section (Beech wala dabba hata diya) */}
            <div className="max-w-md mx-auto px-4 mt-8 space-y-3">
                <h2 className="font-bold text-gray-800 ml-1 mb-4 text-sm uppercase tracking-wider border-b border-gray-200 pb-2">
                    Tutorial Videos
                </h2>

                {/* Button 1: How to Deposit */}
                <button className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-mahadev transition-all group active:scale-[0.98]">
                    <div className="bg-mahadev/10 p-3 rounded-full text-mahadev group-hover:bg-mahadev group-hover:text-white transition-colors">
                        <FaWallet size={20} />
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-800 text-base">How to Deposit</h3>
                        <p className="text-[11px] text-gray-500 font-medium">Learn how to add funds to wallet</p>
                    </div>
                    <FaPlayCircle size={24} className="text-gray-300 group-hover:text-mahadev transition-colors" />
                </button>

                {/* Button 2: How to Withdraw */}
                <button className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-mahadev transition-all group active:scale-[0.98]">
                    <div className="bg-mahadev/10 p-3 rounded-full text-mahadev group-hover:bg-mahadev group-hover:text-white transition-colors">
                        <FaMoneyCheckAlt size={20} />
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-800 text-base">How to Withdraw</h3>
                        <p className="text-[11px] text-gray-500 font-medium">Learn how to withdraw your winnings</p>
                    </div>
                    <FaPlayCircle size={24} className="text-gray-300 group-hover:text-mahadev transition-colors" />
                </button>

                {/* Button 3: How to Play Game */}
                <button className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-mahadev transition-all group active:scale-[0.98]">
                    <div className="bg-mahadev/10 p-3 rounded-full text-mahadev group-hover:bg-mahadev group-hover:text-white transition-colors">
                        <FaGamepad size={20} />
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-800 text-base">How to Play Game</h3>
                        <p className="text-[11px] text-gray-500 font-medium">Step-by-step guide to play & win</p>
                    </div>
                    <FaPlayCircle size={24} className="text-gray-300 group-hover:text-mahadev transition-colors" />
                </button>

                {/* Button 4: How to Register */}
                <button className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-mahadev transition-all group active:scale-[0.98]">
                    <div className="bg-mahadev/10 p-3 rounded-full text-mahadev group-hover:bg-mahadev group-hover:text-white transition-colors">
                        <FaUserPlus size={20} />
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-800 text-base">How to Register</h3>
                        <p className="text-[11px] text-gray-500 font-medium">Guide to create a new account</p>
                    </div>
                    <FaPlayCircle size={24} className="text-gray-300 group-hover:text-mahadev transition-colors" />
                </button>

            </div>
        </div>
    );
};