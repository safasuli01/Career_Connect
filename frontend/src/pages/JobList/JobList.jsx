import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const jobsData = [
  {
    id: 1, // Unique identifier for each job
    title: 'Product Owner (Data Science)',
    location: 'Dublin, Krakow, London, Madrid',
    industry: 'Engineering & Data',
  },
  {
    id: 2,
    title: 'Service Delivery Manager',
    location: 'Singapore',
    industry: 'Operations',
  },
  {
    id: 3,
    title: 'New Business Account Executive - Italian',
    location: 'Dublin, Paris',
    industry: 'Sales',
  },
  // Add more job items here
];

function JobListComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Filter jobs based on search term, location, and team
  const filteredJobs = jobsData.filter((job) => {
    return (
      (selectedLocation === 'All Locations' || job.location.includes(selectedLocation)) &&
      (selectedTeam === 'All Teams' || job.industry === selectedTeam) &&
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleJobClick = (id) => {
    // Redirect to job details page
    navigate(`/jobdetails?id=${id}`); // Pass job id in the query params
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">WE HAVE 259 OPEN POSITIONS</h2>
      <p className="text-center">Join us in building the first truly global financial SuperApp</p>

      <Row className="mt-4">
          {/* Filters Section */}
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

        <Col md={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search from 259 open positions"
              aria-label="Job search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          {/* Job List */}
          <Row>
            {filteredJobs.map((job) => (
              <Col md={12} key={job.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <a 
                        href="#" 
                        className="text-primary" 
                        onClick={() => handleJobClick(job.id)} // Redirect on click
                      >
                        {job.title}
                      </a>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Location: {job.location}
                    </Card.Subtitle>
                    <Card.Text>
                      Industry: {job.industry}
                    </Card.Text>
                    <Button variant="link" className="p-0 text-decoration-none" onClick={() => handleJobClick(job.id)}>
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

export default JobListComponent;
