import React from "react";
import { useNavigate } from "react-router-dom";
import './DoctorCard.css';

const defaultAvatar = (
  <svg className="w-32 h-32 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const handleBookAppointment = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

	  const profileImageUrl = doctor.user.profileImage
    ? `http://localhost:3000${doctor.user.profileImage}`
		  : null;
	
  return (
    <div className="doctor-card">
      <div className="doctor-card-image">
        {profileImageUrl ? (
          <img src={profileImageUrl} alt={`${doctor.user.firstName} ${doctor.user.lastName}`} className="rounded-full" />
        ) : (
          defaultAvatar
        )}
      </div>
      <div className="doctor-card-info">
        
        <h3>{doctor.user.profile.firstName} {doctor.user.profile.lastName}</h3>
        <p>{doctor.speciality}</p>
        <p>{doctor.clinics[0]?.address}something</p>
        <div className="doctor-card-rating">
          <span>{doctor.stars}⭐️⭐️⭐️⭐️⭐️</span>
          <span>{doctor.rating}10</span>
        </div>
        <p>{doctor.experience} Years of Experience</p>
      </div>
      <div className="doctor-card-actions">
        <button onClick={() => handleBookAppointment(doctor.user.id)}>Book Appointment</button>
      </div>
    </div>
  );
}