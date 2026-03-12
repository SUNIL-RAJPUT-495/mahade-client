import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            {/* Header */}
            <div className="bg-mahadev text-white h-16 px-4 flex items-center shadow-md sticky top-0 z-50">
                <div className='flex items-center gap-4'>
                    <div
                        onClick={() => navigate('/')}
                        className='bg-white/20 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors'
                    >
                        <IoIosArrowRoundBack size={30} color="white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-widest mt-1">
                        PROFILE
                    </h1>
                </div>
            </div>

            {/* Profile Card Container (Centered for both Mobile & PC) */}
            <div className="max-w-md mx-auto mt-6 px-4">
                <div className='bg-white shadow-lg border border-gray-100 rounded-2xl p-6 flex flex-col items-center'>

                    {/* Avatar & Basic Info */}
                    <div className='bg-mahadev shadow-md rounded-full w-20 h-20 text-white text-3xl font-extrabold flex items-center justify-center mb-3'>
                        S
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Subham</h2>
                    <p className="text-gray-500 font-medium mb-6">+91 8079003424</p>

                    {/* Detailed Info Box */}
                    <div className='w-full bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col gap-4'>

                        {/* Wallet Row */}
                        <div className='flex justify-between items-center border-b border-gray-200 pb-3'>
                            <div className="text-gray-600 font-medium">Wallet Balance</div>
                            <div className="font-bold text-lg text-gray-800">₹ 500</div>
                        </div>

                        {/* Status Row */}
                        <div className='flex justify-between items-center border-b border-gray-200 pb-3'>
                            <div className="text-gray-600 font-medium">Status</div>
                            <div className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide'>
                                Active
                            </div>
                        </div>

                        {/* Referral Row */}
                        <div className='flex justify-between items-center border-b border-gray-200 pb-3'>
                            <div className="text-gray-600 font-medium">Referral Code</div>
                            <div className="font-bold text-mahadev tracking-wider">SHU9292</div>
                        </div>

                        {/* Member Since Row */}
                        <div className='flex justify-between items-center'>
                            <div className="text-gray-600 font-medium">Member Since</div>
                            <div className="font-semibold text-gray-700">18 Feb 2026</div>
                        </div>

                    </div>

                </div>
            </div>
          

        </div>
    );
}

export default Profile;