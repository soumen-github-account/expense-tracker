import React, { use, useContext } from 'react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { FiHome } from "react-icons/fi";
import { FiBarChart } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LiaWalletSolid } from "react-icons/lia";
import { CiWallet } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";

const Sidebar = () => {
    // const {user, logOut } = useContext(AppContext);
    const navItems = [
        {to: '/layout', label:'Overview', Icon: FiHome},
        {to: '/layout/stats', label:'Stats', Icon: FiBarChart},
        {to: '/layout/chat', label:'Chat', Icon: IoChatbubbleOutline},
        {to: '/layout/wallets', label:'Wallets', Icon: CiWallet},
        {to: '/layout/account', label:'Account', Icon: MdOutlineManageAccounts},
    ]

  return (
    <div className={`w-60 bg-white hidden border-r border-gray-200 md:flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 transition-all duration-300 ease-in-out`}>
      <div className='my-7 w-full'>
        <div className='w-full flex justify-center items-center'>
            <span className='rounded-full w-20 h-20 flex items-center justify-center text-4xl font-bold text-white cursor-pointer bg-radial-[at_25%_25%] from-white to-[#086747] to-75%'>S</span>
        </div>
        <h1 className='mt-1 text-[20px] text-center'>Soumen Das</h1>
        <div className='px-2 mt-5 text-sm text-gray-600 font-medium'>
            {
                navItems.map(({to, label, Icon})=>(
                    <NavLink key={to} to={to} end={to === '/layout'} className={({isActive})=>`px-3.5 py-2.5 flex items-center gap-3 text-[16px] ${isActive ? 'bg-gradient-to-r from-[#b3dbce] to-white text-[#086747] border-l-4 border-l-[#10B981]' : ''}`}>
                        {({isActive})=>(
                            <>
                                <Icon className={`text-[20px] ${isActive ? 'text-[#086747]' : ''}`} />
                                {label}
                            </>
                        )}
                    </NavLink>
                ))
            }
        </div>
      </div>

      <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center gap-3 cursor-pointer rounded-md text-red-600 hover:bg-red-100 duration-300'>
            <LogOut className='w-4.5 hover:text-gray-700 transition cursor-pointer'/>
            Sign out
      </div>
    </div>
  )
}

export default Sidebar
