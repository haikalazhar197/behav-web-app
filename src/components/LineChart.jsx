import React, { useEffect, useState } from "react";
import "./components.css";

import { Line } from "react-chartjs-2";
import app from "../fire";

const Chart = ({ dataa }) => {
  const data = {
    labels: ["", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Heart Rate",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [...dataa],
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

const LineChart = ({ width, height, deviceId }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [value, setValue] = useState(arr);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // console.log(value);
    const timer = setTimeout(() => {
      updateData();
      const now = currentTime + 1;
      setCurrentTime(now);
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentTime]);

  // const handleClick = () => {
  //   const newVal = [...value.slice(1), 1];
  //   setValue(newVal);
  // }

  const handleClick = () => {
    setCurrentTime(0);
  };

  const updateData = () => {
    const wordRef = app.database().ref("BPM");
    wordRef.on("value", (snaphot) => {
      // console.log(value);
      const newVal = [...value.slice(1), snaphot.val()];
      setValue(newVal);
    });
  };

  const chartStyles = {
    width,
    height,
  };

  return (
    <div style={chartStyles} className="line-chart">
      <Chart dataa={value} />
    </div>
  );
};

export default LineChart;
