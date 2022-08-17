import React, { useEffect, useState } from "react";

const loopThroughMap = (userMap = new Map()) => {
  for (var [key, value] of userMap.entries()) {
    console.log(key + " = " + value);
  }
  
};

const Home = ({ socket }) => {
  const [users, setUsers] = useState([]);

  socket.on("online-users", (data) => {
    console.log("data is data please: ", data )
    //const onlineUsers = loopThroughMap(data);
    //console.log("users are ", onlineUsers);
    //setUsers(onlineUsers);
  });

  useEffect(() => {
    
  });
  return (
    <div>
      <p>Simple Chat Application</p>
    </div>
  );
};

export default Home;
