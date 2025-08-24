
import React, { useContext, useEffect, useState } from 'react';
import ExpanceBar from '../components/ExpanceBar';
import { LuCircleArrowUp, LuCircleArrowDown } from "react-icons/lu";
import { CiShop } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import ExpenseDialog from '../components/ExpanseDialog';
import dayjs from "dayjs";

import { FaMoneyBillWave, FaBriefcase, FaChartLine, FaPlusCircle, FaUniversity } from "react-icons/fa";
import { AppContext } from '../contexts/AppContext';
import UpdateExpanseDialog from '../components/UpdateExpanseDialog';
import axios from 'axios';

const categories = [
  { id: 1, name: "Salary", icon: <FaMoneyBillWave className="text-green-500" /> },
  { id: 2, name: "Business", icon: <FaBriefcase className="text-orange-500" /> },
  { id: 3, name: "Investments", icon: <FaChartLine className="text-green-600" /> },
  { id: 4, name: "Extra income", icon: <FaPlusCircle className="text-green-400" /> },
  { id: 5, name: "Loan", icon: <FaUniversity className="text-red-500" /> },
];

const Overview = () => {
  const {trackData, backendUrl} = useContext(AppContext)

  const [state, setState] = useState('daily');
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [upOpen, setUpOpen] = useState(false);
  const [id, setId] = useState('')

  useEffect(() => {
    // Filter by type
    const filteredExp = trackData.filter(
      (item) => item.type === "expanse" || item.type === "expance"
    );
    const filteredInc = trackData.filter(item => item.type === "income");

    setExpenseData(filteredExp);
    setIncomeData(filteredInc);

    // calculate totals
    const totalExp = filteredExp.reduce((sum, i) => sum + Number(i.rupee), 0);
    const totalInc = filteredInc.reduce((sum, i) => sum + Number(i.rupee), 0);

    setTotals({ income: totalInc, expense: totalExp });
  }, []);

  const [record, setRecord] = useState(null);

  const fetchRecord = async (id) => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/tracker/trackdata/${id}/`
        );
        setRecord(res.data);
        console.log(res.data)
        setUpOpen(true);
      } catch (err) {
        console.error("Failed to fetch record:", err.message);
      }
    };

  return (
    <div className='pt-10 pb-20 md:pb-6'>
      <ExpanceBar />

      {/* Tabs */}
      {/* <div className='bg-white rounded-full border border-gray-300 flex items-center justify-between my-2 shadow-md gap-2 p-1'>
        <button 
          onClick={() => setState('daily')} 
          className={`py-1.5 w-full cursor-pointer rounded-full ${state==='daily' ? 'bg-green-100 text-green-600' : 'text-gray-600'}`}
        >
          Daily
        </button>
        <button 
          onClick={() => setState('recurring')} 
          className={`py-1.5 w-full cursor-pointer rounded-full ${state==='recurring' ? 'bg-green-100 text-green-600' : 'text-gray-600'}`}
        >
          Recurring
        </button>
      </div> */}

      {/* Summary Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center my-3">
        <div className="flex flex-col items-start">
          <p className="text-gray-500 text-sm">Total Income</p>
          <p className="text-green-600 font-bold text-2xl">+₹ {totals.income}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-gray-500 text-sm">Total Expenses</p>
          <p className="text-red-500 font-bold text-2xl">-₹ {totals.expense}</p>
        </div>
      </div>

      <h1 className='mb-2 text-md text-gray-600 ml-2'>Statement</h1>

      {/* Desktop View */}
      <div className='flex justify-between gap-3 max-sm:hidden'>
        {/* Expenses */}
        <div>
          <p className='flex items-center gap-3 py-2 text-[17px]'>
            <LuCircleArrowDown className='text-red-500'/>
            Expenses
          </p>
          <div className='flex flex-col gap-3'>
            {expenseData.sort((a, b) => new Date(`${b.created_at} ${b.time}`) - new Date(`${a.created_at} ${a.time}`)).map((item, index) => {
              const category = categories.find(c => c.name === item.category);
              return (
              <div onClick={()=>fetchRecord(item.id)} key={index} className='bg-white min-w-[40vw] rounded-md p-3 flex items-center justify-between border border-gray-200 hover:shadow-md duration-300 cursor-pointer'>
                <div className='flex gap-2 items-center'>
                  {category ? (
                    <div className="bg-orange-100 flex items-center justify-center rounded-full w-8 h-8 text-[30px] p-1">
                      {category.icon}
                    </div>
                  ) : (
                    <CiShop className='bg-orange-100 text-orange-500 rounded-full w-8 h-8 text-[30px] p-1'/>
                  )}
                  {/* <CiShop className='bg-orange-100 text-orange-500 rounded-full w-8 h-8 text-[30px] p-1'/> */}
                  <div className='flex flex-col'>
                    {item.category}
                    <span className='text-gray-500 text-[14px]'>{item.note ? item.note : '-'}</span>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <span className='text-red-600'>-₹ {item.rupee}</span>
                  <span className='text-gray-500 text-[14px] flex items-center gap-1'>
                    <p>{dayjs(`${item.created_at} ${item.time}`, "YYYY-MM-DD HH:mm:ss").format("hh:mm A")}</p> - <p>{dayjs(item.created_at).format("DD MMM YYYY")}</p>
                  </span>
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Income */}
        <div>
          <p className='flex items-center gap-3 my-2 text-[17px]'>
            <LuCircleArrowUp className='text-green-500'/>
            Income
          </p>
          <div className='flex flex-col gap-3'>
            {incomeData.sort((a, b) => new Date(`${b.created_at} ${b.time}`) - new Date(`${a.created_at} ${a.time}`)).map((item, index) => {
              const category = categories.find(c => c.name === item.category);
              return(
              <div onClick={()=>fetchRecord(item.id)} key={index} className='bg-white min-w-[40vw] rounded-md p-3 flex items-center justify-between border border-gray-200 hover:shadow-md duration-300 cursor-pointer'>
                <div className='flex gap-2 items-center'>
                  {category ? (
                    <div className="bg-orange-100 flex items-center justify-center rounded-full w-8 h-8 text-[30px] p-1">
                      {category.icon}
                    </div>
                  ) : (
                    <CiShop className='bg-orange-100 text-orange-500 rounded-full w-8 h-8 text-[30px] p-1'/>
                  )}
                  {/* <CiShop className='bg-orange-100 text-orange-500 rounded-full w-8 h-8 text-[30px] p-1'/> */}
                  <div className='flex flex-col'>
                    {item.category}
                    <span className='text-gray-500 text-[14px]'>{item.note ? item.note : '-'}</span>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <span className='text-green-600'>+₹ {item.rupee}</span>
                  <span className='text-gray-500 text-[14px] flex items-center gap-1'>
                    <p>{dayjs(`${item.created_at} ${item.time}`, "YYYY-MM-DD HH:mm:ss").format("hh:mm A")}</p> - <p>{dayjs(item.created_at).format("DD MMM YYYY")}</p>
                  </span>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className='hidden flex-col gap-3 max-sm:flex'>
        {trackData.sort((a, b) => new Date(`${b.created_at} ${b.time}`) - new Date(`${a.created_at} ${a.time}`)).map((item, index) => {
          const category = categories.find(c => c.name === item.category);
          return (
            <div onClick={()=>fetchRecord(item.id)} key={index} className='bg-white rounded-md p-3 flex items-center justify-between border border-gray-200 hover:shadow-md duration-300 cursor-pointer shadow-sm'>
              <div className='flex gap-2 items-center'>
                {category ? (
                  <div className="bg-orange-100 flex items-center justify-center rounded-full w-8 h-8 text-[30px] p-1">
                    {category.icon}
                  </div>
                ) : (
                  <CiShop className='bg-orange-100 text-orange-500 rounded-full w-8 h-8 text-[30px] p-1'/>
                )}
                <div className='flex flex-col'>
                  {item.category}
                  <span className='text-gray-500 text-[14px]'>{item.note ? item.note : '-'}</span>
                </div>
              </div>
              <div className='flex flex-col items-end'>
                <span className={`${item.type==='expanse' ? 'text-red-600' : 'text-green-600'}`}>
                  {item.type==='expanse' ? '-₹' : '+₹'} {item.rupee}
                </span>
                <span className='text-gray-500 text-[14px] flex items-center gap-1'>
                  <p>{dayjs(`${item.created_at} ${item.time}`, "YYYY-MM-DD HH:mm:ss").format("hh:mm A")}</p> - <p>{dayjs(item.created_at).format("DD MMM YYYY")}</p>
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Button */}
      <button 
        onClick={() => setIsOpen(true)} 
        className='absolute bottom-20 md:bottom-10 md:left-[50%] left-[42%] rounded-full flex items-center justify-center text-2xl bg-[#10B981] text-white p-4 cursor-pointer'
      >
        <FaPlus />
      </button>

      <ExpenseDialog isOpen={isOpen} setIsOpen={setIsOpen}/>
      <UpdateExpanseDialog upOpen={upOpen} setUpOpen={setUpOpen} record={record} />
    </div>
  );
}

export default Overview;
