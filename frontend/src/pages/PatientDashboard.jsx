// src/pages/PatientDashboard.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data - replace with API data
    const appointments = [
        {
            id: 1,
            doctorName: "Dr. John Doe",
            specialty: "Cardiologist",
            date: "2024-03-20",
            time: "10:00 AM",
            status: "upcoming",
            clinic: "Cairo Medical Center"
        }
    ];

    const medicalHistory = [
        {
            id: 1,
            date: "2024-02-15",
            doctorName: "Dr. Jane Smith",
            diagnosis: "Regular Checkup",
            prescription: "Vitamins",
            notes: "Patient in good health"
        }
    ];

    const handleCancelAppointment = (appointmentId) => {
        toast.success('Appointment cancelled successfully');
    };

    const handleRescheduleAppointment = (appointmentId) => {
        toast.info('Redirecting to reschedule page...');
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Patient Profile Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
                                <svg className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">John Smith</h1>
                                <p className="text-gray-600 dark:text-gray-400">Patient ID: P12345</p>
                                <p className="text-gray-600 dark:text-gray-400">Age: 35</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex gap-4 mb-6 overflow-x-auto">
                        {['overview', 'appointments', 'medical history', 'prescriptions', 'settings'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg font-medium capitalize whitespace-nowrap transition-colors
                                    ${activeTab === tab 
                                        ? 'bg-cyan-500 text-white' 
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Upcoming Appointments */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Upcoming Appointments
                                </h2>
                                <div className="space-y-4">
                                    {appointments.map((appointment) => (
                                        <div key={appointment.id} 
                                            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {appointment.doctorName}
                                                    </h3>
                                                    <p className="text-cyan-600 dark:text-cyan-400">
                                                        {appointment.specialty}
                                                    </p>
                                                </div>
                                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200">
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                                        />
                                                    </svg>
                                                    <span>{appointment.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                                                        />
                                                    </svg>
                                                    <span>{appointment.time}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                                                        />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                                                        />
                                                    </svg>
                                                    <span>{appointment.clinic}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleRescheduleAppointment(appointment.id)}
                                                    className="px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/50 rounded-lg transition-colors"
                                                >
                                                    Reschedule
                                                </button>
                                                <button
                                                    onClick={() => handleCancelAppointment(appointment.id)}
                                                    className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Medical History */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Recent Medical History
                                </h2>
                                <div className="space-y-4">
                                    {medicalHistory.map((record) => (
                                        <div key={record.id} 
                                            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {record.diagnosis}
                                                </h3>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {record.date}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                                                Doctor: {record.doctorName}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Notes: {record.notes}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Quick Actions
                                </h2>
                                <div className="space-y-2">
                                    <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                        Book New Appointment
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                        View Medical Records
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                        Update Profile
                                    </button>
                                </div>
                            </div>

                            {/* Health Stats */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Health Overview
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-center">
                                        <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">5</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Total Visits</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-center">
                                        <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">2</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Upcoming</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}