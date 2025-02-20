import React, { useState } from 'react';
import axiosConfig from '../../utils/axiosConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import doctor from '../assets/sign-up-icons/doctor-signup.svg';
import patient from '../assets/sign-up-icons/patient-signup.svg';

const SignUpPage = () => {
  const [userType, setUserType] = useState('Patient'); // Default to Patient
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    speciality: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = userType === 'Patient' ? '/api/auth/register' : '/api/doctors/register';
      const { data } = await axiosConfig.post(endpoint, {
        ...formData,
        role: userType.toUpperCase()
      });

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      window.location.href = userType === 'Patient' ? '/patient/dashboard' : '/doctor/dashboard';
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-screen-md p-6 m-5 bg-gray-800 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-white">Sign Up</h2>
          <p className="mt-2 text-sm text-center text-gray-400">Create your account to get started</p>

          <div className="mt-6 space-y-4">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setUserType('Patient')}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                  userType === 'Patient' ? 'bg-teal-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}
              >
                <img src={patient} alt='patient icon' className='w-5 h-5 mr-2' />
                Patient
              </button>
              <button
                onClick={() => setUserType('Doctor')}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ${
                  userType === 'Doctor' ? 'bg-teal-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}
              >
                <img src={doctor} alt='doctor icon' className='w-5 h-5 mr-2' />
                Doctor
              </button>
            </div>

            <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-400">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your first name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-400">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your last name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-400">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your phone number"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                  Email (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {userType === 'Doctor' && (
                <div>
                  <label htmlFor="speciality" className="block text-sm font-medium text-gray-400">
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="speciality"
                    name="speciality"
                    className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Enter your specialization"
                    required
                    value={formData.speciality}
                    onChange={handleChange}
                  />
                </div>
              )}

              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;