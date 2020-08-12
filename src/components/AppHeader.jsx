import React, { useState, useEffect, useContext } from "react";
// import profilePicture from "./student.png";
import { Link } from "react-router-dom";
import "../styles.css";

import Logo from "../Icons/Logo";
import { AuthContext } from "../Auth";

import app from "../fire";

const ProfileInfo = () => {
  const infoStyles = {
    position: "absolute",
    width: "165px",
    height: "180px",
    right: "46px",
    top: "57px",
    // textTransform: "uppercase",
    fontSize: "15px",
    letterSpacing: "0.05em",
    color: "white",
    textAlign: "center",
  };
  const { currentUser } = useContext(AuthContext);

  const singOut = async () => {
    await app.auth().signOut();
  };

  return (
    <div style={infoStyles} className="child-selector">
      {currentUser.displayName || currentUser.email}
      <button
        onClick={singOut}
        style={{ border: "none", cursor: "pointer" }}
        className="selector-content"
      >
        Sign Out
      </button>
    </div>
  );
};

const AppHeader = ({ children }) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const userimage =
    currentUser.photoURL ||
    "https://d2cax41o7ahm5l.cloudfront.net/mi/speaker-photo/dermatology-NMKiron---62959-4369.jpeg";

  const goToProfile = () => {
    // alert("Going to profile");
    // console.log("Going to profile");
    setShowProfileInfo(!showProfileInfo);
  };

  return (
    <div className="app-header">
      <div className="section-1">
        {/* <div className="logo">LT</div> */}
        <div className="header-title">{children}</div>
      </div>
      <div className="section-2">
        {/* <Link to="/profile" className="profile">
          <img src={userimage} alt="profilePicture" />
        </Link> */}
        <button
          onClick={() => setShowProfileInfo(!showProfileInfo)}
          className="profile"
        >
          <img src={userimage} alt="profilePicture" />
        </button>
      </div>
      {showProfileInfo && <ProfileInfo />}
    </div>
  );
};

export default AppHeader;
