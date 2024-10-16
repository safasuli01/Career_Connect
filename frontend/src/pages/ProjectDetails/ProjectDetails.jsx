import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge, Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCalendarAlt, faMoneyBill, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import defaultProfile from '../../assets/user.jpg'; // Default profile image

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
        {/* Project Main Details */}
        <Col md={8}>
          <div className="project-header mb-2 d-flex align-items-center ">
            {/* Author Profile Image */}
            <Image 
              src={project.author_profile_image ? `http://127.0.0.1:8000${project.author_profile_image}` : defaultProfile} 
               
              style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '15px' ,border: '2px solid black'}}              
            
            />
            
          </div>

          <div className='' >
              <p > 
                <Link to={`/author-profile/${project.author}`} 
                style={{color:'#2c9caf' , textDecoration:'none' , fontSize:'25px' , fontWeight:'bolder' , }}>
                   {project.author_username}</Link>
              </p>
            </div>


          <h5 className="mt-4">Project Details</h5>
          <p className='text-muted'>{project.description}</p>

          <div className="d-flex align-items-center mb-3">
            <Button variant="primary" className="me-2 w-25">
              contact me
            </Button>

          </div>
        </Col>

        {/* Overview Section */}
        <Col md={4}>
          <Card className="p-3 shadow-sm ">
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

          <div className='d-flex p-2 '>
                  <button class="edit-button me-3"  onClick={() => navigate(`/project/${id}/update/`)}>
           <svg class="edit-svgIcon" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
            </svg>
          </button>

          <button class="delete-button"  onClick={handleDelete}>
            <svg class="delete-svgIcon" viewBox="0 0 448 512">
               <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
            </svg>
          </button>
        </div>

        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetails;
