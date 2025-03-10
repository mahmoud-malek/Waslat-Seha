import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../utils/axiosConfig';

const PatientSettings = ({ userInfo, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(
    userInfo.profileImage 
        ? userInfo.profileImage.startsWith('http') 
            ? userInfo.profileImage 
            : `${import.meta.env.VITE_API_URL}${userInfo.profileImage}`
        : null
);
    const [formData, setFormData] = useState({
        firstName: userInfo.profile?.firstName || '',
        lastName: userInfo.profile?.lastName || '',
        email: userInfo.email || '',
        phoneNumber: userInfo.phoneNumber || '',
        gender: userInfo.profile?.gender || '',
        bloodType: userInfo.profile?.bloodType || '',
        birthDate: userInfo.profile?.birthDate || '',
        address: userInfo.profile?.address || ''
	});
	
	

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Update the handleImageChange function
const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        // Validate file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('File size should not exceed 2MB');
            return;
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            toast.error('Only JPG, PNG and GIF files are allowed');
            return;
        }

        setProfileImage(file);
        // Create a local preview URL
        const localPreviewUrl = URL.createObjectURL(file);
        setPreviewUrl(localPreviewUrl);

        // Cleanup the object URL when component unmounts
        return () => URL.revokeObjectURL(localPreviewUrl);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        let updatedProfileImage = previewUrl;

        // Upload profile picture if changed
        if (profileImage) {
            const imageFormData = new FormData();
            imageFormData.append('profilePicture', profileImage);
            
            const imageResponse = await axios.post('/api/users/profile-picture', imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (imageResponse.data.profileImage) {
                // Ensure the URL is absolute
                updatedProfileImage = `${import.meta.env.VITE_API_URL || ''}${imageResponse.data.profileImage}`;
                setPreviewUrl(updatedProfileImage);
            }
        }

        // Update profile information
        const response = await axios.put('/api/users/profile', {
            ...formData,
            profileImage: updatedProfileImage
        });
        
        onUpdate({
            ...response.data,
            profileImage: updatedProfileImage
        });

        setIsEditing(false);
        toast.success('Profile updated successfully');
    } catch (error) {
        console.error('Update error:', error);
        toast.error(error.response?.data?.error || 'Failed to update profile');
    } finally {
        setLoading(false);
    }
};
const renderProfileImage = () => {
    if (previewUrl) {
        return (
            <img 
                src={previewUrl}
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                    console.error('Image load error:', e);
                    e.target.onerror = null; // Prevent infinite loop
                    setPreviewUrl(null); // Reset to default avatar on error
                }}
            />
        );
    }

    return (
        <svg 
            className="w-full h-full text-gray-300 dark:text-gray-600" 
            fill="currentColor" 
            viewBox="0 0 24 24"
        >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
};
	
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Profile Settings
                </h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/50 rounded-lg transition-colors"
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Picture */}
						<div className="flex items-center gap-6">
				<div className="relative">
					<div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
						{renderProfileImage()}
					</div>
					{isEditing && (
						<label className="absolute bottom-0 right-0 bg-cyan-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-cyan-600 transition-colors">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<input
								type="file"
								className="hidden"
								accept="image/jpeg,image/png,image/gif"
								onChange={handleImageChange}
							/>
						</label>
					)}
				</div>
				<div>
					<h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Picture</h3>
					<p className="text-sm text-gray-500 dark:text-gray-400">JPG, GIF or PNG. Max size of 2MB</p>
				</div>
			</div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                                     bg-white dark:bg-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300
                                     focus:border-cyan-500 focus:ring-cyan-500 disabled:bg-gray-50 dark:disabled:bg-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                                     bg-white dark:bg-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300
                                     focus:border-cyan-500 focus:ring-cyan-500 disabled:bg-gray-50 dark:disabled:bg-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                                     bg-white dark:bg-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300
                                     focus:border-cyan-500 focus:ring-cyan-500 disabled:bg-gray-50 dark:disabled:bg-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                                     bg-white dark:bg-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300
                                     focus:border-cyan-500 focus:ring-cyan-500 disabled:bg-gray-50 dark:disabled:bg-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                                     bg-white dark:bg-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300
                                     focus:border-cyan-500 focus:ring-cyan-500 disabled:bg-gray-50 dark:disabled:bg-gray-900"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Blood Type</label>
                        <select
                            name="bloodType"
                            value={formData.bloodType}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                                     bg-white dark:bg-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300
                                     focus:border-cyan-500 focus:ring-cyan-500 disabled:bg-gray-50 dark:disabled:bg-gray-900"
                        >
                            <option value="">Select Blood Type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
					</div>
					
					<div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Birth Date
    </label>
    <input
        type="date"
        name="birthDate"
        value={formData.birthDate ? new Date(formData.birthDate).toISOString().split('T')[0] : ''}
        onChange={handleInputChange}
        disabled={!isEditing}
        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300
                 focus:border-cyan-500 focus:ring-cyan-500 disabled:bg-gray-50 dark:disabled:bg-gray-900"
    />
</div>
                </div>

                {/* Submit Button */}
                {isEditing && (
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 
                                     focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
                                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default PatientSettings;