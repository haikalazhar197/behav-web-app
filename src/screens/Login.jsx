import React, { useState, useContext, useEffect } from "react";
import Logo from "../Icons/Logo";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AuthContext } from "../Auth";
import app from "../fire";
import * as firebase from "firebase";
// import {Auth} from "firebase/auth";

import "./screens.css";

import Googleicon from "../Icons/Googleicon";

const Login = ({ setValue, history }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    redirectToHomeScreen();
    return () => {
      console.trace("Im Out");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setValue(name);
    try {
      await app.auth().signInWithEmailAndPassword(name, password);
      console.log(currentUser);
      history.replace("/home");
      setName("");
      setPassword("");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
    // const google = firebase.auth.GoogleAuthProvider
  };

  const signinGoogle = async (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    // const facebookProvider = new firebase.auth.GithubAuthProvider();
    try {
      await app.auth().signInWithRedirect(googleProvider);
      history.replace("/home");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const redirectToHomeScreen = () => {
    if (currentUser) {
      history.replace("/home");
      // alert("already signed in");
    }
  };

  return (
    <div className="front">
      <div className="form-container">
        <Logo>LT</Logo>
        <div className="app-name">Behav</div>
        <form onSubmit={handleSubmit}>
          <div className="username">
            <input
              placeholder="username, email"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="password">
            <input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="submit" onClick={() => handleSubmit}>
            Login
          </button>
        </form>
        {/* <div className="link">
          <Link to="/signup">Signup</Link>
        </div> */}
        <div className="or">or Sign Up</div>
        <div className="more-action">
          <button className="google-signin" onClick={signinGoogle}>
            <Googleicon />
            <div className="google">Google</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
