import React from "react";
import "./Register.css";

const EmployeeRegistrationForm = () => {
  return (
    <div className="login-wrap">
      <div className="login-html">
        <h2>Employee Registration Form</h2>
        <form>
          {/* Add fields specific to Employee Registration */}
          <div className="group">
            <label htmlFor="username" className="label">Username</label>
            <input id="username" type="text" className="input" />
          </div>
          {/* Add more fields as necessary */}
          <div className="group">
            <input type="submit" className="button" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegistrationForm;
