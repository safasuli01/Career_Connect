// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap'; // Rename Bootstrap's Navbar to avoid conflict
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';

function AppNavbar() {
    return (
      <BootstrapNavbar className="navbar navbar-expand-lg navbar-light bg-light">
        <Container>
          <Link className="navbar-brand" to="/">
          Carrer Connect
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Item className="nav-item">
                <Link className="nav-link" to="/">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Link className="nav-link" to="/profile">
                  <FontAwesomeIcon icon={faUser} /> Profile
                </Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Link className="nav-link" to="/jobs">
                   Jobs
                </Link>
              </Nav.Item>
            </Nav>
          </div>
        </Container>
      </BootstrapNavbar>
    );
}

export default AppNavbar;
