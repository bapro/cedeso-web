import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CaptureData {
  id: number;
  violenceIndicators: string[];
}

interface ViolenceIndicatorsPieChartProps {
  apiEndpoint: string;
}

const ViolenceIndicatorsPieChart: React.FC<ViolenceIndicatorsPieChartProps> = ({
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
        label: "Indicadores de Violencia", // Translated
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
        // Assuming the API returns an array of objects, each with a 'capture' property
        const data: any = await response.json(); // Use 'any' or create specific type if possible

        // --- DATA TRANSFORMATION LOGIC START ---
        const indicatorCounts: { [key: string]: number } = {};

        data.forEach((item: any) => {
          const capture = item.capture; // Access the capture object

          if (
            capture &&
            capture.violenceIndicators &&
            Array.isArray(capture.violenceIndicators)
          ) {
            capture.violenceIndicators.forEach((indicator: string | number) => {
              indicatorCounts[indicator] =
                (indicatorCounts[indicator] || 0) + 1;
            });
          }
        });
        // --- DATA TRANSFORMATION LOGIC END ---

        const labels = Object.keys(indicatorCounts);
        const dataValues = Object.values(indicatorCounts);

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
              label: "Indicadores de Violencia", // Translated
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
        text: "Indicadores de Violencia", // Translated
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
      <h1 className="chart-title">Indicadores de Violencia</h1>
      <h3 className="chart-subtitle">
        Total de reportes ({totalReports} reportes)
      </h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default ViolenceIndicatorsPieChart;
