import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppointmentForm from "../components/Appointment";

const doctorData = {
  id: 1,
  name: "Dr. John Doe",
  specialty: "Cardiologist",
  education: "MD - Cardiology, MBBS",
  experience: "15+ years",
  
  rating: 4.8,
  reviews: 127,
  about: "Dr. John Doe is a highly experienced cardiologist with expertise in treating various heart conditions. He has performed over 1000+ successful procedures and is known for his patient-centric approach.",
  clinics: [
    {
      id: 1,
      name: "Cairo Medical Center",
      address: "123 El-Nasr Road, Nasr City, Cairo",
      price: "300 EGP",
      availability: "Sun-Thu: 2:00 PM - 8:00 PM"
    },
    {
      id: 2,
      name: "Heliopolis Clinic",
      address: "45 El-Merghany Street, Heliopolis, Cairo",
      price: "350 EGP",
      availability: "Sat-Wed: 10:00 AM - 4:00 PM"
    }
  ]
};

export default function Doctor() {
  const { id } = useParams();
  const [selectedClinic, setSelectedClinic] = useState(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-transparent dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Doctor Profile Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Image */}
              <div className="flex justify-center">
                <div className="w-64 h-64 rounded-full bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">
                  <svg className="w-32 h-32 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="md:col-span-2">
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {doctorData.name}
                  </h1>
                  <p className="text-lg text-cyan-600 dark:text-cyan-400">
                    {doctorData.specialty}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{doctorData.experience} Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">
                      {doctorData.rating} ({doctorData.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none mb-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">About</h3>
                  <p className="text-gray-600 dark:text-gray-300">{doctorData.about}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Clinic Selection Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Select Clinic Location
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctorData.clinics.map((clinic) => (
                <div 
                  key={clinic.id}
                  onClick={() => setSelectedClinic(clinic)}
                  className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer
                    ${selectedClinic?.id === clinic.id 
                      ? 'border-cyan-500 dark:border-cyan-400 bg-cyan-50 dark:bg-cyan-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-400'
                    }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {clinic.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {clinic.address}
                        </p>
                      </div>
                      {selectedClinic?.id === clinic.id && (
                        <span className="text-cyan-500 dark:text-cyan-400">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-400">{clinic.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-400">{clinic.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Form */}
          {selectedClinic ? (
            <AppointmentForm
              doctorName={doctorData.name}
              specialty={doctorData.specialty}
              clinicData={selectedClinic}
            />
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400 py-8">
              Please select a clinic to proceed with booking
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}