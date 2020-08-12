import React, { useContext } from "react";
import { withRouter } from "react-router";

import AppHeader from "../components/AppHeader";
import CloseButton from "../components/CloseButton";
import ChildForm from "../components/ChildForm";
import { AuthContext } from "../Auth";

import "./screens.css";

import app from "../fire";

const db = app.firestore();

const defaultImage =
  "https://d2cax41o7ahm5l.cloudfront.net/mi/speaker-photo/dermatology-NMKiron---62959-4369.jpeg";

const AddChildren = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const addChildren = (data) => {
    console.log(data);
    if (data.name && data.condition) {
      db.collection("children")
        .add({
          name: data.name,
          condition: data.condition,
          description: data.description,
          devices: data.devices,
          state: "null",
          img: defaultImage,
          parent: currentUser.uid,
          guardian: [currentUser.uid],
        })
        .then((docRef) => console.log("data added:", docRef))
        .catch((err) => console.log(err));
    } else {
      alert("NAME and CONDITION cannot be epmty");
    }
    alert("children Added");
    history.push("/home");
  };

  return (
    <div>
      <AppHeader>Something</AppHeader>
      <div className="popup-page children-page">
        <div className="form-page-header">Add Child</div>
        <CloseButton type="guardian-close-button" />
        <div className="info-page">
          <ChildForm formAction={addChildren} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(AddChildren);
