import React from 'react';
import './Features.css'; // Import the regular CSS
import managementIcon from '../assets/features-icons/management-innovation-learn.svg';
import doctorIcon from '../assets/features-icons/male-doctor-to-guide.svg';
import aiIcon from '../assets/features-icons/artificial-intelligenceai.svg';
import controlIcon from '../assets/features-icons/interface-control.svg';

const ServiceCard = ({ title, description, icon }) => {
  return (
    <div className="service-card">
      <div className="service-card-header">
        <div className="service-card-icon-wrapper">
          <img src={icon} alt="icon" className="service-card-img" />
        </div>
      </div>
      <div className="service-card-content">
        <h2 className="service-card-title">{title}</h2>
        <p className="service-card-description">{description}</p>
      </div>
    </div>
  );
};

const services = [
  {
    id: 1,
    title: "Artificial Intelligence",
    description: "We provide AI services to help patients determine the best specialty and offer medical guidance.",
    icon: aiIcon,
  },
  {
    id: 2,
    title: "Top Doctors",
    description: "We have the best specialized doctors across various medical fields.",
    icon: doctorIcon,
  },
  {
    id: 3,
    title: "Appointment Management",
    description: "Easily book an appointment with your preferred doctor.",
    icon: managementIcon,
  },
  {
    id: 4,
    title: "User-Friendly Dashboard",
    description: "The dashboard allows you to track your medical cases and scheduled appointments.",
    icon: controlIcon,
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="gradient-box gradient-one"></div>
      <div className="gradient-box gradient-two"></div>

      <div className="features-container">
        <div className="features-header">
          <span className="features-header-title">Our Services</span>
          <h2 className="features-header-title">
            We help you by providing the best services and modern technology.
          </h2>
          <p className="features-header-subtitle">
            Many features for both patients and doctors to streamline the medical process and improve services.
          </p>
        </div>
        <div className="features-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
