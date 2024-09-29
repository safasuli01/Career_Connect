import React, { useState } from 'react';
import './ClientForm.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faCalendarAlt, faFileAlt, faHome, faBriefcase, faImage } from '@fortawesome/free-solid-svg-icons'; // Import icons

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
    accountType: '',
    address: '',
    specialization: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // Validation logic
  const validateForm = () => {
    const errors = {};

    if (!formData.fullName) errors.fullName = "Full name is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Valid email is required";
    }
    if (!formData.phoneNumber || !/^[0-9]+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Valid phone number is required";
    }
    if (!formData.profileImage) errors.profileImage = "Profile image is required";
    if (!formData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required";
    if (!formData.cvFile) errors.cvFile = "CV is required (PDF only)";
    if (formData.cvFile && formData.cvFile.type !== 'application/pdf') {
      errors.cvFile = "CV must be a PDF file";
    }
    if (!formData.password || !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(formData.password)) {
      errors.password = "Password must be at least 8 characters, contain 1 capital letter, and 1 special character";
    }
    if (formData.password !== formData.repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully!", formData);
      // You can add further form submission logic here
    }
  };
  const handleImageChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  return (
    <div className="client-form-container w-50">
      <form className="client-form" onSubmit={handleSubmit}>
        <header>Individuals Form</header>

        {/* Full Name */}
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

        {/* Gender */}
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

        {/* Date of Birth */}
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

        {/* Phone Number */}
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

        {/* Email */}
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
        
        {/*Profile Image*/}
        <div className="input-field">
          <label htmlFor="profileImage">
            <FontAwesomeIcon icon={faImage} /> Profile Image
          </label>
          <input
            id="profileImage"
            type="file"
            name="profileImage"
            onChange={handleImageChange}
            className='form-control'
            accept="image/jpeg, image/png, image/webp"
            required
          />
          {formErrors.profileImage && <p className="error">{formErrors.profileImage}</p>}
        </div>


        {/* Address */}
        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faHome} /> Address
          </label>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.address && <p className="error">{formErrors.address}</p>}
        </div>

        {/* Specialization */}
        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faBriefcase} /> Specialization
          </label>
          <input 
            type="text" 
            name="specialization" 
            value={formData.specialization} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.specialization && <p className="error">{formErrors.specialization}</p>}
        </div>

        {/* Password */}
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

        {/* Repeat Password */}
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

        {/* CV Upload */}
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

        {/* Account Type */}
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

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
}

export default ClientForm;
