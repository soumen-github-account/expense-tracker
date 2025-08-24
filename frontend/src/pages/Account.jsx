import React, { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppContext'

const Account = () => {
    const {user, logout} = useContext(AppContext)
    const [open, setOpen] = useState(false)
  return (
    <div className='max-h-screen py-10'>
      <div className='flex items-center justify-center w-full'>
        <span className='w-30 h-30 rounded-full flex items-center justify-center text-6xl text-white bg-[#10B981]'>{user?.username.charAt(0).toUpperCase()}</span>
      </div>
      <div  className='flex flex-col items-center justify-center mt-5'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-3xl text-gray-800'>{user?.username}</p>
          <p className='text-xl text-gray-600'>{user?.email}</p>
        </div>
        <button onClick={()=>setOpen(true)} className='bg-red-100 px-8 py-2 rounded-md mt-3 cursor-pointer text-red-600 text-[20px] hover:bg-red-50 duration-300'>Logout</button>
      </div>

      {
        open && 
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center'>
          <div className='fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50 px-3'>
            <div className='bg-white min-w-[30vw] max-sm:min-w-full rounded-xl p-5'>
              <p className='text-[18px]'>Are you sure logout ? </p>
              <div className='my-2 flex items-center justify-between gap-2'>
                <button onClick={()=>setOpen(false)} className='w-full cursor-pointer flex items-center justify-center py-2 rounded-xl bg-red-100'>Cancle</button>
                <button onClick={logout} className='w-full cursor-pointer flex items-center justify-center py-2 rounded-xl bg-green-100'>Logout</button>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default Account
