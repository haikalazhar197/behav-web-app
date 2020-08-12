import React, { useState, useEffect } from "react";
import AppHeader from "../components/AppHeader";

import UtilityButton from "../components/UtilityButton";
import DetailsContainer from "../components/DetailsContainer";

import SearchIcon from "../Icons/SearchIcon";
import PlusIcon from "../Icons/PlusIcon";

import app from "../fire";

const db = app.firestore();

const defaultValues = {
  name: "Default Name",
  condition: "default",
  image:
    "https://d2cax41o7ahm5l.cloudfront.net/mi/speaker-photo/dermatology-NMKiron---62959-4369.jpeg",
  guardian: ["default", "anotherdefault"],
};

const defaultImage =
  "https://d2cax41o7ahm5l.cloudfront.net/mi/speaker-photo/dermatology-NMKiron---62959-4369.jpeg";

const SearchBox = ({ setData }) => {
  const [value, setValue] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    console.log("i am Running in search Box", isPressed);
    const unsubscribe = retrieveData();
    return () => {
      console.trace("Im Signing Off");
      unsubscribe();
    };
  }, [isPressed]);

  const retrieveData = () => {
    return db
      .collection("children")
      .where("name", "==", value)
      .onSnapshot(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            name: doc.data().name || defaultValues.name,
            condition: doc.data().condition || defaultValues.condition,
            image: doc.data().img || defaultValues.image,
            // owner: app.auth().currentUser.uid === doc.data().parent,
            owner: doc.data().guardian.includes(app.auth().currentUser.uid),
            guardian: doc.data().guardian || defaultValues.guardian,
            childId: doc.id || "someidhere",
            // parent: doc.data().parent,
          }));
          console.log(defaultValues.guardian.includes("default"));
          console.log(newData);
          setData(newData);
          // return newData;
        },
        (err) => console.log(err)
      );

    // return unsubscribe;
  };

  const handleClick = (e) => {
    e.preventDefault();
    // retrieveData();
    setIsPressed(!isPressed);
  };

  return (
    <form
      className="child-form-container"
      style={{ marginTop: "20px" }}
      onSubmit={handleClick}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="child-input-container"
        style={{ width: "70vw" }}
        // style={{ width: width }}
      />
      <UtilityButton
        type="icon-button secondary primary-shadow faded"
        component={<SearchIcon fill="#beb8eb" />}
        left="80%"
        top="10%"
        width="30px"
        height="30px"
        handleClick={handleClick}
      />
    </form>
  );
};

const ChildListItem = ({
  data = {
    image: defaultImage,
    name: "Haikal Azhar",
    condition: "Autism",
    owner: false,
    guardian: defaultValues.guardian,
  },
}) => {
  const addAsGuardian = () => {
    // alert("added as guardian");
    if (data.childId) {
      db.collection("children")
        .doc(data.childId)
        .update({
          guardian: [...data.guardian, app.auth().currentUser.uid],
        })
        .then(() => alert("added as guardian"))
        .catch((err) => console.log(err));
    } else {
      alert("the button is pressed without updating data");
    }
  };

  return (
    <div className="child-description list-item-container">
      <img
        src={data.image}
        className="profile-img"
        alt=""
        style={{ width: "45px", height: "45px", marginRight: "13px" }}
      />
      <div>
        <div className="secondary-text preview-text">{data.name}</div>
        <div className="secondary-text sub-preview-text">{data.condition}</div>
      </div>
      {!data.owner && (
        <UtilityButton
          type="icon-button secondary primary-shadow faded"
          component={<PlusIcon fill="#beb8eb" />}
          left="85%"
          top="25%"
          width="30px"
          height="30px"
          handleClick={addAsGuardian}
        />
      )}
    </div>
  );
};

const Connect = () => {
  const [data, setData] = useState([
    // {
    //   image: defaultImage,
    //   name: "Haikal Azhar",
    //   condition: "Autism",
    //   owner: true,
    // },
    // {
    //   image: defaultImage,
    //   name: "Faris Mazlan",
    //   condition: "Terencat",
    //   owner: false,
    // },
  ]);

  return (
    <div>
      <AppHeader>Connect</AppHeader>
      <div className="page-content">
        <div className="details-box">
          <SearchBox setData={setData} />
          <div className="info-page">
            {data.map((singleData, index) => (
              <ChildListItem data={singleData} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
