import React from "react";
import './DoctorCard.css';

export default function DoctorCard({ doctor }) {
  return (
	
	<div className="doctor-card">
	  <div className="doctor-card-image">
		<img src={doctor.image} alt={doctor.name} />
	  </div>
	  <div className="doctor-card-info">
		<h3>{doctor.name}</h3>
		<p>{doctor.specialty}</p>
		<p>{doctor.location}</p>
			  <span>{doctor.stars}</span>
			  <span>{doctor.rating}</span>
		  </div>
		  <div className="doctor-card-actions">
			  <button>Book Appointment</button>
			</div>
	</div>
  );

}