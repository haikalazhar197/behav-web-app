import React, { useState, useEffect, useContext } from "react";

import AppHeader from "../components/AppHeader";
import DetailsContainer from "../components/DetailsContainer";
import UtilityButton from "../components/UtilityButton";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import ChildrenList from "../components/ChildrenList";

import ListIcon from "../Icons/ListIcon";
import Chevron from "../Icons/Chevron";
import EditIcon from "../Icons/EditIcon";
import SaveIcon from "../Icons/SaveIcon";

import { AuthContext } from "../Auth";

import app from "../fire";

const db = app.firestore();

const EditForm = ({
  data = "some data here",
  setIsEditing,
  width = "calc(100vw - 74px)",
  isTextArea = false,
  docId,
  toUpdate,
}) => {
  const [value, setValue] = useState(data);

  const handleClick = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(docId)
      .update({
        [toUpdate]: value,
      });
    // alert("Data Updated");
    setIsEditing(false);
  };

  return (
    <form className="child-form-container" style={{ width: width }}>
      {isTextArea ? (
        <textarea
          className="child-input-container"
          cols="30"
          rows="5"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="child-input-container"
          style={{ width: width }}
        />
      )}
      <UtilityButton
        type="icon-button secondary primary-shadow faded"
        component={<SaveIcon fill="#beb8eb" />}
        left="90%"
        top="30%"
        width="30px"
        height="30px"
        handleClick={handleClick}
      />
    </form>
  );
};

const ProfileDetails = ({
  header,
  width = "calc(100vw - 74px)",
  children,
  isTextArea = false,
  docId,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="details-box">
      <h3>{header}</h3>
      {isEditing ? (
        <EditForm
          data={children}
          setIsEditing={setIsEditing}
          width={width}
          isTextArea={isTextArea}
          docId={docId}
          toUpdate={header.toLowerCase()}
        />
      ) : (
        <DetailsContainer width={width} type="child-description">
          {children}
          <UtilityButton
            type="icon-button secondary primary-shadow faded"
            component={<EditIcon fill="#beb8eb" />}
            left="90%"
            top="7px"
            width="20px"
            height="20px"
            handleClick={() => setIsEditing(true)}
          />
        </DetailsContainer>
      )}
    </div>
  );
};

const Profile = () => {
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.trace("I am Starting");
    // console.log(currentUser.uid);
    const unsubscribe = retriveData();
    return () => {
      console.trace("Im out");
      unsubscribe();
    };
  }, []);

  const retriveData = () => {
    return db
      .collection("users")
      .where("uid", "==", currentUser.uid)
      .onSnapshot(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            name: doc.data().name || "INVALID USER",
            type: doc.data().type || "NULL",
            image: doc.data().img || "someinghere",
            description: doc.data().description,
            address: doc.data().address,
            occupation: doc.data().occupation,
            docId: doc.id,
          }));
          console.log(newData);
          if (newData[0]) {
            setIsloading(false);
            setData(newData[0]);
          }
        },
        (err) => console.log(err)
      );
  };

  if (isLoading) {
    return (
      <div>
        <AppHeader>Profile</AppHeader>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <AppHeader>Profile</AppHeader>
      <div className="page-content info-page">
        <ProfileDetails header={"Name"} width="300px" docId={data.docId}>
          {data.name}
        </ProfileDetails>
        <ProfileDetails
          header={"Description"}
          isTextArea={true}
          docId={data.docId}
        >
          {data.description}
        </ProfileDetails>
        <ProfileDetails header={"Occupation"} width="200px" docId={data.docId}>
          {data.occupation}
        </ProfileDetails>
        <ProfileDetails header={"Address"} isTextArea={true} docId={data.docId}>
          {data.address}
        </ProfileDetails>
        <div className="details-box">
          <h3>Children</h3>
          <ChildrenList id={currentUser.uid} type={"child-user-card"} />
        </div>
        <div style={{ marginBottom: "200px" }}></div>
      </div>
    </div>
  );
};

export default Profile;
