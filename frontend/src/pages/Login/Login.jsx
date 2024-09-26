import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // Import the CSS styles

const Login = () => {
  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        {/* Tabs Titles */}
        <h2 className="active"> Sign In </h2>
        
        {/* Login Form */}
        <form>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="email"
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="password"
          />
          <input
            type="submit"
            className="fadeIn fourth"
            value="Log In"
          />
        </form>

        {/* Remind Password */}
        <div id="formFooter">
          <a className="underlineHover" href="#">
            Forgot Password?
          </a>
        </div>
        <div id="formFooter">
          <Link to="/register" className="underlineHover">
            Not a member? Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
