import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../contexts/AuthContext'; 
import Cookies from "js-cookie"; 
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login, setIsAuthenticated } = useAuth(); 

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
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
  
      const { token, user } = response.data; // Company or individual info
  
      if (token) {
        localStorage.setItem("authToken", token);

        const userType = user?.role; 
        const userId = user?.id;

        login(userType, userId); // Use userType and userId to set the user session

        setIsAuthenticated(true); // Mark user as authenticated

        Cookies.set("authToken", token, { expires: 7 });

        localStorage.setItem(`user_${userId}`, JSON.stringify(user)); // Save user data with unique key

        // Redirect to the correct profile page
        if (userType === "company") {
          navigate(`/company/${userId}/profile`);  // Redirect company user
        } else if (userType === "individual") {
          navigate(`/individual/${userId}/profile`);  // Redirect individual user
        } else {
          setErrorMessage("Unknown user type.");
        }
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

        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>

        <div id="formFooter">
          <Link className="underlineHover" to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
