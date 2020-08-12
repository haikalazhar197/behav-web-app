import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useParams } from "react-router-dom";

import "./screens.css";

import AppHeader from "../components/AppHeader";
import ChildForm from "../components/ChildForm";
import CloseButton from "../components/CloseButton";
import Loading from "../components/Loading";

import app from "../fire";

const db = app.firestore();

const UpdateChildren = ({ history }) => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "Haikal",
    description: "some description here",
    condition: "some condition here",
    devices: ["some device", "another device"],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = retriveData();
    return () => {
      console.trace("Im Out");
      unsubscribe();
    };
  }, []);

  const updateChildrenData = (data) => {
    db.collection("children")
      .doc(id)
      .update({
        name: data.name,
        description: data.description,
        condition: data.condition,
        devices: data.devices,
      })
      .then(() => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    alert("childrenUpdated");
    history.replace(`/children/${id}/details`);
  };

  const retriveData = () => {
    return db
      .collection("children")
      .doc(id)
      .onSnapshot(
        (doc) => {
          console.log(doc.data());
          !!doc.data() && setData(doc.data());
          setIsLoading(false);
        },
        (err) => console.log(err)
      );
  };

  if (isLoading) {
    return (
      <div>
        <AppHeader>Something</AppHeader>
        <div className="popup-page children-page">
          <div className="form-page-header">Update Children</div>
        </div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <AppHeader>Something</AppHeader>
      <div className="popup-page children-page">
        <div className="form-page-header">Update Children</div>
        <CloseButton type="guardian-close-button" />
        <div className="info-page">
          <ChildForm data={data} formAction={updateChildrenData} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(UpdateChildren);
