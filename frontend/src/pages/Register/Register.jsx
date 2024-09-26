import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  return (
    <div className="register-container">
      <header>Choose Your Registration Type</header>

      <div className="card-container">
        {/* Card for Freelancer Registration */}
        <Link to="/Register/client" className="card">
          <div className="card-content">
            <h3>Freelancer</h3>
            <p>Sign up as a freelancer and offer your services to clients.</p>
          </div>
        </Link>

        {/* Card for Company Registration */}
        <Link to="/Register/company" className="card">
          <div className="card-content">
            <h3>Company</h3>
            <p>Sign up as a company to hire freelancers for projects.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Register;
