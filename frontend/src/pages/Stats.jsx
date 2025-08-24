
// import React, { useContext, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   LabelList,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   Legend,
// } from "recharts";
// import dayjs from "dayjs";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// import { AppContext } from "../contexts/AppContext";

// dayjs.extend(isSameOrAfter);

// // Prepare data for bar chart
// function prepareBarData(data) {
//   return data.reduce((acc, item) => {
//     if (item.type.toLowerCase().startsWith("expan")) {
//       const found = acc.find((d) => d.category === item.category);
//       if (found) {
//         found.amount += Number(item.rupee);
//       } else {
//         acc.push({ category: item.category, amount: Number(item.rupee) });
//       }
//     }
//     return acc;
//   }, []);
// }

// // Prepare data for line chart (compare two years)
// function prepareLineData(data) {
//   const lineData = Array.from({ length: 12 }, (_, i) => ({
//     month: dayjs().month(i).format("MMM"),
//     y2024: 0,
//     y2025: 0,
//   }));

//   data.forEach((item) => {
//     if (!item.createdAt) return;
//     const date = dayjs(item.createdAt + " 2025", "DD MMM YYYY"); // fallback year if missing
//     if (!date.isValid()) return;

//     const monthIndex = date.month();
//     const year = date.year();
//     const amount = Number(item.rupee);

//     if (year === 2024) lineData[monthIndex].y2024 += amount;
//     if (year === 2025) lineData[monthIndex].y2025 += amount;
//   });

//   return lineData;
// }

// export default function Stats() {
//   const {trackData} = useContext(AppContext)
//   const [filter, setFilter] = useState("Monthly");
//   const [year1, setYear1] = useState(2024);
//   const [year2, setYear2] = useState(2025);

//   //Grand Total (all time)
//   const grandTotal = trackData
//     .filter((item) => item.type.toLowerCase().startsWith("expan"))
//     .reduce((sum, item) => sum + Number(item.rupee), 0);

//   //Filtered data (based on Weekly/Monthly/Yearly)
//   const filteredData = trackData.filter((item) => {
//     if (!item.createdAt) return false;
//     const date = dayjs(item.createdAt, "DD MMM YYYY");
//     const now = dayjs();

//     if (filter === "Weekly") return date.isSameOrAfter(now.subtract(7, "day"));
//     if (filter === "Monthly") return date.isSameOrAfter(now.startOf("month"));
//     if (filter === "Yearly") return date.isSameOrAfter(now.startOf("year"));
//     return true; // Custom = all
//   });

//   // Prepare chart data
//   const barData = prepareBarData(filteredData);
//   const lineData = prepareLineData(trackData);

//   // Filtered total (for current view)
//   const filteredTotal = filteredData
//     .filter((item) => item.type.toLowerCase().startsWith("expan"))
//     .reduce((sum, item) => sum + Number(item.rupee), 0);

//   return (
//     <div className="min-h-screen bg-gray-100 md:p-6 pt-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left Card - Bar Chart */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <p className="text-gray-500 mb-1">Total Spent</p>
//           <h2 className="text-red-500 text-2xl font-bold">₹{filteredTotal}</h2>
//           <p className="text-gray-400 text-sm mb-4">
//             Grand Total: ₹{grandTotal}
//           </p>

//           {/* Filter Buttons */}
//           <div className="flex gap-2 mb-4 overflow-scroll scroll-hide">
//             {["Weekly", "Monthly", "Yearly", "Custom"].map((btn) => (
//               <button
//                 key={btn}
//                 onClick={() => setFilter(btn)}
//                 className={`px-4 py-1 rounded-full transition ${
//                   filter === btn
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {btn}
//               </button>
//             ))}
//           </div>

//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={barData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="amount" fill="#FF9800">
//                 <LabelList dataKey="amount" position="top" formatter={(v) => `₹${v}`} />
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Right Card - Line Chart */}
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold">Monthly Spendings Comparison</h2>
//             <div className="flex gap-2">
//               <select
//                 value={year1}
//                 onChange={(e) => setYear1(Number(e.target.value))}
//                 className="px-2 py-1 border rounded-lg text-sm"
//               >
//                 <option value={2024}>2024</option>
//                 <option value={2025}>2025</option>
//               </select>
//               <span className="text-gray-500">vs</span>
//               <select
//                 value={year2}
//                 onChange={(e) => setYear2(Number(e.target.value))}
//                 className="px-2 py-1 border rounded-lg text-sm"
//               >
//                 <option value={2024}>2024</option>
//                 <option value={2025}>2025</option>
//               </select>
//             </div>
//           </div>

//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={lineData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey={`y${year1}`} stroke="#3b82f6" name={`${year1}`} />
//               <Line type="monotone" dataKey={`y${year2}`} stroke="#22c55e" name={`${year2}`} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useContext, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Cell,
} from "recharts";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { AppContext } from "../contexts/AppContext";

dayjs.extend(isSameOrAfter);

// Prepare data for bar chart (one bar per category, color based on type)
function prepareBarData(data) {
  return data.reduce((acc, item) => {
    if (!item.category) return acc;

    const found = acc.find((d) => d.category === item.category);
    const amount = Number(item.rupee);

    if (found) {
      found.amount += amount;
    } else {
      acc.push({
        category: item.category,
        amount,
        type: item.type?.toLowerCase(),
      });
    }
    return acc;
  }, []);
}

// Prepare data for line chart (compare two years)
function prepareLineData(data, year1, year2) {
  const lineData = Array.from({ length: 12 }, (_, i) => ({
    month: dayjs().month(i).format("MMM"),
    [`y${year1}`]: 0,
    [`y${year2}`]: 0,
  }));

  data.forEach((item) => {
    if (!item.created_at) return;

    const date = dayjs(item.created_at, "YYYY-MM-DD"); // API format
    if (!date.isValid()) return;

    const monthIndex = date.month();
    const year = date.year();
    const amount = Number(item.rupee);

    if (year === year1) lineData[monthIndex][`y${year1}`] += amount;
    if (year === year2) lineData[monthIndex][`y${year2}`] += amount;
  });

  return lineData;
}

export default function Stats() {
  const { trackData } = useContext(AppContext);
  const [filter, setFilter] = useState("Monthly");
  const [year1, setYear1] = useState(2024);
  const [year2, setYear2] = useState(2025);

  // Filtered data (Weekly/Monthly/Yearly)
  const filteredData = trackData.filter((item) => {
    if (!item.created_at) return false;
    const date = dayjs(item.created_at, "YYYY-MM-DD");
    const now = dayjs();

    if (filter === "Weekly") return date.isSameOrAfter(now.subtract(7, "day"));
    if (filter === "Monthly") return date.isSameOrAfter(now.startOf("month"));
    if (filter === "Yearly") return date.isSameOrAfter(now.startOf("year"));
    return true; // Custom = all
  });

  // Chart data
  const barData = prepareBarData(filteredData);
  const lineData = prepareLineData(trackData, year1, year2);

  // Filtered total (for current view)
  const filteredTotal = filteredData.reduce(
    (sum, item) => sum + Number(item.rupee),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 md:p-6 pt-6 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card - Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500 mb-1">Total Spent</p>
          <h2 className="text-red-500 text-2xl font-bold mb-3">
            ₹ {filteredTotal.toFixed(2)}
          </h2>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4 overflow-scroll scroll-hide">
            {["Weekly", "Monthly", "Yearly", "Custom"].map((btn) => (
              <button
                key={btn}
                onClick={() => setFilter(btn)}
                className={`px-4 py-1 rounded-full transition ${
                  filter === btn
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(v) => `₹${v}`} />
              <Bar dataKey="amount" name="Amount">
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.type === "income" ? "#4CAF50" : "#FF9800"}
                  />
                ))}
                <LabelList
                  dataKey="amount"
                  position="top"
                  formatter={(v) => `₹${v}`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right Card - Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold max-sm:text-[15px]">
              Monthly Spendings Comparison
            </h2>
            <div className="flex gap-2">
              <select
                value={year1}
                onChange={(e) => setYear1(Number(e.target.value))}
                className="px-2 py-1 border rounded-lg text-sm"
              >
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
              </select>
              <span className="text-gray-500">vs</span>
              <select
                value={year2}
                onChange={(e) => setYear2(Number(e.target.value))}
                className="px-2 py-1 border rounded-lg text-sm"
              >
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
              </select>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={`y${year1}`}
                stroke="#3b82f6"
                name={`${year1}`}
              />
              <Line
                type="monotone"
                dataKey={`y${year2}`}
                stroke="#22c55e"
                name={`${year2}`}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
