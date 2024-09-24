import React, { useState } from "react";
import "./Register.css";

const JobSeekerRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
    phoneCode: "",
    phoneNumber: "",
    city: "",
    region: "",
    address: "",
    profileImage: null,
  });

  const [formErrors, setFormErrors] = useState({});

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  const phoneNumberRegex = /^[0-9]+$/;
  const imageRegex = /\.(jpeg|jpg|png|webp)$/i;

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.userName) errors.userName = "Username is required";
    if (!formData.email || !emailRegex.test(formData.email)) errors.email = "Valid email is required";
    if (!formData.phoneCode || !formData.phoneNumber || !phoneNumberRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Valid phone number is required";
    }
    if (!formData.password || !passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be more than 8 characters, contain at least 1 capital letter, and 1 special character";
    }
    if (formData.password !== formData.repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
    }
    if (!formData.city) errors.city = "City is required";
    if (!formData.region) errors.region = "Region is required";
    if (!formData.profileImage) {
      errors.profileImage = "Profile image is required";
    } else if (!imageRegex.test(formData.profileImage.name)) {
      errors.profileImage = "Image must be a JPEG, JPG, PNG, or WEBP file";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Process the form data (send to backend or API)
      console.log("Form submitted successfully!", formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <h2>Job Seeker Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="group">
            <label htmlFor="firstName" className="label">First Name</label>
            <input
              id="firstName"
              type="text"
              className="input"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
          </div>

          <div className="group">
            <label htmlFor="lastName" className="label">Last Name</label>
            <input
              id="lastName"
              type="text"
              className="input"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
          </div>

          <div className="group">
            <label htmlFor="userName" className="label">Username</label>
            <input
              id="userName"
              type="text"
              className="input"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
            />
            {formErrors.userName && <p className="error">{formErrors.userName}</p>}
          </div>

          <div className="group">
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <p className="error">{formErrors.email}</p>}
          </div>

          <div className="group">
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {formErrors.password && <p className="error">{formErrors.password}</p>}
          </div>

          <div className="group">
            <label htmlFor="repeatPassword" className="label">Repeat Password</label>
            <input
              id="repeatPassword"
              type="password"
              className="input"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleInputChange}
            />
            {formErrors.repeatPassword && <p className="error">{formErrors.repeatPassword}</p>}
          </div>

          <div className="group">
            <label htmlFor="phoneCode" className="label">Phone Number</label>
            <div style={{ display: "flex", gap: "10px"}}>
              <select
                id="phoneCode"
                name="phoneCode"
                className="input"
                value={formData.phoneCode}
                onChange={handleInputChange}
                style={{"width": "100px", 'background':'#465273'}}
              >
                <option value="">Code</option>
                <option value="+2">+2 EG</option>
                <option value="+966">+966 KSA</option>
                <option value="+82">+82 KR</option>
                <option value="+90">+90 TR</option>
                <option value="+971">+971 AE</option>
              </select>
              <input
                id="phoneNumber"
                className="input"
                name="phoneNumber"
                placeholder="please enter a phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            {formErrors.phoneNumber && <p className="error">{formErrors.phoneNumber}</p>}
          </div>

          <div className="group">
            <label htmlFor="city" className="label">City</label>
            <input
              id="city"
              type="text"
              className="input"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            {formErrors.city && <p className="error">{formErrors.city}</p>}
          </div>

          <div className="group">
            <label htmlFor="region" className="label">Region</label>
            <input
              id="region"
              type="text"
              className="input"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
            />
            {formErrors.region && <p className="error">{formErrors.region}</p>}
          </div>

          <div className="group">
            <label htmlFor="address" className="label">Address (Optional)</label>
            <input
              id="address"
              type="text"
              className="input"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="group">
            <label htmlFor="profileImage" className="label">Profile Image</label>
            <input
              id="profileImage"
              type="file"
              className="input"
              name="profileImage"
              onChange={handleImageChange}
              accept="image/jpeg, image/png, image/webp"
            />
            {formErrors.profileImage && <p className="error">{formErrors.profileImage}</p>}
          </div>

          <div className="group">
            <input type="submit" className="button" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerRegistrationForm;
