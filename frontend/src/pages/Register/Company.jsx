import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const CompanyRegistration = () => {
  return (
    <div className="login-wrap">
      <div className="login-html">
        <h2>Company Registration</h2>
        <div className="login-form">
          <div className="group">
            <Link to="/register/employee-search" className="button">
              Employee Hiring Company
            </Link>
          </div>
          <div className="group">
            <Link to="/register/client-based" className="button">
              Client-Based Company 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;
