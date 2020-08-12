import React, { useState } from "react";
import "./components.css";

import { NavLink } from "react-router-dom";

import ListIcon from "../Icons/ListIcon";

const ChildSelector = ({ id, editable = true }) => {
  const selectorStyles = {
    position: "absolute",
    width: "165px",
    height: "230px",
    right: "46px",
    top: "57px",
  };

  return (
    <div style={selectorStyles} className="child-selector">
      <NavLink
        to={`/children/${id}/data`}
        activeClassName="selector-selected"
        className="selector-content"
      >
        Data
      </NavLink>
      <NavLink
        to={`/children/${id}/details`}
        activeClassName="selector-selected"
        className="selector-content"
      >
        Details
      </NavLink>
      {editable && (
        <NavLink to={`/updatechildren/${id}`} className="selector-content">
          Edit
        </NavLink>
      )}
    </div>
  );
};

const ChildHeader = ({
  img = "https://d2cax41o7ahm5l.cloudfront.net/mi/speaker-photo/dermatology-NMKiron---62959-4369.jpeg",
  name = "Haikal azhar",
  condition = "Autism Spectrum Disorder",
  id = "Haikal Azhar",
  owner = false,
}) => {
  const [openSelector, setOpenSelector] = useState(false);

  // const { path, url } = useRouteMatch();

  return (
    <div className="child-header">
      <div className="info-section">
        <img src={img} alt="" />
        <div className="info">
          <div className="name">{name}</div>
          <div className="condition">{condition}</div>
        </div>
      </div>
      <button
        className="more-button"
        onClick={() => setOpenSelector(!openSelector)}
      >
        <ListIcon />
      </button>
      {openSelector && <ChildSelector id={id} editable={owner} />}
    </div>
  );
};

export default ChildHeader;
