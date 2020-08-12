import React from "react";
import { NavLink } from "react-router-dom";
import CloudIcon from "../Icons/CloudIcon";
import HomeIcon from "../Icons/HomeIcon";
import UserIcon from "../Icons/UserIcon";
import "./components.css";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <NavLink to="/connect" activeClassName="nav-selected">
        <CloudIcon />
      </NavLink>
      <NavLink to="/home" activeClassName="nav-selected">
        <HomeIcon />
      </NavLink>
      <NavLink to="/profile" activeClassName="nav-selected">
        <UserIcon />
      </NavLink>
    </div>
  );
};

export default NavBar;
