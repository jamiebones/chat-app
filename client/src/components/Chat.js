import React, { useState, useEffect } from "react";
import { useAuth } from "../authContext";
import axios from "axios";

const Chat = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const { currentUser, token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [receiver, setReceiver] = useState("");

  const [dataReceived, setDataReceived] = useState(false);

  const hideCurrentUserDisplay = (arr) => {
    const username = currentUser.username;
    return arr.filter((user) => user.username !== username);
  };

  const setUsersEventHandler = (data) => {
    setUsers(data);
  };

  const eventHandler = (data) => {
    setMessages((messages) => [
      ...messages,
      { message: data.message, postedBy: data.postedBy },
    ]);
  };

  useEffect(() => {
    socket.on("usersResponse", setUsersEventHandler);
    return () => {
      socket.off("usersResponse", setUsersEventHandler);
    };
  }, []);

  useEffect(() => {
    socket.on("messageReceived", eventHandler);

    return () => {
      socket.off("messageReceived", eventHandler);
    };
  }, []);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (text) {
      //make a post call and send the data to the server
      setText("");
      socket.emit("message", {
        message: text,
        postedBy: currentUser.username,
        to: receiver,
      });

      setMessages((messages) => [
        ...messages,
        { message: text, postedBy: currentUser.username },
      ]);
    }
  };

  const handleChatText = (e) => {
    setText(e.target.value);
  };

  const handleUserSelectionClick = async (to) => {
    //make a post call to the server
    try {
      setReceiver(to);
      const response = await axios.get(
        `http://localhost:4000/chat/retrieve/${currentUser.username}/${to}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.success) {
        //map through the msg array
        let arr = [];
        data.msgs.map(({ message, postedBy }) => {
          arr.push({ message, postedBy });
        });
        setMessages(arr);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("There was an error ", error);
    }
  };
  return (
    <div>
      <h2>Chat Area</h2>

      <div>
        <p>chat display:</p>
        {messages &&
          messages.map(({ message, postedBy }) => {
            return (
              <p>
                {message}:{postedBy}
              </p>
            );
          })}
      </div>

      <div>
        <form onSubmit={handleChatSubmit}>
          <textarea rows={2} cols={20} onChange={handleChatText} value={text} />
          <br />
          <button type="submit">submit</button>
        </form>
      </div>

      <div>
        <p>Online users:</p>
        {users &&
          hideCurrentUserDisplay(users).map(({ name, username }) => {
            return (
              <p
                key={username}
                onClick={() => handleUserSelectionClick(username)}
              >
                {username}: {name}
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default Chat;
