import React, { useContext, useState } from 'react'
import google_icon from '../assets/google.png'
import facebook_icon from '../assets/facebook.png'
import login_img from '../assets/login_img.png'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AppContext } from '../contexts/AppContext'

const Login = () => {
  const navigate = useNavigate()
  const [state, setState] = useState('login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {loadUser, backendUrl} = useContext(AppContext)

  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
      if(state==='login'){
        const res = await fetch(backendUrl + "/api/login/", {
          method: "POST",
          headers: { "content-type":"application/json" },
          body: JSON.stringify({
            username: fullName,
            password: password 
          })
        });
        const data = await res.json();
        if(res.ok){
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh)
          toast.success("Login successfull")
          loadUser();
          navigate("/layout")
        } else{
          toast.error(data.detail || "Invalid credentials")
        }
      } else{
        // Register user
        const res = await fetch(backendUrl + "/api/signup/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: fullName,
            email,
            password,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Account created 🎉 Please login");
          setState("login"); // switch to login tab
        } else {
          toast.error(data.message || "Registration failed");
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-[100vh] py-4'>
      <div className='w-full max-w-[900px] min-h-[80vh] border border-gray-200 shadow-md rounded-md flex flex-col md:flex-row justify-between mx-4'>
        <div className='p-6 flex flex-col w-full md:w-1/2'>

            <div className='flex items-center justify-between gap-2'>
                <span onClick={()=>setState('login')} className={`w-full flex cursor-pointer items-center justify-center py-2 mb-2 rounded-full ${state==='login' ? 'bg-[#10B981] text-white' : 'bg-gray-100 text-gray-600'} `}>Login</span>
                <span onClick={()=>setState('register')} className={`w-full flex cursor-pointer items-center justify-center py-2 mb-2 rounded-full ${state==='register' ? 'bg-[#10B981] text-white' : 'bg-gray-100 text-gray-600'}`}>Register</span>
            </div>

          <h1 className='text-xl font-medium text-gray-800'>
            {
              state === 'login' ?
              'Welcome Back 👋' : 'Sign Up'
            }
          </h1>
          <p className='text-gray-500 text-[14px] mb-2'>welcome to my whats chat app. good morning have a nice day.</p>
          <form onSubmit={submitHandler}>
            {
              state === 'register' && 
              <div>
              <div className='flex flex-col gap-2 mb-4'>
                <label htmlFor="">Email</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full border-1 border-gray-300 rounded-lg py-1.5 px-3 outline-none bg-gray-50' placeholder='Enter email' name='email' required/>
              </div>
              </div>
            }
              
            <div className='flex flex-col gap-2 mb-4'>
              <label htmlFor="">User Name</label>
              <input type="text" onChange={(e)=>setFullName(e.target.value)} value={fullName} className='w-full border-1 border-gray-300 rounded-lg py-1.5 px-3 outline-none bg-gray-50' placeholder='Enter your full name' name='username' required/>
            </div>
              
          <div className='flex flex-col gap-2'>
            <label htmlFor="">Password</label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full border-1 border-gray-300 rounded-lg py-1.5 px-3 outline-none bg-gray-50' placeholder='Enter a strong password' name='password' required/>
          </div>

          <div className='my-2 flex justify-between items-center text-[15px] text-blue-500'>
          <span className='cursor-pointer hover:underline duration-300 ease-in'>Forgot password ?</span>
          {/* {
            state === 'login' ? 
            <span onClick={()=>setState('register')} className='cursor-pointer hover:underline duration-300 ease-in'>Sign Up</span>
            :
            <span onClick={()=>setState('login')} className='cursor-pointer hover:underline duration-300 ease-in'>login</span>

          } */}
          </div>
          <button type='submit' className='w-full items-center justify-center py-2 rounded-md bg-[#10B981] text-white cursor-pointer my-3'>{state === 'login' ? 'Sign In' : 'Sign Up'}</button>

          </form>
          
          <div className='flex items-center justify-between gap-2'>
            <hr className='md:min-w-50 w-full text-gray-300'/>
              or
            <hr className='md:min-w-50 w-full text-gray-300' />
          </div>
        <button className='flex gap-4 rounded-md border-1 border-gray-300 bg-gray-50 py-1.5 px-3 items-center w-full justify-center cursor-pointer mt-4'>
          <img src={google_icon} className='w-7' alt="" />
          Sign in with Google
        </button>
        <button className='flex gap-4 rounded-md border-1 border-gray-300 bg-gray-50 py-1.5 px-3 items-center w-full justify-center cursor-pointer mt-4'>
          <img src={facebook_icon} className='w-7' alt="" />
          Sign in with Facebook
        </button>
        </div>

        <div className='max-w-[30vw] hidden md:block'>
          <img src={login_img} className='w-full h-full' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login
