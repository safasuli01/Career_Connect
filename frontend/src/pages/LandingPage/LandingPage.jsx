// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"; 
import image1 from '../../assets/culture/1.avif'; 
import image2 from  '../../assets/culture/2.avif';
import image3 from  '../../assets/culture/3.avif';



const LandingPage = () => {
  return (
    <div >      
        <section className="hero bg-primary d-flex align-items-center justify-content-center text-center">
          <div className="container">
            <h1 className="display-4" style={{ color: '#324b50' }}>Welcome to Career Connect</h1>
            <p className="lead" style={{ color: '#324b50' }}>Your gateway to amazing opportunities.</p>
            
            <button className="button">Get Started</button>
          </div>
        </section>


      {/* Dropdown and Search Section */}
      <section className="filter-section py-4">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Search Bar */}
          <div class="InputContainer">
            <input placeholder="Search.." id="input" class="input" name="text" type="text"/>
  
          </div>


          {/* Departments Dropdown */}


          <div className="dropdown me-2">
          <a class="btn dropdown-toggle"href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Departments</a>              

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><Link className="dropdown-item" to="/department/customer-support">Customer Support</Link></li>
              <li><Link className="dropdown-item" to="/department/ga">G&A</Link></li>
              <li><Link className="dropdown-item" to="/department/gtm">GTM</Link></li>
              <li><Link className="dropdown-item" to="/department/marketing">Marketing</Link></li>
              <li><Link className="dropdown-item" to="/department/product">Product</Link></li>
              <li><Link className="dropdown-item" to="/department/rd">R&D</Link></li>
              <li><Link className="dropdown-item" to="/department/revenue-ops">Revenue Ops</Link></li>
            </ul>
          </div>

          {/* Offices Dropdown */}
          <div className="dropdown">
            <button className="btn  dropdown-toggle" type="button" id="officesDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Offices
            </button>
            <ul className="dropdown-menu" aria-labelledby="officesDropdown">
              <li><Link className="dropdown-item" to="/offices/prague">Prague</Link></li>
              <li><Link className="dropdown-item" to="/offices/remote">Remote</Link></li>
              <li><Link className="dropdown-item" to="/offices/melbourne">Melbourne</Link></li>
              <li><Link className="dropdown-item" to="/offices/bangalore">Bangalore</Link></li>
              <li><Link className="dropdown-item" to="/offices/nicosia">Nicosia</Link></li>
              <li><Link className="dropdown-item" to="/offices/tokyo">Tokyo</Link></li>
            </ul>
          </div>
        </div>

      </section>




      <section className="card-section py-5">
      <div className="container">
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card  cards bg-light mb-4">
              <div className="card-body">
                <h6 className="card-title text-secondary">GTM</h6>
                <h5 className="card-title">Account Development Manager</h5>
                <p className="card-text text-muted">Prague</p>
                <a href="/apply" className="btn btn-outline-info">Apply &gt;</a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card cards bg-light mb-4">
              <div className="card-body">
                <h6 className="card-title text-secondary">GTM</h6>
                <h5 className="card-title">Account Development Manager</h5>
                <p className="card-text text-muted">Prague</p>
                <a href="/apply" className="btn btn-outline-info">Apply &gt;</a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card cards bg-light mb-4">
              <div className="card-body">
                <h6 className="card-title text-secondary">GTM</h6>
                <h5 className="card-title">Account Development Manager</h5>
                <p className="card-text text-muted">Prague</p>
                <a href="/apply" className="btn btn-outline-info">Apply &gt;</a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card cards bg-light mb-4">
              <div className="card-body">
                <h6 className="card-title text-secondary">GTM</h6>
                <h5 className="card-title">Account Development Manager</h5>
                <p className="card-text text-muted">Prague</p>
                <a href="/apply" className="btn btn-outline-info">Apply &gt;</a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card cards bg-light mb-4">
              <div className="card-body">
                <h6 className="card-title text-secondary">GTM</h6>
                <h5 className="card-title">Account Development Manager</h5>
                <p className="card-text text-muted">Prague</p>
                <a href="/apply" className="btn btn-outline-info">Apply &gt;</a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card cards bg-light mb-4">
              <div className="card-body">
                <h6 className="card-title text-secondary">GTM</h6>
                <h5 className="card-title">Account Development Manager</h5>
                <p className="card-text text-muted">Prague</p>
                <a href="/apply" className="btn btn-outline-info">Apply &gt;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

{/* features section */}
    <section className="features-section pt-5 mt-5 py-5">
      <div className="container text-center">
        <h2 className="mb-5">Explore the values that drive us to do our best work</h2>
        <div className="row">
          {/* Feature 1: Customer-focused */}
          <div className="col-md-3">
            <div className="feature-item">
            <i class="fa-solid fa-heart-circle-check text-dark display-4 mb-3"></i>
              <h5>Customer-focused</h5>
              <p className="text-secondary">We care about our customers</p>
            </div>
          </div>

          {/* Feature 2: Collaborative */}
          <div className="col-md-3">
            <div className="feature-item">
            <i class="fa-solid fa-users-between-lines text-dark display-4 mb-3"></i>
              <h5>Collaborative</h5>
              <p className="text-secondary">We work as one and win together</p>
            </div>
          </div>

          {/* Feature 3: Creative */}
          <div className="col-md-3">
            <div className="feature-item">
            <i class="fa-solid fa-lightbulb text-dark display-4 mb-3"></i>
              <h5>Creative</h5>
              <p className="text-secondary">We strive to succeed through continuous innovation</p>
            </div>
          </div>

          {/* Feature 4: Committed */}
          <div className="col-md-3">
            <div className="feature-item">
            <i class="fa-solid fa-ranking-star text-dark display-4 mb-3"></i>
              <h5>Committed</h5>
              <p className="text-secondary">We believe in ownership at all levels of the organization</p>
            </div>
          </div>
        </div>
      </div>
    </section>



    <section className="culture-section  text-center p-5 " style={{ backgroundColor: '#F2F6FA' }}>
      <h2 className="text-center mb-5 mx-5">Everyone is welcome </h2>
      
      {/* Row 1: Text left, Image right */}
      <div className="row align-items-center  mb-5">
        <div className="col-md-6">
          <h3>Diversity and Inclusion</h3>
          <p className="text-secondary"> 
            we believe that celebrating our differences makes us stronger. 
            <br></br>We are always ready to listen,
            learn, and grow together.<br></br> We embrace diversity and hold a variety of events that celebrate the identities
            and cultures of our staff.
          </p>
        </div>
        <div className="col-md-6">
        <img src={image3} alt="Diversity and Inclusion" className="img-fluid" />        </div>
      </div>

      {/* Row 2: Image left, Text right */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 order-md-2 ">
          <h3> Engineering</h3>
          <p className="text-secondary"> 
            Behind the scenes, we have more than 200 engineers developing the  product.<br></br> They are always making sure
            every line of code we write<br></br> continues to provide superior collaborative solutions.
          </p>
        </div>
        <div className="col-md-6 order-md-1">
        <img src={image1} alt=" Engineering" className="img-fluid" />        </div>
      </div>

      {/* Row 3: Text left, Image right */}
      <div className="row align-items-center">
        <div className="col-md-6">
          <h3> TechClub</h3>
          <p className="text-secondary"> 
            Hungry for knowledge? You’ll fit right in! The  TechClub initiative <br></br>gives ans a chance to connect,
            share what they know, <br></br>learn from their peers, and inspire one another.
          </p>
        </div>
        <div className="col-md-6">
        <img src={image2} alt=" TechClub" className="img-fluid" />        </div>
      </div>
    </section>















      {/* Footer */}
      <footer className="bg-light text-center py-4">
        <div className="container">
          <p className="mb-0">© 2024 MyApp. All rights reserved.</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <Link to="/privacy" className="text-muted">Privacy Policy</Link>
            </li>
            <li className="list-inline-item">
              <Link to="/terms" className="text-muted">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};




export default LandingPage;
