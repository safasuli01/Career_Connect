import React, { useState } from 'react';
import './JobPost.css'; // Include the CSS file for custom styles

const NewJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    location: '',
    jobType: '',
    industry: '',
    status: 'active', // Default value matching your backend
    createdAt: new Date().toISOString().split('T')[0], // Commented out if not needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.jobTitle || formData.jobTitle.length > 32) {
      alert('Please enter a valid job title (max 32 characters)');
      return;
    }
    if (!formData.description) {
      alert('Please enter a job description');
      return;
    }
    if (!formData.location) {
      alert('Please select a location');
      return;
    }
    if (!formData.jobType) {
      alert('Please select a job type');
      return;
    }
    if (!formData.industry) {
      alert('Please select an industry');
      return;
    }

    // Prepare the data to send to the backend
    const formDataToSend = {
      title: formData.jobTitle,      // Matches the Django model
      description: formData.description,
      location: formData.location,
      job_type: formData.jobType,     // Matches the Django model
      industry: formData.industry,
      post_status: formData.status,    // Matches the Django model
      createdAt: formData.createdAt, // If needed, else remove this line
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/job/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Job created successfully:', result);
      // Optionally reset the form or redirect
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create job. Please check the console for more details.');
    }
  };

  return (
    <div className="new-job-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header text-center">
          <h2>New Job Post</h2>
        </div>

        {/* Job Title */}
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            className="form-control"
            id="jobTitle"
            name="jobTitle"
            placeholder="Enter job title"
            value={formData.jobTitle}
            onChange={handleChange}
            maxLength="32"
            required
          />
          <small className="form-text text-muted">
            The title must contain a maximum of 32 characters.
          </small>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter job description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
          <small className="form-text text-muted">
            Give your job a good description so everyone knows what it's for.
          </small>
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            className="form-control"
            id="location"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Job Type */}
        <div className="form-group">
          <label htmlFor="jobType">Job Type</label>
          <select
            className="form-control"
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Job Type</option>
            <option value="part_time">Part Time</option>
            <option value="full_time">Full Time</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        {/* Industry */}
        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            className="form-control"
            id="industry"
            name="industry"
            placeholder="Enter industry"
            value={formData.industry}
            onChange={handleChange}
            required
          />
        </div>

        {/* Status */}
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Create Job Post</button>
      </form>
    </div>
  );
};

export default NewJobForm;
