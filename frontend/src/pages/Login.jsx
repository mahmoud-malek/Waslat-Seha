import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignInPage = () => {
	return (
		<>
		<Navbar />	
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-screen-md p-6 m-5 bg-gray-800 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-white">Sign in</h2>
        <p className="mt-2 text-sm text-center text-gray-400">Welcome, please sign in to continue</p>

        <div className="mt-6 space-y-4">
          
            <div className="w-full h-px bg-gray-600"></div>

          <form className="space-y-4">
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

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
				/>
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-400">
                Remember me
              </label>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
				>
                Sign in as Patient
              </button>
              <button
                type="button"
                className="w-full  px-4 py-2 text-sm font-medium text-white bg-cyan-500 rounded-full hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
				>
                Sign in as Doctor
								</button>
								
							</div>
          </form>
        </div>
      </div>
			</div>
			<Footer />
	</>
  );
};

export default SignInPage;
