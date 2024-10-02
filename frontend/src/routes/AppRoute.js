import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ClientForm from '../pages/Register/ClientForm';
import CompanyForm from '../pages/Register/CompanyForm';
import AppNavbar from '../components/Navbar.jsx'; 
import Footer from '../components/Footer.jsx';  
import LandingPage from '../pages/LandingPage/LandingPage.jsx';
import Profile from '../pages/Profile/Profile.jsx';
import JobList from '../pages/JobList/JobList.jsx';
import JobDetails from '../pages/JobDetails/JobDetails.jsx';
import ProjectDetails from '../pages/ProjectDetails/ProjectDetails.jsx';
import Company from '../pages/CompanyProfile/CompanyProfile.jsx';
import ProjectList from '../pages/ProjectList/ProjectList.jsx';
import ProjectPost from '../pages/ProjectPost/Projectpost.jsx';
import JobPost from '../pages/JobPost/JobPost.jsx';

function AppRoutes() {
  return (
    <Router>
      <AppNavbar /> 
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/client" element={<ClientForm />} />
        <Route path="/register/company" element={<CompanyForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/company" element={<Company />} />  
        
        {/* Job Routes */}
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobdetails/:id" element={<JobDetails />} />

        {/* Project Routes */}
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projectdetails/:id" element={<ProjectDetails />} />
        <Route path="/projectpost" element={<ProjectPost />} />
        <Route path="/jobpost" element={<JobPost />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default AppRoutes;
