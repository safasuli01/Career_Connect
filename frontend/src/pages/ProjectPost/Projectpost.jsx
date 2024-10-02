import React, { useState } from 'react';
import './ProjectPost.css'; // Include the CSS file for custom styles

const NewProjectForm = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    description: '',
    industry: '',
    location: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.projectTitle || formData.projectTitle.length > 32) {
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
    if (!formData.location) {
      alert('Please select a location');
      return;
    }
    if (!formData.budgetMin || !formData.budgetMax || Number(formData.budgetMin) >= Number(formData.budgetMax)) {
      alert('Please enter a valid budget range');
      return;
    }
    if (!formData.deadline) {
      alert('Please select a deadline');
      return;
    }

    console.log(formData);
  };

  return (
    <div className="new-project-form">
      <form className="form " onSubmit={handleSubmit}>
        <div className="form-header text-center">
          <h2 className=''>New Project</h2>
        </div>

        {/* Project Title */}
        <div className="form-group">
          <label htmlFor="projectTitle">Project Title</label>
          <input
            className="form-control"
            id="projectTitle"
            name="projectTitle"
            placeholder="Enter project Title"

            value={formData.projectTitle}
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
            placeholder="Enter project description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
          <small className="form-text text-muted">
            Give your project a good description so everyone knows what it's for.
          </small>
        </div>

        {/* Industry */}
        <div className="form-group">
          <label  htmlFor="industry">Industry</label>
          
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

        {/* Budget */}
        <div className="form-group">
          <label htmlFor="budget">Budget (Range)</label>
          <div className="d-flex">
            <input
              type="number"
              className="form-control mr-2"
              id="budgetMin"
              name="budgetMin"
              placeholder="Min"
              value={formData.budgetMin}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              className="form-control"
              id="budgetMax"
              name="budgetMax"
              placeholder="Max"
              value={formData.budgetMax}
              onChange={handleChange}
              required
            />
          </div>
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
