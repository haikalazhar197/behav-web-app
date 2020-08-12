import React, { useState } from "react";
import Logo from "../Icons/Logo";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./screens.css";

const Signup = ({ setValue, history }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setName("");
    setPassword("");
    // setValue(name);
    alert(`Username: ${name}, Password: ${password}`);
    history.replace("/home");
  };

  return (
    <div className="form-container">
      <Logo>LT</Logo>
      <div className="app-name">Behav</div>
      <form onSubmit={handleSubmit}>
        <div className="username">
          <input
            placeholder="username, email"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="password">
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className="submit" onClick={() => handleSubmit}>
          Signup
        </button>
      </form>
      <div className="link">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default withRouter(Signup);
