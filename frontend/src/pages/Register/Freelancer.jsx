import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const FreelancerRegistration = () => {
  return (
    <div className="login-wrap">
      <div className="login-html">
        <h2>Freelancer Registration</h2>
        <div className="login-form">
          <div className="group">
            <Link to="/register/employee" className="button">
              Employee Registration
            </Link>
          </div>
          <div className="group">
            <Link to="/register/job-seeker" className="button">
              Job Seeker Registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerRegistration;
