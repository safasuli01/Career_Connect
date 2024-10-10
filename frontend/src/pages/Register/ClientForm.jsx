import React, { useState } from "react";
import "./ClientForm.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faCalendarAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phone_number: "",
    specialization: "",
    national_id: "",
    account_type: "",
    user: {
      username: "",
      email: "",
      role: "individual",
    }
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("user.")) {
      const userField = name.split(".")[1]; // Handle nested user fields
      setFormData({
        ...formData,
        user: {
          ...formData.user,
          [userField]: value,
        },
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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone_number)) {
      setErrorMessage("Invalid phone number format!");
      return;
    }

    if (formData.national_id.length !== 14) {
      setErrorMessage("National ID must be exactly 14 digits!");
      return;
    }

    const payload = {
      user: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.user.username,
        password: formData.password, // Ensure password is passed correctly
        email: formData.user.email,
        role: formData.user.role,
      },
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      phone_number: formData.phone_number,
      specialization: formData.specialization,
      national_id: formData.national_id,
      account_type: formData.account_type,
    };

    console.log("Payload: ", JSON.stringify(payload)); // Debugging log

    fetch("http://127.0.0.1:8000/api/individual/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
        setSuccessMessage("User registered successfully!");
        setErrorMessage("");
        setFormData({
          first_name: "",
          last_name: "",
          date_of_birth: "",
          password: "",
          confirmPassword: "",
          gender: "",
          phone_number: "",
          specialization: "",
          national_id: "",
          account_type: "",
          user: {
            username: "",
            email: "",
            role: "individual",
          },
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
          <h2>Individuals Form</h2>
        </div>

        {/* First Name */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} /> First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} /> Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="form-control"
            required
          />
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

        {/* Date of Birth */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faCalendarAlt} /> Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faLock} /> Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
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
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
              className="form-check-input"
              required
            />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
              className="form-check-input"
              required
            />
            <label className="form-check-label">Female</label>
          </div>
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

        {/* National ID */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faPhone} /> National ID</label>
          <input
            type="text"
            name="national_id"
            value={formData.national_id}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Account Type */}
        <div className="form-group">
          <label>Account Type</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="account_type"
              value="client"
              onChange={handleChange}
              className="form-check-input"
              required
            />
            <label className="form-check-label">Client</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="account_type"
              value="seeking"
              onChange={handleChange}
              className="form-check-input"
              required
            />
            <label className="form-check-label">Seeking</label>
          </div>
        </div>

        {/* Specialization */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faBriefcase} /> Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="form-control"
          />
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

export default ClientForm;
