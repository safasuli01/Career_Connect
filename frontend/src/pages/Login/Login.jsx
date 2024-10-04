import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS styles
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        username: email,  // Django uses username for authentication
        password: password,
      });
      
      // Save the token in localStorage or cookies
      localStorage.setItem("token", response.data.token);

      // Redirect the user to the landing page after successful login
      navigate("/"); // Update this to the landing page route

    } catch (error) {
      // Handle error cases
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="active"> Sign In </h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            className="fadeIn fourth"
            value="Log In"
          />
        </form>

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
