import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";


const SignUpForm = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(true);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const usernameHandler = (event) => {
        setUsername(event.target.value);
    };

    const emailHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createUser = () => {
        const user = {
            username: username,
            email: email,
            password: password,
        };
        axios
            .post(`http://localhost:8080/users`, user)
            .then(() => {
                setSuccessful(true);
                navigate('/login');
            })
            .catch((error) => {
                setOpen(true);
                setSuccessful(false);
                if (
                    error.response.data.message === undefined ||
                    error.response.data.message === ""
                )
                    setMessage("Error creating your account!");
                else setMessage(error.response.data.message);
            });
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
        <div>
            <div className="form-group">
                <input
                    type="text"
                    name="logname"
                    value={username}
                    onChange={usernameHandler}
                    className="form-style"
                    placeholder="Username"
                    id="logname"
                    autoComplete="off"
                />
                <i className="input-icon uil uil-user"></i>
            </div>
            <div className="form-group mt-2">
                <input
                    type="email"
                    name="logemail"
                    value={email}
                    onChange={emailHandler}
                    className="form-style"
                    placeholder="Email"
                    id="logemail"
                    autoComplete="off"
                />
                <i className="input-icon uil uil-at"></i>
            </div>
            <div className="form-group mt-2">
                <input
                    type="password"
                    name="logpass"
                    value={password}
                    onChange={passwordHandler}
                    className="form-style"
                    placeholder="Password"
                    id="logpass"
                    autoComplete="off"
                />
                <i className="input-icon uil uil-lock-alt"></i>
            </div>
            <button href="#"
                onClick={createUser}
                className="btn mt-4"
                style={{ color: '#c4c3ca' }}>submit</button>
            {successful === false ? (
                <ErrorMessage
                    open={open}
                    text={message}
                    onClick={handleClose} />
            ) : [(loginHandler)]}
        </div>
    );
};

export default SignUpForm;
