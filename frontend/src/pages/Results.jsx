import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SearchDoctor from "../components/Search";
import Footer from "../components/Footer";
import SearchFilter from "../components/SearchFilters";
import DoctorCard from "../components/DoctorCard";
import doctorImage from "../assets/doctor-photo.png";
import girlImage from "../assets/girl_doctor.png";
import FilterIcon1 from '../assets/filter-icon1.svg';
import FilterIcon2 from '../assets/filter-icon2.svg';

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
    name: "Dr. Jane Doe",
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
    name: "Dr. Mahmoud",
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
];

export default function Results() {
  const [showFilters, setShowFilters] = useState(false);

  function toggleFilters() {
    setShowFilters(!showFilters);
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-row items-center min-h-screen">
        <section className="container flex flex-col items-center justify-center mt-6">
          <div className="flex flex-row items-center">
            <h2 className="inline text-3xl font-bold text-center text-gray-800 dark:text-white my-4">
              Search Results
            </h2>
              <img onClick={toggleFilters}
                src={showFilters ? FilterIcon2 : FilterIcon1}
                alt="filter icon"
                className="h-6 w-6 ml-4 cursor-pointer"
              />
          </div>
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

		  
      <SearchFilter show={showFilters} onClose={toggleFilters} />
    </>
  );
}