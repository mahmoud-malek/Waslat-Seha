// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from "./pages/Results";
import HowToUse from "./pages/HowToUse";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AboutUs from "./pages/AboutUs";
import Doctor from './pages/Doctor';
import ContactUs from "./pages/ContactUs";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";


function App() {
  return (
	  <Router>
		  <Routes>
			  <Route path='/' element={<Home />} />
			  <Route path='/results' element={<Results />} />
			  <Route path='/how-to-use' element={<HowToUse />} />
			  <Route path='/login' element={<Login />} />
			  <Route path='/signup' element={<SignUp />} />
			  <Route path='/about-us' element={<AboutUs />} />
			  <Route path='/doctor/:id' element={<Doctor />} />
			  <Route path="/contact-us" element={<ContactUs />} />
			  <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
			  <Route path="/patient/dashboard" element={<PatientDashboard />} />
		  </Routes>
	  </Router>
  );
}
export default App;