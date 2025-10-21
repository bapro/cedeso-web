import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

interface ProfileData {
  profileType: string;
}

interface IncidentData {
  id: number;
  profile: ProfileData | null;
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

        // Process the data to create chart data
        const profileCounts: { [key: string]: number } = {};
        data.forEach((incident) => {
          if (incident.profile) {
            profileCounts[incident.profile.profileType] =
              (profileCounts[incident.profile.profileType] || 0) + 1;
          }
        });

        const labels = Object.keys(profileCounts);
        const dataValues = Object.values(profileCounts);
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
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Total de personas por perfil - 238 personas",
      },
    },
  };

  return (
    <div className="pie-chart-container">
      <h1 className="chart-title">Mi gráfico circular</h1>
      <h3 className="chart-subtitle">
        Total de personas por perfil ({totalPersons} personas){" "}
      </h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
