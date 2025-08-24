import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Overview from './pages/Overview'
import Stats from './pages/Stats'
import Chats from './pages/Chats'
import Wallets from './pages/Wallets'
import Account from './pages/Account'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'

const App = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/layout' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Overview />} />
          <Route path='stats' element={<Stats />} />
          <Route path='chat' element={<Chats />} />
          <Route path='wallets' element={<Wallets />} />
          <Route path='account' element={<Account />} />
        </Route>
        <Route path='/login' element={<GuestRoute><Login /></GuestRoute>} />
      </Routes>
    </div>
  )
}

export default App
