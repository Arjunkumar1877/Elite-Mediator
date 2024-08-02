import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// interface DashBoardGraphProps {
//   data: {
//     All: number;
//     unVerified: number;
//     unknown: number;
//     verified: number;
//   };
// }

type Statistics = {
  Admins: number;
  AllVisitors: number;
  VerifiedVisitors: number;
  UnknownVisitors: number;
  UnverifiedVisitors: number;
}

const SuperAdminLineGraph = () => {
  const [statistics, setStatistics] = useState<Statistics | null>();
  const fetchAdminAndVisitorsCount = async()=>{
    try {
      const data = await axios.get('/superAdmin/admin_and_visitors_count');

      setStatistics(data.data);
      console.log(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAdminAndVisitorsCount();
  },)
  const chartData = {
    labels: ["Registered Admins","All Users", "Verified Users", "Unverified Users", "Unknown Users"],
    datasets: [
      {
        label: "User Statistics",
        data: [ statistics?.Admins ,statistics?.AllVisitors, statistics?.VerifiedVisitors, statistics?.UnverifiedVisitors, statistics?.UnknownVisitors],
        borderColor: "rgb(14 165 233)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "User Statistics Chart",
      },
    },
  };

  return (
    <div className="p-6 w-[500px] relative z-20 md:w-[900px]  mx-auto lg:w-[1200px]" >
      <Line className="w-full" data={chartData} options={options} />
    </div>
  );
};

export default SuperAdminLineGraph;

