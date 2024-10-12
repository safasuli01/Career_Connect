import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../contexts/AuthContext'; // Import the Auth context
import Cookies from "js-cookie"; // Import js-cookie for token storage
import "./Login.css"; // Import the CSS styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState(""); // State to store the CSRF token
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login, setIsAuthenticated } = useAuth(); // Destructure login and setIsAuthenticated
  
  // Fetch CSRF token on component mount
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/auth/csrf/", {
          withCredentials: true, 
        });
        setCsrfToken(response.data.getCsrfToken);
      } catch (error) {
        console.log("Error fetching CSRF token:", error);
      }
    };
    getCsrfToken();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        {
          username: email,
          password: password,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken, // Send the CSRF token in the headers
          },
          withCredentials: true, // Include credentials (cookies)
        }
      );

      const token = response.data.token;

      if (token) {
        // Save token to localStorage (or sessionStorage)
        localStorage.setItem("authToken", token);

        // Save token to cookies with a 7-day expiration
        Cookies.set("authToken", token, { expires: 7 });

        // Optionally, store user details
        localStorage.setItem("user", JSON.stringify(response.data.user));
        login(); // Call the login function to update auth state
        setIsAuthenticated(true); // Set authentication state to true
        
        // Redirect to a protected route (landing page)
        navigate("/");

      } else {
        setErrorMessage("Failed to retrieve token. Please try again.");
      }
    } catch (error) {
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
          <input type="submit" className="fadeIn fourth" value="Log In" />
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
