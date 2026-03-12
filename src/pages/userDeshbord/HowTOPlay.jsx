import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { BsCameraVideoOffFill } from "react-icons/bs";


export const HowTOPlay = () => {
    const navigate = useNavigate()
    return (
        <div>
            {/* Header Area */}
            <div className="bg-mahadev text-white h-16 px-4 flex items-center shadow-md sticky top-0 z-50">
                <div className='flex items-center gap-4'>
                    <div
                        onClick={() => navigate("/")}
                        className='bg-white/20 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors'
                    >
                        <IoIosArrowRoundBack size={30} color="white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-widest mt-1 drop-shadow-sm">
                        How To Play
                    </h1>
                </div>
            </div>
            <div className='bg-white m-4  border-mahadev rounded-xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col items-center justify-center cursor-pointer group hover:-translate-y-0.5 h-auto w-auto'>
                <div className='text-center'>
                    <div className='text-gray-400 text-center'>  <BsCameraVideoOffFill size={80} /></div>
                    <p className='font-bold text-2xl text-gray-700'>No Tutorial Video Available</p>
                    <p className='text-gray-700'>Tutorial video will appear here once added by admin.</p>
                </div>
            </div>
        </div>
    )
}
