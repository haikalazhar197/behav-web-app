import React, { useState, useEffect } from "react";

import Gauge from "../components/DGauge";

import app from "../fire";

// import { Form } from "bootstrap-react";

const GaugeTesting = () => {
  const [value, setValue] = useState(50);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const ref = app.database().ref("BPM");

    ref.on("value", (snapshot) => {
      console.log(snapshot.val());
      setValue(snapshot.val());
      let condition = "";
      if (snapshot.val() === 0) {
        condition = "DISCONNECTED";
      } else if (snapshot.val() < 70) {
        condition = "Ataraxy";
      } else if (snapshot.val() < 90) {
        condition = "Relaxed";
      } else if (snapshot.val() < 110) {
        condition = "Nervous";
      } else if (snapshot.val() < 130) {
        condition = "Agitated";
      } else if (snapshot.val() < 150) {
        condition = "Fear";
      } else {
        condition = "Stress";
      }
      app
        .database()
        .ref("condition")
        .set(condition, (error) => console.log(error));
    });

    return () => {
      ref.off();
      console.trace("im out");
    };
  }, []);

  const updateValue = (value) => {
    app
      .database()
      .ref("BPM")
      .set(value, (error) => console.log(error));
    setInputValue(value);
  };

  return (
    <div>
      <div style={{ marginTop: "2rem" }}>
        <Gauge label="BPM" max={220} value={value} label="BPM" />
      </div>
      <div style={{ textAlign: "center" }}>
        <input
          type="range"
          min={0}
          max={220}
          value={inputValue}
          onChange={(e) => updateValue(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default GaugeTesting;
