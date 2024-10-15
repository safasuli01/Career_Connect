import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCalendarAlt, faMoneyBill, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();  // Project ID from URL
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isOwner, setIsOwner] = useState(false);  // Check if logged-in user is project owner

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/project/${id}/`);
        setProject(response.data);

        // Check if the current user is the project author
        const token = localStorage.getItem('authToken');
        const userResponse = await axios.get(`http://127.0.0.1:8000/api/profile/`, {
          headers: { 'Authorization': `Token ${token}` },
        });

        // Compare project author with the logged-in user
        if (response.data.author === userResponse.data.id) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.delete(`http://127.0.0.1:8000/api/project/${id}/delete/`, {
          headers: {
            'Authorization': `Token ${token}`,
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
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <h2>{project.title}</h2>

        {/* Project Main Details */}
        <Col md={8}>
          <div className="project-header mb-4">
            <p>
              Author: 
              {/* This link should point to the author’s profile based on their ID */}
              <Link to={`/author-profile/${project.author}`}>{project.author_username}</Link>
            </p>
            <h6 className="text-info">{project.industry}</h6>
          </div>

          <h5 className="mt-4">Project Details</h5>
          <p>{project.description}</p>

          <div className="d-flex align-items-center mb-3">
            <Button variant="success" className="me-2 w-25">
              Contact me
            </Button>
          </div>
        </Col>

        {/* Overview Section */}
        <Col md={4}>
          <Card className="p-3 shadow-sm overview-card mb-4">
            <h5>Overview</h5>
            <p>
              <FontAwesomeIcon icon={faCalendarAlt} /> Created on {project.datePosted}
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
          </Card>

          {/* Action Buttons (only show for the owner) */}
          {isOwner && (
            <div className="action-buttons mb-3">
              <Button
                variant="outline-primary"
                className="me-2 edit-btn"
                href={`/project/${id}/update/`}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
              <Button
                variant="outline-danger"
                className="delete-btn"
                onClick={handleDelete}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetails;
