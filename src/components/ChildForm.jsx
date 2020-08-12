import React, { useState, useEffect } from "react";
//Find out how to display devices -- Hint -- follow childInfo.jsx

import DetailsContainer from "../components/DetailsContainer";
import AddButton from "../components/AddButton";
import UtilityButton from "../components/UtilityButton";

import PlusIcon from "../Icons/PlusIcon";
import CloseIcon from "../Icons/CloseIcon";

import "./components.css";

import app from "../fire";

const db = app.firestore();

const Device = ({ id = "some device", index, removeDevice }) => {
  const [deviceData, setDeviceData] = useState({
    name: "LOADING",
    deviceId: "default",
  });

  useEffect(() => {
    retrieveDevice();
    // console.log(addDevice);
    return () => {
      console.trace("Im Out");
    };
  }, []);

  const retrieveDevice = () => {
    console.trace("Im Retrieving Data");
    db.collection("devices")
      .doc(id)
      .get()
      .then((doc) => {
        doc.exists && console.log(doc.data());
        if (doc.exists) {
          const newData = {
            name: doc.data().name || "Failed to Load Name",
            id: doc.id,
          };
          setDeviceData(newData);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (e) => {
    e.preventDefault();
    removeDevice(index);
  };
  return (
    <DetailsContainer width="200px">
      {deviceData.name}
      <UtilityButton
        handleClick={handleClick}
        width={"20px"}
        height={"20px"}
        left={"85%"}
        top={"7px"}
        component={<CloseIcon fill="#7284A8" />}
      />
    </DetailsContainer>
  );
};

const AddDevice = ({ setDevices, devices, setOpenAddDevice }) => {
  const [deviceObject, setDeviceObject] = useState({});
  const [deviceSearch, setDeviceSearch] = useState("");

  useEffect(() => {
    console.log(deviceSearch);
    retrieveDevice();
    return () => {
      console.trace("Im Out");
    };
  }, [deviceSearch]);

  const retrieveDevice = () => {
    db.collection("devices")
      .doc(deviceSearch || "default")
      .get()
      .then((doc) => {
        doc.exists && console.log(doc.data());
        if (doc.exists) {
          const newData = {
            name: doc.data().name || "Failed to Load Name",
            id: doc.id,
          };
          setDeviceObject(newData);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDevices = [...devices, deviceObject.id];
    setDevices(newDevices);
    setOpenAddDevice(false);
  };

  const closeMe = (e) => {
    e.preventDefault();
    setOpenAddDevice(false);
  };

  return (
    <form className="add-device-form">
      <div style={{ width: "100%" }}>
        <UtilityButton
          component={<CloseIcon />}
          handleClick={closeMe}
          type={"icon-button secondary secondary-shadow"}
          top={"5px"}
          left={"85%"}
          width={"20px"}
          height={"20px"}
        />
      </div>
      <h3>Enter Device Id</h3>
      <input
        type="text"
        value={deviceSearch}
        onChange={(e) => setDeviceSearch(e.target.value)}
      />
      <div className="button-group">
        {!!deviceObject.name && (
          <DetailsContainer width="200px" type="user-description">
            {deviceObject.name}
            <UtilityButton
              handleClick={handleSubmit}
              width={"20px"}
              height={"20px"}
              left={"85%"}
              top={"7px"}
              component={<PlusIcon />}
              type={"icon-button secondary secondary-shadow"}
            />
          </DetailsContainer>
        )}
        {/* <button className="button-primary-long faded" onClick={closeMe}>
          Close
        </button> */}
        {/* <button className="button-primary-long bright" onClick={handleSubmit}>
          Add Device
        </button> */}
      </div>
    </form>
  );
};

const ChildForm = ({ data, formAction = (data) => console.log(data) }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [devices, setDevices] = useState([]);
  const [openAddDevice, setOpenAddDevice] = useState(false);

  useEffect(() => {
    populateData();
    return () => {
      console.trace("Im oUt");
    };
  }, []);

  const populateData = () => {
    if (data) {
      console.log("Im Populating Data");
      setName(data.name);
      setDescription(data.description);
      setCondition(data.condition);
      setDevices(data.devices || []);
      // console.log(devices);
    }
  };

  const switchOpenDevice = (e) => {
    e.preventDefault();
    setOpenAddDevice(!openAddDevice);
  };

  const removeDevice = (index) => {
    // e.preventDefault();
    const newDevices = [...devices];
    newDevices.splice(index, 1);
    setDevices(newDevices);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      condition,
      description,
      devices,
    };
    // console.log(data);
    formAction(data);
    // alert(`Name: ${name} Condition: ${condition} Description: ${description}`);
  };

  return (
    <form className="child-form-container">
      <div className="details-box">
        <h3>Name</h3>
        <input
          className="child-input-container"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="details-box">
        <h3>Description</h3>
        <textarea
          className="child-input-container"
          cols="30"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="details-box">
        <h3>Condition</h3>
        <input
          className="child-input-container"
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
      </div>
      <div className="details-box">
        <h3>Devices</h3>
        <UtilityButton
          component={<PlusIcon fill="#7284A8" />}
          handleClick={switchOpenDevice}
        />
        <div className="side-scroll">
          {devices.map((device, index) => (
            <Device
              key={device}
              id={device}
              index={index}
              removeDevice={removeDevice}
            />
          ))}
        </div>
      </div>
      {openAddDevice && (
        <AddDevice
          devices={devices}
          setDevices={setDevices}
          setOpenAddDevice={setOpenAddDevice}
        />
      )}
      <div className="submit-container">
        <button
          className="condition-button submit-button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ChildForm;
