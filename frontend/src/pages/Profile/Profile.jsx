import React from "react";
import { FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css"; 
import image1 from "../../assets/content/7";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header bg-dark text-white py-4">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
          <img src={image1} alt=" profile" className="profile-image rounded-circle mr-4"
 />
            <div>
              <h1>Fares Farhan</h1>
              <p className="text-light">Design Director at Elevenia Digital</p>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-body bg-light py-5">
        <div className="container">
          <h2 className="mb-4">Overview</h2>
          <p className="text-muted">
            I have about 18+ years of experience in website and web-based
            application design and development. 12+ years of experience in
            mobile app UI and I/X design. Most of my past works are mainly UI
            Design, Interaction Design, although within...
          </p>
          <div className="social-icons mt-3">
            <FaLinkedin className="icon" />
            <FaTwitter className="icon" />
            <FaGlobe className="icon" />
          </div>
        </div>
      </div>

      <div className="profile-footer bg-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5>Profile Insights</h5>
              <div className="card p-3 shadow-sm mb-3 bg-info text-white">
                <h6>Perfect Presence</h6>
                <p>Mentor is prompt and highly responsive.</p>
              </div>
              <div className="card p-3 shadow-sm bg-success text-white">
                <h6>Top Achiever: Director</h6>
                <p>Mentor is amongst the top 10% of contributors in their field!</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <h5>Community Statistics</h5>
              <p>Total mentoring time: 1,350 mins</p>
              <p>Sessions completed: 34</p>
            </div>

            <div className="col-md-4">
              <p>Timezone: Asia/Bangkok</p>
              <div>
                <button className="btn btn-outline-primary mr-2">8:00 PM</button>
                <button className="btn btn-outline-primary">9:00 PM</button>
              </div>
              <button className="btn btn-primary mt-3">
                Book Session for 02 May 2023
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
