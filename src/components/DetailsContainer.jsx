import React from "react";

import "./components.css";

const DetailsContainer = ({
  children,
  type = "child-description",
  width = "calc(100vw - 74px)",
}) => {
  const containerStyles = {
    width: width,
    // display: "flex",
    flexShrink: "0",
    // marginRight: "37px",
  };
  return (
    <div className={`description-container ${type}`} style={containerStyles}>
      {children}
    </div>
  );
};

export default DetailsContainer;
