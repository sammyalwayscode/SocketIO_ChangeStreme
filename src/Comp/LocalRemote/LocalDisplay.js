import React from "react";
import { useNavigate } from "react-router-dom";

const LocalDisplay = () => {
  const navigate = useNavigate();
  const changeScreen = () => {
    navigate("/display");
  };
  return (
    <center>
      <br />
      <br />
      <br />
      <div>
        <h2>Local Display</h2>
        <button onClick={changeScreen}>Create Conversion</button>
      </div>
    </center>
  );
};

export default LocalDisplay;
