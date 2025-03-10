import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../utils/axiosConfig';
import { SpinnerDotted } from 'spinners-react';
import PatientSettings from '../components/PatientSettings';
import 'react-toastify/dist/ReactToastify.css';

export default function PatientDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [appointments, setAppointments] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        profile: {
            firstName: '',
            lastName: '',
            age: '',
            gender: '',
            bloodType: '',
        },
        id: '',
        email: '',
        phoneNumber: ''
    });

    const fetchUserData = async () => {
        try {
            const response = await axios.get("/api/users/profile");
            if (!response.data) throw new Error("No data received");
            setUserInfo(response.data);
            setError(null);
        } catch (error) {
            setError("Failed to fetch user data");
            toast.error("Failed to load user information");
        }
    };

    const fetchAppointments = async () => {
        try {
            const response = await axios.get("/api/appointments");
            if (!response.data) throw new Error("No appointments data received");
            setAppointments(response.data);
            setError(null);
        } catch (error) {
            setError("Failed to fetch appointments");
            toast.error("Failed to load appointments");
        }
    };

    const fetchMedicalHistory = async () => {
        try {
            const response = await axios.get("/api/medical-history");
            if (!response.data) throw new Error("No medical history data received");
            setMedicalHistory(response.data);
            setError(null);
        } catch (error) {
            setError("Failed to fetch medical history");
            toast.error("Failed to load medical history");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    fetchUserData(),
                    fetchAppointments(),
                    fetchMedicalHistory()
                ]);
            } catch (error) {
                console.error('Error loading dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCancelAppointment = async (appointmentId) => {
        try {
            await axios.put(`/api/appointments/${appointmentId}/cancel`);
            await fetchAppointments();
            toast.success('Appointment cancelled successfully');
        } catch (error) {
            toast.error('Failed to cancel appointment');
        }
    };

    const handleRescheduleAppointment = (appointmentId) => {
        navigate(`/appointments/${appointmentId}/reschedule`);
    };

    const handleQuickAction = (action) => {
        switch(action) {
            case 'book':
                navigate('/', { state: { scrollTo: 'search' } });
                break;
            case 'records':
                setActiveTab('medical history');
                break;
            case 'profile':
                setActiveTab('settings');
                break;
            case 'emergency':
                navigate('/emergency');
                break;
            default:
                break;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <SpinnerDotted size={50} color="#0891b2" />
            </div>
        );
    }

    const renderProfileImage = () => {
    if (userInfo.profileImage) {
        const imageUrl = userInfo.profileImage.startsWith('http') 
            ? userInfo.profileImage 
            : `${import.meta.env.VITE_API_URL}${userInfo.profileImage}`;
            
        return (
            <img 
                src={imageUrl}
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
                onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = '/default-avatar.png'; // Fallback to default avatar
                }}
            />
        );
    }

    // Default avatar SVG
    return (
        <svg className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
            />
        </svg>
    );
};

    const renderContent = () => {
        switch(activeTab) {
            case 'overview':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Upcoming Appointments
                                </h2>
                                <div className="space-y-4">
                                    {appointments.length > 0 ? appointments.map((appointment) => (
                                        <div key={appointment.id} 
                                            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        Dr. {appointment.doctorName}
                                                    </h3>
                                                    <p className="text-cyan-600 dark:text-cyan-400">
                                                        {appointment.specialty}
                                                    </p>
                                                </div>
                                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200">
                                                    {appointment.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                                        />
                                                    </svg>
                                                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
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
                                            {appointment.status === 'Upcoming' && (
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
                                            )}
                                        </div>
                                    )) : (
                                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                            No upcoming appointments
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Recent Medical History */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Recent Medical History
                                </h2>
                                <div className="space-y-4">
                                    {medicalHistory.length > 0 ? medicalHistory.map((record) => (
                                        <div key={record.id} 
                                            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {record.diagnosis}
                                                </h3>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(record.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                                                Doctor: Dr. {record.doctorName}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Notes: {record.notes}
                                            </p>
                                        </div>
                                    )) : (
                                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                            No medical history available
                                        </p>
                                    )}
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
                                    <button 
                                        onClick={() => handleQuickAction('book')}
                                        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        Book New Appointment
                                    </button>
                                    <button 
                                        onClick={() => handleQuickAction('records')}
                                        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        View Medical Records
                                    </button>
                                    <button 
                                        onClick={() => handleQuickAction('profile')}
                                        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        Update Profile
                                    </button>
                                    <button 
                                        onClick={() => handleQuickAction('emergency')}
                                        className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                                    >
                                        Emergency Help
                                    </button>
                                </div>
                            </div>

                            {/* Health Overview */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Health Overview
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-center">
                                        <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                                            {appointments.length}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Total Appointments
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-center">
                                        <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                                            {appointments.filter(a => a.status === 'Upcoming').length}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Upcoming
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Patient Info */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Patient Information
                                </h2>
                                <div className="space-y-3">
                                    <p className="text-gray-600 dark:text-gray-300">
                                        <span className="font-medium">Blood Type:</span> {userInfo.profile.bloodType || 'Not specified'}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        <span className="font-medium">Gender:</span> {userInfo.profile.gender || 'Not specified'}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        <span className="font-medium">Phone:</span> {userInfo.phoneNumber}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        <span className="font-medium">Email:</span> {userInfo.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'settings':
            return (
                <PatientSettings 
                    userInfo={userInfo} 
                    onUpdate={(updatedUser) => setUserInfo(updatedUser)} 
                />
            );
            default:
                return null;
        }
    };

    
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Error Display */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Patient Profile Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center overflow-hidden">
                            {renderProfileImage()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {`${userInfo.profile.firstName} ${userInfo.profile.lastName}`}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">Patient ID: {userInfo.id}</p>
                            <p className="text-gray-600 dark:text-gray-400">
                                {userInfo.profile.gender && `${userInfo.profile.gender} • `}
                                {userInfo.profile.bloodType && `Blood Type: ${userInfo.profile.bloodType}`}
                            </p>
                        </div>
                        <div className="ml-auto">
                            <button
                                onClick={() => setActiveTab('settings')}
                                className="px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 
                                        hover:bg-cyan-50 dark:hover:bg-cyan-900/50 rounded-lg transition-colors"
                            >
                                Edit Profile
                            </button>
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
                    {renderContent()}
                </div>
            </div>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}