import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiWallet } from "react-icons/ci";
import axios from "axios";

import { FaMoneyBillWave, FaBriefcase, FaChartLine, FaPlusCircle, FaUniversity } from "react-icons/fa";
// import { walletData } from "../assets/data";
import toast from 'react-hot-toast'
import { AppContext } from "../contexts/AppContext";

const categories = [
  { id: 1, name: "Salary", icon: <FaMoneyBillWave className="text-green-500" /> },
  { id: 2, name: "Business", icon: <FaBriefcase className="text-orange-500" /> },
  { id: 3, name: "Investments", icon: <FaChartLine className="text-green-600" /> },
  { id: 4, name: "Extra income", icon: <FaPlusCircle className="text-green-400" /> },
  { id: 5, name: "Loan", icon: <FaUniversity className="text-red-500" /> },
  { id: 6, name: "Investments", icon: <FaChartLine className="text-green-600" /> },
  { id: 7, name: "Investments", icon: <FaChartLine className="text-green-600" /> },
  { id: 8, name: "Investments", icon: <FaChartLine className="text-green-600" /> },
  { id: 9, name: "Investments", icon: <FaChartLine className="text-green-600" /> },
  { id: 10, name: "Investments", icon: <FaChartLine className="text-green-600" /> },
];

const ExpenseDialog = ({ isOpen, setIsOpen }) => {
  const {fetchTrackData, walletData} = useContext(AppContext)
  const [query, setQuery] = useState("");
  const [state, setState] = useState('expanse')
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [wallet, setWallet] = useState('')
  const [rupee, setRupee] = useState();
  const [note, setNote] = useState('')
  const [referance, setReferance] = useState('')

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase())
  );
  const now = new Date();
  const handleSubmit = async () => {
    if (!wallet || !rupee || !selected) {
      alert("Please fill all required fields!");
      return;
    }

    const payload = {
      type: state, // 'income' or 'expanse'
      wallet: wallet,
      category: selected.name,
      rupee: parseFloat(rupee),
      note: note,
      reference_number: referance,
      time: now.toLocaleTimeString("en-GB", { hour12: false }),  // "HH:MM:SS"
      created_at: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await axios.post("http://localhost:8000/api/tracker/trackdata/", payload);
      console.log("Saved:", res.data);
      fetchTrackData()
      toast.success("data saved")
      setIsOpen(false); // close modal
      // optionally reset form
      setWallet("");
      setRupee("");
      setNote("");
      setReferance("");
      setSelected(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${!isOpen && 'hidden'}`}>
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 bg-gray-500/50 flex justify-center items-end z-50"
            onClick={() => {setIsOpen(false); setOpen(false)}} // close when clicking background
          >
            {/* Dialog Box with animation */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="bg-white w-full max-w-md rounded-t-2xl shadow-lg p-5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tabs */}
              <div className="flex mb-4 items-center justify-between">
                <button onClick={()=>setState('expanse')} className={`flex items-center justify-center gap-2 py-2 w-full rounded-xl cursor-pointer text-gray-500 ${state==='expanse' && 'bg-red-50 text-red-500'}`}>
                  <IoBagHandleOutline className="text-[17px]" />
                  Expense
                </button>
                <button onClick={()=>setState('income')} className={`flex w-full items-center justify-center gap-2 py-2 rounded-xl cursor-pointer text-gray-500 ${state==='income' && 'bg-green-50 text-green-500'}`}>
                  <CiWallet className="text-[18px]"/>
                  Income
                </button>
              </div>

              {/* Wallet Select */}
              <select onChange={(e) => setWallet(e.target.value)} value={wallet} className="w-full border-1 border-gray-300 rounded-lg p-2 mb-3" required>
                <option value="">Select a wallet</option>
                {
                  walletData.map((wallet)=>(
                    <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                  ))
                }
                {/* <option value='Cash'>Cash</option>
                <option value='Bank'>Bank</option> */}
              </select>

              {/* Category */}
              {/* <input
                type="text"
                placeholder="Search category..."
                className="w-full border rounded-lg p-2 mb-3"
              /> */}

              <div className="relative w-full">
                {/* Input box */}
                <div className="flex items-center mb-2 border-1 border-gray-300 rounded-lg">
                  {
                    selected && 
                    <div className={`px-2 text-[20px] ${selected ? selected.bg : ''}`}>
                    {selected.icon}
                    </div>
                  }
                  {/* <CiWallet className={`px-2 text-[40px] ${selected ? selected.bg : ''}`}/> */}
                <input
                  type="text"
                  placeholder="Search category..."
                  value={selected ? selected.name : query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(null); // reset selected when typing
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  className="w-full p-2 outline-none"
                  required
                />
                </div>
                {/* Dropdown list */}
                {open && (
                  <div className="absolute top-full mt-1 w-full bg-white border-1 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                    {filtered.length > 0 ? (
                      filtered.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelected(cat);
                            setQuery(cat.name);
                            setOpen(false);
                          }}
                        >
                          {cat.icon}
                          <span>{cat.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No results</div>
                    )}
                  </div>
                )}
              </div>

              {/* Amount */}
              <input
                onChange={(e)=>setRupee(e.target.value)}
                value={rupee}
                type="number"
                placeholder="0"
                className="w-full border-1 border-gray-300 outline-none rounded-lg p-2 mb-3 text-center text-2xl font-medium"
                required
              />

              {/* Note */}
              <textarea
                onChange={(e)=>setNote(e.target.value)}
                value={note}
                placeholder="Add a note..."
                className="w-full border-1 border-gray-300 outline-none rounded-lg p-2 mb-3"
              ></textarea>

              {/* Reference */}
              <input
                onChange={(e)=>setReferance(e.target.value)}
                value={referance}
                type="text"
                placeholder="Reference number (optional)"
                className="w-full border-1 border-gray-300 outline-none rounded-lg p-2 mb-3"
              />

              {/* Button */}
              <button onClick={handleSubmit} className='w-full py-2 rounded-lg text-white cursor-pointer bg-blue-500'>
                Add {state}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseDialog;
