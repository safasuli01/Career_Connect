import React, { useState } from 'react';
import './CompanyForm.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt, faFileAlt, faPhone, faIndustry, faImage } from '@fortawesome/free-solid-svg-icons'; // Import icons

function CompanyForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    street: '',
    city: '',
    registrationNumber: '',
    registrationDocument: null,
    phone: '',
    logo: null,
    industry: '',
    companyType:'',
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

    if (!formData.companyName) errors.companyName = "Company name is required";
    if (!formData.street) errors.street = "Street address is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.registrationNumber) errors.registrationNumber = "Registration number is required";
    if (!formData.registrationDocument) errors.registrationDocument = "Registration document is required";
    if (formData.registrationDocument && formData.registrationDocument.type !== 'application/pdf') {
      errors.registrationDocument = "Registration document must be a PDF file";
    }
    if (!formData.phone || !/^[0-9]+$/.test(formData.phone)) {
      errors.phone = "Valid phone number is required";
    }
    if (!formData.industry) errors.industry = "Industry is required";
    if (!formData.companyType) errors.companyType = "Company type is required"; // Added validation for companyType
    
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

  return (
    <div className="company-form-container w-50">
      <form className="company-form " onSubmit={handleSubmit}>
        <header>Company Registration</header>

        {/* Company Name */}
        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faBuilding} /> Company Name
          </label>
          <input 
            type="text" 
            name="companyName" 
            value={formData.companyName} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.companyName && <p className="error">{formErrors.companyName}</p>}
        </div>

        {/* Street Address */}
        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Street
          </label>
          <input 
            type="text" 
            name="street" 
            value={formData.street} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.street && <p className="error">{formErrors.street}</p>}
        </div>

        {/* City */}
        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> City
          </label>
          <input 
            type="text" 
            name="city" 
            value={formData.city} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.city && <p className="error">{formErrors.city}</p>}
        </div>

        {/* Registration Number */}
        <div className="input-field">
          <label>Registration Number</label>
          <input 
            type="text" 
            name="registrationNumber" 
            value={formData.registrationNumber} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.registrationNumber && <p className="error">{formErrors.registrationNumber}</p>}
        </div>

        {/* Registration Document */}
        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faFileAlt} /> Registration Document (PDF)
          </label>
          <input 
            type="file" 
            name="registrationDocument" 
            onChange={handleFileChange} 
            className="form-control"
          />
          {formErrors.registrationDocument && <p className="error">{formErrors.registrationDocument}</p>}
        </div>

        {/* Phone */}
        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faPhone} /> Phone
          </label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleInputChange} 
            className="form-control"
          />
          {formErrors.phone && <p className="error">{formErrors.phone}</p>}
        </div>

        {/* Logo */}
        <div className="input-field">
          <label>
            <FontAwesomeIcon icon={faImage} /> Logo
          </label>
          <input 
            type="file" 
            name="logo" 
            onChange={handleFileChange} 
            className="form-control"
          />
        </div>

        {/* Industry */}
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

        {/* Company Type */}
        <div className="input-field">
          <label>Company Type</label>
          <div className="form-check form-check-inline">
            <input 
              type="radio" 
              name="companyType" 
              value="hiring"
              onChange={handleInputChange} 
              className="form-check-input"
            />
            <label className="form-check-label">Hiring Company</label>
          </div>

          <div className="form-check form-check-inline">
            <input 
              type="radio" 
              name="companyType" 
              value="client-based"
              onChange={handleInputChange} 
              className="form-check-input"
            />
            <label className="form-check-label">Client-based Company</label>
          </div>
        </div>

        <button type="submit" className="submit-btn">Register Company</button>
      </form>
    </div>
  );
}

export default CompanyForm;
