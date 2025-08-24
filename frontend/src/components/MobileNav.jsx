import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome } from "react-icons/fi";
import { FiBarChart } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LiaWalletSolid } from "react-icons/lia";
import { CiWallet } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";


const MobileNav = () => {
  return (
    <div>
      <div className='bg-white border-t-1 rounded-t-md border-t-gray-300 md:hidden block fixed bottom-0 left-0 w-full h-[4rem] px-0 z-10 items-center' id="nav-menu">
      <ul className="flex justify-between">
        <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3'>
            <NavLink to='/layout' end='/layout' className={({isActive})=>`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-medium ${isActive ? 'text-blue-800' :'text-gray-700'}`}>
                <FiHome className='text-[22px]' />
                <span className="nav__name">Home</span>
            </NavLink>
        </li>

        <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3'>
            <NavLink to='/layout/stats' onClick={() => window.scrollTo(0, 0)} className={({isActive})=>`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-medium ${isActive ? 'text-blue-800' :'text-gray-700'}`}>
                <FiBarChart className='text-[22px]' />
                <span className="nav__name">Stats</span>
            </NavLink>
        </li>

        {/* <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3'>
            <NavLink to='/layout/chat' onClick={() => window.scrollTo(0, 0)} className={({isActive})=>`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-medium ${isActive ? 'text-blue-800' :'text-gray-700'}`}>
                <IoChatbubbleOutline className='text-[22px]' />
                <span className="nav__name">Chats</span>
            </NavLink>
        </li> */}

        <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3 mr-1'>
            <NavLink to='/layout/wallets' onClick={() => window.scrollTo(0, 0)} className={({isActive})=>`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-medium ${isActive ? 'text-blue-800' :'text-gray-700'}`}>
                <CiWallet className='text-[22px]' />
                <span className="nav__name">Wallets</span>
            </NavLink>
        </li>

        <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3 mr-1'>
            <NavLink to='/layout/account' onClick={() => window.scrollTo(0, 0)} className={({isActive})=>`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-medium ${isActive ? 'text-blue-800' :'text-gray-700'}`}>
                <MdOutlineManageAccounts className='text-[22px]' />
                <span className="nav__name">Account</span>
            </NavLink>
        </li>
    </ul>
    </div>
    </div>
  )
}

export default MobileNav
