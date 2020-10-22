import React, { useState, useEffect } from "react";
import "./components.css";

import Gauge from "../components/DGauge";

import app from "../fire";

const GaugeChart = ({ width, deviceId }) => {
  const [data, setData] = useState(0);

  useEffect(() => {
    const ref = app.database().ref("Data-Collect/BPM");
    ref.limitToLast(1).on("child_added", (snapshot) => {
      console.log(snapshot);
    });
    return () => {
      ref.off();
    };
  }, []);

  useEffect(() => {
    const ref = app.database().ref("BPM");
    ref.on("value", (snapshot) => {
      // console.log(snapshot.val());
      setData(snapshot.val());
    });
    return () => {
      ref.off();
      console.trace("im out");
    };
  }, []);

  const chartStyles = {
    width: width,
    height: width,
    borderRadius: "50%",
    position: "relative",
  };

  return (
    <div style={chartStyles} className="line-chart">
      <div style={{ position: "absolute", top: "0px" }}>
        <Gauge max={220} value={data} />
      </div>
    </div>
  );
};

export default GaugeChart;
