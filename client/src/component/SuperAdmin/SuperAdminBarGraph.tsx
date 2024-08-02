import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type statistics = {
  All: number;
    unknown: number;
    unverified: number;
    verified: number;
}

const SuperAdminBarGraph = () => {
  const [statistics, setStatistics] = useState<statistics | null>()
const fetchAllGeneratedPropertyData = async()=>{
  const data = await axios.get('/superAdmin/admin_generated_qrcodes');
  setStatistics(data.data);
}

useEffect(()=>{
 fetchAllGeneratedPropertyData();
},[])

  const chartData = {
    labels: ["Total QrCode's", "Verified QrCode's", "Unverified QrCode's", "Unknown QrCode's"],
    datasets: [
      {
        label: "Generated Qr Code's Statistics",
        data: [statistics?.All, statistics?.verified, statistics?.unverified, statistics?.unknown],
        borderColor: "rgb(14 165 233)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
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
    <div className="p-6 w-[500px] relative z-20 md:w-[900px]  mx-auto lg:w-[1200px]">
      <Bar className="w-full" data={chartData} options={options} />
    </div>
  );
};

export default SuperAdminBarGraph;
