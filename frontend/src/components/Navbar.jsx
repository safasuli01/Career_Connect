import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar as BootstrapNavbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { faHome, faBriefcase, faProjectDiagram, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext'; // Import the Auth context
import axios from 'axios';
import "./style.css";
import Logo from '../../src/assets/logo3.jpg';

function AppNavbar() {
  const { isAuthenticated, logout, setIsAuthenticated } = useAuth(); // Use context for auth state
  const navigate = useNavigate();

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Update auth state based on token presence
  }, [setIsAuthenticated]);

  // Handle user logout
  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        await axios.post('http://127.0.0.1:8000/api/auth/logout/', {}, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        // Clear the token and update UI state
        localStorage.removeItem('authToken');
        logout(); // Update auth state
        navigate('/login'); // Redirect to login page
      } catch (error) {
        console.error('Error during logout:', error);
        alert('Logout failed. Please try again.');
      }
    }
  };

  return (
    <BootstrapNavbar className="navbar navbar-expand-lg" style={{ padding: '0' }}>
      <Container>
        <Link className="navbar-brand d-flex align-items-center me-auto" to="/" style={{ fontWeight: 'bold', color: '#2c9caf' }}>
          <img
            src={Logo}
            width="50"
            height="35"
            className="d-inline-block align-top me-2"
            alt="Career Connect Logo"
          />
          Career Connect
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

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <Nav className="mx-auto">
            <Nav.Item className="nav-item">
              <Link className="nav-link underlineHover" to="/" style={{ color: '#2c9caf', fontSize: '16px' }}>
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

          <Nav className="ms-auto">
            {isAuthenticated ? (
              <Dropdown >
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-profile"
                  style={{ textDecoration: 'none', color: '#2c9caf' }}
                >
                  <FontAwesomeIcon icon={faUser} size="sm" /> {/* Profile Icon */}
                </Dropdown.Toggle>

                <Dropdown.Menu align="center"
                >
                  <Dropdown.Item as={Link} to="/profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  
                  <Dropdown.Item onClick={handleLogout}>
                    
                    Logout
                    <i class="fa-solid fa-arrow-right-from-bracket ps-1"></i>
                  </Dropdown.Item>
                  
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none', color: '#2c9caf' }}>
                Login
              </Link>
            )}
          </Nav>
        </div>
      </Container>
    </BootstrapNavbar>
  );
}

export default AppNavbar;
