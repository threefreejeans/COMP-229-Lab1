import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to My Portfolio</h1>
      <p className="home-subtitle">
        Hi! I am <strong>Kian Santos</strong>, a passionate developer dedicated to creating modern, responsive, and impactful web experiences.
      </p>
      
      {/* Mission Statement */}
      <p className="home-mission">
        <strong>Mission:</strong> My mission is to craft innovative web solutions that help businesses and individuals achieve their goals efficiently and beautifully.
      </p>
      
      {/* Navigation Buttons */}
      <div className="home-buttons">
        <Link to="/about" className="home-button">Learn More About Me</Link>
        <Link to="/projects" className="home-button">View My Projects</Link>
      </div>
    </div>
  );
};

export default Home;

