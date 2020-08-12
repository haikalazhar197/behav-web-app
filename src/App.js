import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles.css";

import Home from "./screens/Home";
import Connect from "./screens/Connect";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ChildrenDetails from "./screens/ChildrenDetails";
import GuardianProfile from "./screens/GuardianProfile";
import AddChildren from "./screens/AddChildren";
import UpdateChildren from "./screens/UpdateChildren";
import AddingANewData from "./screens/AddingANewData";

import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";

import { AuthProvider } from "./Auth";
import GoogleChart from "./screens/GoogleChart";
import GaugeTesting from "./screens/GaugeTesting";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <div className="content-area">
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/connect" component={Connect} />
            <PrivateRoute exact path="/Profile" component={Profile} />
            <PrivateRoute path="/children/:id" component={ChildrenDetails} />
            <PrivateRoute path="/secretpage" component={AddingANewData} />
            <PrivateRoute
              exact
              path="/guardian/:id"
              component={GuardianProfile}
            />
            <PrivateRoute exact path="/addchildren/" component={AddChildren} />
            <PrivateRoute
              exact
              path="/updatechildren/:id"
              component={UpdateChildren}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/" component={Login} />
            <Route exact path="/googlechart" component={GoogleChart} />
            <Route exact path="/gaugetesting" component={GaugeTesting} />
          </div>
          <div className="nav-area">
            <NavBar />
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}
