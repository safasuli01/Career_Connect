import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import img1 from "../../assets/images/1.jpg";


function Profile() {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Sidebar - Profile Info */}
        <div className="col-lg-4 ">
          <div className="card profile-sidebar shadow-sm mb-4">
            <div className="card-body text-center">
              <img
                src={img1} // Replace with profile image URL
                alt="Profile"
                className="profile-image rounded-circle mb-3"
              />
              <h4 className="mb-0">Ananya Grover</h4>
              <p className="text-muted">UI/UX Designer</p>
              <p className="text-muted">
                Full stack product designer with hands-on experience in solving problems for clients ranging from Real Estate, Hospitality, and more.
              </p>
              <div className="skills mb-3">
                <span className="badge bg-primary">UI Design</span>
                <span className="badge bg-primary">UX</span>
                <span className="badge bg-primary">Adobe XD</span>
                <span className="badge bg-primary">Mobile Apps</span>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Add notes for future reference"
                ></textarea>
                <button className="btn btn-primary mt-3">Add Note</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Basic Information */}
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6>Basic Information</h6>
             
              </div>
              <div className="row strong">
                <div className="col-md-4">
                  <strong>Age: <br></br></strong> 28 years
                </div>
                <div className="col-md-4">
                  <strong>Location: <br></br></strong> Ahmedabad, Gujarat
                </div>
                <div className="col-md-4">
                  <strong>Phone: <br></br></strong> +91 98123 55679
                </div>
                <div className="col-md-4">
                  <strong>Experience: <br></br></strong> 6 years
                </div>
                
                <div className="col-md-5">
                  <strong>Email: <br></br></strong> ananyasharma@gmail.com
                </div>
              </div>

                 <div>
                  <button className="btn btn-outline-primary mt-2">
                    <FontAwesomeIcon icon={faDownload} /> Download Resume
                  </button>
               
                </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="font-weight-bold">Experience</h5>
              <div className="experience-item d-flex align-items-center mb-3">
                <div className="experience-icon bg-primary text-white rounded-circle me-3">
                </div>
                <div>
                  <h6 className="mb-0">Pixel Studio</h6>
                  <small>UI/UX Designer | Oct 2016 - July 2016 | Bengaluru, India</small>
                </div>
              </div>       
                       <hr></hr>

              <div className="experience-item d-flex align-items-center mb-3">
                <div className="experience-icon bg-warning text-white rounded-circle me-3">
                </div>
                <div>
                  <h6 className="mb-0">Ramotion Studio</h6>
                  <small>Web Designer | April 2015 - July 2016 | Bengaluru, India</small>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion for Education, Accomplishments, and Certifications */}
          <div className="accordion mt-4" id="profileAccordion">
            {/* Education Accordion */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Education
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#profileAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>Bachelor of Design, National Institute of Design, 2014 - 2018</li>
                    <li>Diploma in UI/UX, ABC Institute, 2013 - 2014</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Accomplishments Accordion */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Accomplishments
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#profileAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>Winner of the XYZ Design Award 2022</li>
                    <li>Published article on UX design in a renowned journal</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Certifications Accordion */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Certifications
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#profileAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>Certified UX Designer - UX Design Institute</li>
                    <li>Adobe Certified Expert (ACE) in Photoshop</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
