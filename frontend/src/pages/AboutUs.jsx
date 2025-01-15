import React from "react";
import Navbar from '../components/Navbar'
import './AboutUs.css'
import Doctor from '../assets/doctor-photo.png'
import Footer from '../components/Footer'
import Doctors from '../assets/doctors.jpg'
import GPS from '../components/GPS'

export default function AboutUs () {
    return (
        <>
           <Navbar/>
            <div className="AboutUs" >
                <section>

                <div>
                     <h1> About Us</h1>
                     <p>We help the patient find the right doctor</p>
                     <p>Specialized medical care: a team of doctors with experience in Fields </p>
                     <p> Advanced technologies: the latest medical equipment 
                     and devices and effective treatment.</p>
                     <p>At [waset saha], we strive to make healthcare accessible to everyone </p>
                </div>
                <div>
                    <img src={Doctor} alt="logo" />
                </div>
                </section>
                
                 <section className="section2">

                <div>
                     <h1> Our Story </h1>
                     <p>We help the patient find the right doctor</p>
                     <p>Specialized medical care: a team of doctors with experience in Fields </p>
                     <p> Advanced technologies: the latest medical equipment 
                     and devices and effective treatment.</p>
                     <p>At [waset saha], we strive to make healthcare accessible to everyone </p>
                </div>
                <div>
                    <img src={Doctors} alt="logo" />
                </div>
                </section>
                
            </div>
			<Footer />
			<GPS />
        </>
    )            
}