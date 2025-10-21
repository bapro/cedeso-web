// import React, { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface IncidentData {
//   id: number;
//   province: string;
//   municipio: string;
// }

// interface ProvinceByMunicipalityBarChartProps {
//   apiEndpoint: string;
// }

// const ProvinceByMunicipalityBarChart: React.FC<
//   ProvinceByMunicipalityBarChartProps
// > = ({ apiEndpoint }) => {
//   const [chartData, setChartData] = useState<{
//     labels: string[];
//     datasets: {
//       label: string;
//       data: number[];
//       backgroundColor: string;
//     }[];
//   }>({
//     labels: [],
//     datasets: [],
//   });

//   const [totalReports, setTotalReports] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiEndpoint);
//         const data: IncidentData[] = await response.json();

//         // --- DATA TRANSFORMATION LOGIC START ---
//         // Group by province, then count municipios
//         const provinceData: {
//           [province: string]: { [municipio: string]: number };
//         } = {};

//         data.forEach((incident) => {
//           if (!provinceData[incident.province]) {
//             provinceData[incident.province] = {};
//           }
//           provinceData[incident.province][incident.municipio] =
//             (provinceData[incident.province][incident.municipio] || 0) + 1;
//         });

//         // Prepare chart data for grouped bars
//         const labels: string[] = [];
//         const datasets: {
//           label: string;
//           data: number[];
//           backgroundColor: string;
//         }[] = [];
//         const backgroundColors = [
//           "rgba(153, 102, 255, 0.7)",
//           "rgba(255, 159, 64, 0.7)",
//           "rgba(75, 192, 192, 0.7)",
//         ]; // Define colors
//         let colorIndex = 0;

//         for (const province in provinceData) {
//           if (provinceData.hasOwnProperty(province)) {
//             const municipioCounts = provinceData[province];
//             const municipioLabels = Object.keys(municipioCounts);
//             const municipioData = Object.values(municipioCounts);

//             datasets.push({
//               label: province, // Each dataset represents a province
//               data: municipioData, // Data for the municipios in that province
//               backgroundColor:
//                 backgroundColors[colorIndex % backgroundColors.length],
//             });
//             labels.push(...municipioLabels); // Add municipio labels for the X axis
//             colorIndex++;
//           }
//         }
//         // --- DATA TRANSFORMATION LOGIC END ---

//         setChartData({
//           labels: labels, // set labels to the municipio names.
//           datasets: datasets,
//         });

//         setTotalReports(data.length);
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
//         position: "bottom" as const,
//         display: true, // Show the legend
//       },
//       title: {
//         display: false,
//         text: "Municipios por Provincia", // Translated
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context: any) {
//             let label = context.dataset.label || ""; // use dataset label
//             if (label) {
//               label += ": ";
//             }
//             const value = context.parsed.y || 0;
//             return label + value;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         stacked: false, //  Grouped bars
//         title: {
//           display: true,
//           text: "Municipios", // X axis label
//         },
//       },
//       y: {
//         beginAtZero: true,
//         stacked: false, // Grouped bars
//         title: {
//           display: true,
//           text: "Cantidad de Reportes", // Y axis label
//         },
//       },
//     },
//   };

//   return (
//     <div className="pie-chart-container">
//       <h1 className="chart-title">Municipios por Provincia</h1>
//       <h3 className="chart-subtitle">
//         Total de reportes ({totalReports} reportes)
//       </h3>
//       <Bar data={chartData} options={options} />
//     </div>
//   );
// };

// export default ProvinceByMunicipalityBarChart;
// import React, { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface IncidentData {
//   id: number;
//   province: string;
//   municipio: string;
// }

// interface ProvinceByMunicipalityBarChartProps {
//   apiEndpoint: string;
// }

// const ProvinceByMunicipalityBarChart: React.FC<
//   ProvinceByMunicipalityBarChartProps
// > = ({ apiEndpoint }) => {
//   const [chartData, setChartData] = useState<{
//     labels: string[];
//     datasets: {
//       label: string;
//       data: number[];
//       backgroundColor: string;
//     }[];
//   }>({
//     labels: [],
//     datasets: [],
//   });

//   const [totalReports, setTotalReports] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiEndpoint);
//         const data: IncidentData[] = await response.json();

//         // --- DATA TRANSFORMATION LOGIC START ---
//         // Group by province, then count municipios
//         const provinceData: {
//           [province: string]: { [municipio: string]: number };
//         } = {};

//         data.forEach((incident) => {
//           if (!provinceData[incident.province]) {
//             provinceData[incident.province] = {};
//           }
//           provinceData[incident.province][incident.municipio] =
//             (provinceData[incident.province][incident.municipio] || 0) + 1;
//         });

//         // Prepare Labels
//         const allMunicipios = new Set<string>();
//         data.forEach((item) => {
//           allMunicipios.add(item.municipio);
//         });
//         const labelsArray = Array.from(allMunicipios);

//         // Prepare chart data for grouped bars
//         const datasets: {
//           label: string;
//           data: number[];
//           backgroundColor: string;
//         }[] = [];
//         const backgroundColors = [
//           "rgba(153, 102, 255, 0.7)",
//           "rgba(255, 159, 64, 0.7)",
//           "rgba(75, 192, 192, 0.7)",
//         ]; // Define colors
//         let colorIndex = 0;

//         for (const province in provinceData) {
//           if (provinceData.hasOwnProperty(province)) {
//             const municipioCounts = provinceData[province];
//             // const municipioLabels = Object.keys(municipioCounts); // Not used

//             const newData = labelsArray.map((municipio) => {
//               return municipioCounts[municipio] || 0;
//             });

//             datasets.push({
//               label: province, // Each dataset represents a province
//               data: newData, // Use the prepared data
//               backgroundColor:
//                 backgroundColors[colorIndex % backgroundColors.length],
//             });

//             colorIndex++;
//           }
//         }
//         // --- DATA TRANSFORMATION LOGIC END ---

//         setChartData({
//           labels: labelsArray, // Set labels to municipios
//           datasets: datasets,
//         });

//         setTotalReports(data.length);
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
//         position: "bottom" as const,
//         display: true, // Show the legend
//       },
//       title: {
//         display: false,
//         text: "Municipios por Provincia", // Translated
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context: any) {
//             let label = context.dataset.label || ""; // use dataset label
//             if (label) {
//               label += ": ";
//             }
//             const value = context.parsed.y || 0;
//             return label + value;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         stacked: false, //  Grouped bars
//         title: {
//           display: true,
//           text: "Municipios", // X axis label
//         },
//       },
//       y: {
//         beginAtZero: true,
//         stacked: false, // Grouped bars
//         title: {
//           display: true,
//           text: "Cantidad de Reportes", // Y axis label
//         },
//       },
//     },
//   };

//   return (
//     <div className="pie-chart-container">
//       <h1 className="chart-title">Municipios por Provincia</h1>
//       <h3 className="chart-subtitle">
//         Total de reportes ({totalReports} reportes)
//       </h3>
//       <Bar data={chartData} options={options} />
//     </div>
//   );
// };

// export default ProvinceByMunicipalityBarChart;

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
  municipio: string;
}

interface ProvinceByMunicipalityBarChartProps {
  apiEndpoint: string;
}

const ProvinceByMunicipalityBarChart: React.FC<
  ProvinceByMunicipalityBarChartProps
> = ({ apiEndpoint }) => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  const [totalReports, setTotalReports] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data: IncidentData[] = await response.json();

        // --- DATA TRANSFORMATION LOGIC START ---
        // Group by province, then count municipios
        const provinceData: {
          [province: string]: { [municipio: string]: number };
        } = {};

        data.forEach((incident) => {
          if (!provinceData[incident.province]) {
            provinceData[incident.province] = {};
          }
          provinceData[incident.province][incident.municipio] =
            (provinceData[incident.province][incident.municipio] || 0) + 1;
        });

        // Prepare Labels
        const allMunicipios = new Set<string>();
        data.forEach((item) => {
          allMunicipios.add(item.municipio);
        });
        const labelsArray = Array.from(allMunicipios);

        // Prepare chart data for grouped bars
        const datasets: {
          label: string;
          data: number[];
          backgroundColor: string;
        }[] = [];
        const backgroundColors = [
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ]; // Define colors
        let colorIndex = 0;

        for (const province in provinceData) {
          if (provinceData.hasOwnProperty(province)) {
            const municipioCounts = provinceData[province];
            // const municipioLabels = Object.keys(municipioCounts); // Not used

            const newData = labelsArray.map((municipio) => {
              return municipioCounts[municipio] || 0;
            });

            datasets.push({
              label: province, // Each dataset represents a province
              data: newData, // Use the prepared data
              backgroundColor:
                backgroundColors[colorIndex % backgroundColors.length],
            });

            colorIndex++;
          }
        }
        // --- DATA TRANSFORMATION LOGIC END ---

        setChartData({
          labels: labelsArray, // Set labels to municipios
          datasets: datasets,
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
    indexAxis: "y" as const, // Make it horizontal
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const, // Move legend to right
        display: true,
      },
      title: {
        display: false,
        text: "Municipios por Provincia",
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
          text: "Cantidad de Reportes", // X axis label
        },
      },
      y: {
        stacked: false, // Grouped bars
        title: {
          display: true,
          text: "Municipios", // Y axis label
        },
      },
    },
  };

  return (
    <div className="bar-chart-container">
      <h1 className="chart-title">Municipios por Provincia</h1>
      <h3 className="chart-subtitle">
        Total de reportes ({totalReports} reportes)
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ProvinceByMunicipalityBarChart;
