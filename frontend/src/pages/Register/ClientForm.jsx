import React, { useState } from 'react';
import './ClientForm.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faCalendarAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons

function ClientForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    password: '',
    repeatPassword: '',
    cvFile: null,
    accountType: ''
  });
  
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const validateForm = () => {
    const errors = {};
    // Validation logic here...
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully!", formData);
    }
  };

  return (
    <div className="client-form-container">
      <form className="client-form" onSubmit={handleSubmit}>
        <header>Register</header>

        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faUser} /> Full Name
          </label>
          <input 
            type="text" 
            name="fullName" 
            value={formData.fullName} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.fullName && <p className="error">{formErrors.fullName}</p>}
        </div>

        <div className="input-field">
          <label>Gender</label>
          <div className="form-check form-check-inline">
            <input 
              type="radio" 
              name="gender" 
              value="male" 
              onChange={handleInputChange} 
              className="form-check-input"
            />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input 
              type="radio" 
              name="gender" 
              value="female" 
              onChange={handleInputChange} 
              className="form-check-input"
            />
            <label className="form-check-label">Female</label>
          </div>
        </div>

        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faCalendarAlt} /> Date of Birth
          </label>
          <input 
            type="date" 
            name="dateOfBirth" 
            value={formData.dateOfBirth} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.dateOfBirth && <p className="error">{formErrors.dateOfBirth}</p>}
        </div>

        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faPhone} /> Phone Number
          </label>
          <input 
            type="text" 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.phoneNumber && <p className="error">{formErrors.phoneNumber}</p>}
        </div>

        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>

        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faLock} /> Password
          </label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>

        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faLock} /> Repeat Password
          </label>
          <input 
            type="password" 
            name="repeatPassword" 
            value={formData.repeatPassword} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.repeatPassword && <p className="error">{formErrors.repeatPassword}</p>}
        </div>

        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faFileAlt} /> CV (PDF)
          </label>
          <input 
            type="file" 
            name="cvFile" 
            onChange={handleFileChange} 
            className="form-control"
          />
          {formErrors.cvFile && <p className="error">{formErrors.cvFile}</p>}
        </div>

        <div className="input-field">
          <label>Account Type</label>
          <div className="form-check form-check-inline">
            <input 
              type="radio" 
              name="accountType" 
              value="client" 
              onChange={handleInputChange} 
              className="form-check-input"
            />
            <label className="form-check-label">Client</label>
          </div>
          <div className="form-check form-check-inline">
            <input 
              type="radio" 
              name="accountType" 
              value="jobSeeker" 
              onChange={handleInputChange} 
              className="form-check-input"
            />
            <label className="form-check-label">Job Seeker</label>
          </div>
        </div>

        <button type="submit" className="submit-btn btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default ClientForm;
