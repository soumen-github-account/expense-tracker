import React, { useEffect, useState } from 'react'
import hero_img from '../assets/hero2.webp'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Hero = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  // useEffect(()=>{
  //   axios.get('http://localhost:8000/api/hello')
  //   .then(response=>{
  //     setMessage(response.data.message)
  //   })
  // },[])

  return (
    <div>
      <section id="section" class="relative bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] min-h-screen md:flex items-center justify-between lg:px-40 px-5 pt-20 md:pt-0 overflow-hidden">
        <div className='absolute md:h-[40vw] md:w-[40vw] h-[60vw] w-[60vw] blur-2xl rounded-full bg-gradient-to-br from-[#e3fcf7] via-[#d5f6ef] to-white md:left-[30%] left-[70%] max-sm:top-[30vh]' />
        <div className='z-10'>
            <div className='text-[50px] max-sm:text-[40px] font-semibold'>
                <p className='leading-13 max-sm:leading-10'>Manage your <br />
                money in the best <br/>
                <span className='text-[#10B981]'>possible way.</span>
                </p>
            </div>
            <p className='md:w-[35vw] w-full text-[18px] text-gray-600 max-sm:text-gray-700 my-5'>
                Join our community of smart savers. Get access to powerful expense tracking tools, AI insights, and detailed analytics to make better financial decisions.
            </p>
            <button onClick={()=>navigate('/layout')} className='px-6 rounded-md py-2.5 bg-[#10B981] text-white text-[17px] cursor-pointer'>Start tracking for free</button>
            {/* <div className='mt-3'>
                Joined by people who care about their finances
            </div> */}
            <div class="flex flex-wrap items-center justify-center p-1 rounded-full bg-emerald-600/10 backdrop-blur border border-emerald-500/40 text-sm mt-3">
              <div class="flex items-center">
                  <img class="size-6 md:size-7 rounded-full border-3 border-white"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50" alt="userImage1" />
                  <img class="size-6 md:size-7 rounded-full border-3 border-white -translate-x-2"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50" alt="userImage2" />
                  <img class="size-6 md:size-7 rounded-full border-3 border-white -translate-x-4"
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
                      alt="userImage3" />
              </div>
                <p class="-translate-x-2 font-medium">Join community of 1m+ founders </p>
            </div>
        </div>
        <div className='z-10'>
          <img src={hero_img} className='min-w-[40vw]' alt="" />
        </div>
      </section>
      {/* <h1 className='text-red-700'>Api response: {message}</h1> */}
    </div>
  )
}

export default Hero
