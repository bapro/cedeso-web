// import React, { useState, useEffect } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
// // import './PieChart.css'; // Reuse the existing styles

// // Register the components
// ChartJS.register(ArcElement, Tooltip, Legend);

// interface IncidentData {
//   id: number;
//   reporterType: string;
//   otherReporterType: string | null; // Corrected type
// }

// interface ReporterTypeChartProps {
//   apiEndpoint: string;
// }

// const ReporterTypeChart: React.FC<ReporterTypeChartProps> = ({
//   apiEndpoint,
// }) => {
//   const [chartData, setChartData] = useState<{
//     labels: string[];
//     datasets: {
//       label: string;
//       data: number[];
//       backgroundColor: string[];
//       borderColor: string[];
//       borderWidth: number;
//     }[];
//   }>({
//     labels: [],
//     datasets: [
//       {
//         label: "Reporter Types",
//         data: [],
//         backgroundColor: [],
//         borderColor: [],
//         borderWidth: 1,
//       },
//     ],
//   });

//   const [totalReports, setTotalReports] = useState(0); // State for the total

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiEndpoint);
//         const data: IncidentData[] = await response.json();

//         // Process the data to create chart data
//         const reporterTypeCounts: { [key: string]: number } = {};
//         data.forEach((incident) => {
//           reporterTypeCounts[incident.reporterType] =
//             (reporterTypeCounts[incident.reporterType] || 0) + 1;
//         });

//         const labels = Object.keys(reporterTypeCounts);
//         const dataValues = Object.values(reporterTypeCounts);
//         const backgroundColors = labels.map((_, index) => {
//           const colors = [
//             "rgba(153, 102, 255, 0.7)", // Purple
//             "rgba(255, 159, 64, 0.7)", // Orange
//             "rgba(75, 192, 192, 0.7)", // Green
//             "rgba(54, 162, 235, 0.7)", // Blue
//           ];
//           return colors[index % colors.length];
//         });
//         const borderColors = backgroundColors.map((color) =>
//           color.replace("0.7", "1")
//         );

//         setChartData({
//           labels: labels,
//           datasets: [
//             {
//               label: "Reporter Types",
//               data: dataValues,
//               backgroundColor: backgroundColors,
//               borderColor: borderColors,
//               borderWidth: 1,
//             },
//           ],
//         });

//         // Calculate the total
//         const total = data.length; // Use data.length for the total number of reports
//         setTotalReports(total);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Handle the error
//       }
//     };

//     fetchData();
//   }, [apiEndpoint]);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom" as const, // Or another position
//       },
//       title: {
//         display: false,
//         text: "¿Quién reporta el incidente?",
//       },
//     },
//   };

//   return (
//     <div className="pie-chart-container">
//       <h1 className="chart-title">¿Quién reporta el incidente?</h1>
//       <h3 className="chart-subtitle">
//         Total de reportes ({totalReports} reportes)
//       </h3>
//       <Pie data={chartData} options={options} />
//     </div>
//   );
// };

// export default ReporterTypeChart;

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IncidentData {
  id: number;
  reporterType: string;
}

interface ReporterTypeChartProps {
  apiEndpoint: string;
}

const ReporterTypeChart: React.FC<ReporterTypeChartProps> = ({
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
        label: "Tipos de Reporte",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
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
        const reporterCounts: { [key: string]: number } = {};

        data.forEach((incident) => {
          let label = "Desconocido";

          switch (incident.reporterType) {
            case "victim":
              label = "Victima";
              break;
            case "promoter":
              label = "Promotor/a (monitor/a)";
              break;
            case "relative":
              label = "Familiar";
              break;
            case "witness":
              label = "Testigo";
              break;
            default:
              label = incident.reporterType || "Otro"; // Handle any other values
              break;
          }

          reporterCounts[label] = (reporterCounts[label] || 0) + 1;
        });
        // --- DATA TRANSFORMATION LOGIC END ---

        const labels = Object.keys(reporterCounts);
        const dataValues = Object.values(reporterCounts);

        const colorMap: { [key: string]: string } = {
          Victima: "rgba(153, 102, 255, 0.7)",
          Testigo: "rgba(233, 30, 99, 0.7)",
          "Promotor/a (monitor/a)": "rgba(255, 99, 132, 0.7)",
          Familiar: "rgba(255, 206, 86, 0.7)",
          Otro: "rgba(201, 203, 207, 0.7)",
        };

        const backgroundColors = labels.map(
          (label) => colorMap[label] || "rgba(54, 162, 235, 0.7)"
        );
        const borderColors = backgroundColors.map((color) =>
          color.replace("0.7", "1")
        );

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Tipos de Reporte",
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
      }
    };

    fetchData();
  }, [apiEndpoint]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
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
      title: {
        display: false,
        text: "¿Quién reporta el incidente?",
      },
    },
  };

  return (
    <div className="pie-chart-container">
      <h1 className="chart-title">¿Quién reporta el incidente?</h1>
      <h3 className="chart-subtitle">
        Total de reportes ({totalReports} reportes)
      </h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default ReporterTypeChart;
