import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUsers, faMapMarkerAlt, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const token = Cookies.get('authToken') || localStorage.getItem('authToken');

      if (!token) {
        alert('Unauthorized access. Please log in again.');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/job/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        setError('Failed to load job details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job? This action cannot be undone.");
    if (!confirmDelete) return;

    const token = Cookies.get('authToken') || localStorage.getItem('authToken');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/job/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        alert('Job deleted successfully');
        navigate('/jobs');
      } else {
        alert('Error deleting the job');
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

          {/* Link to the company profile */}
          <p>
            Posted by: 
            <Link to={`/company/${jobDetails.author}/profile`}>
              {jobDetails.author_username}
            </Link>
          </p>
        </Col>

        <Col md={4}>
          <div className="card p-3">
            <h5>Overview</h5>
            <p><FontAwesomeIcon icon={faCalendarAlt} /> Posted {jobDetails.posted_days_ago} days ago</p>
            <p><FontAwesomeIcon icon={faUsers} /> {jobDetails.company_size} Employees</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {jobDetails.location}</p>
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
