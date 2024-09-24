import React from "react";
import "./Register.css";

const EmployeeSearchRegistrationForm = () => {
  return (
    <div className="login-wrap">
      <div className="login-html">
        <h2>Employee Search Registration Form</h2>
        <form>
          {/* Add fields specific to Employee Search Registration */}
          <div className="group">
            <label htmlFor="companyName" className="label">Company Name</label>
            <input id="companyName" type="text" className="input" />
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

export default EmployeeSearchRegistrationForm;
