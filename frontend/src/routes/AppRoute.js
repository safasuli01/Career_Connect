import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register/Register.jsx';
import Freelancer from "../pages/Register/Freelancer";
import Company from "../pages/Register/Company";
import EmployeeForm from "../pages/Register/EmploeeForm.jsx";
import JobSeekerForm from "../pages/Register/JobSeekerForm";
import EmployeeSearchForm from "../pages/Register/EmployeeSearchForm";
import ClientBasedForm from "../pages/Register/ClientBasedForm";
import LandingPage from '../pages/LandingPage/LandingPage.jsx';





function AppRoutes() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path='/login' element={<Login/>}/>
        <Route path="/register" exact element={<Register/>} />
        <Route path="/register/freelancer" element={<Freelancer/>} />
        <Route path="/register/employee" element={<EmployeeForm/>} />
        <Route path="/register/job-seeker" element={<JobSeekerForm/>} />
        <Route path="/register/company" element={<Company/>} />
        <Route path="/register/employee-search" element={<EmployeeSearchForm/>} />
        <Route path="/register/client-based" element={<ClientBasedForm/>} />


      </Routes>
    </Router>
  );
}

export default AppRoutes;
