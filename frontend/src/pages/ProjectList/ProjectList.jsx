import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const projects = [
  {
    title: 'Part-Time Full-Stack Developer for Fitness Coaching Application',
    description:
      'We are seeking a skilled and motivated part-time Full-Stack Developer to assist in the development of a fitness coaching application...Developer to assist in the development of a fitness coaching application',
    skills: 'JavaScript, PostgreSQL, React.js, React Native',
    bids: 113,
    budget: '$8 - 15 AUD per hour',
    avgBid: '$14 AUD per hour',
    datePosted: '2 days ago',
    location: 'Remote'
  },
  // Add more projects here
];

const ProjectList = () => {
  return (
    <Container className="mt-5">
      <Row>
        {projects.map((project, index) => (
          <Col md={12} key={index} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>
                  <a href="#" className="text-primary">{project.title}</a>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Budget: {project.budget}
                </Card.Subtitle>
                <Card.Text>{project.description}</Card.Text>
                <Button variant="link" className="p-0 text-decoration-none">
                  Show more
                </Button>
                <div className="d-flex justify-content-between mt-3">
                  <div>
                    <small>skills: {project.skills}</small>
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
    </Container>
  );
};

export default ProjectList;
