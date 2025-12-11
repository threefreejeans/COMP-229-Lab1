// src/pages/Projects.jsx
import React, { useEffect, useState, useContext } from "react";
import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import "./Projects.css";
import { apiFetch } from "../api/fetchClient";
import { AuthContext } from "../components/Common/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const localProjects = [
  {
    _id: "local-1",
    image: project1,
    title: "Project One",
    description:
      "Designed a responsive, user-friendly website for a restaurant to advertise their menu as well as their location",
    completion: null,
  },
  {
    _id: "local-2",
    image: project2,
    title: "Project Two",
    description:
      "Collaborated with a team using Agile practices to create an SRS document for a mobile app that allows users to make reservations in top-rated restaurants",
    completion: null,
  },
  {
    _id: "local-3",
    image: project3,
    title: "Project Three",
    description:
      "Built a personal finance tracker app using React Native. My role: Mobile Developer. Outcome: Users could track expenses and visualize data through charts effectively.",
    completion: null,
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(localProjects);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      try {
        const data = await apiFetch("/api/projects", { method: "GET" });
        // Expecting an array from the API. If empty or invalid, keep localProjects.
        if (mounted && Array.isArray(data) && data.length > 0) {
          // Map server projects to include an `image` fallback if none provided
          const mapped = data.map((p) => ({
            _id: p._id,
            image: p.image || project1, // fallback image if server doesn't provide one
            title: p.title || "Untitled Project",
            description: p.description || "",
            completion: p.completion || null,
          }));
          setProjects(mapped);
        } else if (mounted) {
          // keep localProjects if server returned nothing
          setProjects(localProjects);
        }
      } catch (err) {
        // On error, keep localProjects and log the error
        console.error("Failed to load projects:", err);
        if (mounted) setProjects(localProjects);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProjects();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (id) => {
    if (!user || user.role !== "admin") {
      alert("Only admins can delete projects.");
      return;
    }
    if (!window.confirm("Delete this project? This cannot be undone.")) return;

    try {
      // If id is a local fallback id, just remove locally
      if (id && id.startsWith("local-")) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
        return;
      }

      await apiFetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete project");
    }
  };

  const handleEdit = (id) => {
    // navigate to your edit page (implement /projects/edit/:id)
    navigate(`/projects/edit/${id}`);
  };

  return (
    <div className="projects-container">
      <h1 className="projects-heading">My Projects</h1>

      {user && user.role === "admin" && (
        <div className="projects-admin-actions">
          <Link to="/projects/new" className="btn btn-primary">
            Create Project
          </Link>
        </div>
      )}

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
              {project.completion && (
                <p className="project-completion">
                  Completion: {new Date(project.completion).toLocaleDateString()}
                </p>
              )}

              {user && user.role === "admin" && (
                <div className="project-admin-controls">
                  <button onClick={() => handleEdit(project._id)} className="btn">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
