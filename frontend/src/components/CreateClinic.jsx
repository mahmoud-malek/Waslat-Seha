import React, { useState } from 'react';
import axiosConfig from '../../utils/axiosConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CreateClinic = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    price: ''
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
      const doctorId = JSON.parse(localStorage.getItem('user')).id;
      const { data } = await axiosConfig.post('/api/doctors/clinics', {
        ...formData,
        doctorId
      });

      alert('Clinic created successfully');
      setLoading(false);
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
          <h2 className="text-3xl font-extrabold text-center text-white">Create Clinic</h2>
          <p className="mt-2 text-sm text-center text-gray-400">Add your clinic details</p>

          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                Clinic Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter clinic name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-400">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter clinic address"
                required
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-400">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter price"
                required
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? 'Creating Clinic...' : 'Create Clinic'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateClinic;