import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CaptureData {
  id: number;
  authorities: string[];
}
interface IncidentData {
  id: number;
  capture: CaptureData | null; //  Capture is a property of Incident, and can be null
}
interface AuthoritiesPieChartProps {
  apiEndpoint: string;
}

const AuthoritiesPieChart: React.FC<AuthoritiesPieChartProps> = ({
  apiEndpoint,
}) => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Autoridades", // Translated
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const [totalReports, setTotalReports] = useState(0); // State for the total

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data: IncidentData[] = await response.json(); // Use the IncidentData type

        // --- DATA TRANSFORMATION LOGIC START ---
        const authorityCounts: { [key: string]: number } = {};

        data.forEach((item) => {
          if (
            item.capture &&
            item.capture.authorities &&
            Array.isArray(item.capture.authorities)
          ) {
            item.capture.authorities.forEach((authority) => {
              authorityCounts[authority] =
                (authorityCounts[authority] || 0) + 1;
            });
          }
        });
        // --- DATA TRANSFORMATION LOGIC END ---

        const labels = Object.keys(authorityCounts);
        const dataValues = Object.values(authorityCounts);

        const backgroundColors = labels.map((_, index) => {
          const colors = [
            "rgba(153, 102, 255, 0.7)", // Purple
            "rgba(255, 159, 64, 0.7)", // Orange
            "rgba(75, 192, 192, 0.7)", // Green
            "rgba(54, 162, 235, 0.7)", // Blue
            "rgba(255, 99, 132, 0.7)", // Red
            "rgba(255, 206, 86, 0.7)", // Yellow
          ];
          return colors[index % colors.length];
        });
        const borderColors = backgroundColors.map((color) =>
          color.replace("0.7", "1")
        );

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Autoridades", // Translated
              data: dataValues,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
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
        position: "bottom" as const,
        display: true,
        labels: {
          padding: 20,
          usePointStyle: true, // Makes legend icons round/smaller if desired
        },
      },
      title: {
        display: false,
        text: "Autoridad que intervino (para eventos)", // Translated
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            const value = context.raw || 0;
            const total = context.chart._metasets[context.datasetIndex].total;
            const percentage = Math.round((value / total) * 100);
            return label + value + " (" + percentage + "%)";
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart-container">
      <h1 className="chart-title">Autoridad que intervino (para eventos)</h1>
      <h3 className="chart-subtitle">
        Total de reportes ({totalReports} reportes)
      </h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default AuthoritiesPieChart;
