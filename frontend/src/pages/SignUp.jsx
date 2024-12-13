import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import doctor from '../assets/sign-up-icons/doctor-signup.svg'
import patient from '../assets/sign-up-icons/patient-signup.svg'

const SignUpPage = () => {
  const [userType, setUserType] = useState('Patient'); // Default to Patient

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
               <img src={patient} alt='doctor icon' className='w-5 h-5 mr-2' />
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

            <form className="space-y-4 mt-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-400">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {userType === 'Doctor' && (
                <>
                  <div>
                    <label htmlFor="clinic" className="block text-sm font-medium text-gray-400">
                      Clinic Location
                    </label>
                    <input
                      type="text"
                      id="clinic"
                      className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Enter your clinic location"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="license" className="block text-sm font-medium text-gray-400">
                      License Number
                    </label>
                    <input
                      type="text"
                      id="license"
                      className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Enter your license number"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="specialization" className="block text-sm font-medium text-gray-400">
                      Specialization
                    </label>
                    <input
                      type="text"
                      id="specialization"
                      className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Enter your specialization"
                      required
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                Create Account
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
