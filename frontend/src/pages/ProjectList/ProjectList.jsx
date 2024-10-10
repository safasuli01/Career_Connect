import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProjectListComponent() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [industries, setIndustries] = useState([]); // State to store unique industries
  const navigate = useNavigate();

  // Fetch project list from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/project/all/');
        setProjects(response.data);

        // Extract unique industries from the project data
        const uniqueIndustries = [...new Set(response.data.map(project => project.industry))];
        setIndustries(uniqueIndustries);

      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // Filter projects based on search term, industry, and status
  const filteredProjects = projects.filter((project) => {
    return (
      (selectedIndustry === 'All Industries' || project.industry === selectedIndustry) &&
      (selectedStatus === 'All Status' || project.post_status === selectedStatus) &&
      (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.industry.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleProjectClick = (id) => {
    navigate(`/projectdetails/${id}`);
  };

  const handleCreateNewProject = () => {
    navigate('/projectpost');
  };

  return (
    <Container className="mt-5">
      {/* New Project Button */}
      <div className='text-center'>
        <h2 className="text-center">WE HAVE {projects.length} PROJECTS AVAILABLE</h2>
        <p className="text-center">Join us in bringing innovative projects to life!</p>
      </div>

      <Row className="mb-3 w-25">
        <Col className="text-end ">
          <Button variant="primary" onClick={handleCreateNewProject}>
            + New Project
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Filters Section */}
        <Col md={3}>
          <Card className="mb-4 p-3">
            <h5>Filter Projects</h5>

            <Form.Group controlId="industry" className="mb-3">
              <Form.Label>Industry</Form.Label>
              <Form.Select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                <option value="All Industries">All Industries</option>
                {industries.map((industry, index) => (
                  <option key={index} value={industry}>
                    {industry}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All Status">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="disabled">Disabled</option>
              </Form.Select>
            </Form.Group>
          </Card>
        </Col>

        {/* Project Listings Section */}
        <Col md={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search projects"
              aria-label="Project search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          {/* Project List */}
          <Row>
            {filteredProjects.map((project) => (
              <Col md={12} key={project.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <a
                        href="#"
                        className="text-primary"
                        onClick={() => handleProjectClick(project.id)}
                      >
                        {project.title}
                      </a>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Industry: {project.industry} | Author: {project.author}
                    </Card.Subtitle>
                    <Card.Text>
                      Status: {project.post_status}
                    </Card.Text>
                    <Button variant="link" className="p-0 text-decoration-none" onClick={() => handleProjectClick(project.id)}>
                      Show more
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectListComponent;
