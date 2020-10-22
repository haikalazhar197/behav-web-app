import React, { useEffect, useState } from "react";
import "./components.css";

import app from "../fire";

const Condition = ({ width, height, children }) => {
  const [condition, setCondition] = useState("");

  useEffect(() => {
    const ref = app.database().ref("condition");
    ref.on("value", (snapshot) => {
      console.log(snapshot.val());
      setCondition(snapshot.val());
    });
    return () => {
      ref.off();
    };
  }, []);

  const conditionStyles = {
    width,
    height,
  };

  return (
    <button style={conditionStyles} className="condition-button">
      {condition}
    </button>
  );
};

export default Condition;
