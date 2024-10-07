import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [industry, setIndustry] = useState('');
  const [skills, setSkills] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    // Fetch the projects from the backend
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/project/all/');
        setProjects(response.data);  // Set the projects into state
      } catch (error) {
        console.error('Error fetching project list:', error);
      }
    };

    fetchProjects();
  }, []);  // Run this effect on component mount

  // Function to handle filter application
  const handleApplyFilters = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/project/all/', {
        params: { industry, skills, budget },
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching filtered projects:', error);
    }
  };

  return (
    <Container className="mt-5">
      {/* Top Button to Add New Project */}
      <div className="d-flex w-25 mb-4">
        <Button variant="primary" onClick={() => window.location.href = '/projectpost'}>
          Upload New Project
        </Button>
      </div>

      <Row>
        {/* Filters Column */}
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Filters</Card.Title>
              
              {/* Industry Filter */}
              <Form.Group className="mb-3">
                <Form.Label>Industry</Form.Label>
                <Form.Control as="select" onChange={(e) => setIndustry(e.target.value)}>
                  <option value="">All Industries</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  {/* Add more industries as needed */}
                </Form.Control>
              </Form.Group>
              
              {/* Skills Filter */}
              <Form.Group className="mb-3">
                <Form.Label>Skills</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter skills (e.g., React.js, Node.js)"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </Form.Group>
              
              {/* Average Budget Filter */}
              <Form.Group className="mb-3">
                <Form.Label>Average Budget</Form.Label>
                <Form.Control as="select" onChange={(e) => setBudget(e.target.value)}>
                  <option value="">All Budgets</option>
                  <option value="Below $10/hour">Below $10/hour</option>
                  <option value="$10 - $20/hour">$10 - $20/hour</option>
                  <option value="Above $20/hour">Above $20/hour</option>
                </Form.Control>
              </Form.Group>
              
              <Button variant="primary" className="w-100" onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </Card.Body>
          </Card>
        </Col>

        
        {/* Projects Column */}
        <Col md={9}>
          <Row>
            {projects.length > 0 ? (
              projects.map((project) => (
                <Col md={12} key={project.id} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        <a href={`/projectdetails/${project.id}`} className="text-primary">
                          {project.title}
                        </a>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Budget: {project.budget}
                      </Card.Subtitle>
                      <Card.Text>
                        {project.description}{' '}
                        <Button
                          variant="link"
                          className="p-0 text-decoration-none"
                          href={`/projectdetails/${project.id}`}
                        >
                          Show more
                        </Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No projects available</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectList;
