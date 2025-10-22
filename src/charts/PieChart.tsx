import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// Changed to the correct data
interface ProfileData {
  profileType: string | null; // Now it must be string | null to match what is coming from the backend
}

interface IncidentData {
  id: number;
  profileType: string | null; // ADDED THIS
}

interface PieChartProps {
  apiEndpoint: string; //  Accept the API endpoint as a prop
}

const PieChart: React.FC<PieChartProps> = ({ apiEndpoint }) => {
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
        label: "Population",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [totalPersons, setTotalPersons] = useState(0); // State for the total
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint); // Use the prop
        const data: IncidentData[] = await response.json();
        // console.log("Raw Data from API:", data); // Log raw data
        // Process the data to create chart data
        const profileCounts: { [key: string]: number } = {};
        data.forEach((incident) => {
          // console.log("Processing Incident:", incident); // Log each incident
          if (incident.profileType) {
            // Use profileType directly
            // console.log("profileType:", incident.profileType); // Log profileType
            profileCounts[incident.profileType] =
              (profileCounts[incident.profileType] || 0) + 1;
          }
        });

        const labels = Object.keys(profileCounts);
        // console.log("Labels:", labels); // Log labels
        const dataValues = Object.values(profileCounts);
        // console.log("Data Values:", dataValues); // Log data values
        const backgroundColors = labels.map((_, index) => {
          const colors = [
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 99, 132, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(10, 200, 100, 0.7)",
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
              label: "Personas",
              data: dataValues,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        });

        // Calculate the total
        const total = dataValues.reduce((sum, value) => sum + value, 0);
        setTotalPersons(total);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, maybe set an error state to display a message to the user
      }
    };

    fetchData();
  }, [apiEndpoint]); // Add apiEndpoint as a dependency

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const, // Change position to "bottom"
        display: true,
        labels: {
          padding: 20,
          usePointStyle: true, // Makes legend icons round/smaller if desired
        },
      },
      title: {
        display: false,
        text: "Total de personas por perfil - 238 personas",
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
      <h1 className="chart-title">Total de personas por perfil </h1>
      <h3 className="chart-subtitle">Total de ({totalPersons} personas) </h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
