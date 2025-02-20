import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorCard from "../components/DoctorCard";
import SearchFilter from "../components/SearchFilters";
import SearchDoctor from "../components/Search";
import { SpinnerDotted } from 'spinners-react';
import { useSearchParams } from 'react-router-dom';

const Results = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [usedFilters, setUsedFilters] = useState(false);
  const doctorsPerPage = 12;

     // Get search parameters
  const specialty = searchParams.get('specialty');
  const doctorName = searchParams.get('doctor');
  const city = searchParams.get('city');
  const area = searchParams.get('area');
    const aiQuery = searchParams.get('ai');
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            fetchDoctors();
        }, 3000);
  }, [specialty, doctorName, city, area, aiQuery]);

  const fetchDoctors = async () => {
    try {
      setError(null);

        const params = new URLSearchParams();

        if (aiQuery) {
            // handle ai
            params.append('ai_query', aiQuery);
        } else {
            // Handle traditional search
          if (specialty) params.append('specialty', specialty);
          if (doctorName) params.append('name', doctorName);
          if (city) params.append('city', city);
          if (area) params.append('area', area);
        }

        const { data } = await axios.get(`/api/doctors?${params.toString()}`);

        if (Array.isArray(data)) {
            setDoctors(data);
            setLoading(false);
        }
        else {
            throw new Error("Invalid data format")
        }
    } catch (error) {
      setError(error.message || "Error fetching doctors");
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
      
  };

  const toggleFilters = () => setShowFilters(prev => !prev);

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = (usedFilters ? filteredDoctors : doctors).slice(indexOfFirstDoctor, indexOfLastDoctor)
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-cyan-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };
    
    const handleFilters = (filters) => {
        // Start with the full doctors array
        let filtered = [...doctors];

        // Filter by specialty
        if (filters.specialty !== 'all') {
            filtered = filtered.filter(doctor => 
            doctor.speciality?.toLowerCase() === filters.specialty.toLowerCase()
            );
        }

        // Filter by name
        if (filters.name) {
            filtered = filtered.filter(doctor => 
            doctor.user?.firstName?.toLowerCase().includes(filters.name.toLowerCase()) ||
            doctor.user?.lastName?.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        // Filter by rating
        if (filters.rating !== 'all') {
            filtered = filtered.filter(doctor => 
            Number(doctor.rating) >= Number(filters.rating)
            );
        }

        // Filter by price
        if (filters.price !== 'all') {
            filtered = filtered.filter(doctor => {
            const price = Number(filters.price);
            if (price === 301) {
                return doctor.clinics?.[0]?.price > 300;
            }
            return doctor.clinics?.[0]?.price <= price;
            });
        }

        // Sort results
        if (filters.sort === 'rating') {
            filtered.sort((a, b) => 
            filters.order === 'asc' ? 
                Number(a.rating) - Number(b.rating) : 
                Number(b.rating) - Number(a.rating)
            );
        } else if (filters.sort === 'price') {
            filtered.sort((a, b) => {
            const priceA = a.clinics?.[0]?.price || 0;
            const priceB = b.clinics?.[0]?.price || 0;
            return filters.order === 'asc' ? priceA - priceB : priceB - priceA;
            });
        }
        
        setUsedFilters(true);
        setFilteredDoctors(filtered);
        setCurrentPage(1); // Reset to first page when filtering
};
    

      // Add a section to display active filters
  const renderActiveFilters = () => {
    if (!specialty && !doctorName && !city && !area && !aiQuery) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-4 ml-60">
        {aiQuery && (
          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full">
            AI Search: {aiQuery}
          </span>
        )}
        {specialty && (
          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full">
            Specialty: {specialty}
          </span>
        )}
        {doctorName && (
          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full">
            Doctor: {doctorName}
          </span>
        )}
        {city && (
          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full">
            City: {city}
          </span>
        )}
        {area && (
          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full">
            Area: {area}
          </span>
        )}
      </div>
    );
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4">
              <section className="py-8">
                   {renderActiveFilters()}
                  <div className="flex items-center justify-center mb-6 space-x-2">
                      
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Search Results
                      </h2>
                      
            <button
  onClick={toggleFilters}
  className="flex items-center gap-2 p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    className="w-6 h-6"
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {showFilters ? (
      <>
        <path d="M3 6h18M6 12h12M10 18h4" />
      </>
    ) : (
      <>
        <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6" />
      </>
    )}
  </svg>
  <span className="font-medium">Filters</span>
</button>

                  </div>
            <div className="flex flex-col justify-between items-center mb-6">
                
             {loading && <SpinnerDotted size={71} thickness={90} speed={100} color="rgba(57, 172, 172, 0.93)" />}
            </div>
          
          {error && (
            <div className="text-red-500 text-center py-4">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="flex flex-col justify-between items-center mb-6">
              {currentDoctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  No doctors found matching your criteria
                </p>
              )}
              {renderPagination()}
            </div>
          )}
        </section>
      </main>

      <SearchDoctor />
      <SearchFilter show={showFilters} onClose={toggleFilters} onApplyFilters={handleFilters} />
      <Footer />
    </div>
  );
};

export default Results;