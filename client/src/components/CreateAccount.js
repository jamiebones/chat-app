import React, { useState } from "react";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUserAccount = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { socket } = useAuth();

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "name":
        setName(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password || !username) {
      alert("fill in all the details");
      return;
    }
    const response = await axios.post("http://localhost:4000/create-user", {
      name,
      username,
      password,
    });

    const { data } = response;

    if (data.success) {
      navigate("/login");
    } else {
      alert(data?.message);
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
          <p>name:</p>
          <input
            type="text"
            placeholder="name"
            value={name}
            name="name"
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
        <button type="submit">create user account</button>
      </form>
    </div>
  );
};

export default CreateUserAccount;
