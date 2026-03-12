import React from 'react'

import { IoIosArrowRoundBack } from "react-icons/io";

const GamerRatesPage = () => {
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
                <h1 className="text-xl font-bold tracking-widest mt-1 drop-shadow-sm uppercase">
                 Game Rate
                </h1>
              </div>
            </div>
            <div>
              <div className='bg-white m-2 flex items-center justify-center rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex items-center justify-between cursor-pointer group hover:-translate-y-0.5'> <b>Single </b>  10.00 ka  <b>100</b></div>
              <div className='bg-white m-2 flex items-center justify-center rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex items-center justify-between cursor-pointer group hover:-translate-y-0.5'><b>Jodi</b> 10.00 ka  <b>1000</b></div>
              <div className='bg-white m-2 flex items-center justify-center rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex items-center justify-between cursor-pointer group hover:-translate-y-0.5'> <b>Single Panna</b> 10.00 ka <b>1600</b></div>
              <div className='bg-white m-2 flex items-center justify-center rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex items-center justify-between cursor-pointer group hover:-translate-y-0.5'><b>Double Panna</b> 10.00 ka <b>3200</b></div>
              <div className='bg-white m-2 flex items-center justify-center rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex items-center justify-between cursor-pointer group hover:-translate-y-0.5'> <b>Triple Panna</b> 10.00 ka  <b>7000</b></div>
              <div className='bg-white m-2 flex items-center justify-center rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex items-center justify-between cursor-pointer group hover:-translate-y-0.5'> <b>Half Sangam </b>10.00 ka <b>10000</b> </div>
              <div className='bg-white m-2 flex items-center justify-center rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex items-center justify-between cursor-pointer group hover:-translate-y-0.5'> <b>Full Sangam</b> 10.00 ka <b>100000</b> </div>
            </div>
      
    </div>
  )
}

export default GamerRatesPage
