import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./components.css";

import app from "../fire";

const db = app.firestore();
const defaultImage =
  "https://d2cax41o7ahm5l.cloudfront.net/mi/speaker-photo/dermatology-NMKiron---62959-4369.jpeg";

// queryParam = { id: "Haikal Azhar", collection: "users" },
const UserCard = ({
  queryParam = { collection: "users" },
  styleType = "child-user-card",
  cardData,
}) => {
  const [data, setData] = useState({
    name: "othername",
    type: "initial",
    image: defaultImage,
  });

  useEffect(() => {
    console.log(`querying data: ${!cardData}`);
    const unsubsrcribe = retrieveData();
    return () => {
      // console.log("I am signing off");
      console.trace("I am Signing Off");
      unsubsrcribe();
    };
  }, []);

  const retrieveData = () => {
    if (!!queryParam.id && !cardData) {
      console.trace("i am querying data here");
      return db
        .collection(queryParam.collection || "users")
        .where("uid", "==", queryParam.id)
        .onSnapshot(
          (querSnaphot) => {
            const newData = querSnaphot.docs.map((doc) => ({
              name: doc.data().name || "INVALID USER",
              type: doc.data().type || "NULL",
              image: doc.data().img || defaultImage,
            }));
            console.log(newData);
            //set data only if newData is not null
            !!newData[0] && setData(newData[0]);
          },
          (err) => console.log(err)
        );
      // console.log(queryParam.collection);
    }
    console.log("i am setting data based on cardData");
    setData({
      name: cardData.name || "somename",
      type: cardData.type || "function",
      image: cardData.img || defaultImage,
    });
    return () => console.log("This does not have data");
  };

  const goToPage = () =>
    queryParam.collection === "users"
      ? `/guardian/${queryParam.id || "someidhere"}`
      : `/children/${queryParam.id || "someidheere"}/details`;

  return (
    <div className={`user-card ${styleType}`}>
      <Link className="go-to-profile" to={goToPage()}>
        <img src={data.image} alt="" />
        <div className="user-name">{data.name || "default id"}</div>
        <div className="sub-title">{data.type}</div>
      </Link>
    </div>
  );
};

export default UserCard;
