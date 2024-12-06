import React from 'react';
import './Features.css'; // Import the regular CSS
import managementIcon from '../assets/features-icons/management-innovation-learn.svg'
import doctorIcon from '../assets/features-icons/male-doctor-to-guide.svg'
import aiIcon from '../assets/features-icons/artificial-intelligenceai.svg'
import controlIcon from '../assets/features-icons/interface-control.svg'

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
    title: "الذكاء الاصطناعي",
    description: "نقدم خدمة الذكاء الاصطناعي لمساعدة المريض في تحديد أفضل وانسب تخصص وتقديم الارشادات الطبية",
    icon: aiIcon
  },
  {
    id: 2,
    title: "أفضل الأطباء",
    description: "يوجد لدينا أفضل الأطباء المتخصصين في مختلف التخصصات الطبية ",
    icon: doctorIcon
  },
  {
    id: 3,
    title: "إدارة المواعيد",
    description: "امكانية حجز موعد مع الطبيب المفضل لديك بكل سهولة",
    icon: managementIcon
  },
  {
    id: 4,
    title: "لوحة تحكم سهلة ",
    description: "تمكنك لوحة التحكم من متابعة حالاتك الطبية والمواعيد المحددة",
    icon: controlIcon
  },
];

const Features = () => {
  return (
	  <section className="features-section">
		  <div class="gradient-box gradient-one"></div>
			<div class="gradient-box gradient-two"></div>

		  <div className="features-container">
			
        <div className="features-header">
			
          <span className="features-header-title">
            الخدمات
          </span>
          <h2 className="features-header-title">أحنا بنساعدك عن طريق توفير أفضل الخدمات والتكنولوجيا الحديثة</h2>
          <p className="features-header-subtitle">
            العديد من المميزات لكل من المريض والطبيب لتسهيل العملية الطبية وتحسين الخدمات الطبية
          </p>
        </div>
        <div className="features-grid">
          {services.map(service => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
