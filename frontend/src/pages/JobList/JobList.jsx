import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './JobList.css';

const jobData = [
  {
    title: "Product Owner (Data Science)",
    location: "Dublin, Krakow, London, Madrid, Porto, Vilnius",
    remote: "Ireland, Poland, Portugal, Romania, Spain, UK"
  },
  {
    title: "Service Delivery Manager - Singapore",
    location: "Singapore",
    remote: ""
  },
  {
    title: "New Business Account Executive - Italian",
    location: "Dublin, Paris",
    remote: "Ireland, France"
  },
  {
    title: "Business Risk Manager (Third Party Risk)",
    location: "Krakow, Madrid, Porto",
    remote: "Ireland, Poland, Portugal, Romania, Spain, UK"
  },
  {
    title: "Compliance Manager (MLRO) - Cyprus",
    location: "Cyprus",
    remote: ""
  },
  {
    title: "Complex Investigations Manager",
    location: "Barcelona, Madrid",
    remote: "France, Ireland, Lithuania, Spain"
  },
  { title: "Compliance Manager (MLRO) - Cyprus", location: "Cyprus", remote: "" },
  { title: "Complex Investigations Manager", location: "Barcelona, Madrid", remote: "France, Ireland, Lithuania, Spain" },
  { title: "Software Engineer", location: "London", remote: "UK, Germany" },
  { title: "Head of Marketing", location: "New York", remote: "USA, Canada" },
];

const JobList = () => {
  const [visibleJobs, setVisibleJobs] = useState(4); 
  const [filterTeam, setFilterTeam] = useState("All teams");

  const showMoreJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 4); 
  };

  return (
    <Container className="job-list">
      <h1 className="header">WE HAVE 259 OPEN POSITIONS</h1>
      <p className="subheader">Join us in building the first truly global financial SuperApp</p>

      <Row className="filters align-items-center pe-5 me-5">
        <Col md={4}>
          <Dropdown>
            <Dropdown.Toggle className="filter-btn w-75" id="dropdown-basic">
              Location
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#action/1">Dublin</Dropdown.Item>
              <Dropdown.Item href="#action/2">Singapore</Dropdown.Item>
              <Dropdown.Item href="#action/3">Remote</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={8}>
          <input className="search-bar" type="text" placeholder="Search from 259 open positions" />
        </Col>
      </Row>

      <Row className="filter-section ms-5">
        <Col md={3}>
          <p className="filter-title">Filter by teams</p>
          <ul className="team-list">
            <li onClick={() => setFilterTeam("All teams")}>All teams - 259</li>
            <li onClick={() => setFilterTeam("Business Development")}>Business Development - 4</li>
            <li onClick={() => setFilterTeam("Engineering & Data")}>Engineering & Data - 31</li>
            <li onClick={() => setFilterTeam("Credit")}>Credit - 11</li>
            <li onClick={() => setFilterTeam("Engineering & Data")}>Engineering & Data - 31</li>
            <li onClick={() => setFilterTeam("Executive")}>Executive - 3</li>
            <li onClick={() => setFilterTeam("Finance")}>Finance - 24</li>
            <li onClick={() => setFilterTeam("Legal")}>Legal - 17</li>
            <li onClick={() => setFilterTeam("Marketing & Comms")}>Marketing & Comms - 7</li>
            <li onClick={() => setFilterTeam("Operations")}>Operations - 16</li>
            <li onClick={() => setFilterTeam("People & Recruitment")}>People & Recruitment - 19</li>
            <li onClick={() => setFilterTeam("Product & Design")}>Product & Design - 11</li>
            <li onClick={() => setFilterTeam("Risk, Compliance & Audit")}>Risk, Compliance & Audit - 8</li>
            <li onClick={() => setFilterTeam("Sales")}>Sales - 34</li>
            <li onClick={() => setFilterTeam("Other")}>Other - 69</li>
          </ul>
        </Col>

        <Col md={9}>
          <h3 className="featured-roles">Featured roles</h3>
          {jobData.slice(0, visibleJobs).map((job, index) => (
            <Card key={index} className="job-card mb-3">
              <Card.Body>
                <Card.Title className="job-title">{job.title}</Card.Title>
                <Card.Text className="job-info">
                  <span>Office: {job.location}</span>
                  {job.remote && (
                    <>
                      <br />
                      <span>Remote: {job.remote}</span>
                    </>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
          {visibleJobs < jobData.length && (
            <Button variant="link" className="show-more" onClick={showMoreJobs}>
              Show more &rarr;
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default JobList;