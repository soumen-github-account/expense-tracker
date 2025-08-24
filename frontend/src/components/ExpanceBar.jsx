// import React, { useContext, useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import dayjs from "dayjs";

// import { AppContext } from "../contexts/AppContext";

// // const sampleData = {
// //   D: [
// //     { name: "16 Aug", Income: 120, Expense: 40 },
// //     { name: "17 Aug", Income: 150, Expense: 20 },
// //     { name: "18 Aug", Income: 400, Expense: 240 },
// //     { name: "19 Aug", Income: 40, Expense: 650 },
// //     { name: "20 Aug", Income: 700, Expense: 20 },
// //     { name: "21 Aug", Income: 150, Expense: 20 },
// //     { name: "22 Aug", Income: 150, Expense: 20 },
// //   ],
// //   W: [
// //     { name: "11 Aug - 17 Aug", Income: 678, Expense: 53 },
// //   ],
// //   M: [
// //     { name: "Aug", Income: 2400, Expense: 950 },
// //   ],
// //   Y: [
// //     { name: "2025", Income: 15000, Expense: 8000 },
// //   ],
// //   ALL: [
// //     { name: "2022", Income: 12000, Expense: 6000 },
// //     { name: "2023", Income: 18000, Expense: 9000 },
// //     { name: "2024", Income: 20000, Expense: 10000 },
// //     { name: "2025", Income: 15000, Expense: 8000 },
// //   ],
// // };
    
// const ExpanceBar = ()=> {
//   const {trackData} = useContext(AppContext);

//   const [filter, setFilter] = useState("D");
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     if (trackData?.length) {
//       setChartData(transformData(trackData));
//     }
//   }, [trackData]);

//   const transformData = (trackData) => {
//     const grouped = {};

//     trackData.forEach((item) => {
//       const dateKey = dayjs(item.created_at).format("DD MMM"); // daily
//       if (!grouped[dateKey]) {
//         grouped[dateKey] = { name: dateKey, Income: 0, Expense: 0 };
//       }
//       if (item.type === "income") {
//         grouped[dateKey].Income += parseFloat(item.rupee);
//       } else {
//         grouped[dateKey].Expense += parseFloat(item.rupee);
//       }
//     });

//     return Object.values(grouped);
//   };

//   return (
//     <div className="w-full bg-white p-6 rounded-2xl shadow-md">
//       {/* Filter Buttons */}
//       <div className="flex gap-2 mb-4">
//         {["D", "W", "M", "Y", "ALL"].map((item) => (
//           <button
//             key={item}
//             onClick={() => setFilter(item)}
//             className={`px-3 py-1 rounded-lg transition ${
//               filter === item
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-100 hover:bg-blue-100"
//             }`}
//           >
//             {item}
//           </button>
//         ))}
//       </div>

//       {/* Bar Chart */}
//       <ResponsiveContainer width="100%" height={280}>
//         <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//           <XAxis dataKey="name" />
//           <YAxis
//             domain={[0, 100]} // set max according to your data
//             ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]} 
//           />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="Income" fill="#22c55e" barSize={60} />
//           <Bar dataKey="Expense" fill="#ef4444" barSize={60} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default ExpanceBar;

import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

import { AppContext } from "../contexts/AppContext";

const ExpanceBar = () => {
  const { trackData } = useContext(AppContext);

  const [filter, setFilter] = useState("D");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (trackData?.length) {
      setChartData(transformData(trackData, filter));
    }
  }, [trackData, filter]);

  // 🔑 Transform trackData based on filter
  const transformData = (trackData, filterType) => {
    const grouped = {};

    trackData.forEach((item) => {
      let key;

      if (filterType === "D") {
        key = dayjs(item.created_at).format("DD MMM");
      } else if (filterType === "W") {
        const start = dayjs(item.created_at).startOf("week").format("DD MMM");
        const end = dayjs(item.created_at).endOf("week").format("DD MMM");
        key = `${start} - ${end}`;
      } else if (filterType === "M") {
        key = dayjs(item.created_at).format("MMM YYYY");
      } else if (filterType === "Y") {
        key = dayjs(item.created_at).format("YYYY");
      } else if (filterType === "ALL") {
        key = "All Time";
      }

      if (!grouped[key]) {
        grouped[key] = { name: key, Income: 0, Expense: 0 };
      }

      if (item.type === "income") {
        grouped[key].Income += parseFloat(item.rupee);
      } else {
        grouped[key].Expense += parseFloat(item.rupee);
      }
    });

    return Object.values(grouped);
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-md">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["D", "W", "M", "Y", "ALL"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-3 py-1 rounded-lg transition ${
              filter === item
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-blue-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" fill="#22c55e" barSize={60} />
          <Bar dataKey="Expense" fill="#ef4444" barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpanceBar;
