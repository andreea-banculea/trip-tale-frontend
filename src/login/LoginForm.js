import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import ErrorMessage from "../common/ErrorMessage";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(true);
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios.defaults.withCredentials = true;
    await axios
      .post("http://localhost:8080/login", formData)
      .then(() => {
        navigate("/home");
        setSuccessful(true);
      })
      .catch((error) => {
        setSuccessful(false);
        setOpen(true);
        if (
          error.response.data.message === undefined ||
          error.response.data.message === ""
        )
          setMessage("Can't log you in at this moment.");
        else setMessage(error.response.data.message);
      });
  };

  return (
    <form >
      <div className="form-group">
        <input
          type="email"
          value={username}
          onChange={usernameHandler}
          name="logemail"
          className="form-style"
          placeholder="Your Email/Username"
          id="logemail"
          autoComplete="off" />
        <i className="input-icon uil uil-at"></i>
      </div>
      <div className="form-group mt-2">
        <input
          type="password"
          value={password}
          onChange={passwordHandler}
          name="logpass"
          className="form-style"
          placeholder="Your Password"
          id="logpass"
          autoComplete="off" />
        <i className="input-icon uil uil-lock-alt"></i>
      </div>
      <button type="submit" onClick={loginHandler} className="btn mt-4" style={{ color: '#c4c3ca' }}>Log in</button>
      {successful === false && (
        <ErrorMessage text={message} open={open} onClick={handleClose} />
      )}
    </form>

  );
};

export default LoginForm;