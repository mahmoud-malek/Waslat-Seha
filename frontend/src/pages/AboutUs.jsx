import React from "react";
import Navbar from '../components/Navbar'
import './AboutUs.css'
import Doctor from '../assets/doctor-photo.png'
import Footer from '../components/Footer'
import Doctors from '../assets/doctors.jpg'

export default function AboutUs() {
    return (
        <>
            <Navbar/>
            <div className="AboutUs">
                <section>
                    <div>
                        <h1>About Waslat Seha</h1>
                        <p>Revolutionizing Healthcare Access in the Digital Age</p>
                        <p>Our AI-powered platform connects patients with the right medical specialists, 
                           making healthcare more accessible and efficient.</p>
                        <p>We collaborate with verified, experienced doctors across multiple specialties
                           to provide comprehensive medical care.</p>
                        <p>Our smart appointment booking system helps you find available doctors
                           in your area with just a few clicks.</p>
                    </div>
                    <div>
                        <img src={Doctor} alt="Doctor using digital healthcare platform" />
                    </div>
                </section>
                
                <section className="section2">
                    <div>
                        <h1>Our Mission</h1>
                        <p>Bridging the Gap Between Patients and Healthcare Providers</p>
                        <p>Advanced AI Technology: Our system analyzes your symptoms to recommend
                           the most suitable medical specialists for your condition.</p>
                        <p>Streamlined Appointments: Easy-to-use booking system with real-time
                           availability and instant confirmations.</p>
                        <p>Location-Based Services: Find qualified doctors near you using our
                           integrated GPS technology.</p>
                        <p>Quality Healthcare: We partner only with certified medical professionals
                           to ensure the highest standard of care.</p>
                    </div>
                    <div>
                        <img src={Doctors} alt="Medical professionals team" />
                    </div>
                </section>

                <section>
                    <div>
                        <h1>Why Choose Us</h1>
                        <p>✓ AI-Powered Doctor Matching</p>
                        <p>✓ Real-Time Appointment Management</p>
                        <p>✓ Verified Medical Professionals</p>
                        <p>✓ Secure Patient Information</p>
                        <p>✓ 24/7 Online Access</p>
                        <p>✓ Location-Based Doctor Search</p>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )            
}
