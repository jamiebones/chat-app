import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Nav from "./components/Nav";
import socketIO from "socket.io-client";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./authContext";

const socket = socketIO.connect("http://localhost:4000");

function App() {
  const { currentUser, setcurrentUser, token, setToken } = useAuth();

  useEffect(() => {
    if (!token) {
      //load the stuffs from the store if it exists
      const userDetails = window.localStorage.getItem("userDetails");
      if (userDetails) {
        const parsedUserData = JSON.parse(userDetails);
        const { user, token } = parsedUserData;
        setcurrentUser(user);
        setToken(token);
      }
    }
  }, [currentUser]);

  return (
    <Router>
      <div>
        {/* Nav is available at the top of all the pages as a navigation bar */}
        <Nav token={token} />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<Chat />} path="/chat-area" />
          </Route>
          <Route path="/" element={<Home />} />
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
