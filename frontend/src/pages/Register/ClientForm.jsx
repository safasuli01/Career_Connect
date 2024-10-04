// import React, { useState } from 'react';
// import './ClientForm.css'; // Ensure you have updated CSS
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEnvelope, faLock, faPhone, faCalendarAlt, faFileAlt, faHome, faBriefcase, faImage } from '@fortawesome/free-solid-svg-icons';

// // const ClientForm = ({ activeForm, onSwitchForm }) => {
// //   const [formData, setFormData] = useState({
// //     fullName: '',
// //     gender: '',
// //     date_of_birth: '',
// //     phoneNumber: '',
// //     email: '',
// //     password: '',
// //     repeatPassword: '',
// //     cvFile: null,
// //     accountType: '',
// //     address: '',
// //     specialization: '',
// //     profileImage: null,
// //   });

// const ClientForm = ({ activeForm, onSwitchForm }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     first_name: '',
//     last_name: '',
//     gender: '',
//     date_of_birth: '',
//     phone_number: '',
//     account_type: '',
//     specialization: '',
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle file changes for CV and profile image
//   // const handleFileChange = (e) => {
//   //   setFormData({ ...formData, cvFile: e.target.files[0] });
//   // };

//   // const handleImageChange = (e) => {
//   //   setFormData({ ...formData, profileImage: e.target.files[0] });
//   // };

//   // Validate the form
//   const validateForm = () => {
//     const errors = {};

//     if (!formData.username) errors.username = "Username is required";
//     // if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//     //   errors.email = "Valid email is required";
//     // }
//     if (!formData.phone_number || !/^[0-9]+$/.test(formData.phone_number)) {
//       errors.phone_number = "Valid phone number is required";
//     }
//     // if (!formData.profileImage) errors.profileImage = "Profile image is required";
//     if (!formData.date_of_birth) errors.date_of_birth = "Date of Birth is required";
//     // if (!formData.cvFile) errors.cvFile = "CV is required (PDF only)";
//     // if (formData.cvFile && formData.cvFile.type !== 'application/pdf') {
//     //   errors.cvFile = "CV must be a PDF file";
//     // }
//     // if (!formData.password || !/^(?=.[A-Z])(?=.[!@#$%^&*])(?=.{8,})/.test(formData.password)) {
//     //   errors.password = "Password must be at least 8 characters, contain 1 capital letter, and 1 special character";
//     // }
//     // if (formData.password !== formData.repeatPassword) {
//     //   errors.repeatPassword = "Passwords do not match";
//     // }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const data = new FormData();
//       data.append('username', formData.username);
//       data.append('email', formData.email);
//       data.append('password', formData.password);
//       // data.append('profileImage', formData.profileImage);
//       // data.append('cvFile', formData.cvFile);
//       data.append('date_of_birth', formData.date_of_birth);
//       data.append('gender', formData.gender);
//       data.append('phone_number', formData.phone_number);
//       // data.append('address', formData.address);
//       data.append('specialization', formData.specialization);
//       data.append('account_type', formData.account_type);

//       // Posting the form data to the backend API
//       // fetch("http://127.0.0.1:8000/api/auth/register/individual/", {
//       //   method: "POST",
//       //   body: data,
//       // })
//       //   .then(response => response.json())
//       //   .then(data => {
//       //     if (data.id) {
//       //       setSuccessMessage("User registered successfully!");
//       //       setErrorMessage("");
//       //     } else {
//       //       setErrorMessage("Error: " + JSON.stringify(data));
//       //     }
//       //   })
//       //   .catch(error => {
//       //     setErrorMessage("Error: " + error.message);
//       //   });
//       fetch("http://127.0.0.1:8000/api/auth/register/individual/", {
//         method: "POST",
//         body: data,
//       })
//         .then(response => {
//           if (!response.ok) {
//             throw new Error("Network response was not ok " + response.statusText);
//           }
//           return response.json();
//         })
//         .then(data => {
//           if (data.id) {
//             setSuccessMessage("User registered successfully!");
//             setErrorMessage("");
//           } else {
//             setErrorMessage("Error: " + JSON.stringify(data));
//           }
//         })
//         .catch(error => {
//           setErrorMessage("Error: " + error.message);
//         });
//     }
//   };

//   return (
//     <div className="new-project-form">
//       <form className="form" onSubmit={handleSubmit}>
//         {successMessage && <p className="success-message">{successMessage}</p>}
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <div className="form-header">
//           <h2>Individuals Form</h2>
//         </div>

//         {/* Full Name */}
//         <div className="form-group">
//           <label>
//             <FontAwesomeIcon icon={faUser} /> Username
//           </label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleInputChange}
//             className="form-control"
//           />
//           {formErrors.username && <small className="error form-text">{formErrors.username}</small>}
//         </div>

//         {/* Gender */}
//         <div className="form-group">
//           <label>Gender</label>
//           <div className="form-check form-check-inline">
//             <input
//               type="radio"
//               name="gender"
//               value="male"
//               onChange={handleInputChange}
//               className="form-check-input"
//             />
//             <label className="form-check-label">Male</label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               type="radio"
//               name="gender"
//               value="female"
//               onChange={handleInputChange}
//               className="form-check-input"
//             />
//             <label className="form-check-label">Female</label>
//           </div>
//         </div>

//         {/* Date of Birth */}
//         <div className="form-group">
//           <label>
//             <FontAwesomeIcon icon={faCalendarAlt} /> Date of Birth
//           </label>
//           <input
//             type="date"
//             name="date_of_birth"
//             value={formData.date_of_birth}
//             onChange={handleInputChange}
//             className="form-control"
//           />
//           {formErrors.date_of_birth && <small className="error form-text">{formErrors.date_of_birth}</small>}
//         </div>

//         {/* Phone Number */}
//         <div className="form-group">
//           <label>
//             <FontAwesomeIcon icon={faPhone} /> Phone Number
//           </label>
//           <input
//             type="text"
//             name="phone_number"
//             value={formData.phone_number}
//             onChange={handleInputChange}
//             className="form-control"
//           />
//           {formErrors.phone_number && <small className="error form-text">{formErrors.phone_number}</small>}
//         </div>

//         {/* Email */}
//         {/* <div className="form-group">
//           <label>
//             <FontAwesomeIcon icon={faEnvelope} /> Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="form-control"
//           />
//           {formErrors.email && <small className="error form-text">{formErrors.email}</small>}
//         </div> */}

//         {/* Profile Image */}
//         {/* <div className="form-group">
//           <label>
//             <FontAwesomeIcon icon={faImage} /> Profile Image
//           </label>
//           <input
//             type="file"
//             name="profileImage"
//             onChange={handleImageChange}
//             className="form-control"
//             accept="image/jpeg, image/png, image/webp"
//           />
//           {formErrors.profileImage && <small className="error form-text">{formErrors.profileImage}</small>}
//         </div> */}

//         {/* Address */}
//         {/* <div className="form-group">
//           <label>
//             <FontAwesomeIcon icon={faHome} /> Address
//           </label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//             className="form-control"
//           />
//           {formErrors.address && <small className="error form-text">{formErrors.address}</small>}
//         </div> */}

//         {/* Specialization */}
//         <div className="form-group">
//           <label>
//             <FontAwesomeIcon icon={faBriefcase} /> Specialization
//           </label>
//           <input
//             type="text"
//             name="specialization"
//             value={formData.specialization}
//             onChange={handleInputChange}
//             className="form-control"
//           />
//           {formErrors.specialization && <small className="error form-text">{formErrors.specialization}</small>}
//         </div>

//         {/* Password */}
//         {/* <div className="form-group">
//           <label>
//             <FontAwesomeIcon icon={faLock} /> Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             className="form-control"
//           />
//           {formErrors.password && <small className="error form-text">{formErrors.password}</small>}
//         </div> */}

//         {/* Repeat Password */}
//         {/* <div className="form-group">
//           <label>
//             <FontAwesomeIcon icon={faLock} /> Repeat Password
//           </label>
//           <input
//             type="password"
//             name="repeatPassword"
//             value={formData.repeatPassword}
//             onChange={handleInputChange}
//             className="form-control"
//           />
//           {formErrors.repeatPassword && <small className="error form-text">{formErrors.repeatPassword}</small>}
//         </div> */}

//         {/* CV Upload */}
//         {/* <div className="form-group">
//           <label>
//             <FontAwesomeIcon icon={faFileAlt} /> CV Upload (PDF only)
//           </label>
//           <input
//             type="file"
//             name="cvFile"
//             onChange={handleFileChange}
//             className="form-control"
//             accept="application/pdf"
//           />
//           {formErrors.cvFile && <small className="error form-text">{formErrors.cvFile}</small>}
//         </div> */}

//         {/* Account Type */}
//         <div className="form-group">
//           <label>Account Type</label>
//           <div className="form-check form-check-inline">
//             <input
//               type="radio"
//               name="account_type"
//               value="hiring"
//               onChange={handleInputChange}
//               className="form-check-input"
//             />
//             <label className="form-check-label">Client</label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               type="radio"
//               name="account_type"
//               value="seeking"
//               onChange={handleInputChange}
//               className="form-check-input"
//             />
//             <label className="form-check-label">Job Seeker</label>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="btn btn-primary">Register</button>

//         {/* Link to Switch Form */}
//         <p className="switch-form">
//           Already have an account? <a href="#" onClick={onSwitchForm}>Login</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default ClientForm;

import React, { useState } from "react";
import "./ClientForm"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faCalendarAlt, faFileAlt, faHome, faBriefcase, faImage } from '@fortawesome/free-solid-svg-icons';

const ClientForm =() => {

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username:"",
    date_of_birth: "",
    password: "",
    confirmPassword:"",
    gender: "",
    email: "",
    phone_number:"",
    specialization: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password is not matching!");
      return;
    }

    const payload = {
      user: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: 'individual'
      },
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      phone_number: formData.phone_number,
      specialization: formData.specialization,
    };

    console.log("Payload: ", payload);

    fetch("http://127.0.0.1:8000/api/auth/register/individual/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      // .then((response) => response.json())
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
      })
      .catch((error) => {
        // setErrorMessage("Error: " + error.message);
        setErrorMessage(error.message || "An error occurred during registration.");
      });
  };

  return (
    <div className="new-project-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Individuals Form</h2>
        </div>

        {/* First Name  */}
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faUser} /> First Name
          </label>
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
          <label>
            <FontAwesomeIcon icon={faUser} /> Last Name
          </label>
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
          <label>
            <FontAwesomeIcon icon={faUser} /> User Name
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faCalendarAlt} /> Date of Birth
          </label>
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
          <label>
            <FontAwesomeIcon icon={faLock} /> Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faLock} /> Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>
          <div className="form-check form-check-inline">
            <label className="form-check-label">Male</label>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
              className="form-check-input"
            />
          </div>

          <div className="form-check form-check-inline">
            <label className="form-check-label">Female</label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
              className="form-check-input"
            />            
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faPhone} /> Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Specialization */}
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faBriefcase} /> Specialization
          </label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="form-control"
          />
  
        </div>

        {/* Account Type */}
        {/* <div className="form-group">
          <label>Account Type</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="accountType"
              value="hiring"
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Hiring</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="accountType"
              value="seeking"
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Seeking</label>
          </div>
        </div> */}

        {/* Submit Button */}
        <button type="submit" value="register" className="btn btn-primary">Register</button>

        {/* Link to Switch Form */}
        {/* <p className="switch-form">
          Already have an account? <a href="#" onClick={onSwitchForm}>Login</a>
        </p> */}

        <label className="switch-form">Already have an account ?</label>{" "}
            <Link to="/login">
              Log in
            </Link>

      </form>
    </div>
  );

};

export default ClientForm;