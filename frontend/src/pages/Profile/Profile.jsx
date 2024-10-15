import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom'; // To get URL parameters

function Profile() {
  const { id } = useParams();  // Get the author ID from the URL parameters
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false); // State to toggle editing mode for profile
  const [updatedData, setUpdatedData] = useState({
    specialization: '',
    skills: '',
    profile_image: null, // For file uploads
  });

  // States for basic info editing
  const [basicInfoEditing, setBasicInfoEditing] = useState(false);
  const [basicInfoData, setBasicInfoData] = useState({
    phone_number: '',
    years_of_experience: '',
    email: '',
    age: '',        // New field for age
    gender: '',     // New field for gender
  });

  // State for experience management
  const [experienceList, setExperienceList] = useState([]);
  const [experienceInput, setExperienceInput] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken") || Cookies.get("authToken");
        const response = await axios.get(`http://127.0.0.1:8000/api/individual/author-profile/${id}/`, {  // Fetch author data by ID
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUserData(response.data);
        setUpdatedData({
          specialization: response.data.specialization || '',
          skills: response.data.skills || '',
          profile_image: response.data.profile_image || null,
        });
        setBasicInfoData({
          phone_number: response.data.phone_number || '',
          years_of_experience: response.data.years_of_experience || '',
          email: response.data.user.email || '',
          age: response.data.age || '',              // Populate age
          gender: response.data.gender || '',        // Populate gender
        });
        setExperienceList(response.data.experience || []); // Fetch existing experience
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, [id]);  // Dependency array includes id to fetch new data when it changes

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleBasicInfoEditToggle = () => {
    setBasicInfoEditing(!basicInfoEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfoData({
      ...basicInfoData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setUpdatedData({
      ...updatedData,
      profile_image: e.target.files[0],
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken") || Cookies.get("authToken");

    const formData = new FormData();
    formData.append('specialization', updatedData.specialization);
    formData.append('skills', updatedData.skills);
    if (updatedData.profile_image) {
      formData.append('profile_image', updatedData.profile_image);
    }

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/individual/update/${userData.id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUserData(response.data);
      setEditing(false); // Close editing mode after successful update
    } catch (error) {
      console.error('Error updating user data', error);
    }
  };

  const handleBasicInfoUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken") || Cookies.get("authToken");

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/individual/update/${userData.id}/`, basicInfoData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUserData(response.data);
      setBasicInfoEditing(false); // Close editing mode after successful update
    } catch (error) {
      console.error('Error updating basic info', error);
    }
  };

  const handleExperienceInputChange = (e) => {
    setExperienceInput(e.target.value);
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken") || Cookies.get("authToken");

    if (experienceInput.trim()) {
      try {
        await axios.post(`http://127.0.0.1:8000/api/individual/experience/${userData.id}/`, { experience: experienceInput }, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        // Update local state
        setExperienceList([...experienceList, experienceInput]);
        setExperienceInput('');
      } catch (error) {
        console.error('Error adding experience', error);
      }
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Sidebar - Profile Info */}
        <div className="col-lg-4">
          <div className="card cards profile-sidebar shadow-sm mb-4">
            <div className="card-body text-center">
              {/* Display Profile Image */}
              {userData.profile_image ? (
                <img
                  src={`http://127.0.0.1:8000${userData.profile_image}`} // Updated with backend URL
                  alt="Profile"
                  className="profile-image rounded-circle mb-3"
                />
              ) : (
                <img
                  src="/default-profile.png" // Default profile image if none is uploaded
                  alt="Profile"
                  className="profile-image rounded-circle mb-3"
                />
              )}

              {editing ? (
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    name="specialization"
                    value={updatedData.specialization}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Specialization"
                  />
                  <input
                    type="text"
                    name="skills"
                    value={updatedData.skills}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Skills (comma-separated)"
                  />
                  {/* File input for image */}
                  <input
                    type="file"
                    name="profile_image"
                    accept="image/*"
                    onChange={handleFileChange} // Handle image file selection
                    className="form-control mb-2"
                  />
                  <button type="submit" className="btn btn-success">Save</button>
                  <button type="button" onClick={handleEditToggle} className="btn btn-secondary ms-2">Cancel</button>
                </form>
              ) : (
                <>
                  <h4 className="mb-0">{userData.user.username}</h4>
                  <p className="text-muted">{userData.specialization}</p>
                  <div className="skills mb-3">
                    {userData.skills ? (
                      userData.skills.split(',').map((skill, index) => (
                        <span key={index} className="badge bg-secondary p-2 rounded-5 m-1">{skill}</span>
                      ))
                    ) : (
                      <span className="text-muted">No skills added</span>
                    )}
                  </div>
                  <button onClick={handleEditToggle} className="btn btn-secondary">Edit Profile</button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Basic Information */}
        <div className="col-lg-8">
          <div className="card cards shadow-sm mb-4">
            <div className="card-body">
              <h6>Basic Information</h6>
              {basicInfoEditing ? (
                <form onSubmit={handleBasicInfoUpdate}>
                  <input
                    type="text"
                    name="phone_number"
                    value={basicInfoData.phone_number}
                    onChange={handleBasicInfoChange}
                    className="form-control mb-2"
                    placeholder="Phone Number"
                  />
                  <input
                    type="text"
                    name="years_of_experience"
                    value={basicInfoData.years_of_experience}
                    onChange={handleBasicInfoChange}
                    className="form-control mb-2"
                    placeholder="Years of Experience"
                  />
                  <input
                    type="email"
                    name="email"
                    value={basicInfoData.email}
                    onChange={handleBasicInfoChange}
                    className="form-control mb-2"
                    placeholder="Email"
                  />
                  <input
                    type="number"
                    name="age"
                    value={basicInfoData.age}
                    onChange={handleBasicInfoChange}
                    className="form-control mb-2"
                    placeholder="Age"
                  />
                  <select
                    name="gender"
                    value={basicInfoData.gender}
                    onChange={handleBasicInfoChange}
                    className="form-control mb-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <button type="submit" className="btn btn-success">Save</button>
                  <button type="button" onClick={handleBasicInfoEditToggle} className="btn btn-secondary ms-2">Cancel</button>
                </form>
              ) : (
                <>
                  <p>Phone: {userData.phone_number || 'Not provided'}</p>
                  <p>Experience: {userData.years_of_experience || 'Not provided'}</p>
                  <p>Email: {userData.user.email || 'Not provided'}</p>
                  <p>Age: {userData.age || 'Not provided'}</p>
                  <p>Gender: {userData.gender || 'Not provided'}</p>
                  <button onClick={handleBasicInfoEditToggle} className="btn btn-secondary">Edit Basic Info</button>
                </>
              )}
            </div>
          </div>

          {/* Experience Section */}
          <div className="card cards shadow-sm">
            <div className="card-body">
              <h6>Experience</h6>
              <ul>
                {experienceList.length > 0 ? (
                  experienceList.map((experience, index) => (
                    <li key={index}>{experience}</li>
                  ))
                ) : (
                  <li>No experience added</li>
                )}
              </ul>

              <form onSubmit={handleAddExperience}>
                <input
                  type="text"
                  value={experienceInput}
                  onChange={handleExperienceInputChange}
                  className="form-control mb-2"
                  placeholder="Add Experience"
                />
                <button type="submit" className="btn btn-success">Add Experience</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
