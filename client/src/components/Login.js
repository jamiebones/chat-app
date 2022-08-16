import React, { useState } from "react";
import { useAuth } from "../authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setcurrentUser, token, setToken } = useAuth();

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      default:
        setPassword(value);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !username) {
      alert("password and username is required");
      return;
    }
    const res = await axios.post("http://localhost:4000/login", {
      username,
      password,
    });

    const { data } = res;

    if (data.success) {
      //log the user to the chat area
      setToken(data.token);
      setcurrentUser({ name: data.name, username: data.username });
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          user: {
            name: data.name,
            username: data.username,
          },
          token: data.token,
        })
      );
      navigate("/chat-area")
    } else {
      alert(`Error : ${data.message}`);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>username:</p>
          <input
            type="text"
            placeholder="username"
            value={username}
            name="username"
            onChange={handleTextChange}
          />
        </div>

        <div>
          <p>password:</p>
          <input
            type="password"
            placeholder="xxxxxxxxxxx"
            value={password}
            name="password"
            onChange={handleTextChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginPage;
