import React from "react";
import "./App.css";
import PieChart from "./charts/PieChart";
import ReporterTypeChart from "./charts/ReporterTypeChart"; // Import the new component
import ProvinceBarChart from "./charts/ProvinceBarChart"; // Import the new component
import ProvinceByMunicipalityBarChart from "./charts/ProvinceByMunicipalityBarChart";
import AuthoritiesPieChart from "./charts/AuthoritiesPieChart";
import GenderBarChart from "./charts/GenderBarChart";

function App() {
  const apiEndpoint = "http://localhost:5000/api/forms"; // Define the API endpoint

  return (
    <div className="App">
      <br /> {/* Add space before the image */}
      <img
        src="/logo-cedeso.jpg"
        alt="CEDESO Logo"
        style={{ width: "300px", display: "block", margin: "20px auto" }} // Add margin to the image
      />
      <hr />
      <h1 className="chart-title" style={{ textAlign: "center" }}>
        Reporte de detención / arresto confi nes de deportaciones V.2{" "}
        {/* Added inline styling for the title */}
      </h1>
      <PieChart apiEndpoint={apiEndpoint} /> {/* Pass the API endpoint */}
      <br /> <br /> <br /> <br /> <hr />
      {/* Add space between charts */}
      <ReporterTypeChart apiEndpoint={apiEndpoint} />
      <br /> <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <ProvinceBarChart apiEndpoint={apiEndpoint} />
      <hr />
      <ProvinceByMunicipalityBarChart apiEndpoint={apiEndpoint} />
      <hr />
      <AuthoritiesPieChart apiEndpoint={apiEndpoint} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <GenderBarChart apiEndpoint={apiEndpoint} />
    </div>
  );
}

export default App;
