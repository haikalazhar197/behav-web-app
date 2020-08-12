import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import * as Firebase from "firebase";
import "./components.css";

import ListIcon from "../Icons/ListIcon";

import ChangeContent from "./ChangeContent";
import LineChart from "../components/LineChart";
import Condition from "../components/Condition";

import { AuthContext } from "../Auth";

import app from "../fire";

const db = app.firestore();

const RemoveChild = ({
  id,
  setIsOpen,
  removeAction = () => console.log("clicked"),
}) => {
  const elementStlye = {
    position: "absolute",
    width: "165px",
    height: "100px",
    top: "57px",
    right: "46px",
  };

  const handleClick = () => {
    // alert("child removed");
    setIsOpen(false);
    removeAction();
  };

  return (
    <div className="child-selector" style={elementStlye}>
      <button onClick={handleClick} className="button-primary-long">
        Remove
      </button>
    </div>
  );
};

const ChildPreviewHeader = ({
  childImage,
  childName,
  childCondition,
  id,
  guardian = [],
  parent,
}) => {
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log(guardian);
  //   // console.log(currentUser.uid);
  //   console.log(guardian.indexOf("somerandomid"));

  //   return () => {
  //     console.log("im out");
  //   };
  // }, []);

  const removeChild = () => {
    console.log(guardian);
    if (currentUser.uid === parent) {
      console.log(id);
      db.collection("children")
        .doc(id)
        .delete()
        .then(() => alert("Child Removed"))
        .catch((err) => console.log(err));
    } else {
      // console.log(guardian.includes(currentUser.uid));
      if (guardian.includes(currentUser.uid)) {
        db.collection("children")
          .doc(id)
          .update({
            guardian: Firebase.firestore.FieldValue.arrayRemove(
              currentUser.uid
            ),
          })
          .then(() => alert("Removed as Guardian"))
          .catch((err) => console.log(err));
      } else {
        console.log("THIS CHILD IS NOT RELATED TO YOU");
      }
    }
  };

  return (
    <div className="preview-header">
      <div className="child-info">
        <img src={childImage} alt="" />
        <NavLink className="info" to={`/children/${id}/details`}>
          <div className="name">{childName}</div>
          <div className="condition">{childCondition}</div>
        </NavLink>
      </div>
      <button
        onClick={() => setIsRemoveOpen(!isRemoveOpen)}
        className="more-button"
      >
        <ListIcon />
      </button>
      {isRemoveOpen && (
        <RemoveChild
          id={id}
          setIsOpen={setIsRemoveOpen}
          removeAction={removeChild}
        />
      )}
    </div>
  );
};

const ChildPreview = ({
  child = {
    img:
      "https://d2cax41o7ahm5l.cloudfront.net/mi/speaker-photo/dermatology-NMKiron---62959-4369.jpeg",
    name: "Haikal Azhar",
    condition: "Austism",
    state: "Ataraxy",
    id: "someid",
    guardian: ["somehtinf"],
    parent: "someid",
  },
}) => {
  // const [childImage, setChildImage] = useState(
  //   "https://d2cax41o7ahm5l.cloudfront.net/mi/speaker-photo/dermatology-NMKiron---62959-4369.jpeg"
  // );
  // const [childName, setChildName] = useState("Mohamad Fiqri");
  // const [childCondition, setChildCondition] = useState(
  //   "autism spectrum disorder"
  // );
  // const [childState, setChildState] = useState("Ataraxy");

  return (
    <div className="child-preview">
      <ChildPreviewHeader
        childImage={child.img}
        childName={child.name}
        childCondition={child.condition}
        id={child.id}
        guardian={child.guardian}
        parent={child.parent}
      />
      <LineChart width={"239px"} height={"145px"} />
      <ChangeContent />
      <div className="condition-container">
        <Condition width={"80px"} height={"35px"}>
          {child.state}
        </Condition>
      </div>
    </div>
  );
};

export default ChildPreview;
