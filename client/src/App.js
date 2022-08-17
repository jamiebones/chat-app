import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Nav from "./components/Nav";
//import socketIO from "socket.io-client";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./authContext";
import socket from "./socket";

//const socket = socketIO.connect("http://localhost:4000");

function App() {
  const { currentUser, setcurrentUser, token, setToken } = useAuth();

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("we are disconnected");
    });

    socket.on("disconnecting", () => {
      console.log("we are disconnecting......")
    })

    socket.on("connect", () => {
      console.log("we are connected again:");
    });
  }, [socket]);

  useEffect(() => {
    if (!token || !currentUser ) {
      //load the stuffs from the store if it exists
      const userDetails = window.localStorage.getItem("userDetails");
      if (userDetails) {
        const parsedUserData = JSON.parse(userDetails);
        const { user, token } = parsedUserData;
        setcurrentUser(user);
        setToken(token);
        //add it to socket here
        socket.auth = {
          token: token,
          user: { username: user.username, name: user.name },
        };
        socket.user = { username: user.username, name: user.name };
      }
    }
  }, [currentUser]);

  return (
    <Router>
      <div>
        {/* Nav is available at the top of all the pages as a navigation bar */}
        <Nav token={token} socket={socket}/>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<Chat />} path="/chat-area" />
          </Route>
          <Route path="/" element={<Home socket={socket} />} />
          <Route
            path="/create-account"
            element={<CreateAccount socket={socket} />}
          />
          <Route path="/login" element={<Login socket={socket} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
