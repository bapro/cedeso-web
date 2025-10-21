import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IncidentData {
  id: number;
  province: string;
}

interface ProvinceBarChartProps {
  apiEndpoint: string;
}

const ProvinceBarChart: React.FC<ProvinceBarChartProps> = ({ apiEndpoint }) => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Provincia",
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const [totalReports, setTotalReports] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data: IncidentData[] = await response.json();

        // --- DATA TRANSFORMATION LOGIC START ---
        const provinceCounts: { [key: string]: number } = {};
        data.forEach((incident) => {
          provinceCounts[incident.province] =
            (provinceCounts[incident.province] || 0) + 1;
        });

        const labels = Object.keys(provinceCounts);
        const dataValues = Object.values(provinceCounts);

        const backgroundColors = labels.map((_, index) => {
          const colors = [
            "rgba(153, 102, 255, 0.7)", // Purple
            "rgba(255, 159, 64, 0.7)", // Orange
            "rgba(75, 192, 192, 0.7)", // Green
          ];
          return colors[index % colors.length];
        });
        // --- DATA TRANSFORMATION LOGIC END ---

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Provincia", // Translate
              data: dataValues,
              backgroundColor: backgroundColors,
            },
          ],
        });

        setTotalReports(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error
      }
    };

    fetchData();
  }, [apiEndpoint]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend since it's redundant
      },
      title: {
        display: false,
        text: "Provincia", // Translated
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            const value = context.parsed.y || 0; // Access the y-value for the bar
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            ); // Calculate total from the current dataset
            const percentage = Math.round((value / total) * 100);
            return label + value + " (" + percentage + "%)";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="pie-chart-container">
      {" "}
      {/* Reuse the container style */}
      <h1 className="chart-title">Provincia</h1>
      <h3 className="chart-subtitle">
        Total de reportes ({totalReports} reportes)
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ProvinceBarChart;
