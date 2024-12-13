// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from "./pages/Results";
import HowToUse from "./pages/HowToUse";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AboutUs from "./pages/AboutUs";


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
		  </Routes>
	  </Router>
  );
}
export default App;