import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./screens.css";

import AppHeader from "../components/AppHeader";
import CloseButton from "../components/CloseButton";
import DetailsContainer from "../components/DetailsContainer";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import ChildrenList from "../components/ChildrenList";

import app from "../fire";

const db = app.firestore();

const GuardianProfileHeader = ({
  name = "no data",
  type = "guardian header",
  image = "https://d2cax41o7ahm5l.cloudfront.net/mi/speaker-photo/dermatology-NMKiron---62959-4369.jpeg",
}) => {
  return (
    <div className="guardian-header">
      <img src={image} alt="" />
      <div className="guardian-info">
        <div className="name">{name}</div>
        <div className="type">{type}</div>
      </div>
    </div>
  );
};

const GuardianProfile = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const unsubscribe = retrieveData();
    return () => unsubscribe();
  }, [id]);

  const retrieveData = () => {
    return db
      .collection("users")
      .where("uid", "==", id)
      .onSnapshot(
        (querSnaphot) => {
          const newData = querSnaphot.docs.map((doc) => ({
            name: doc.data().name || "INVALID USER",
            type: doc.data().type || "NULL",
            image: doc.data().img || "someinghere",
            description: doc.data().description,
            address: doc.data().address,
            occupation: doc.data().occupation,
          }));
          !!newData[0] && console.log(newData[0]);
          //set data only if newData is not null
          // if (!!newData[0]) {
          //   setData(newData[0]);
          //   setIsPending(false);
          // }
          !!newData[0] && setData(newData[0]);
          !!newData[0] && setIsPending(false);
        },
        (err) => console.log(err)
      );
    // return "this does not have data";
  };

  if (isPending) {
    return (
      <div>
        <AppHeader>Something</AppHeader>
        <div className="popup-page children-page">
          <CloseButton type="guardian-close-button" />
          <GuardianProfileHeader />
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppHeader>Something</AppHeader>
      <div className="popup-page guardian-page">
        <CloseButton type="guardian-close-button" />
        <GuardianProfileHeader
          name={data.name}
          type={data.type}
          image={data.image}
        />
        <div className="info-page">
          <div className="details-box">
            <h3>Description</h3>
            <DetailsContainer type="user-description">
              {data.description}
            </DetailsContainer>
          </div>
          <div className="details-box">
            <h3>Occupation</h3>
            <DetailsContainer type="user-description" width="200px">
              {data.occupation}
            </DetailsContainer>
          </div>
          <div className="details-box">
            <h3>Address</h3>
            <DetailsContainer type="user-description">
              {data.address}
            </DetailsContainer>
          </div>
          <div className="details-box">
            <h3>Children</h3>
            {/* <div className="side-scroll">
              <UserCard
                styleType="guardian-user-card"
                queryParam={{ id: "Fiqri", collection: "children" }}
                cardData={{ value: "some data here" }}
              />
              <UserCard
                styleType="guardian-user-card"
                queryParam={{ id: "Faris", collection: "children" }}
              />
            </div> */}
            <ChildrenList id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianProfile;
