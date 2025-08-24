import React from 'react'
import { MdOutlineAccountBalance } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

const Features = () => {
  return (
    <div className='py-10 px-5'>
        <h1 class="text-3xl font-semibold text-center">Powerful Features</h1>
        <p class="text-sm text-slate-500 text-center mt-2">Everything you need to manage, track, and grow your finances, securely and efficiently.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 px-5 md:gap-30 gap-10">
            <div class="size-[520px] top-0 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]/70"></div>
            <div class="flex flex-col items-center justify-center w-full">
                <div class="p-6 aspect-square bg-violet-100 rounded-full">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 18.667V24.5m4.668-8.167V24.5m4.664-12.833V24.5m2.333-21L15.578 13.587a.584.584 0 0 1-.826 0l-3.84-3.84a.583.583 0 0 0-.825 0L2.332 17.5M4.668 21v3.5m4.664-8.167V24.5" stroke="#7F22FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="mt-5 space-y-2 text-center">
                    <h3 class="text-base font-semibold text-slate-700">Real-Time Analytics</h3>
                    <p class="text-sm text-slate-600">Get instant insights into your finances with live dashboards.</p>
                </div>
            </div>
            <div class="flex flex-col items-center justify-center w-full">
                <div class="p-6 aspect-square bg-green-100 rounded-full">
                    <MdOutlineAccountBalance className='text-[30px] text-green-500' />
                </div>
                <div class="mt-5 space-y-2 text-center">
                    <h3 class="text-base font-semibold text-slate-700">Expense Tracking</h3>
                    <p class="text-sm text-slate-600">End-to-end encryption, 2FA, compliance with GDPR standards.</p>
                </div>
            </div>
            <div class="flex flex-col items-center justify-center w-full">
                <div class="p-6 aspect-square bg-orange-100 rounded-full">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.668 25.666h16.333a2.333 2.333 0 0 0 2.334-2.333V8.166L17.5 2.333H7a2.333 2.333 0 0 0-2.333 2.333v4.667" stroke="#F54900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.332 2.333V7a2.334 2.334 0 0 0 2.333 2.333h4.667m-21 8.167h11.667M10.5 21l3.5-3.5-3.5-3.5" stroke="#F54900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="mt-5 space-y-2 text-center">
                    <h3 class="text-base font-semibold text-slate-700">Category Management</h3>
                    <p class="text-sm text-slate-600">Export professional, audit-ready financial reports for tax or internal review.</p>
                </div>
            </div>
           
            <div class="flex flex-col items-center justify-center w-full">
                <div class="p-6 aspect-square bg-fuchsia-100 rounded-full">
                    <TbReportSearch className='text-[30px] text-fuchsia-500'/>
                </div>
                <div class="mt-5 space-y-2 text-center">
                    <h3 class="text-base font-semibold text-slate-700">Weekly/Monthly Reports</h3>
                    <p class="text-sm text-slate-600">Export professional, audit-ready financial reports for tax or internal review.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features
