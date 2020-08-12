import React from "react";
import { withRouter } from "react-router";
import "./components.css";

import CloseIcon from "../Icons/CloseIcon";

const CloseButton = ({
  history,
  top = 10,
  right = 20,
  size = 20,
  path = "home",
  type = "children-close-button",
}) => {
  const closeStyles = {
    cursor: "pointer",
    position: "absolute",
    top: `${top}px`,
    right: `${right}px`,
    width: `${size}px`,
    height: `${size}px`,
  };

  const handleClick = () => {
    console.log("close");
    history.push(`/${path}`);
    // history.goBack();
  };

  return (
    <button style={closeStyles} className={type} onClick={handleClick}>
      <CloseIcon />
    </button>
  );
};

export default withRouter(CloseButton);
