import React, { useState } from "react";
import aiIcon from "../assets/ai.svg";
import searchIcon from "../assets/search-document.svg";

// Data for the search options dummy data
const specialties = ["طبيب عام", "أسنان", "نفسي", "جلدية", "عظام", "عيون"];
const cities = [{ id: 1, name: "القاهرة", areas: ["المعادي", "التجمع الخامس", "المهندسين"] }
	, { id: 2, name: "الجيزة", areas: ["الهرم", "الدقي", "العجوزة"] }
	, { id: 3, name: "الإسكندرية", areas: ["العجمي", "المندرة", "المنشية"] }];

export default function SearchDoctor() {
  const [showTextField, setShowTextField] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <section id="searchSection" className="relative w-full min-h-screen">
      <div className="absolute top-0 inset-x-0 h-64 flex items-start">
        <div className="h-24 w-2/3 bg-gradient-to-br from-emerald-500 opacity-25 blur-2xl dark:from-[#570cac] dark:invisible dark:opacity-40"></div>
        <div className="h-20 w-3/5 bg-gradient-to-r from-[#8cd66a] opacity-40 blur-2xl dark:from-[#670ccf] dark:opacity-40"></div>
        <div aria-hidden="true" className="absolute inset-y-0 w-44 left-0 hidden dark:flex">
          <div className="h-full md:h-1/2 lg:h-full w-full bg-gradient-to-tr opacity-40 dark:blur-2xl dark:from-[#570cac] dark:opacity-20"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  min-h-screen dark:bg-gray-900 z-10">
        <div className="absolute top-1/3 -translate-y-1/2 w-5/6 right-0 h-[calc(80%+20px)] bg-gradient-to-tr opacity-10 from-emerald-500 to-pink-300 dark:from-[#570cac] dark:to-emerald-500 blur-2xl"></div>
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white my-4">
          ابحث عن دكتورك بالطريقة اللي تناسبك
        </h2>

        <div className="w-11/12 md:w-8/12 h-80 flex flex-col items-stretch z-50 bg-white dark:bg-transparent shadow-lg rounded-2xl p-4">
          <div className="flex flex-row justify-around items-center border-b border-gray-300 dark:border-gray-700 pb-2">
            {/* Option 1: Traditional */}
            <button
              onClick={() => setShowTextField(false)}
              className={`flex items-center justify-center px-4 py-2 rounded-full text-cyan-600 dark:text-cyan-400 font-bold hover:bg-[#3FD3D3]/10 dark:hover:bg-[#3FD3D3]/20 ${
                !showTextField ? "border-b-4 border-cyan-600 dark:border-cyan-400" : ""
              }`}
            >
						  <img src={searchIcon} alt="AI icon" className="w-7 h-7" />
						  <span className="ml-2">بالطريقة العادية</span>
            </button>

            {/* Option 2: AI */}
            <button
              onClick={() => setShowTextField(true)}
              className={`flex items-center justify-center px-4 py-2 rounded-full text-cyan-600 dark:text-cyan-400 font-bold hover:bg-[#3FD3D3]/10 dark:hover:bg-[#3FD3D3]/20 ${
                showTextField ? "border-b-4 border-cyan-600 dark:border-cyan-400" : ""
              }`}
            > <img src={aiIcon} alt="AI icon" className="w-6 h-6" />
						  <span className="ml-2">بالذكاء الاصطناعي</span>
						  
            </button>
          </div>

          <div className="mt-4">
            {/* Conditional rendering */}
            {showTextField ? (
              <div className="flex flex-col items-center">
                <label htmlFor="ai-search" className="text-gray-600 dark:text-gray-300 mb-2">
                  اوصف حالتك كأنك بتتكلم مع دكتور
                </label>
                <input
                  id="ai-search"
                  type="text"
                  placeholder="ابحث باستخدام الذكاء الاصطناعي"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring focus:ring-[#3FD3D3]"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Traditional Search Options */}
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring focus:ring-[#3FD3D3]">
                  <option>اختر التخصص</option>
                  {specialties.map((speciality) => (
                    <option key={speciality}>{speciality}</option>
                  ))}
                </select>
                <select onChange={(e)=> setSelectedCity(e.target.value)} className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring focus:ring-[#3FD3D3]">
                  <option value={""}>اختر المحافظة</option>
                  {cities.map((city) => (
					  <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring focus:ring-[#3FD3D3]"
				disabled={!selectedCity || selectedCity === ""}
				>
                  <option>اختر المنطقة</option>
				  {selectedCity && cities[parseInt(selectedCity, 10) - 1]?.areas.map((area) => (
					<option key={area}>{area}</option>
				  ))}
                  
                </select>
                <input
                  type="text"
                  placeholder="اكتب اسم الدكتور أو المستشفى"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring focus:ring-[#3FD3D3]"
                />
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="mt-4 flex justify-center">
            <button className="px-7 relative h-12 flex w-full sm:w-max justify-center items-center before:bg-[#3FD3D3] before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95">
              <span className="relative text-white font-bold">بحث</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}