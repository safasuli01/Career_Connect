import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUsers, faMapMarkerAlt, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'; // Use js-cookie to retrieve cookies

const JobDetails = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate(); // Hook to navigate
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const token = localStorage.getItem('authToken') || Cookies.get('authToken'); // Retrieve token from localStorage or cookies
      console.log('Token:', token); // Check if the token is correctly retrieved

      if (!token) {
        alert('Unauthorized access. Please log in again.');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/job/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Add token to headers
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  const handleDelete = async () => {
    // Add a confirmation dialog before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this job? This action cannot be undone.");

    if (!confirmDelete) {
      return; // Exit if the user cancels the deletion
    }

    const token = localStorage.getItem('authToken'); // Ensure the token is stored in localStorage

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/job/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, // Make sure it's `Token` followed by the actual token
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized: Please log in.');
        } else if (response.status === 403) {
          alert('Forbidden: You do not have permission to delete this job.');
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        alert('Job deleted successfully');
        // Optionally navigate to a different page after deletion
        navigate('/jobs'); // Assuming you have a list of jobs here
      }
    } catch (error) {
      console.error('Error deleting the job:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <h5>{jobDetails.title}</h5>
          <span className='text-muted'>{jobDetails.industry}</span>

          <div className="d-flex align-items-center mb-3">
            <Button variant="primary" className="me-2 w-25">
              Apply
            </Button>
            <Button variant="warning" className="me-2" onClick={() => navigate(`/job/${id}/update/`)}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </div>

          <h5>ABOUT THE JOB</h5>
          <p>{jobDetails.description}</p>
          <p>Posted by: {jobDetails.author_username}</p> {/* Display Author's Username */}
        </Col>

        <Col md={4}>
          <div className="card p-3">
            <h5>Overview</h5>
            <p>
              <FontAwesomeIcon icon={faCalendarAlt} /> Posted {jobDetails.posted_days_ago} days ago
            </p>
            <p>
              <FontAwesomeIcon icon={faUsers} /> {jobDetails.company_size} Employees
            </p>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {jobDetails.location}
            </p>
            <div className="mt-3">
              <Badge bg="success">Apply</Badge>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default JobDetails;
