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
              Client, hiring for a project
            </Link>
          </div>
          <div className="group">
            <Link to="/register/job-seeker" className="button">
              Client, looking for a job
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerRegistration;
