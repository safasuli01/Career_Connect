import React, { useState } from 'react';
import './JobPost.css'; // Include the CSS file for custom styles

const NewJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    location: '',
    jobType: '',
    industry: '',
    status: 'Apply',
    createdAt: new Date().toISOString().split('T')[0], // Automatically setting today's date
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
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

    console.log(formData);
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
          <select
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="" disabled></option>
            <option value="Prague">Prague</option>
            <option value="Remote">Remote</option>
            <option value="Melbourne">Melbourne</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Nicosia">Nicosia</option>
            <option value="Tokyo">Tokyo</option>
          </select>
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
            <option value="" disabled></option>
            <option value="Part Time">Part Time</option>
            <option value="Full Time">Full Time</option>
            <option value="Remote">Remote</option>
          </select>
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
            <option value="" disabled></option>
            <option value="Tech">Tech</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
          </select>
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
            <option value="Apply">Apply</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        {/* Created At (auto field) */}
        <div className="form-group">
          <label htmlFor="createdAt">Created At</label>
          <input
            type="date"
            className="form-control"
            id="createdAt"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            disabled
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Job Post</button>
      </form>
    </div>
  );
};

export default NewJobForm;
