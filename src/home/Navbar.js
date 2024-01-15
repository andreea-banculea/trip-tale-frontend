import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const handleHome = (e) => {
    navigate("/home");
  }
  useEffect(() => {
    getUser();
  },);

  const getUser = async () => {
    const response = await axios.get(
      `http://localhost:8080/users/getLoggedUser`
    );
    setUsername(response.data.username);
  };

  axios.defaults.withCredentials = true;
  const logoutHandler = async () => {
    try {
      await axios.post("http://localhost:8080/logout",true);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
  <div className="container">
    <a className="navbar-brand" href="#">
      <img src="https://i.imgur.com/NGZdjb9.png" alt="..." height="36" />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a
            onClick={handleHome}
            className="nav-link active"
            aria-current="page"
            href="#"
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            My blogs
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            {username}
          </a>
        </li>
        <li className="nav-item">
          <button
            type="button"
            onClick={logoutHandler}
            className="btn mt-2 mt-lg-0"
            style={{ color: '#c4c3ca' }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
}

export default Navbar;
