import React from "react";
import "./App.css";
import EventLocationPieChart from "./charts/EventLocationPieChart";
import PieChart from "./charts/PieChart";
import ReporterTypeChart from "./charts/ReporterTypeChart"; // Import the new component
import ProvinceBarChart from "./charts/ProvinceBarChart"; // Import the new component
import ProvinceByMunicipalityBarChart from "./charts/ProvinceByMunicipalityBarChart";
import AuthoritiesPieChart from "./charts/AuthoritiesPieChart";
import GenderBarChart from "./charts/GenderBarChart";
import GenderByProfileTypeBarChart from "./charts/GenderByProfileTypeBarChart";
import AuthorityVehiclesPieChart from "./charts/AuthorityVehiclesPieChart";
import EventImplicationPieChart from "./charts/EventImplicationPieChart";
import CommunityReactionPieChart from "./charts/CommunityReactionPieChart";
import ViolenceIndicatorsPieChart from "./charts/ViolenceIndicatorsPieChart";
import AttemptedResourcesPieChart from "./charts/AttemptedResourcesPieChart";
import HasDisabilityPieChart from "./charts/HasDisabilityPieChart";
import IsLGBTQPieChart from "./charts/IsLGBTQPieChart";
import TakenToPieChart from "./charts/TakenToPieChart";
function App() {
  //const apiEndpoint = "https://cedeso-backend.onrender.com/api/forms"; // Define the API endpoint
  const apiEndpoint = "https://cedeso-backend.onrender.com/api/forms";
  // return (
  //   <div className="App">
  //     <br /> {/* Add space before the image */}
  //     <img
  //       src="/logo-cedeso.jpg"
  //       alt="CEDESO Logo"
  //       style={{ width: "300px", display: "block", margin: "20px auto" }} // Add margin to the image
  //     />
  //     <hr />
  //     <h1 className="chart-title" style={{ textAlign: "center" }}>
  //       Reporte de detención / arresto confi nes de deportaciones V.2{" "}
  //       {/* Added inline styling for the title */}
  //     </h1>
  //     <PieChart apiEndpoint={apiEndpoint} /> {/* Pass the API endpoint */}
  //     <br /> <br /> <br /> <br /> <hr />
  //     {/* Add space between charts */}
  //     <ReporterTypeChart apiEndpoint={apiEndpoint} />
  //     <br /> <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <hr />
  //     <ProvinceBarChart apiEndpoint={apiEndpoint} />
  //     <hr />
  //     <ProvinceByMunicipalityBarChart apiEndpoint={apiEndpoint} />
  //     <hr />
  //     <AuthoritiesPieChart apiEndpoint={apiEndpoint} />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <hr />
  //     <GenderBarChart apiEndpoint={apiEndpoint} />
  //     <br />
  //     <hr />
  //     <GenderByProfileTypeBarChart
  //       incidentsEndpoint={apiEndpoint}
  //       profilesEndpoint={apiEndpoint}
  //     />
  //     <br />
  //     <br />
  //     <br />
  //     <hr />
  //     <AuthorityVehiclesPieChart apiEndpoint={apiEndpoint} />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <hr />
  //     <EventImplicationPieChart apiEndpoint={apiEndpoint} />
  //     <br /> <br /> <br /> <br /> <br /> <br />
  //     <hr />
  //     <CommunityReactionPieChart apiEndpoint={apiEndpoint} />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <hr />
  //     <ViolenceIndicatorsPieChart apiEndpoint={apiEndpoint} />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <hr />
  //     <AttemptedResourcesPieChart apiEndpoint={apiEndpoint} />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <hr />
  //     <HasDisabilityPieChart apiEndpoint={apiEndpoint} />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <hr />
  //     <IsLGBTQPieChart apiEndpoint={apiEndpoint} />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <hr />
  //     <TakenToPieChart apiEndpoint={apiEndpoint} />
  //   </div>
  // );

  return (
    <div className="App">
      <img
        src="/logo-cedeso.jpg"
        alt="CEDESO Logo"
        style={{ width: "300px", display: "block", margin: "20px auto" }}
      />
      <h1 className="chart-title" style={{ textAlign: "center" }}>
        Reporte de detención / arresto confi nes de deportaciones V.2
      </h1>
      <div className="chart-container">
        {" "}
        {/* Main container */}
        <div className="chart-pair">
          {" "}
          {/* Group 1 */}
          <PieChart apiEndpoint={apiEndpoint} />
          <ReporterTypeChart apiEndpoint={apiEndpoint} />
        </div>
        <div className="chart-pair">
          {" "}
          {/* Group 2 */}
          <ProvinceBarChart apiEndpoint={apiEndpoint} />
          <ProvinceByMunicipalityBarChart apiEndpoint={apiEndpoint} />
        </div>
        <div className="chart-pair">
          {" "}
          {/* Group 3 */}
          <AuthoritiesPieChart apiEndpoint={apiEndpoint} />
          <GenderBarChart apiEndpoint={apiEndpoint} />
        </div>
        <div className="chart-pair">
          {" "}
          {/* Group 4 */}
          <GenderByProfileTypeBarChart
            incidentsEndpoint={apiEndpoint}
            profilesEndpoint={apiEndpoint}
          />
          <AuthorityVehiclesPieChart apiEndpoint={apiEndpoint} />
        </div>
        <div className="chart-pair">
          {" "}
          {/* Group 5 */}
          <EventImplicationPieChart apiEndpoint={apiEndpoint} />
          <CommunityReactionPieChart apiEndpoint={apiEndpoint} />
        </div>
        <div className="chart-pair">
          {" "}
          {/* Group 6 */}
          <ViolenceIndicatorsPieChart apiEndpoint={apiEndpoint} />
          <AttemptedResourcesPieChart apiEndpoint={apiEndpoint} />
        </div>
        <div className="chart-pair">
          {" "}
          {/* Group 7 */}
          <HasDisabilityPieChart apiEndpoint={apiEndpoint} />
          <IsLGBTQPieChart apiEndpoint={apiEndpoint} />
        </div>
        <div className="chart-pair">
          {" "}
          {/* Group 8 */}
          <TakenToPieChart apiEndpoint={apiEndpoint} />
          <EventLocationPieChart apiEndpoint={apiEndpoint} />
        </div>
      </div>
    </div>
  );
}

export default App;
