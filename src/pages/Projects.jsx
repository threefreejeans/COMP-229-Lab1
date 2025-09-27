import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      image: project1,
      title: 'Project One',
      description: 'Designed a responsive, user-friendly website for a restaurant to advertise their menu as well as their location',
    },
    {
      image: project2,
      title: 'Project Two',
      description: 'Collaborated with a team using Agile practices to create an SRS document for a mobile app that allows users to make reservations in top-rated restaurants',
    },
    {
      image: project3,
      title: 'Project Three',
      description: 'Built a personal finance tracker app using React Native. My role: Mobile Developer. Outcome: Users could track expenses and visualize data through charts effectively.',
    },
  ];

  return (
    <div className="projects-container">
      <h1 className="projects-heading">My Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.image} alt={project.title} className="project-image" />
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
