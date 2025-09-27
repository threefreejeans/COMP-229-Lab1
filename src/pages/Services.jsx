import './Services.css';

const Services = () => {
  const servicesList = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'General Programming',
    'Consulting',
  ];

  return (
    <div className="services-container">
      <h1 className="services-heading">Services I Offer</h1>
      <ul className="services-list">
        {servicesList.map((service, index) => (
          <li key={index} className="service-item">{service}</li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
