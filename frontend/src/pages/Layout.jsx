import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import MobileNav from '../components/MobileNav'

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-start justify-start h-screen'>
      <MobileNav />
      <div className='flex-1 w-full flex h-[calc(100vh-64px)] pt-10'>
        <div className='fixed w-full z-30 bg-gray-50 py-2 top-0 flex items-center justify-center border-b-1 border-b-gray-300'>
          <div onClick={()=>navigate('/')} className='flex items-center gap-4 cursor-pointer'>
            <img src={logo} className='w-10' alt="" />
            <span>Expance Tracker</span>
          </div>
        </div>
        <Sidebar />
        <div className='flex-1 bg-[#F4F7FB] px-8 max-sm:px-4 pb-7 overflow-scroll scroll-hide'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
