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

function AppRoutes() {
  return (
    
    <Router>
      <Routes>
        <Route path='/login' component={Login}/>
        <Route path="/register" exact component={Register} />
        <Route path="/register/freelancer" component={Freelancer} />
        <Route path="/register/employee" component={EmployeeForm} />
        <Route path="/register/job-seeker" component={JobSeekerForm} />
        <Route path="/register/company" component={Company} />
        <Route path="/register/employee-search" component={EmployeeSearchForm} />
        <Route path="/register/client-based" component={ClientBasedForm} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
