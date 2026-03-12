import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMobileAlt, FaGift } from "react-icons/fa";
import { IoMdPersonAdd, IoMdContact } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosArrowRoundBack } from "react-icons/io";

export const Sign = () => {
    const navigate = useNavigate();
    const mobileRef = useRef(null);
    const nameRef = useRef(null);
    const passRef = useRef(null);
    const refCodeRef = useRef(null);

    return (
        <div className='bg-mahadev min-h-screen flex flex-col justify-end items-center'>
            <div className='bg-white rounded-t-[40px] shadow-2xl w-full max-w-md p-10 pt-20 pb-10 flex flex-col items-center'>

                <div onClick={()=> navigate('/Login')} className='absolute top-40 left-145 bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors'>
                    <IoIosArrowRoundBack size={30} />
                </div>

                <div className='m-5'>
                    <div className='text-[#2D144B] font-black text-xl mb-8 tracking-tight text-center'>
                        <h2>CREATE YOUR ACCOUNT</h2>
                    </div>
                </div>

                <div className='w-full space-y-4'>

                    <div
                        onClick={() => mobileRef.current.focus()}
                        className='bg-gray-100 border border-gray-200 rounded-2xl flex items-center h-16 px-3 cursor-text hover:bg-gray-200 transition-colors'
                    >
                        <div className='bg-[#31004A] text-white p-3 rounded-xl flex items-center justify-center'>
                            <FaMobileAlt size={22} />
                        </div>
                        <input
                            type="tel"
                            ref={mobileRef}
                            className='bg-transparent focus:outline-none w-full h-full px-4 font-bold text-gray-700 placeholder-gray-400'
                            placeholder='MOBILE NUMBER'
                        />
                    </div>

                    <div
                        onClick={() => nameRef.current.focus()}
                        className='bg-gray-100 border border-gray-200 rounded-2xl flex items-center h-16 px-3 cursor-text hover:bg-gray-200 transition-colors'
                    >
                        <div className='bg-[#31004A] text-white p-3 rounded-xl flex items-center justify-center'>
                            <IoMdContact size={22} />
                        </div>
                        <input
                            type="text"
                            ref={nameRef}
                            className='bg-transparent focus:outline-none w-full h-full px-4 font-bold text-gray-700 placeholder-gray-400'
                            placeholder='FULL NAME'
                        />
                    </div>

                    <div
                        onClick={() => passRef.current.focus()}
                        className='bg-gray-100 border border-gray-200 rounded-2xl flex items-center h-16 px-3 cursor-text hover:bg-gray-200 transition-colors'
                    >
                        <div className='bg-[#31004A] text-white p-3 rounded-xl flex items-center justify-center'>
                            <RiLockPasswordFill size={22} />
                        </div>
                        <input
                            type="password"
                            ref={passRef}
                            className='bg-transparent focus:outline-none w-full h-full px-4 font-bold text-gray-700 placeholder-gray-400'
                            placeholder='PASSWORD'
                        />
                    </div>

                    <div
                        onClick={() => refCodeRef.current.focus()}
                        className='bg-gray-100 border border-gray-200 rounded-2xl flex items-center h-16 px-3 cursor-text hover:bg-gray-200 transition-colors'
                    >
                        <div className='bg-[#31004A] text-white p-3 rounded-xl flex items-center justify-center'>
                            <FaGift size={22} />
                        </div>
                        <input
                            type="text"
                            ref={refCodeRef}
                            className='bg-transparent focus:outline-none w-full h-full px-4 font-bold text-gray-700 placeholder-gray-400'
                            placeholder='REFERRAL CODE (OPTIONAL)'
                        />
                    </div>

                    <button className='bg-[#31004A] text-white w-full h-16 rounded-2xl flex items-center justify-center active:scale-95 transition-all shadow-lg hover:opacity-90 mt-6'>
                        <div className='flex items-center gap-2'>
                            <IoMdPersonAdd size={26} />
                            <p className='font-bold text-xl tracking-wide'>SIGN UP</p>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    );
};