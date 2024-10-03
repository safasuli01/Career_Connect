import React from 'react';
import { NavLink } from 'react-router-dom';
import './CompanyProfile.css';
import cover from "../../assets/images/company/cover.jpg";
import profile from "../../assets/images/company/profile.jpg";

const CompanyProfile = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm pb-4">
        {/* Cover Photo */}
        <div className="cover-photo position-relative">
          <img
          src={cover}
          // Replace with your cover photo URL
            alt="Company Cover"
            className="w-100 rounded-top"
          />
          {/* Profile Image */}
          <div className="profile-img-container position-absolute">
            <img
              src={profile} // Replace with your profile photo URL
              alt="Company Logo"
              className=" profile-img"
            />
          </div>
        </div>

        <div className="card-body ">
          {/* Company Details */}
          <div >
            <h6 className="company-name">scandiweb</h6>
            <p className="company-bio text-muted">The eCommerce agency behind the top eCommerce stores</p>
            <p className="company-details text-muted">IT Services and IT Consulting </p>
            <button className="btn btn-primary w-25 ">
              <i className="fas fa-plus me-2"></i>Contact Us
            </button>
            
          </div>

          {/* Navigation Bar */}
          <div className="mt-4">
            <nav className="nav nav-tabs">
              <NavLink className="nav-link" to="/home">Home</NavLink>
              <NavLink className="nav-link" to="/about">About</NavLink>
              <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
