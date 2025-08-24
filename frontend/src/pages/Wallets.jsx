import React, { useContext, useState } from 'react'
import { GoPlus } from "react-icons/go";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { BsCashStack } from "react-icons/bs";
import { RiBankLine } from "react-icons/ri";
import { GoCreditCard } from "react-icons/go";

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from 'react-icons/fa6';
import WalletDialog from '../components/WalletDialog';
import WalletTransfer from '../components/WalletTransfer';
import { AppContext } from '../contexts/AppContext';
import UpdateWalletDialog from '../components/UpdateWalletDialog';
import axios from 'axios';
import toast from 'react-hot-toast';

const Wallets = () => {
  const {walletData, rupeeIcon, fetchWalletData, backendUrl} = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [upOpen, setUpOpen] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false)
  const [record, setRecord] = useState([])
  const fetchRecord = async (id) => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/wallets/${id}/`
        );
        setRecord(res.data);
        console.log(res.data)
        setUpOpen(true);
      } catch (err) {
        console.error("Failed to fetch record:", err.message);
      }
    };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/wallets/${id}/`);
      fetchWalletData();
      toast.success("Wallet deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className='pt-8 md:px-8'>
      <div className='bg-white rounded-md p-3 shadow-xs flex items-center gap-4'>
          <button onClick={()=>setIsOpen(true)} className='rounded-md py-1 px-3 cursor-pointer text-white flex items-center gap-2 bg-[#10B981]'>
            <GoPlus className='text-[20px]'/>
            Add Wallet
          </button>

          <button onClick={()=>setOpenTransfer(true)} className='rounded-md py-1 px-3 cursor-pointer text-white flex items-center gap-3 bg-blue-500'>
            <HiArrowsRightLeft />
            Transfer
          </button>
      </div>

      <div className='bg-white rounded-md p-3 shadow-xs flex flex-col gap-3'>
        {
          walletData.sort((a, b) => new Date(`${b.created_at} ${b.time}`) - new Date(`${a.created_at} ${a.time}`)).map((item, index)=>(
            <div key={index} className='bg-gray-50 p-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center text-[17px] ${item.type === 'Bank' ? 'text-green-600 bg-green-100' : item.type==='Cash' ? 'text-violet-600 bg-violet-100' : 'text-blue-600 bg-blue-100'}`}>
                    {
                      item.type === 'Bank' ? <RiBankLine /> : item.type==='Cash' ? <BsCashStack /> : <GoCreditCard />
                    }
                    
                  </span>
                  <span>{item.name}</span>
                  <span className={`py-1 rounded-full px-3 text-[14px] ${item.type === 'Bank' ? 'text-green-600 bg-green-100' : item.type==='Cash' ? 'text-violet-600 bg-violet-100' : 'text-blue-600 bg-blue-100'}`}>{item.type}</span>
                </div>
                <div className='flex items-center gap-3 text-gray-500 text-[17px]'>
                  <FiEdit onClick={()=>fetchRecord(item.id)} className='hover:text-blue-600 duration-300 cursor-pointer'/>
                  <RiDeleteBin6Line onClick={()=>handleDelete(item.id)} className='hover:text-red-600 duration-300 cursor-pointer'/>
                </div>
              </div>
              <div className='flex justify-between mt-3'>
                <div>
                  <p className='text-[16px] text-gray-800'>Balance</p>
                  <p className='text-[14px] text-gray-500'>{rupeeIcon} {item.rupee}</p>
                </div>
                <div>
                  <p className='text-[16px] text-gray-800'>Transaction</p>
                  <p className='text-[14px] text-gray-500'>{item.transaction}</p>
                </div>
              </div>
            </div>
          ))
        }
        
      </div>

      <button onClick={()=>setIsOpen(true)} className='absolute bottom-20 md:bottom-10 md:left-[50%] left-[42%] rounded-full flex items-center justify-center text-2xl bg-[#10B981] text-white p-4.5 cursor-pointer'>
        <FaPlus />
      </button>
        <WalletDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        <UpdateWalletDialog upOpen={upOpen} setUpOpen={setUpOpen} record={record} />
        <WalletTransfer openTransfer={openTransfer} setOpenTransfer={setOpenTransfer}/>
    </div>
  )
}

export default Wallets
