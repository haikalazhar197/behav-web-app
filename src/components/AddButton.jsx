import React from "react";
import "./components.css";

const AddButton = ({
  handleClick = () => alert("clicked"),
  width = "30px",
  height = "30px",
  top = "0px",
  left = "90px",
  type = "icon-button primary primary-shadow",
  component,
}) => {
  const buttonStyle = {
    width: width,
    height: height,
    top: top,
    left: left,
  };
  return (
    <button className={`${type}`} style={buttonStyle} onClick={handleClick}>
      {component}
    </button>
  );
};

export default AddButton;
