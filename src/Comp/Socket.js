import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const Socket = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState([]);
  const sockIO = io("http://localhost:3040");

  const createSoc = async () => {
    await axios.post("http://localhost:3040/api/create", { userName });
  };

  const getData = async () => {
    const res = await axios.get("http://localhost:3040/api/");
    console.log(res.data.data);
    setUserData(res.data.data);
  };

  useEffect(() => {
    getData();
    sockIO.on("newEntry", () => {
      getData();
    });
  }, []);

  return (
    <div className="MasterDiv">
      <h2>New User</h2>
      <input
        placeholder="Create User"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <button onClick={createSoc}>Create</button>
      <h2>All Socketed Users</h2>
      <div className="allCards">
        {userData?.map((props) => (
          <div key={props._id} className="Card">
            <h4>{props.name}</h4>
            <button>Like</button>
            <span>20</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Socket;
