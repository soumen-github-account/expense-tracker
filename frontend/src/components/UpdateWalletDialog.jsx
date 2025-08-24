import React, { useContext, useEffect, useState } from "react";
import { GiCrossMark } from "react-icons/gi";
import { BsCashStack } from "react-icons/bs";
import { RiBankLine } from "react-icons/ri";
import { GoCreditCard } from "react-icons/go";
import toast from "react-hot-toast";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";

const wallet = [
  { id: 1, name: "Bank", icon: <div className="text-green-600"><RiBankLine /></div> },
  { id: 2, name: "Card", icon: <div className="text-blue-600"><GoCreditCard /></div> },
  { id: 3, name: "Cash", icon: <div className="text-violet-600"><BsCashStack /></div> }
]
const UpdateWalletDialog = ({upOpen, setUpOpen, record}) => {
  const {fetchWalletData, backendUrl} = useContext(AppContext)
  const [walletName, setWalletName] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  
  const [walletType, setWalletType] = useState("Bank");

  const handleSave = async() => {
    if (!walletName.trim()) {
      alert("Please enter wallet name");
      return;
    }
    try {
      const response = await axios.put(backendUrl + `/api/wallets/${record.id}/`, {
        name: walletName,
        rupee: parseFloat(walletBalance),
        type: walletType,
        transaction: 0, // default
      });
      toast.success("Walle created")

      setWalletName("");
      setWalletBalance("");
      setWalletType("Bank");
      fetchWalletData();
      setUpOpen(false);
    } catch (error) {
      console.error("Error adding wallet:", error);
      alert("Failed toupdate wallet");
    }
    setWalletName("");
    setWalletType("Bank");
    setUpOpen(false);
  };


  useEffect(()=>{
      if(record){
        setWalletName(record.name || '')
        setWalletBalance(record.rupee || 0)
        setWalletType(record.type || '')
      }
  }, [record])

  if (!upOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-3">
      <div className="bg-white rounded-xl shadow-lg md:w-[500px] w-full">
        {/* Header */}
        <div className="flex justify-between items-center border-b-1 border-b-gray-300 px-4 py-3">
          <h2 className="text-lg font-semibold">Add Wallet</h2>
          <button
            onClick={() => setUpOpen(false)}
            className="text-gray-500 text-[24px] p-1 cursor-pointer hover:text-gray-700"
          >
            <GiCrossMark />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Wallet Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wallet name
            </label>
            <input
              type="text"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              className="w-full border-1 border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Enter wallet name"
            />

            <label className="block text-sm font-medium text-gray-700 my-1">
              Balance
            </label>
            <input
              type="number"
              value={walletBalance}
              onChange={(e) => setWalletBalance(e.target.value)}
              className="w-full border-1 border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Enter wallet balance"
            />
          </div>

          {/* Wallet Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Type
            </label>
            <div className="flex gap-3 justify-between">
              {wallet.map((type) => {
                let borderColor = "border-gray-400";
                let bgColor = "bg-white"; // optional: background

                if (walletType === type.name) {
                  if (type.name === "Bank") { borderColor = "border-green-400 shadow-md border-2"; bgColor = "bg-green-50"; }
                  if (type.name === "Card") { borderColor = "border-blue-400 shadow-md border-2"; bgColor = "bg-blue-50"; }
                  if (type.name === "Cash") { borderColor = "border-violet-400 shadow-md border-2"; bgColor = "bg-violet-50"; }
                }

                return (
                  <button
                    key={type.id}
                    onClick={() => setWalletType(type.name)}
                    className={`flex justify-center gap-2 items-center rounded-lg py-2 w-full border-1 ${borderColor} ${bgColor}`}
                  >
                    {type.icon}
                    {type.name}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t-1 border-t-gray-200 px-4 py-3">
          <button
            onClick={() => setUpOpen(false)}
            className="px-4 py-2 rounded text-gray-600 cursor-pointer hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-1.5 cursor-pointer rounded bg-green-600 text-white hover:bg-green-700"
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateWalletDialog;
