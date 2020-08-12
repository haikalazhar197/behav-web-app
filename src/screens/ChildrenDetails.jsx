//Make the children components wait for data to load before rendering elements

import React, { useEffect, useState, useContext } from "react";
import { useParams, Switch, Route, useRouteMatch } from "react-router-dom";
import AppHeader from "../components/AppHeader";

import ChildHeader from "../components/ChildHeader";
import CloseButton from "../components/CloseButton";
import ChildData from "../components/ChildData";
import ChildInfo from "../components/ChildInfo";
import Loading from "../components/Loading";

import { AuthContext } from "../Auth";

import app from "../fire";

import "./screens.css";

const db = app.firestore();

const ChildrenDetails = () => {
  const { id } = useParams();
  const { url, path } = useRouteMatch();
  const { currentUser } = useContext(AuthContext);
  // console.log(url);
  const [data, setData] = useState({
    img:
      "https://d2cax41o7ahm5l.cloudfront.net/mi/speaker-photo/dermatology-NMKiron---62959-4369.jpeg",
    name: "Haikal Azhar",
    condition: "Austism",
    state: "Ataraxy",
    id: "someid",
    description: "somed description here",
    devices: ["someidhere"],
    guardian: ["someidhere", "anotheridhere"],
    parent: "someparentid",
  });

  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = retrieveChildren();
    return () => {
      console.trace("I am Signing Off");
      unsubscribe();
    };
  }, []);

  const retrieveChildren = () => {
    const unsubscribe = db
      .collection("children")
      .doc(id)
      // .where("parent", "==", currentUser.uid)
      .onSnapshot(
        (doc) => {
          const newData = { ...doc.data(), id: doc.id };
          console.log(!!doc.data());
          if (doc.data()) {
            setData(newData);
            setPending(false);
          }
        },
        (err) => console.log(err)
      );
    return unsubscribe;
  };

  if (pending) {
    return (
      <div>
        <AppHeader>Something</AppHeader>
        <div className="popup-page children-page">
          <CloseButton />
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppHeader>Something</AppHeader>
      <div className="popup-page children-page">
        <CloseButton />
        <ChildHeader
          name={data.name}
          img={data.img}
          condition={data.condition}
          id={data.id}
          owner={data.parent === currentUser.uid}
        />
        <Switch>
          <Route exact path={`${url}/details`}>
            <ChildInfo child={data} />
          </Route>
          <Route path={`${url}/data`}>
            <ChildData />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default ChildrenDetails;
