import './Education.css';

const Education = () => {
  const educationList = [
    {
      institution: 'Centennial College',
      degree: 'Software Engineering Technology',
      startYear: '2024',
      endYear: '2027',
      description: '', 
    },
    {
      institution: 'De La Salle University',
      degree: 'Bacherlor of Science in Interactive Entertainment',
      startYear: '2019',
      endYear: '2023',
      description: '',
    }

  ];

  return (
    <div className="education-container">
      <h1 className="education-heading">Education & Qualifications</h1>
      <div className="education-list">
        {educationList.map((edu, index) => (
          <div className="education-card" key={index}>
            <h2 className="education-degree">{edu.degree}</h2>
            <h3 className="education-institution">{edu.institution}</h3>
            <p className="education-dates">{edu.startYear} - {edu.endYear}</p>
            <p className="education-description">{edu.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
