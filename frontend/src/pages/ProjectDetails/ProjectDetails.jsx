import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faMoneyBill, faClock, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/project/${id}/`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('authToken');  // Fetch token from localStorage
        await axios.delete(`http://127.0.0.1:8000/api/project/${id}/delete/`, {
          headers: {
            'Authorization': `Token ${token}`,  // Include token in headers
          },
        });
        alert('Project deleted successfully');
        navigate('/projects');  // Redirect to project list
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  if (!project) {
    return <p>Loading...</p>;  // Show loading state while fetching
  }

  return (
    <Container className="mt-5">
      <Row>
        {/* Project Main Details */}
        <Col md={8}>
          <h5>{project.title}</h5>
          <span>{project.industry}</span>
          <div className="mb-3">
            <Button variant="warning" className="me-2" href={`/project/${id}/update/`}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </div>
          <h5>Project Details</h5>

          {/* Description Section */}
          <p>{project.description}</p>

          {/* Author and Post Status */}
          <p><strong>Author:</strong> {project.author_username}</p>
          <p><strong>Status:</strong> {project.post_status}</p>

          <div className="d-flex align-items-center mb-3">
            <Button variant="primary" className="me-2 w-25">
              Contact me
            </Button>
          </div>
        </Col>

        {/* Overview Section */}
        <Col md={4}>
          <div className="card p-3">
            <h5>Overview</h5>
            <p>
              <FontAwesomeIcon icon={faCalendarAlt} /> Created {project.datePosted}
            </p>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {project.location}
            </p>
            <p>
              <FontAwesomeIcon icon={faMoneyBill} /> Budget: {project.budget}
            </p>
            <p>
              <FontAwesomeIcon icon={faClock} /> Deadline: {project.deadline}
            </p>
            <div className="mt-3">
              <Badge bg={project.post_status === 'active' ? 'success' : 'secondary'}>
                {project.post_status.charAt(0).toUpperCase() + project.post_status.slice(1)}
              </Badge>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetails;
