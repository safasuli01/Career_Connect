// import React from "react";
// import { Link } from "react-router-dom";
// import "./Register.css"; 

// const Register = () => {
//   return (
//     <div className="login-wrap">
//       <div className="login-html">
//         <div className="login-form">
//           <div className="sign-up-htm">
//             <div className="group">
//               <label htmlFor="user" className="label">
//                 Username
//               </label>
//               <input id="user" type="text" className="input" />
//             </div>
//             <div className="group">
//               <label htmlFor="pass" className="label">
//                 Password
//               </label>
//               <input id="pass" type="password" className="input" />
//             </div>
//             <div className="group">
//               <label htmlFor="pass-repeat" className="label">
//                 Repeat Password
//               </label>
//               <input id="pass-repeat" type="password" className="input" />
//             </div>
//             <div className="group">
//               <label htmlFor="email" className="label">
//                 Email Address
//               </label>
//               <input id="email" type="text" className="input" />
//             </div>
//             <div className="group">
//               <input type="submit" className="button" value="Sign Up" />
//             </div>
//             <div className="hr"></div>
//             <div className="foot-lnk">
//               <Link to="/login">Already a member? Log In</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React from "react";
import { useNavigate } from "react-router-dom"; // Update here
import "./Register.css"; // Import SignUp-specific CSS

const Register = () => {
  const navigate = useNavigate(); 

  const handleFreelancerClick = () => {
    navigate("/register/freelancer"); 
  };

  const handleCompanyClick = () => {
    navigate("/register/company");
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <h2>Select Registration Type</h2>
        <div className="login-form">
          <div className="group">
            <button onClick={handleFreelancerClick} className="button">
              Register as Freelancer
            </button>
          </div>
          <div className="group">
            <button onClick={handleCompanyClick} className="button">
              Register as Company
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
