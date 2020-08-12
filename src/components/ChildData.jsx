import React from "react";
import "./components.css";

import LineChart from "../components/LineChart";
// import Gauge from "../components/DChart";
import GaugeChart from "../components/GaugeChart";
import Condition from "../components/Condition";

const ChildData = () => {
  return (
    <div className="info-page">
      <div className="flex-container">
        <LineChart width="301px" height="211px" />
        <GaugeChart width="250px" />
      </div>
      <div className="condition-data-container">
        <Condition width="90px" height="45px">
          Ataraxy
        </Condition>
      </div>
    </div>
  );
};

export default ChildData;
