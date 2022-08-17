import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";

const Nav = ({ token, socket }) => {
  const { setToken, setcurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    setcurrentUser(null);
    setToken("");
    localStorage.removeItem("userDetails");
    navigate("/");
  };

  socket.on("online-users", (data) => {
    console.log("data is data please: ", data )
    //const onlineUsers = loopThroughMap(data);
    //console.log("users are ", onlineUsers);
    //setUsers(onlineUsers);
  });

  return (
    <div>
      <ul>
        {token ? (
          <>
            <li>
              <Link to="/logout" onClick={handleLogOut}>
                Log out
              </Link>
            </li>

            <li>
              <Link to="/chat-area">Chat Area</Link>
            </li>
          </>
        ) : null}
        {!token ? (
          <li>
            <Link to="/login">Log in</Link>
          </li>
        ) : null}

        <li>
          <Link to="/create-account">Create Account</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
