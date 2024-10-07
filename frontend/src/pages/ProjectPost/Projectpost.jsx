import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add this line
import './ProjectPost.css'; // Include the CSS file for custom styles

const NewProjectForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industry: '',
    post_status: 'active',
    budget: '',
    deadline: '',
  });

  // Set created_at when the component mounts
  useEffect(() => {
    const createdAt = new Date().toISOString();
    setFormData((prevData) => ({
      ...prevData,
      created_at: createdAt, // This will be sent to the backend
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || formData.title.length > 32) {
      alert('Please enter a valid project title (max 32 characters)');
      return;
    }
    if (!formData.description) {
      alert('Please enter a project description');
      return;
    }
    if (!formData.industry) {
      alert('Please select an industry');
      return;
    }
    if (!formData.deadline) {
      alert('Please select a deadline');
      return;
    }

    // Remove created_at from being sent if your backend does not expect it
    const { created_at, ...dataToSend } = formData;

    console.log('Form Data:', dataToSend);

    try {
      // Make the POST request without token for authorization
      const response = await axios.post('http://127.0.0.1:8000/project/create/', dataToSend);
      console.log('Project created successfully:', response.data);

      // Redirect to Project List and pass the new project data
      navigate('/projects', { state: { newProject: response.data } });
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again later.');
    }
  };

  return (
    <div className="new-project-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header text-center">
          <h2>New Project</h2>
        </div>

        {/* Project Title */}
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter project title"
            value={formData.title}
            onChange={handleChange}
            maxLength="32"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter project description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        {/* Industry */}
        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <select
            className="form-control"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select an industry</option>
            <option value="Tech">Tech</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
          </select>
        </div>

        {/* Post Status */}
        <div className="form-group">
          <label htmlFor="post_status">Post Status</label>
          <select
            className="form-control"
            id="post_status"
            name="post_status"
            value={formData.post_status}
            onChange={handleChange}
            required
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        {/* Budget */}
        <div className="form-group">
          <label htmlFor="budget">Budget (Range)</label>
          <input
            type="number"
            className="form-control"
            id="budget"
            name="budget"
            placeholder="Enter budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>

        {/* Deadline */}
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            className="form-control"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Project</button>
      </form>
    </div>
  );
};

export default NewProjectForm;