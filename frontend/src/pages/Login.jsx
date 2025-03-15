import React from 'react';
import axiosConfig from '../../utils/axiosConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SignInPage() {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e, role) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const { data } = await axiosConfig.post("/api/auth/login", {
        phoneNumber: phone,
        password,
        role
      });

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      window.location.href = role === 'PATIENT' ? "/patient/dashboard" : "/doctor/dashboard";
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-screen-md p-6 m-5 bg-gray-800 rounded-2xl shadow-2xl">
          {isLoggedIn ? (
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white">You are already logged in</h2>
              <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-extrabold text-center text-white">Sign in</h2>
              <p className="mt-2 text-sm text-center text-gray-400">Welcome, please sign in to continue</p>

              <div className="mt-6 space-y-4">
                <div className="w-full h-px bg-gray-600"></div>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="eg. 01012345678"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {error && <p className="text-red-500">{error}</p>}

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
                      onClick={(e) => handleLogin(e, 'PATIENT')}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                    >
                      Sign in as Patient
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleLogin(e, 'DOCTOR')}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-cyan-500 rounded-full hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                    >
                      Sign in as Doctor
                    </button>
                  </div>
                </form>
                              </div>
                              

            </>
          )}
        </  div>
          </div>
         
          <section className="flex flex-col items-center justify-center">
              <div>
                  <h1>Sign in</h1>
                  <p>Welcome, please sign in to continue</p>
              </div>
              

              <div>
                  <form className="flex flex-col">
                      
                      <div className='flex flex-col'>
                          <label> phone number
                          </label>

                          <input id='phone'>
                          </input>
                      </div>

                      <div>
                          <label htmlFor='password'>password</label>
                          <input id='password'>
                          </input>
                      </div>
                  </form>
              </div>

          </section>










      <Footer />
    </>
  );
}