import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ClientForm from '../pages/Register/ClientForm';
import CompanyForm from '../pages/Register/CompanyForm';
// import LandingPage from '../pages/LandingPage/LandingPage.jsx';
// import Profile from '../pages/Profile/Profile.jsx';
// import JobList from '../pages/JobList/JobList.jsx';





function AppRoutes() {
  return (
    
    <Router>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} />  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/client" element={<ClientForm />} />
        <Route path="/register/company" element={<CompanyForm/>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
