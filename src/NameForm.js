import React, { useState } from "react";
import "./styles.css";

const NameForm = ({ setValue }) => {
  const [name, setName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    alert(`My Name is ${name}`);
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button onClick={() => handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default NameForm;
