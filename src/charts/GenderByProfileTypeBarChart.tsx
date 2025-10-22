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

// Interfaces for data (using existing types and adding the required properties)
interface IncidentData {
  id: number;
  females: number;
  males: number;
  incidentId: number; // Required for joining with profiles
}

interface ProfileData {
  id: number;
  incidentId: number;
  profileType: string;
}

interface GenderByProfileTypeBarChartProps {
  incidentsEndpoint: string; // API endpoint for incidents
  profilesEndpoint: string; // API endpoint for profiles
}

const GenderByProfileTypeBarChart: React.FC<
  GenderByProfileTypeBarChartProps
> = ({ incidentsEndpoint, profilesEndpoint }) => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: [], // Initialize datasets as an empty array
  });

  const [totalReports, setTotalReports] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both incidents and profiles
        const [incidentsResponse, profilesResponse] = await Promise.all([
          fetch(incidentsEndpoint),
          fetch(profilesEndpoint),
        ]);

        const incidents: IncidentData[] = await incidentsResponse.json();
        const profiles: ProfileData[] = await profilesResponse.json();
        // console.log("Incidents:", incidents); // Log incidents
        // console.log("Profiles:", profiles); // Log profiles

        // --- DATA TRANSFORMATION LOGIC START ---
        // Group by profileType and gender
        const groupedData: {
          [profileType: string]: {
            Masculino: number;
            Femenino: number;
          };
        } = {};

        // Iterate over profiles to link them to incidents
        profiles.forEach((profile) => {
          const incident = incidents.find(
            (incident) => incident.incidentId === profile.incidentId
          );
          //   console.log("Profile:", profile); // Log each profile
          //   console.log("Found Incident:", incident); //Log associated incidents

          if (incident) {
            const profileType = profile.profileType;
            // console.log("profileType:", profileType); // Log profileType
            if (!groupedData[profileType]) {
              groupedData[profileType] = {
                Masculino: 0,
                Femenino: 0,
              };
            }
            groupedData[profileType]["Femenino"] += incident.females;
            groupedData[profileType]["Masculino"] += incident.males;
          }
        });
        // console.log("groupedData:", groupedData); // Log the grouped data
        // Prepare chart data
        const labels = Object.keys(groupedData); // Profile Types
        const datasets = [];
        const backgroundColors = [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
        ]; // Red, Blue

        // Add the gender-specific datasets
        datasets.push({
          label: "Masculino", // Translated
          data: labels.map(
            (profileType) => groupedData[profileType]["Masculino"] || 0
          ),
          backgroundColor: backgroundColors[1],
        });

        datasets.push({
          label: "Femenino", // Translated
          data: labels.map(
            (profileType) => groupedData[profileType]["Femenino"] || 0
          ),
          backgroundColor: backgroundColors[0],
        });
        // console.log("Labels:", labels); // Log labels
        // console.log("Datasets:", datasets); // Log datasets
        // --- DATA TRANSFORMATION LOGIC END ---

        setChartData({
          labels: labels,
          datasets: datasets,
        });

        setTotalReports(profiles.length); // Total reports is the number of profiles
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error
      }
    };

    fetchData();
  }, [incidentsEndpoint, profilesEndpoint]);
  const options = {
    indexAxis: "y" as const, // Make it horizontal
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        display: true, // Show the legend
      },
      title: {
        display: false,
        text: "Total de perfiles por sexo", // Translated
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            const value = context.parsed.x || 0; // Access the x-value
            return label + value;
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
        stacked: true, // Stacked bars
      },
      y: {
        stacked: true, // Stacked bars
        title: {
          display: true,
          text: "Tipo de perfil", // Translated
        },
      },
    },
  };

  return (
    <div className="pie-chart-container">
      <h1 className="chart-title">Total de perfiles por sexo</h1>
      <h3 className="chart-subtitle">Total de reportes - {totalReports}</h3>
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
              Tipo de perfil
            </th>
            <th
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Masculino
            </th>
            <th
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Femenino
            </th>
          </tr>
        </thead>
        <tbody>
          {chartData.labels.map((label, index) => (
            <tr key={label}>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {label}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {chartData.datasets[0].data[index]}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {chartData.datasets[1].data[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenderByProfileTypeBarChart;
