import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUsers, faMapMarkerAlt, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const JobDetails = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate(); // Hook to navigate
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/job/${id}/`);
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
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/job/${id}/delete/`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Job deleted successfully');
          navigate('/jobs'); // Redirect to job list
        } else {
          alert('Failed to delete the job');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
      }
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
