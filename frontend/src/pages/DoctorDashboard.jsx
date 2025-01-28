// src/pages/DoctorDashboard.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DoctorDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [editingSchedule, setEditingSchedule] = useState(false);

    // Mock data - replace with actual API data
    const appointments = [
        {
            id: 1,
            patientName: "John Smith",
            date: "2024-03-20",
            time: "10:00 AM",
            status: "confirmed",
            type: "Regular Checkup"
        },
        // Add more appointments...
    ];

    const scheduleData = {
        sunday: { isWorking: true, hours: "10:00 AM - 6:00 PM" },
        monday: { isWorking: true, hours: "9:00 AM - 5:00 PM" },
        tuesday: { isWorking: true, hours: "9:00 AM - 5:00 PM" },
        wednesday: { isWorking: true, hours: "10:00 AM - 6:00 PM" },
        thursday: { isWorking: true, hours: "9:00 AM - 5:00 PM" },
        friday: { isWorking: false, hours: "" },
        saturday: { isWorking: false, hours: "" }
    };

    const handleAppointmentAction = (appointmentId, action) => {
        toast.success(`Appointment ${action} successfully`);
    };

    const handleScheduleUpdate = () => {
        setEditingSchedule(false);
        toast.success('Schedule updated successfully');
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Doctor Profile Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
                                <svg className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dr. John Doe</h1>
                                <p className="text-cyan-600 dark:text-cyan-400">Cardiologist</p>
                                <p className="text-gray-600 dark:text-gray-300">Cairo Medical Center</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex gap-4 mb-6">
                        {['overview', 'appointments', 'schedule', 'settings'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors
                                    ${activeTab === tab 
                                        ? 'bg-cyan-500 text-white' 
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Today's Appointments */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Today's Appointments
                                </h2>
                                <div className="space-y-4">
                                    {appointments.map((appointment) => (
                                        <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{appointment.patientName}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.time} - {appointment.type}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleAppointmentAction(appointment.id, 'confirmed')}
                                                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => handleAppointmentAction(appointment.id, 'rescheduled')}
                                                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                                                >
                                                    Reschedule
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Weekly Schedule */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Weekly Schedule
                                    </h2>
                                    <button
                                        onClick={() => setEditingSchedule(!editingSchedule)}
                                        className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 rounded-lg hover:bg-cyan-600"
                                    >
                                        {editingSchedule ? 'Save Changes' : 'Edit Schedule'}
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {Object.entries(scheduleData).map(([day, schedule]) => (
                                        <div key={day} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="checkbox"
                                                    checked={schedule.isWorking}
                                                    disabled={!editingSchedule}
                                                    className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                                                />
                                                <span className="capitalize font-medium text-gray-900 dark:text-white">
                                                    {day}
                                                </span>
                                            </div>
                                            {editingSchedule ? (
                                                <input
                                                    type="text"
                                                    value={schedule.hours}
                                                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                                />
                                            ) : (
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    {schedule.hours || 'Not Available'}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Side Panel */}
                        <div className="space-y-6">
                            {/* Statistics */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Statistics
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-center">
                                        <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">28</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Appointments</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-center">
                                        <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">4.8</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Rating</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Quick Actions
                                </h2>
                                <div className="space-y-2">
                                    <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                                        Update Profile
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                                        View Analytics
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                                        Download Reports
                                    </button>
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