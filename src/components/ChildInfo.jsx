import React, { useState, useEffect } from "react";
import app from "../fire";

import DetailsContainer from "./DetailsContainer";
import UserCard from "./UserCard";

import "./components.css";

const db = app.firestore();

const DeviceContainers = ({ id = "someidhere" }) => {
  const [deviceName, setDeviceName] = useState("Heart Rate Monitor");

  useEffect(() => {
    const unsubscribe = retriveDevice();
    return () => {
      console.trace("Im Signing Off");
      unsubscribe();
    };
  }, [id]);

  const retriveDevice = () => {
    const unsubscribe = db
      .collection("devices")
      .doc(id)
      .onSnapshot(
        (doc) => {
          // console.log(doc.data().name);
          // const newData = doc.data();
          setDeviceName(doc.data().name);
          // console.log(newData.name);
        },
        (err) => console.log(err)
      );
    // console.log(id);
    // const unsubscribe = () => console.log("unsubscribed");
    return unsubscribe;
  };

  return <DetailsContainer width="200px">{deviceName}</DetailsContainer>;
};

const ChildInfo = ({ child }) => {
  // console.log(child.guardian);
  return (
    <div className="info-page">
      <div className="description details-box">
        <h3>Description</h3>
        <DetailsContainer>{child.description}</DetailsContainer>
      </div>
      <div className="details-box">
        <h3>Condition</h3>
        <DetailsContainer width="200px">{child.condition}</DetailsContainer>
      </div>
      <div className="details-box">
        <h3>Parent</h3>
        <div className="side-scroll">
          <UserCard
            queryParam={{ id: child.parent, collection: "users" }}
            styleType="child-user-card"
          />
        </div>
      </div>
      <div className="details-box">
        <h3>Devices</h3>
        <div className="side-scroll">
          {!!child.devices &&
            child.devices.map((device) => <DeviceContainers id={device} />)}
          {/* <DetailsContainer width="200px">Heart Rate Monitor</DetailsContainer>
          <DetailsContainer width="200px">Heart Rate Monitor</DetailsContainer> */}
        </div>
      </div>
      <div className="details-box">
        <h3>Guardian</h3>
        <div className="side-scroll">
          {!!child.guardian &&
            child.guardian.map((guardian) => (
              <UserCard
                key={guardian}
                queryParam={{ id: guardian, collection: "users" }}
              />
            ))}
          {/* <UserCard
            queryParam={{ id: "This has an id", collection: "users" }}
          />
          <UserCard queryParam={{ collection: "users" }} /> */}
        </div>
      </div>
    </div>
  );
};

export default ChildInfo;
