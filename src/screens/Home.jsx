import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../Auth";
import app from "../fire";

import UtilityButton from "../components/UtilityButton";
import AppHeader from "../components/AppHeader";
import ChildPreview from "../components/ChildPreview";
import Loading from "../components/Loading";

import PlusIcon from "../Icons/PlusIcon";

const db = app.firestore();
const Home = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(currentUser.uid);

  useEffect(() => {
    const unsubscribe = retrieveChildren();
    return () => {
      console.trace("I am Signing off");
      unsubscribe();
    };
  }, []);

  const retrieveChildren = () => {
    const unsubscribe = db
      .collection("children")
      .where("guardian", "array-contains", currentUser.uid)
      .onSnapshot(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setData(newData);
          setIsLoading(false);
          // console.log(newData);
        },
        (err) => console.log(err)
      );
    return unsubscribe;
  };

  const addChildren = () => {
    history.push("/addchildren");
  };

  if (isLoading) {
    if (isLoading) {
      return (
        <div>
          <AppHeader>Profile</AppHeader>
          <Loading />
        </div>
      );
    }
  }

  return (
    <div>
      <AppHeader>Home</AppHeader>
      <UtilityButton
        handleClick={addChildren}
        top={"30vh"}
        left={"80vw"}
        width={"50px"}
        height={"50px"}
        type={"icon-button secondary faded"}
        component={<PlusIcon fill="#BEB8EB" />}
      />
      <div className="page-content">
        {data.map((singleData) => (
          <ChildPreview key={singleData.id} child={singleData} />
        ))}
        {/* <ChildPreview />
        <ChildPreview />
        <ChildPreview /> */}
      </div>
    </div>
  );
};

export default withRouter(Home);
