
import React from "react";
import { MdOutlineAccountBalance } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

const Features = () => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-10">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center">
        Powerful Features
      </h1>
      <p className="text-sm sm:text-base text-slate-500 text-center mt-2 max-w-2xl mx-auto">
        Everything you need to manage, track, and grow your finances, securely
        and efficiently.
      </p>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 py-10">
        {/* background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] sm:w-[400px] lg:w-[520px] h-[250px] sm:h-[400px] lg:h-[520px] rounded-full blur-[120px] bg-[#FBFFE1]/70 -z-10" />

        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="p-6 aspect-square bg-violet-100 rounded-full flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
            >
              <path
                d="M14 18.667V24.5m4.668-8.167V24.5m4.664-12.833V24.5m2.333-21L15.578 13.587a.584.584 0 0 1-.826 0l-3.84-3.84a.583.583 0 0 0-.825 0L2.332 17.5M4.668 21v3.5m4.664-8.167V24.5"
                stroke="#7F22FE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mt-5 text-base font-semibold text-slate-700">
            Real-Time Analytics
          </h3>
          <p className="text-sm text-slate-600">
            Get instant insights into your finances with live dashboards.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="p-6 aspect-square bg-green-100 rounded-full flex items-center justify-center">
            <MdOutlineAccountBalance className="text-3xl text-green-500" />
          </div>
          <h3 className="mt-5 text-base font-semibold text-slate-700">
            Expense Tracking
          </h3>
          <p className="text-sm text-slate-600">
            End-to-end encryption, 2FA, compliance with GDPR standards.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="p-6 aspect-square bg-orange-100 rounded-full flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
            >
              <path
                d="M4.668 25.666h16.333a2.333 2.333 0 0 0 2.334-2.333V8.166L17.5 2.333H7a2.333 2.333 0 0 0-2.333 2.333v4.667"
                stroke="#F54900"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.332 2.333V7a2.334 2.334 0 0 0 2.333 2.333h4.667m-21 8.167h11.667M10.5 21l3.5-3.5-3.5-3.5"
                stroke="#F54900"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mt-5 text-base font-semibold text-slate-700">
            Category Management
          </h3>
          <p className="text-sm text-slate-600">
            Export professional, audit-ready reports for tax or internal review.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="p-6 aspect-square bg-fuchsia-100 rounded-full flex items-center justify-center">
            <TbReportSearch className="text-3xl text-fuchsia-500" />
          </div>
          <h3 className="mt-5 text-base font-semibold text-slate-700">
            Weekly/Monthly Reports
          </h3>
          <p className="text-sm text-slate-600">
            Export professional, audit-ready reports for tax or internal review.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
