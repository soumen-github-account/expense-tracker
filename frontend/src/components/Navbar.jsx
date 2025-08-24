import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'


const Navbar = () => {
  const navigate = useNavigate()
  const {user, logout} = useContext(AppContext)

  return (
    <div className='w-full z-30 fixed flex items-center justify-between md:px-30 px-4 py-2 border-b-1 border-b-gray-300 bg-gradient-to-t from-gray-100 to-white shadow-sm rounded-b-xl'>
        <div className='flex gap-3 items-center'>
            <img src={logo} className='md:w-15 w-10' alt="" />
            <span className='font-medium md:text-2xl text-[20px] text-gray-800'>Expance Tracker</span>
        </div>
        <div className='flex items-center gap-6'>
            <span className='text-[#10B981] md:text-[20px] text-[17px] cursor-pointer max-sm:hidden'>Tools</span>
            <span className='text-[#10B981] md:text-[20px] text-[17px] cursor-pointer max-sm:hidden'>Blogs</span>
            {
              !user && <button onClick={()=>navigate('/login')} className='px-6 rounded-md py-1.5 bg-[#10B981] text-white text-[17px] cursor-pointer'>Login</button>
            }
            {
              user && <span className='rounded-full bg-[#10B981] text-white w-10 h-10 text-[20px] cursor-pointer flex items-center justify-center'>{user?.username?.charAt(0).toUpperCase()}</span>
            }
            {/* <button onClick={logout} className='cursor-pointer'>Logout</button> */}
        </div>
    </div>
  )
}

export default Navbar
