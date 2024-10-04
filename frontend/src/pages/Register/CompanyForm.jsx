import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CompanyForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt, faFileAlt, faPhone, faIndustry, faImage } from '@fortawesome/free-solid-svg-icons';

function CompanyForm() {
  const [formData, setFormData] = useState({
    user: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
    },
    company_name: '',
    location: '',
    registration_id: '',
    registration_document: null,  // Retaining the field for future
    phone_number: '',
    logo: null,  // Retaining the field for future
    industry: '',
    company_type: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.user) {
      setFormData({
        ...formData,
        user: {
          ...formData.user,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle file changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // Handle checkbox changes for company_type
  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, company_type: e.target.checked });
  };

  // Validation logic
  const validateForm = () => {
    const errors = {};
    // User fields validation
    if (!formData.user.first_name) errors.first_name = "First name is required";
    if (!formData.user.last_name) errors.last_name = "Last name is required";
    if (!formData.user.username) errors.username = "Username is required";
    if (!formData.user.email) errors.email = "Email is required";
    if (!formData.user.password) errors.password = "Password is required";

    // Company fields validation
    if (!formData.company_name) errors.company_name = "Company name is required";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.registration_id) errors.registration_id = "Registration ID is required";
    if (!formData.phone_number || !/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone_number)) {
      errors.phone_number = "Valid Egyptian phone number is required";
    }
    if (!formData.industry) errors.industry = "Industry is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();

      // Append user data
      Object.keys(formData.user).forEach((key) => {
        formDataToSend.append(`user.${key}`, formData.user[key]); // Correct nested syntax
      });

      // Append company data
      Object.keys(formData).forEach((key) => {
        if (key !== 'user') {
          if (key === 'company_type') {
            formDataToSend.append(key, formData.company_type ? 'true' : 'false'); // Handle boolean
          } else if (formData[key] !== null) {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/register/company/', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccessMessage("Company registered successfully!");
        setErrorMessage("");
        navigate('/'); // Navigate to the landing page on success
      } catch (error) {
        console.error("Error submitting form:", error.response?.data);
        setErrorMessage(error.response?.data?.error || "An error occurred during registration.");
      }
    }
  };

  return (
    <div className="company-form-container">
      <form className="company-form" onSubmit={handleSubmit}>
        <header>Company Registration</header>

        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        {/* User Information */}
        <div className="input-field">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.user.first_name}
            onChange={handleInputChange}
            className="form-control"
          />
          {formErrors.first_name && <p className="error">{formErrors.first_name}</p>}
        </div>

        <div className="input-field">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.user.last_name}
            onChange={handleInputChange}
            className="form-control"
          />
          {formErrors.last_name && <p className="error">{formErrors.last_name}</p>}
        </div>

        <div className="input-field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.user.username}
            onChange={handleInputChange}
            className="form-control"
          />
          {formErrors.username && <p className="error">{formErrors.username}</p>}
        </div>

        <div className="input-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.user.email}
            onChange={handleInputChange}
            className="form-control"
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>

        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.user.password}
            onChange={handleInputChange}
            className="form-control"
          />
          {formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>

        {/* Company Information */}
        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faBuilding} /> Company Name
          </label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            className="form-control"
          />
          {formErrors.company_name && <p className="error">{formErrors.company_name}</p>}
        </div>

        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="form-control"
          />
          {formErrors.location && <p className="error">{formErrors.location}</p>}
        </div>

        <div className="input-field">
          <label>Registration ID</label>
          <input
            type="text"
            name="registration_id"
            value={formData.registration_id}
            onChange={handleInputChange}
            className="form-control"
          />
          {formErrors.registration_id && <p className="error">{formErrors.registration_id}</p>}
        </div>

        {/* <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faFileAlt} /> Registration Document (PDF)
          </label>
          <input
            type="file"
            name="registration_document"
            onChange={handleFileChange}
            className="form-control"
          />
          {formErrors.registration_document && <p className="error">{formErrors.registration_document}</p>}
        </div> */}

        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faPhone} /> Phone
          </label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="form-control"
          />
          {formErrors.phone_number && <p className="error">{formErrors.phone_number}</p>}
        </div>

        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faIndustry} /> Industry
          </label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            className="form-control"
          />
          {formErrors.industry && <p className="error">{formErrors.industry}</p>}
        </div>

        <div className="input-field">
          <label>Company Type (Private/Public)</label>
          <input
            type="checkbox"
            name="company_type"
            checked={formData.company_type}
            onChange={handleCheckboxChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default CompanyForm;
