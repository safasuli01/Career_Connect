import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const projects = [
  {
    title: 'Fitness Coaching Application',
    description:
      'We are seeking a skilled developer to assist in the development of a fitness coaching application...',
    skills: 'JavaScript, PostgreSQL, React.js, React Native',
    bids: 113,
    budget: '$8 - 15 AUD per hour',
    avgBid: '$14 AUD per hour',
    datePosted: '2 days ago',
    location: 'Remote',
  },
  // Add more projects here
];

const ProjectList = () => {
  const handleNewProject = () => {
    window.location.href = '/projectpost'; // Redirect to project post page
  };

  return (
    <Container className="mt-5">
      {/* Top Button to Add New Project */}
      <div className="d-flex w-25 mb-4">
        <Button variant="primary" onClick={handleNewProject}>
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
                <Form.Control as="select">
                  <option>All Industries</option>
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Finance</option>
                  {/* Add more industries as needed */}
                </Form.Control>
              </Form.Group>
              
              {/* Skills Filter */}
              <Form.Group className="mb-3">
                <Form.Label>Skills</Form.Label>
                <Form.Control type="text" placeholder="Enter skills (e.g., React.js, Node.js)" />
              </Form.Group>
              
              {/* Average Budget Filter */}
              <Form.Group className="mb-3">
                <Form.Label>Average Budget</Form.Label>
                <Form.Control as="select">
                  <option>All Budgets</option>
                  <option>Below $10/hour</option>
                  <option>$10 - $20/hour</option>
                  <option>Above $20/hour</option>
                </Form.Control>
              </Form.Group>
              
              <Button variant="primary" className="w-100">
                Apply Filters
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Projects Column */}
        <Col md={9}>
          <Row>
            {projects.map((project, index) => (
              <Col md={12} key={index} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <a href={`/projectdetails/${index}`} className="text-primary">
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
                        href={`/projectdetails/${index}`}
                      >
                        Show more
                      </Button>
                    </Card.Text>
                    <div className="d-flex justify-content-between mt-3">
                      <div>
                        <small>Skills: {project.skills}</small>
                        <br />
                        <small>{project.datePosted}</small>
                      </div>
                      <div>
                        <small>Location: {project.location}</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectList;
