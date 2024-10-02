import React from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faBriefcase, faMoneyBill, faClock } from '@fortawesome/free-solid-svg-icons';

const ProjectDetails = () => {
  return (
    <Container className="mt-5">
      <Row>
        {/* Project Main Details */}
        <Col md={8}>
          <h5 > Fitness Coaching Application</h5>
          <span>Technology, Health & Fitness</span>

          <h5>Project Details</h5>



          {/* Description Section */}
          <p>
                    I need a professional to connect my URL to the backend code which is developed with Node.js. The frontend is built using the React framework. The data is housed in a MySQL database. 

            Ideal Skills:
            - Proficiency in Node.js
            - Extensive experience with React
            - Strong MySQL database management skills
            - Full Stack development experience
            - Proficient in connecting front end with backend

            Please ensure you have a solid understanding of these technologies and can successfully connect my URL to the backend code. Looking forward to your proposals.  
                    </p>

         <div className="d-flex align-items-center mb-3">
            <Button variant="primary" className="me-2 w-25">
              contact me
            </Button>
          </div>
      
        </Col>

        {/* Overview Section */}
        <Col md={4}>
          <div className="card p-3">
            <h5>Overview</h5>
            <p>
              <FontAwesomeIcon icon={faCalendarAlt} /> Created 23 days ago
            </p>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Remote (Worldwide)
            </p>

            <p>
              <FontAwesomeIcon icon={faMoneyBill} /> Budget: $8 - 15 AUD per hour
            </p>
            <p>
              <FontAwesomeIcon icon={faClock} /> Deadline: December 31, 2024
            </p>
            <div className="mt-3">
              <Badge bg="success">Open</Badge>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetails;
