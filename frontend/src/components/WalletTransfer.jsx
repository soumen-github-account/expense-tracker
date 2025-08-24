import React, { useContext, useState } from 'react'
import { GiCrossMark } from 'react-icons/gi';
// import { walletData } from '../assets/data';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AppContext } from '../contexts/AppContext';

const WalletTransfer = ({openTransfer, setOpenTransfer}) => {
  const {walletData, fetchWalletData, backendUrl, rupeeIcon} = useContext(AppContext)
  // const [wallets, setWallets] = useState([]);
  const [fromWallet, setFromWallet] = useState("");
  const [toWallet, setToWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleTransfer = async () => {
    try {
      const res = await axios.post(backendUrl + "/api/wallets/transfer/", {
        from_wallet: fromWallet,
        to_wallet: toWallet,
        amount: amount,
        note: note,
      });

      toast.success(res.data.message);
      fetchWalletData();
      setAmount(0);
      setFromWallet('');
      setToWallet('')
      setNote('')
      setOpenTransfer(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Transfer failed");
    }
  };
  
  if (!openTransfer) return null;

  return (
    <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-3">
            <div className="bg-white rounded-xl shadow-lg md:w-[500px] w-full">
              {/* Header */}
              <div className="flex justify-between items-center border-b-1 border-b-gray-300 px-4 py-3">
                <h2 className="text-lg font-semibold">Transfer Between Wallets</h2>
                <button
                  onClick={() => setOpenTransfer(false)}
                  className="text-gray-500 text-[24px] p-1 cursor-pointer hover:text-gray-700"
                >
                  <GiCrossMark />
                </button>
              </div>
      
              {/* Body */}
              <div className="p-4 space-y-4">
                <label className="block text-sm font-medium text-gray-700 my-1">From Wallet</label>
                <select onChange={(e)=>setFromWallet(e.target.value)} className="w-full border-1 border-gray-300 rounded-lg p-2 mb-3 text-gray-800">
                    <option value=''>Select source wallet</option>
                    {
                        walletData.map((wallet)=>(
                            <option key={wallet.id} value={wallet.id} disabled={wallet.id === toWallet}>{wallet.name} (Balance: {rupeeIcon} {wallet.rupee})</option>
                        ))
                    }
                    {/* <option value='Cash'>Cash</option>
                    <option value='Bank'>Bank</option> */}
                </select>

                <label className="block text-sm font-medium text-gray-700 my-1">To Wallet</label>
                <select onChange={(e)=>setToWallet(e.target.value)} className="w-full border-1 border-gray-300 rounded-lg p-2 mb-3 text-gray-800">
                    <option>Select destination wallet</option>
                    {
                      walletData.map((wallet)=>(
                          <option key={wallet.id} value={wallet.id} disabled={wallet.id === fromWallet}>{wallet.name} (Balance: {rupeeIcon} {wallet.rupee})</option>
                      ))
                    }
                </select>

                <label className="block text-sm font-medium text-gray-700 my-1">Amount</label>
                <input onChange={(e)=>setAmount(e.target.value)} value={amount} type="number" className='w-full border-1 border-gray-300 rounded-md h-10 px-4 focus:outline-none focus:ring focus:ring-green-400' placeholder={`${rupeeIcon} 0.00`} />

                <label className="block text-sm font-medium text-gray-700 my-1">Note (Optional)</label>
                <input onChange={(e)=>setNote(e.target.value)} value={note} type="text" className='w-full border-1 border-gray-300 rounded-md h-10 px-4 focus:outline-none focus:ring focus:ring-green-400' placeholder='Add a note...' />
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t-1 border-t-gray-200 px-4 py-3">
                <button
                  onClick={() => setOpenTransfer(false)}
                  className="px-4 py-2 rounded text-gray-600 cursor-pointer hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransfer}
                  className="px-6 py-1.5 cursor-pointer rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
    </div>
  )
}

export default WalletTransfer
