import React, { useRef } from 'react';
import { FaMobileAlt, FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { Link } from 'react-router-dom';

export const Login = () => {
    const focusInput = useRef(null);
    const handleClick = () => {
        focusInput.current.focus();
    };

    return (
        <div className='bg-mahadev min-h-screen flex flex-col justify-end items-center'>

            <div className='bg-white rounded-t-[40px] shadow-2xl w-full max-w-md p-10 pt-20 pb-10 flex flex-col items-center'>

                <div className='m-5'> 
                    <div className='w-32 h-32 bg-[#31004A] border-2 text-white flex items-center justify-center rounded-2xl shadow-lg'>
                        <span className="text-xs">LOGO</span>
                    </div>
                </div>

                <h2 className='text-[#2D144B] font-black text-xl mb-8 tracking-tight text-center'>
                    ENTER YOUR MOBILE NUMBER
                </h2>

                <div className='w-full space-y-4'>
                    <div
                        onClick={handleClick}
                        className='bg-gray-100 border border-gray-200 rounded-2xl flex items-center h-16 px-3 cursor-text hover:bg-gray-200 transition-colors'
                    >
                        <div className='bg-[#31004A] text-white p-3 rounded-xl flex items-center justify-center'>
                            <FaMobileAlt size={22} />
                        </div>

                        <input
                            type="tel"
                            ref={focusInput}
                            className='bg-transparent focus:outline-none w-full h-full px-4 font-bold text-gray-700 placeholder-gray-400'
                            placeholder='MOBILE NUMBER'
                        />
                    </div>

                    <button className='bg-[#31004A] text-white w-full h-16 rounded-2xl flex items-center justify-center active:scale-95 transition-all shadow-lg hover:opacity-90'>
                        <div className='flex items-center gap-2'>
                            <MdOutlineLogin size={26} />
                            <p className='font-bold text-xl tracking-wide'>LOGIN</p>
                        </div>
                    </button>
                </div>

                
                <div className='flex justify-center items-center gap-5 mt-10'>
                    <a 
                        href="https://wa.me/911234567890" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className='bg-[#31004A] text-white p-4 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-110 active:scale-90 transition-all'
                    >
                        <FaWhatsapp size={24} />
                    </a>
                    
                    <a 
                        href="tel:+911234567890" 
                        className='bg-[#31004A] text-white p-4 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-110 active:scale-90 transition-all'
                    >
                        <IoCall size={24} />
                    </a>
                </div>

                <div className='mt-10 text-center'>
                    <p className='text-gray-600 font-medium'>
                        You don't have account? <Link to="/sign" className='text-[#31004A] font-black cursor-pointer hover:underline'>Signup</Link>
                    </p>
                </div>

            </div>
        </div>
    );
};