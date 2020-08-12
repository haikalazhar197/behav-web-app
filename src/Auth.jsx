import React, { useState, useEffect } from "react";
import app from "./fire";
import Loading from "../src/components/Loading";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  //Handles state change of the auth object from firebase
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  if (pending) {
    //Displays a loading component
    return (
      <div>
        <Loading />
      </div>
    );
  }

  //Returns the Auth provider and renders the children
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
