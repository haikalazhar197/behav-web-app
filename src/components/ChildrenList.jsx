import React, { useState, useEffect } from "react";
import "./components.css";

import UserCard from "./UserCard";

import app from "../fire";

const db = app.firestore();

const ChildrenList = ({ id, type = "guardian-user-card" }) => {
  //   const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = retrieveData();
    return () => {
      console.trace("Im Out");
      unsubscribe();
    };
  }, []);

  const retrieveData = () => {
    return db
      .collection("children")
      .where("guardian", "array-contains", id)
      .onSnapshot(
        (querySnaphot) => {
          const newData = querySnaphot.docs.map((doc) => ({
            name: doc.data().name,
            condition: doc.data().condition,
            image: doc.data().img,
            id: doc.id,
          }));
          console.log(newData);
          setData(newData);
        },
        (err) => console.log(err)
      );
  };

  return (
    <div className="side-scroll">
      {data.map((children) => (
        <UserCard
          key={children.id}
          queryParam={{ id: children.id }}
          cardData={{
            name: children.name,
            type: children.condition,
            image: children.image,
          }}
          styleType={type}
        />
      ))}
    </div>
  );
};

export default ChildrenList;
