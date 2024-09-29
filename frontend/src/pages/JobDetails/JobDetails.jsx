import React from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUsers, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const JobDetails = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <h5>Senior Software Engineer, Marketing</h5>
          <div className="d-flex align-items-center mb-3">
            <Button variant="primary" className="me-2">
              Apply
            </Button>
          
          
          </div>

          <h5>ABOUT ROCKET MONEY</h5>
          <p>
            Rocket Money’s mission is to empower people to live their best financial lives. Rocket Money offers members a unique understanding of their finances and a suite of valuable services that save them time and money – ultimately giving them a leg up on their financial journey.
          </p>

          <h5>ABOUT THE TEAM</h5>
          <p>
            Team Luna is Rocket Money’s growth engineering team. From the moment someone first hears about Rocket Money, through their first few days of using the platform, our code makes sure that a user’s first interactions are seamless, valuable, and delightful.
          </p>

          <ul>
            <li>Engineering experiences across web and mobile platforms</li>
            <li>Collaborating with product, marketing, and data teams</li>
          </ul>
        </Col>

        <Col md={4}>
          <div className="card p-3">
            <h5>Overview</h5>
            <p>
              <FontAwesomeIcon icon={faCalendarAlt} /> 23 days ago
            </p>
            <p>
              <FontAwesomeIcon icon={faUsers} /> 200-500 Employees
            </p>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> San Francisco, CA, Washington, D.C., NYC, Remote (USA)
            </p>
            <div className="mt-3">
              <Badge bg="success">Apply</Badge>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default JobDetails;
