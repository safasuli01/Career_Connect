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
          <div className="card cards profile-sidebar shadow-sm mb-4">
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
                <span className="badge bg-secondary p-2 rounded-5 m-1">UI Design</span>
                <span className="badge bg-secondary p-2 rounded-5 m-1">UX</span>
                <span className="badge bg-secondary p-2 rounded-5 m-1">Adobe XD</span>
                <span className="badge bg-secondary p-2 rounded-5 m-1">Mobile Apps</span>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Add notes for future reference"
                ></textarea>
                <button className="btn btn-primary mt-3" style={{backgroundColor:'#2c9caf', border:'1px solid #2c9caf'}} >Add Note</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Basic Information */}
        <div className="col-lg-8">
          <div className="card cards shadow-sm mb-4">
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
                  <button className="btn buttonn mt-2">
                    <FontAwesomeIcon icon={faDownload} /> Download Resume
                  </button>
               
                </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="card cards shadow-sm mb-4">
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


          <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Accordion Item #1
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header " id="headingTwo">
        <button class="accordion-button  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Accordion Item #2
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Accordion Item #3
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
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
