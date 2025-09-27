import profilePic from '../assets/profile.jpg';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">About Me</h1>
      
      <img
        src={profilePic}
        alt="Profile"
        className="about-image"
      />
      
      <h2 className="about-name">Kian Matthew Santos</h2>
      
      <p className="about-paragraph">
        I am Kian Santos, a Full Stack Developer passionate about building interactive and user-friendly web applications. 
        I love learning new technologies and applying them to solve real-world problems. Outside of coding, I enjoy reading and playing video games.
      </p>
      
      {/* Resume Link */}
      <a 
        href="/resume.pdf" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="resume-link"
      >
        View My Resume (PDF)
      </a>
    </div>
  );
};

export default About;