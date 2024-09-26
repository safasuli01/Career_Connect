import React, { useState } from 'react';
import './ClientForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faIdCard, faCalendar, faImage, faPhone, faFilePdf } from '@fortawesome/free-solid-svg-icons';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    occupation: '',
    phoneNumber: '',
    idNumber: '',
    profileImage: null,
    accountType: '',
    password: '',
    repeatPassword: '',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    cvFile: null, // Added CV file state
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    // Validation Logic
    if (!formData.fullName) errors.fullName = "Full name is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Valid email is required";
    }
    if (!formData.phoneNumber || !/^[0-9]+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Valid phone number is required";
    }
    if (!formData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required";
    if (!formData.idNumber) errors.idNumber = "ID Number is required";
    if (!formData.profileImage) errors.profileImage = "Profile image is required";
    if (!formData.cvFile) errors.cvFile = "CV is required (PDF only)";
    if (formData.cvFile && formData.cvFile.type !== 'application/pdf') {
      errors.cvFile = "CV must be a PDF file";
    }

    // Password Validation
    if (!formData.password || !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(formData.password)) {
      errors.password = "Password must be more than 8 characters, contain at least 1 capital letter, and 1 special character";
    }
    if (formData.password !== formData.repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
    }

    // Payment Validation
    if (formData.accountType === 'hiring') {
      if (!formData.cardNumber) {
        errors.cardNumber = "Card number is required";
      } else if (!/^[0-9]{16}$/.test(formData.cardNumber)) {
        errors.cardNumber = "Card number must be exactly 16 numbers";
      }

      if (!formData.cardHolder) {
        errors.cardHolder = "Cardholder name is required";
      } else if (!/^[A-Za-z\s]+$/.test(formData.cardHolder)) {
        errors.cardHolder = "Cardholder name must contain letters only";
      }

      if (!formData.expiryDate) {
        errors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        errors.expiryDate = "Expiry date must be in MM/YY format";
      }

      if (!formData.cvv) {
        errors.cvv = "CVV is required";
      } else if (!/^\d{3}$/.test(formData.cvv)) {
        errors.cvv = "CVV must be exactly 3 numbers";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully!", formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Limit cardNumber to 16 digits and remove non-digit characters
    if (name === 'cardNumber') {
      const cardNumber = value.replace(/\D/g, ''); // Remove any non-digit characters
      if (cardNumber.length <= 16) {
        setFormData({ ...formData, [name]: cardNumber });
      }
    }

    // Limit cvv to 3 digits and remove non-digit characters
    else if (name === 'cvv') {
      const cvv = value.replace(/\D/g, ''); // Remove any non-digit characters
      if (cvv.length <= 3) {
        setFormData({ ...formData, [name]: cvv });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  return (
    <div className="client-form-container">  
      <header>Client Registration</header>
      <form className="client-form" onSubmit={handleSubmit}>
        
        {/* Personal Info Section */}
        <h3>Personal Info</h3>
        
        <div className="input-field">
          <label htmlFor="fullName">
            <FontAwesomeIcon icon={faUser} /> Full Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder='Enter your fullname'
            required
          />
          {formErrors.fullName && <p className="error">{formErrors.fullName}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Enter your email'
            required
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} /> Create Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder='Enter your password'
            required
          />
          {formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="repeatPassword">
            <FontAwesomeIcon icon={faLock} /> Repeat Password
          </label>
          <input
            id="repeatPassword"
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleInputChange}
            placeholder='Repeat your password'
            required
          />
          {formErrors.repeatPassword && <p className="error">{formErrors.repeatPassword}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="phoneNumber">
            <FontAwesomeIcon icon={faPhone} /> Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type='number'
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          {formErrors.phoneNumber && <p className="error">{formErrors.phoneNumber}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="dateOfBirth">
            <FontAwesomeIcon icon={faCalendar} /> Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
          {formErrors.dateOfBirth && <p className="error">{formErrors.dateOfBirth}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="profileImage">
            <FontAwesomeIcon icon={faImage} /> Profile Image
          </label>
          <input
            id="profileImage"
            type="file"
            name="profileImage"
            onChange={handleImageChange}
            accept="image/jpeg, image/png, image/webp"
            required
          />
          {formErrors.profileImage && <p className="error">{formErrors.profileImage}</p>}
        </div>

        {/* Verification Info Section */}
        <h3>Verification Info</h3>
        <div className="input-field">
          <label htmlFor="idNumber">
            <FontAwesomeIcon icon={faIdCard} /> ID Number
          </label>
          <input
            id="idNumber"
            type="number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleInputChange}
            placeholder='Enter your ID Number'
            required
          />
          {formErrors.idNumber && <p className="error">{formErrors.idNumber}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="cvFile">
            <FontAwesomeIcon icon={faFilePdf} /> CV (PDF only)
          </label>
          <input
            id="cvFile"
            type="file"
            name="cvFile"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
          {formErrors.cvFile && <p className="error">{formErrors.cvFile}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="accountType">Account Type</label>
          <select
            id="accountType"
            name="accountType"
            value={formData.accountType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select account type</option>
            <option value="hiring">Hiring</option>
            <option value="job seeker">Job Seeker</option>
          </select>
        </div>

        {formData.accountType === 'hiring' && (
          <>
            {/* Payment Info Section */}
            <h3>Payment Info</h3>
            <div className="input-field">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder='Enter your card number'
                required
              />
              {formErrors.cardNumber && <p className="error">{formErrors.cardNumber}</p>}
            </div>

            <div className="input-field">
              <label htmlFor="cardHolder">Card Holder</label>
              <input
                id="cardHolder"
                type="text"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleInputChange}
                placeholder='Enter cardholder name'
                required
              />
              {formErrors.cardHolder && <p className="error">{formErrors.cardHolder}</p>}
            </div>

            <div className="input-field">
              <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
              <input
                id="expiryDate"
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder='Enter expiry date'
                required
              />
              {formErrors.expiryDate && <p className="error">{formErrors.expiryDate}</p>}
            </div>

            <div className="input-field">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder='Enter CVV'
                required
              />
              {formErrors.cvv && <p className="error">{formErrors.cvv}</p>}
            </div>
          </>
        )}

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default ClientForm;
