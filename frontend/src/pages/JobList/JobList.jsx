import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Dropdown } from 'react-bootstrap';

const jobsData = [
  {
    title: 'Product Owner (Data Science)',
    location: 'Dublin, Krakow, London, Madrid',
    industry: 'Engineering & Data',
  },
  {
    title: 'Service Delivery Manager',
    location: 'Singapore',
    industry: 'Operations',
  },
  {
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

  // Filter jobs based on search term, location, and team
  const filteredJobs = jobsData.filter((job) => {
    return (
      (selectedLocation === 'All Locations' || job.location.includes(selectedLocation)) &&
      (selectedTeam === 'All Teams' || job.industry === selectedTeam) &&
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <Container className="mt-5">
      <h2 className="text-center">WE HAVE 259 OPEN POSITIONS</h2>
      <p className="text-center">Join us in building the first truly global financial SuperApp</p>
      
      <Row className="mt-4">
        <Col md={3}>
          {/* Location Dropdown */}
          <Form.Group controlId="locationSelect">
            <Form.Label>Location</Form.Label>
            <Form.Control as="select" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option>All Locations</option>
              <option>Dublin</option>
              <option>Krakow</option>
              <option>London</option>
              <option>Singapore</option>
              {/* Add more locations here */}
            </Form.Control>
          </Form.Group>

          {/* Filter by Teams */}
          <Form.Group controlId="teamSelect" className="mt-3">
            <Form.Label>Filter by Teams</Form.Label>
            <Form.Control as="select" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
              <option>All Teams</option>
              <option>Engineering & Data</option>
              <option>Operations</option>
              <option>Sales</option>
              {/* Add more teams here */}
            </Form.Control>
          </Form.Group>
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
          <div>
            {filteredJobs.map((job, index) => (
              <div key={index} className="job-item p-3 mb-3 border rounded">
                <h5>{job.title}</h5>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Industry:</strong> {job.industry}
                </p>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default JobListComponent;
