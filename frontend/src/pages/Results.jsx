import React from "react";
import Navbar from "../components/Navbar";
import SearchDoctor from "../components/Search";
import Footer from "../components/Footer";
import SearchFilter from "../components/SearchFilters";
import DoctorCard from "../components/DoctorCard";
import doctorImage from "../assets/doctor-photo.png";
import girlImage from "../assets/girl_doctor.png";

const doctors = [
	{
		id: 1,
		name: "Dr. John Doe",
		specialty: "Cardiologist",
		location: "New York, USA",
		rating: 4.5,
		stars: "⭐️⭐️⭐️⭐️⭐️",
		image: doctorImage
	},
	{
		id: 2,
		name: "Dr. jane Doe",
		specialty: "Pediatrician",
		location: "California, USA",
		rating: 4.5,
		stars: "⭐️⭐️⭐️⭐️⭐️",
		image: girlImage
	},

	{
		id: 3,
		name: "Dr. Alex Doe",
		specialty: "Dermatologist",
		location: "California, USA",
		rating: 3.5,
		stars: "⭐️⭐️⭐️⭐️",
		image: doctorImage
	},

	{
		id: 4,
		name: "Dr. Jane Doe",
		specialty: "Gynecologist",
		location: "California, USA",
		rating: 4.5,
		stars: "⭐️⭐️⭐️⭐️⭐️",
		image: girlImage
	},
	{
		id: 5,
		name: "Dr. Mahmoud ",
		specialty: "Gynecologist",
		location: "California, USA",
		rating: 4.5,
		stars: "⭐️⭐️⭐️⭐️⭐️",
		image: doctorImage
	},
	{
		id: 6,
		name: "Dr. Jane Doe",
		specialty: "Gynecologist",
		location: "California, USA",
		rating: 4.5,
		stars: "⭐️⭐️⭐️⭐️⭐️",
		image: girlImage
	}
]


export default function Results() {
	return (
		<>
			<Navbar />
			<div className="flex flex-row items-center">
				<SearchFilter />
				<section className="container flex flex-col items-center justify-center mt-6">
					<h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white my-4">
						Search Results
					</h2>
					<div className="grid lg:grid-cols-3 md:grid-cols-1">
						{doctors.map((doctor) => (
							<DoctorCard key={doctor.id} doctor={doctor} />
						))}
					</div>

					{/* Pagination */}	
				</section>
			</div>
			<SearchDoctor />
			<Footer />
		</>
  )
}