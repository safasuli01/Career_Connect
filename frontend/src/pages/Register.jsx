import React from "react";
import { Link } from "react-router-dom";
import "./Register.css"; // Import SignUp-specific CSS

const Register = () => {
  return (
    <div className="login-wrap">
      <div className="login-html">
        <div className="login-form">
          <div className="sign-up-htm">
            <div className="group">
              <label htmlFor="user" className="label">
                Username
              </label>
              <input id="user" type="text" className="input" />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Password
              </label>
              <input id="pass" type="password" className="input" />
            </div>
            <div className="group">
              <label htmlFor="pass-repeat" className="label">
                Repeat Password
              </label>
              <input id="pass-repeat" type="password" className="input" />
            </div>
            <div className="group">
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input id="email" type="text" className="input" />
            </div>
            <div className="group">
              <input type="submit" className="button" value="Sign Up" />
            </div>
            <div className="hr"></div>
            <div className="foot-lnk">
              <Link to="/login">Already a member? Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
