import React from "react";
import "./components.css";

const Condition = ({ width, height, children }) => {
  const conditionStyles = {
    width,
    height
  };

  return (
    <button style={conditionStyles} className="condition-button">
      {children}
    </button>
  );
};

export default Condition;
