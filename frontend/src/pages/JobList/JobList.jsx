import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function JobListComponent() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [selectedJobType, setSelectedJobType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [industries, setIndustries] = useState([]); // State to store unique industries
  const navigate = useNavigate();

  // Fetch job list from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/job/all/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);

        // Extract unique industries from the job data
        const uniqueIndustries = [...new Set(data.map(job => job.industry))];
        setIndustries(uniqueIndustries);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  // Filter jobs based on search term, location, team, job type, and status
  const filteredJobs = jobs.filter((job) => {
    return (
      (selectedLocation === 'All Locations' || job.location.includes(selectedLocation)) &&
      (selectedTeam === 'All Teams' || job.industry === selectedTeam) &&
      (selectedJobType === 'All Types' || job.job_type === selectedJobType) &&
      (selectedStatus === 'All Status' || job.post_status === selectedStatus) &&
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleJobClick = (id) => {
    navigate(`/jobdetails/${id}`); 
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">WE HAVE {jobs.length} OPEN POSITIONS</h2>
      <p className="text-center">Join us in building the first truly global financial SuperApp</p>

      <Row className="mt-4">
        
        {/* Filters Section */}
        <Col md={3}>
          <Card className="mb-4 p-3">
            <h5>Filter Jobs</h5>

            <Form.Group controlId="jobType" className="mb-3">
              <Form.Label>Job Type</Form.Label>
              <Form.Select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
              >
                <option value="All Types">All Types</option>
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="remote">Remote</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="industry" className="mb-3">
              <Form.Label>Industry</Form.Label>
              <Form.Select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                <option value="All Teams">All Teams</option>
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

        {/* Job Listings Section */}
        <Col md={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search open positions"
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
                        onClick={() => handleJobClick(job.id)}
                      >
                        {job.title}
                      </a>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Location: {job.location}
                    </Card.Subtitle>
                    <Card.Text>
                      Industry: {job.industry} <br />
                      Job Type: {job.job_type} <br />
                      Status: {job.post_status} <br />
                      Author: {job.author_username} {/* Display Author's Username */}
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
