import React, { useState } from 'react';
import './CompanyForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faLock, faIdCard, faImage, faPhone, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    street: '',
    city: '',
    email: '',
    registrationNumber: '',
    phone: '',
    logo: null,
    registrationDocument: null,
    accountType: '',       // Keeping the original account type field
    industry: '',
    paymentInfo: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    },
    password: '',           // New field for password
    repeatPassword: '',     // New field for repeated password
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Validation Logic
    if (!formData.companyName) errors.companyName = "Company Name is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Valid email is required";
    }
    if (!formData.street) errors.street = "Street address is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.registrationNumber) errors.registrationNumber = "Registration Number is required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be exactly 10 digits";
    }
    if (!formData.logo) errors.logo = "Company logo is required";
    if (!formData.registrationDocument) errors.registrationDocument = "Registration Document is required";

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, 1 letter, 1 number
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = "Password must be at least 8 characters long and contain at least 1 letter and 1 number";
    }
    if (formData.repeatPassword !== formData.password) {
      errors.repeatPassword = "Passwords do not match";
    }

    // Industry validation
    if (formData.accountType === 'hiring' && !formData.industry) {
      errors.industry = "Industry is required for hiring companies";
    }

    // Payment Validation
    if (formData.accountType === 'hiring') {
      if (!formData.paymentInfo.cardNumber) {
        errors.cardNumber = "Card number is required";
      } else if (!/^[0-9]{16}$/.test(formData.paymentInfo.cardNumber)) {
        errors.cardNumber = "Card number must be exactly 16 numbers";
      }

      if (!formData.paymentInfo.cardHolder) {
        errors.cardHolder = "Cardholder name is required";
      } else if (!/^[A-Za-z\s]+$/.test(formData.paymentInfo.cardHolder)) {
        errors.cardHolder = "Cardholder name must contain letters only";
      }

      if (!formData.paymentInfo.expiryDate) {
        errors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.paymentInfo.expiryDate)) {
        errors.expiryDate = "Expiry date must be in MM/YY format";
      }

      if (!formData.paymentInfo.cvv) {
        errors.cvv = "CVV is required";
      } else if (!/^\d{3}$/.test(formData.paymentInfo.cvv)) {
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

    // Handle nested state for payment info
    if (name.startsWith('paymentInfo.')) {
      const paymentField = name.split('.')[1];
      setFormData({ 
        ...formData, 
        paymentInfo: { 
          ...formData.paymentInfo, 
          [paymentField]: value 
        } 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: e.target.files[0] });
    } else if (name === 'registrationDocument') {
      setFormData({ ...formData, registrationDocument: e.target.files[0] });
    }
  };

  return (
    <div className="company-form-container">  
      <header>Company Registration</header>
      <form className="company-form" onSubmit={handleSubmit}>
        
        {/* Company Info Section */}
        <h3>Company Info</h3>
        
        <div className="input-field">
          <label htmlFor="companyName">
            <FontAwesomeIcon icon={faBuilding} /> Company Name
          </label>
          <input
            id="companyName"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder='Enter company name'
            required
          />
          {formErrors.companyName && <p className="error">{formErrors.companyName}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="street">
            <FontAwesomeIcon icon={faMapMarkedAlt} /> Street
          </label>
          <input
            id="street"
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            placeholder='Enter street address'
            required
          />
          {formErrors.street && <p className="error">{formErrors.street}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="city">
            <FontAwesomeIcon icon={faMapMarkedAlt} /> City
          </label>
          <input
            id="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder='Enter city'
            required
          />
          {formErrors.city && <p className="error">{formErrors.city}</p>}
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

        {/* Password Section */}
        <div className="input-field">
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} /> Password
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
          <label htmlFor="registrationNumber">
            <FontAwesomeIcon icon={faIdCard} /> Registration No.
          </label>
          <input
            id="registrationNumber"
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleInputChange}
            placeholder='Enter Registration No.'
            required
          />
          {formErrors.registrationNumber && <p className="error">{formErrors.registrationNumber}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="phone">
            <FontAwesomeIcon icon={faPhone} /> Phone Number
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder='Enter phone number'
            required
          />
          {formErrors.phone && <p className="error">{formErrors.phone}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="logo">
            <FontAwesomeIcon icon={faImage} /> Company Logo
          </label>
          <input
            id="logo"
            type="file"
            name="logo"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
          {formErrors.logo && <p className="error">{formErrors.logo}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="registrationDocument">
            <FontAwesomeIcon icon={faImage} /> Registration Document
          </label>
          <input
            id="registrationDocument"
            type="file"
            name="registrationDocument"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
          {formErrors.registrationDocument && <p className="error">{formErrors.registrationDocument}</p>}
        </div>

        {/* Account Type Section */}
        <h3>Account Type</h3>
        <div className="input-field">
          <label> Account Type </label>
          <select
            name='accountType'
            value={formData.accountType}
            onChange={handleInputChange}
            required
          >
            <option disabled value="" selected> Select Type</option>
            <option value="hiring">Hiring Company </option>
            <option value="client-based"> Client-Based Company </option>
          </select>
        </div>

        {/* Industry Section */}
        {formData.accountType === 'hiring' && (
          <div className="input-field">
            <label htmlFor="industry">
              Industry
            </label>
            <input
              id="industry"
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              placeholder='Enter industry'
              required
            />
            {formErrors.industry && <p className="error">{formErrors.industry}</p>}
          </div>
        )}

        {/* Payment Information Section */}
        {formData.accountType === 'hiring' && (
          <>
            <h3>Payment Information</h3>

            <div className="input-field">
              <label htmlFor="cardNumber">
                Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                name="paymentInfo.cardNumber"
                value={formData.paymentInfo.cardNumber}
                onChange={handleInputChange}
                placeholder='Enter 16-digit card number'
                required
              />
              {formErrors.cardNumber && <p className="error">{formErrors.cardNumber}</p>}
            </div>

            <div className="input-field">
              <label htmlFor="cardHolder">
                Cardholder Name
              </label>
              <input
                id="cardHolder"
                type="text"
                name="paymentInfo.cardHolder"
                value={formData.paymentInfo.cardHolder}
                onChange={handleInputChange}
                placeholder='Enter cardholder name'
                required
              />
              {formErrors.cardHolder && <p className="error">{formErrors.cardHolder}</p>}
            </div>

            <div className="input-field">
              <label htmlFor="expiryDate">
                Expiry Date
              </label>
              <input
                id="expiryDate"
                type="text"
                name="paymentInfo.expiryDate"
                value={formData.paymentInfo.expiryDate}
                onChange={handleInputChange}
                placeholder='MM/YY'
                required
              />
              {formErrors.expiryDate && <p className="error">{formErrors.expiryDate}</p>}
            </div>

            <div className="input-field">
              <label htmlFor="cvv">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                name="paymentInfo.cvv"
                value={formData.paymentInfo.cvv}
                onChange={handleInputChange}
                placeholder='Enter 3-digit CVV'
                required
              />
              {formErrors.cvv && <p className="error">{formErrors.cvv}</p>}
            </div>
          </>
        )}

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default CompanyForm;
