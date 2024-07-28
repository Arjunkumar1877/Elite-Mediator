import { FC } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DashBoardGraphProps {
  data: {
    All: number;
    unVerified: number;
    unknown: number;
    verified: number;
  };
}

const DashBoardGraph: FC<DashBoardGraphProps> = ({ data }) => {
  const chartData = {
    labels: ["All Users", "Verified Users", "Unverified Users", "Unknown Users"],
    datasets: [
      {
        label: "User Statistics",
        data: [data.All, data.verified, data.unVerified, data.unknown],
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
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DashBoardGraph;
