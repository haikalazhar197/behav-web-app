import React, { useState, useEffect } from "react";
import "./styles.css";

//a random name generator

const RandomName = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    const newValue = data.results[0].name.first;
    setValue(newValue);
  };

  return <div>{value}</div>;
};

export default RandomName;
