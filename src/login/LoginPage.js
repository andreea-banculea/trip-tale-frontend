import React, { useState } from "react";
import "./LoginPage.css";
import axios from 'axios';
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";


const LoginPage = () => {
  axios.defaults.withCredentials = true;
  return (
    <div style={{paddingLeft:700, backgroundColor: '#1f2029' }}>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3" style={{ color: '#c4c3ca' }}>
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3" style={{ color: '#c4c3ca' }}>Log In</h4>
                          <LoginForm />
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">Forgot your password?</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3" style={{ color: '#c4c3ca' }}>Sign Up</h4>
                          <SignUpForm />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
