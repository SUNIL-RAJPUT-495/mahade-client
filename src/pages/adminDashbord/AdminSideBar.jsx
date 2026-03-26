import React from 'react'
import { NavLink } from 'react-router-dom'; // Link ki jagah NavLink better hai active states ke liye
import { IoMdHelp, IoMdSettings } from "react-icons/io";
import { TbMoneybag } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { GiBackwardTime } from "react-icons/gi";
import { FaCreditCard, FaChartPie, FaLanguage, FaTelegram, FaYoutube, FaUserShield } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { MdRoundaboutRight } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { ImNotification } from "react-icons/im";
import { FaHeadset } from "react-icons/fa";

export const AdminSideBar = ({ closeSidebar }) => {
    const menuSections = [
        {
            heading: "Main Menu",
            items: [
                { icons: CgProfile, itemsDetails: "Dashboard", link: "dashboard" },
            ]
        },
        {
            heading: "Management",
            items: [
                { icons: IoMdSettings, itemsDetails: "Add Game", link: "AddGame" },
                { icons: GiBackwardTime, itemsDetails: "Bids", link: "AdminBid" },
            ]
        },
        {
            heading: "Settings",
            items: [
                { icons: FaCreditCard, itemsDetails: "Upi Setting", link: "upi" }, 
                { icons: TbMoneybag, itemsDetails: "Contact Settings", link: "contact" },
                { icons: IoBagHandle, itemsDetails: "Admin Referrals", link: "referal" },
                { icons: FaChartPie, itemsDetails: "Bonus Management", link: "bonus" },
                { icons: FaLanguage, itemsDetails: "Winners History", link: "WinnersHistory" },
                { icons: FaTelegram, itemsDetails: "NotificationSender", link: "NotificationSender" },
                { icons: IoMdHelp, itemsDetails: "HowToPlay", link: "HowToPlay" },
                { icons: MdRoundaboutRight, itemsDetails: "Declare Results", link: "ResultDecleare" },
                { icons: RiLockPasswordFill, itemsDetails: "GameRates", link: "GameRatesAdmin" },
                { icons: FaHeadset, itemsDetails: "Chat Support", link: "admin-chat" },
            ]
        },
        {
            heading: "Finance",
            items: [
                { icons: FaYoutube, itemsDetails: "Payments", link: "Payment" },
                { icons: ImNotification, itemsDetails: "Withdrawals", link: "Withdraw" },
            ]
        }
    ];

    return (
        <div className='h-screen w-64 md:w-72 bg-slate-50 flex flex-col border-r border-gray-200 shadow-xl transition-all duration-300'>
            
            {/* Logo Section */}
            <div className='px-6 py-8 flex items-center gap-3 border-b border-gray-100 bg-white'>
                <div className='bg-gradient-to-br from-[#31004A] to-[#601a91] p-2 rounded-lg shadow-lg'>
                    <FaUserShield size={24} className="text-white" />
                </div>
                <div>
                    <h2 className='text-lg font-black text-gray-800 tracking-tight leading-none'>ADMIN</h2>
                    <span className='text-[10px] font-bold text-gray-400 tracking-widest uppercase'>Control Panel</span>
                </div>
            </div>

            {/* Menu Items Section */}
            <div className='flex-1 overflow-y-auto py-4 px-4 bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                {menuSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6">
                        {/* Section Heading */}
                        <h3 className="px-4 mb-2 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">
                            {section.heading}
                        </h3>
                        
                        {/* Section Links */}
                        <div className="space-y-1">
                            {section.items.map((item, itemIndex) => (
                                <NavLink 
                                    key={itemIndex} 
                                    to={item.link} 
                                    onClick={closeSidebar} 
                                    className={({ isActive }) => `
                                        group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                        ${isActive 
                                            ? 'bg-gradient-to-r from-[#31004A] to-[#601a91] text-white shadow-md' 
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                                    `}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icons 
                                                size={20} 
                                                className={`transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#601a91]'}`} 
                                            />
                                            <span className={`text-sm font-semibold tracking-wide ${isActive ? 'text-white' : ''}`}>
                                                {item.itemsDetails}
                                            </span>
                                            {isActive && (
                                                <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer / Logout Placeholder */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-mahadev flex items-center justify-center text-white text-xs font-bold">
                        A
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-bold text-gray-800 truncate">System Admin</p>
                        <p className="text-[10px] text-green-500 font-bold uppercase">Online</p>
                    </div>
                </div>
            </div>
        </div>
    )
}