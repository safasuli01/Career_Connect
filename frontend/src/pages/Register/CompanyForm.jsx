import React, { useState } from "react";
import "./CompanyForm.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faBriefcase, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    industry: "",
    registration_id: "",
    registration_documents: null,
    phone_number: "",
    location: "",
    client_base: false,
    logo: null,
    user: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "company",
    }
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("user.")) {
      const userField = name.split(".")[1];
      setFormData({
        ...formData,
        user: {
          ...formData.user,
          [userField]: value,
        },
      });
    } else if (name === "registration_documents" || name === "logo") {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.user.password !== formData.user.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone_number)) {
      setErrorMessage("Invalid phone number format!");
      return;
    }

    if (formData.registration_id.length !== 14) {
      setErrorMessage("Registration ID must be exactly 14 digits!");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("user.username", formData.user.username);
    formDataObj.append("user.email", formData.user.email);
    formDataObj.append("user.password", formData.user.password);
    formDataObj.append("user.role", formData.user.role);
    formDataObj.append("industry", formData.industry);
    formDataObj.append("registration_id", formData.registration_id);
    formDataObj.append("registration_documents", formData.registration_documents);
    formDataObj.append("phone_number", formData.phone_number);
    formDataObj.append("location", formData.location);
    formDataObj.append("logo", formData.logo);
    formDataObj.append("client_base", formData.client_base);

    fetch("http://127.0.0.1:8000/company/", {
      method: "POST",
      body: formDataObj,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || "Registration Failed!");
          });
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage("Company registered successfully!");
        setErrorMessage("");
        setFormData({
          industry: "",
          registration_id: "",
          registration_documents: null,
          phone_number: "",
          location: "",
          client_base: false,
          logo: null,
          user: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "company",
          }
        });
      })
      .catch((error) => {
        setErrorMessage(error.message || "An error occurred during registration.");
      });
  };

  return (
    <div className="new-project-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Company Registration</h2>
        </div>

        {/* Username */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} /> Username</label>
          <input
            type="text"
            name="user.username"
            value={formData.user.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faEnvelope} /> Email</label>
          <input
            type="email"
            name="user.email"
            value={formData.user.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faLock} /> Password</label>
          <input
            type="password"
            name="user.password"
            value={formData.user.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faLock} /> Confirm Password</label>
          <input
            type="password"
            name="user.confirmPassword"
            value={formData.user.confirmPassword}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Industry */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faBriefcase} /> Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Registration ID */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faFileAlt} /> Registration ID</label>
          <input
            type="text"
            name="registration_id"
            value={formData.registration_id}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Registration Documents */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faFileAlt} /> Registration Documents</label>
          <input
            type="file"
            name="registration_documents"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faPhone} /> Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Logo */}
        <div className="form-group">
          <label>Company Logo</label>
          <input
            type="file"
            name="logo"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Client Base */}
        <div className="form-group">
          <label>Client Based Company?</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="client_base"
              value={true}
              onChange={handleChange}
              className="form-check-input"
              checked={formData.client_base === true}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="client_base"
              value={false}
              onChange={handleChange}
              className="form-check-input"
              checked={formData.client_base === false}
            />
            <label className="form-check-label">No</label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Register</button>

        {/* Link to Switch Form */}
        <label className="switch-form">Already have an account?</label>{" "}
        <Link to="/login">Log in</Link>

        {/* Success and Error Messages */}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default CompanyForm;
