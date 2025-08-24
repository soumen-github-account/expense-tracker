import React from 'react'
import logo from '../assets/logo.png'
const Footer = () => {
  return (
    <div>
      <footer class="w-full bg-gradient-to-b from-[#F1EAFF] to-[#FFFFFF] text-gray-800">
        <div class="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
            <div class="flex items-center space-x-3 mb-6 text-2xl">
                <img alt="" class="h-11"
                    src={logo} />
                <h1>Expense Tracker</h1>
            </div>
            <p class="text-center max-w-xl text-sm font-normal leading-relaxed">
                Stay in control of your finances! With Expense Tracker, you can easily track spending, set goals, and build better money habits.
            </p>
        </div>
        <div class="border-t border-slate-200">
            <div class="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                <a>SDKING DEV</a> ©2025. All rights reserved. Built with ❤️ to help you manage your money better.
            </div>
        </div>
    </footer>
    </div>
  )
}

export default Footer
