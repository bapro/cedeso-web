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
  females: number;
  males: number;
}

interface GenderBarChartProps {
  apiEndpoint: string;
}

const GenderBarChart: React.FC<GenderBarChartProps> = ({ apiEndpoint }) => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  }>({
    labels: ["Femenino", "Masculino"],
    datasets: [
      {
        label: "Personas", // Translated
        data: [0, 0], // Initial values
        backgroundColor: "rgba(153, 102, 255, 0.7)", // Purple
      },
    ],
  });

  const [totalPersons, setTotalPersons] = useState(0);
  const [femalePercentage, setFemalePercentage] = useState(0); // New state
  const [malePercentage, setMalePercentage] = useState(0); // New state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data: IncidentData[] = await response.json();

        // --- DATA TRANSFORMATION LOGIC START ---
        let femaleCount = 0;
        let maleCount = 0;

        data.forEach((incident) => {
          femaleCount += incident.females;
          maleCount += incident.males;
        });

        const total = femaleCount + maleCount;
        setTotalPersons(total);

        const femalePercentageValue = total ? (femaleCount / total) * 100 : 0;
        const malePercentageValue = total ? (maleCount / total) * 100 : 0;

        setFemalePercentage(femalePercentageValue);
        setMalePercentage(malePercentageValue);

        setChartData({
          labels: ["Femenino", "Masculino"],
          datasets: [
            {
              label: "Personas", // Translated
              data: [femaleCount, maleCount],
              backgroundColor: "rgba(153, 102, 255, 0.7)", // Purple
            },
          ],
        });
        // --- DATA TRANSFORMATION LOGIC END ---
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error
      }
    };

    fetchData();
  }, [apiEndpoint]);

  const options = {
    indexAxis: "y" as const, // Make it horizontal
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend, we'll show percentages in the tooltip
        position: "right" as const,
      },
      title: {
        display: false,
        text: "Total de personas",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            const value = context.parsed.x || 0; // Access the x-value
            const percentage = totalPersons
              ? Math.round((value / totalPersons) * 100)
              : 0;
            return label + value + " (" + percentage + "%)";
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Cantidad de personas", // Translated
        },
      },
      y: {
        stacked: false, // Grouped bars
        title: {
          display: true,
          text: "Género", // Translated
        },
      },
    },
  };

  return (
    <div className="pie-chart-container">
      <h1 className="chart-title">Total de personas</h1>
      <h3 className="chart-subtitle">Total de personas - {totalPersons}</h3>
      <Bar data={chartData} options={options} />
      {/* Table */}
      <table
        style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Género
            </th>
            <th
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Porcentaje
            </th>
            <th
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Cantidad
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              Femenino
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {femalePercentage.toFixed(2)}%
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {chartData.datasets[0].data[0]}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              Masculino
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {malePercentage.toFixed(2)}%
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {chartData.datasets[0].data[1]}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GenderBarChart;
