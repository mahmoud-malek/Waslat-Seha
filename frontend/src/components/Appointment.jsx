import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentForm = ({ doctorName, specialty, selectedClinic}) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: ""
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const availableTimes = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "02:00 PM",
    "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
  ];

  const getNext7Days = (month) => {
    const days = [];
    const currentDate = new Date();
    
    if (month !== currentDate.getMonth()) {
      currentDate.setMonth(month);
      currentDate.setDate(1);
    }

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setIsDropdownOpen(false);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return false;
    }
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // API call would go here
      toast.success("Appointment booked successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        notes: ""
      });
      setSelectedTime(null);
    } catch (error) {
      toast.error("Failed to book appointment: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Book Appointment
        </h2>

        <div className="mb-8 text-center">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{doctorName}</h3>
          <p className="text-gray-600 dark:text-gray-400">{specialty}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Month Selection */}
          <div className="relative">
            <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Select Month
            </label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
            >
              <span className="text-gray-700 dark:text-gray-200">{months[selectedMonth]}</span>
              <svg
                className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="max-h-60 overflow-y-auto">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      type="button"
                      onClick={() => handleMonthSelect(index)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700
                        ${selectedMonth === index ? 'bg-cyan-50 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-300' : 'text-gray-700 dark:text-gray-200'}
                      `}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">
              Select Date
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {getNext7Days(selectedMonth).map((date, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`p-4 rounded-xl transition-all ${
                    date.toDateString() === selectedDate.toDateString()
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg dark:shadow-cyan-900/50'
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-lg font-bold mt-1">
                      {date.getDate()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">
              Select Time
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTimeSelect(time)}
                  className={`p-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTime === time
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md dark:shadow-cyan-900/50'
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Patient Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
              
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
              
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
            </div>

            <textarea
              name="notes"
              placeholder="Additional Notes (Optional)"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 placeholder-gray-400 dark:placeholder-gray-500"
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 text-white font-medium rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} transition-opacity`}
          >
            {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;