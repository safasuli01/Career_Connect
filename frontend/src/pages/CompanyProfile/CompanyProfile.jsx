import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompanyProfile.css';
import cover from "../../assets/images/company/cover.jpg"; 
import defaultProfile from "../../assets/c1.png";
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const CompanyProfile = () => {
  const { id } = useParams(); // Get the company ID from the URL
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false); 
  const [formData, setFormData] = useState({
    bio: '',
    logo: null,
    industry: '',
  });

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      const token = Cookies.get('authToken');

      if (!token) {
        setError('Unauthorized: Token not found. Please log in.');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/company/profile/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        
        setCompany(response.data);  
        setFormData({
          bio: response.data.bio || '',
          logo: null,
          industry: response.data.industry || '',
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching company profile');
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, []);

  const handleJobClick = (id) => {
    navigate(`/jobdetails/${id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, logo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('authToken');

    if (!company?.id) {
      console.error('Company ID is undefined. Cannot update.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('bio', formData.bio);
    if (formData.logo) {
      formDataToSend.append('logo', formData.logo);
    }
    formDataToSend.append('industry', formData.industry);

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/company/update/${company.id}/`, formDataToSend, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setCompany(response.data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating company profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm pb-4">
        {/* Cover Photo */}
        <div className="cover-photo position-relative">
          <img src={cover} alt="Company Cover" className="w-100 rounded-top" />
          <div className="profile-img-container position-absolute">
            <img
              src={company?.logo ? `http://127.0.0.1:8000${company.logo}` : defaultProfile}
              alt="Company Logo"
              className="profile-img"
            />
          </div>
        </div>

        <div className="card-body">
          {!editing ? (
            <div>
              <h6 className="company-name">{company?.user.username || "Company Name"}</h6>
              <p className="company-bio text-muted">{company?.bio || "No bio available"}</p>
              <p className="company-details text-muted">{company?.industry || "No industry specified"}</p>
              <button className="btn btn-primary w-25" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-100">
              <div className="form-group mb-3">
                <label>Bio:</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="3"
                />
              </div>
              <div className="form-group mb-3">
                <label>Industry:</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Upload Logo:</label>
                <input
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-success w-25">Save</button>
              <button type="button" className="btn btn-secondary w-25 ms-2" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Jobs posted by the company */}
      <h4 className="mt-5">Jobs Posted by {company?.user.username}</h4>
      <div className="row">
        {company?.jobs?.map((job) => (
          <div className="col-md-4" key={job.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Text>{job.location}</Card.Text>
                <Button onClick={() => handleJobClick(job.id)} variant="primary">View Job</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyProfile;
