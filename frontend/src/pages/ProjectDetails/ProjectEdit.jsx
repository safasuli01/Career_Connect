import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    title: '',
    description: '',
    industry: '',
    budget: '',
    location: '',
    deadline: '',
  });

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/project/${id}/`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/project/${id}/update/`, project);
      alert('Project updated successfully');
      navigate(`/projectdetails/${id}`);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h5>Edit Project</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={project.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Industry</Form.Label>
          <Form.Control
            type="text"
            name="industry"
            value={project.industry}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Budget</Form.Label>
          <Form.Control
            type="text"
            name="budget"
            value={project.budget}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={project.location}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="date"
            name="deadline"
            value={project.deadline}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Project
        </Button>
      </Form>
    </Container>
  );
};

export default EditProject;
