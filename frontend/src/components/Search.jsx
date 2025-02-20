import React, { useState } from "react";
import aiIcon from "../assets/ai.svg";
import searchIcon from "../assets/search-document.svg";
import GPSIcon from "../assets/GPS.svg";
import GPSIcon2 from "../assets/GPS2.svg";
import { useNavigate } from "react-router-dom";

// Data for the search options
const specialties = ["General Practitioner", "Dentist", "Psychiatrist", "Dermatologist", "Orthopedic", "Ophthalmologist"];
const cities = [
  { id: 1, name: "Cairo", areas: ["Maadi", "Fifth Settlement", "Mohandessin"] },
  { id: 2, name: "Giza", areas: ["Haram", "Dokki", "Agouza"] },
  { id: 3, name: "Alexandria", areas: ["Agami", "Mandara", "Mansheya"] },
];

export default function SearchDoctor() {
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    city: "",
    state: "",
    village: "",
    suburb: "",
  });

    const [searchData, setSearchData] = useState({
    specialty: '',
    doctorName: '',
    });
    
  const handleSearch = () => {
  const queryParams = new URLSearchParams();
  
  if (showTextField) {
    // Handle AI search
    const aiQuery = document.getElementById('ai-search').value;
    if (aiQuery) {
      queryParams.append('ai', aiQuery);
    }
  } else {
    // Handle traditional search
    if (searchData.specialty !== '') queryParams.append('specialty', searchData.specialty);
    if (searchData.doctorName) queryParams.append('doctor', searchData.doctorName);
    if (location.city) queryParams.append('city', location.city);
    if (location.suburb) queryParams.append('area', location.suburb);
  }
  
  navigate(`/results?${queryParams.toString()}`);
};
    
  const [error, setError] = useState("");
  const [showTextField, setShowTextField] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          if (!response.ok) throw new Error("Failed to fetch location details");

          const data = await response.json();
          const { state = "", city = "", village = "", suburb = "" } = data.address || {};
            setLocation({ state, city, village, suburb });
          setError(""); // Clear error if successful
        } catch (err) {
          setError("Failed to fetch location details");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setError("Unable to retrieve your location");
      }
    );
  };

  return (
    <section id="searchSection" className="relative w-full min-h-screen">
      {/* Background Decorations */}
      <div className="absolute top-0 inset-x-0 h-64 flex items-start">
        <div className="h-24 w-2/3 bg-gradient-to-br from-emerald-500 opacity-25 blur-2xl dark:from-[#570cac] dark:invisible dark:opacity-40"></div>
        <div className="h-20 w-3/5 bg-gradient-to-r from-[#8cd66a] opacity-40 blur-2xl dark:from-[#670ccf] dark:opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 z-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white my-4">
          Find Your Doctor the Way You Prefer
        </h2>

        <div className="w-11/12 md:w-8/12 h-80 flex flex-col items-stretch z-50 bg-white dark:bg-transparent shadow-lg rounded-2xl p-4">
          {/* Search Options */}
          <div className="flex flex-row justify-around items-center border-b border-gray-300 dark:border-gray-700 pb-2">
            <button
              onClick={() => setShowTextField(false)}
              className={`flex items-center justify-center px-4 py-2 rounded-full text-cyan-600 dark:text-cyan-400 font-bold hover:bg-[#3FD3D3]/10 dark:hover:bg-[#3FD3D3]/20 ${
                !showTextField ? "border-b-4 border-cyan-600 dark:border-cyan-400" : ""
              }`}
            >
              <img src={searchIcon} alt="Search icon" className="w-7 h-7" />
              <span className="ml-2">Traditional Search</span>
            </button>
            <button
              onClick={() => setShowTextField(true)}
              className={`flex items-center justify-center px-4 py-2 rounded-full text-cyan-600 dark:text-cyan-400 font-bold hover:bg-[#3FD3D3]/10 dark:hover:bg-[#3FD3D3]/20 ${
                showTextField ? "border-b-4 border-cyan-600 dark:border-cyan-400" : ""
              }`}
            >
              <img src={aiIcon} alt="AI icon" className="w-6 h-6" />
              <span className="ml-2">AI Search</span>
            </button>
          </div>

          {/* Search Fields */}
          <div className="mt-4">
            {showTextField ? (
              <div className="flex flex-col items-center">
                <label htmlFor="ai-search" className="text-gray-600 dark:text-gray-300 mb-2">
                  Describe your condition as if you’re talking to a doctor
                </label>
                <input
                  id="ai-search"
                  type="text"
                  placeholder="Search using AI"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring focus:ring-[#3FD3D3]"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring focus:ring-[#3FD3D3]"
                value={searchData.specialty}
                onChange={(e) => setSearchData({...searchData, specialty: e.target.value})}
                >
                  <option>Select Specialty</option>
                  {specialties.map((speciality) => (
                    <option key={speciality}>{speciality}</option>
                  ))}
                </select>
                              {/* City Dropdown */}
                <select
                  value={location.city} // Bind to location.city
                  onChange={(e) =>
                    setLocation({ ...location, city: e.target.value, suburb: "" , village: ""}) // Reset suburb when city changes
                  }
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring focus:ring-[#3FD3D3]"
                >
                  <option value="" disabled>
                    {location.city || location.state || "Select City"}
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>

                {/* Area Dropdown */}
                <select
                  value={location.suburb}
                  onChange={(e) => setLocation({ ...location, suburb: e.target.value })}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring focus:ring-[#3FD3D3]"
                  disabled={!location.city} // Disable if no city is selected
                >
                  <option value="" disabled>
                    {location.suburb || location.village ||  "Select Area"}
                  </option>
                  {cities
                    .find((city) => city.name === location.city)?.areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                </select>
                <input
                  type="text"
                  value={searchData.doctorName}
                  onChange={(e)=>setSearchData({...searchData, doctorName:e.target.value })  }
                  placeholder="Doctor or hospital name"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring focus:ring-[#3FD3D3]"
                />
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <img
              src={GPSIcon}
              alt="GPS icon"
              className="w-6 h-6 cursor-pointer dark:hidden"
              onClick={getLocation}
              aria-label="Use GPS location"
            />
            <img
              src={GPSIcon2}
              alt="GPS icon"
              className="w-6 h-6 cursor-pointer hidden dark:inline"
              onClick={getLocation}
              aria-label="Use GPS location"
            />
            <button className="px-7 relative h-12 flex w-full sm:w-max justify-center items-center before:bg-[#3FD3D3] before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95"
            onClick={handleSearch}
            >
              <span className="relative text-white font-bold">Search</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
