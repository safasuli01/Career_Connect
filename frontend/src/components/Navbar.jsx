// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap'; // Bootstrap components
import { faHome, faUser, faBriefcase, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'; // Icons
import "./style.css";
import Logo from '../../src/assets/logo3.jpg';

function AppNavbar() {
    return (
      <BootstrapNavbar className="navbar navbar-expand-lg" style={{ padding: ' 0' }}> {/* Reduce padding */}
        <Container>
          {/* Left Section: Logo */}
          <Link className="navbar-brand d-flex align-items-center me-auto" to="/" style={{ fontWeight: 'bold', color: '#2c9caf' }}>
            <img
              src={Logo}
              width="50"  // Reduce logo size
              height="35" // Reduce logo size
              className="d-inline-block align-top me-2"
              alt="Career Connect Logo"
            />
            Career Connect
          </Link>
          {/* Toggler for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Right Section: Links and Login */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <Nav className="mx-auto">
              <Nav.Item className="nav-item">
                <Link className="nav-link underlineHover" to="/" style={{ color: '#2c9caf', fontSize: '16px' }}> {/* Adjust font size */}
                  <FontAwesomeIcon icon={faHome} className="me-1" /> Home
                </Link>
              </Nav.Item>

              <Nav.Item className="nav-item">
                <Link className="nav-link underlineHover" to="/jobs" style={{ color: '#2c9caf', fontSize: '16px' }}>
                  <FontAwesomeIcon icon={faBriefcase} className="me-1" /> Find Jobs
                </Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Link className="nav-link underlineHover" to="/projects" style={{ color: '#2c9caf', fontSize: '16px' }}>
                  <FontAwesomeIcon icon={faProjectDiagram} className="me-1" /> Projects
                </Link>
              </Nav.Item>
            </Nav>

            {/* Login Button */}
            <Nav className="ms-auto ">
              <Link to="/login" style={{ textDecoration: 'none', color: '#2c9caf', marginRight:'10px' }}>
                Login
              </Link>

                
              <Link  to="/profile" style={{ textDecoration: 'none', color: '#2c9caf'  }}>
              profile
              </Link>

            </Nav>
          </div>
        </Container>
      </BootstrapNavbar>
    );
}

export default AppNavbar;
