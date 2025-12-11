// src/pages/Education.jsx
import React, { useEffect, useState, useContext } from "react";
import "./Education.css";
import { apiFetch } from "../api/fetchClient";
import { AuthContext } from "../components/Common/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const localEducation = [
  {
    _id: "local-1",
    institution: "Centennial College",
    degree: "Software Engineering Technology",
    startYear: "2024",
    endYear: "2027",
    description: "",
  },
  {
    _id: "local-2",
    institution: "De La Salle University",
    degree: "Bachelor of Science in Interactive Entertainment",
    startYear: "2019",
    endYear: "2023",
    description: "",
  },
];

export default function Education() {
  const [educationList, setEducationList] = useState(localEducation);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await apiFetch("/api/educations", { method: "GET" });
        if (mounted && Array.isArray(data) && data.length > 0) {
          setEducationList(
            data.map((e) => ({
              _id: e._id,
              institution: e.institution || "Unknown",
              degree: e.degree || "",
              startYear: e.startYear || "",
              endYear: e.endYear || "",
              description: e.description || "",
            }))
          );
        } else if (mounted) {
          setEducationList(localEducation);
        }
      } catch (err) {
        console.error("Failed to load education items:", err);
        if (mounted) setEducationList(localEducation);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (id) => {
    if (!user || user.role !== "admin") {
      alert("Only admins can delete education entries.");
      return;
    }
    if (!window.confirm("Delete this education entry? This cannot be undone.")) return;

    try {
      if (id && id.startsWith("local-")) {
        setEducationList((prev) => prev.filter((e) => e._id !== id));
        return;
      }
      await apiFetch(`/api/educations/${id}`, { method: "DELETE" });
      setEducationList((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete education entry");
    }
  };

  const handleEdit = (id) => {
    navigate(`/education/edit/${id}`);
  };

  return (
    <div className="education-container">
      <h1 className="education-heading">Education & Qualifications</h1>

      {user && user.role === "admin" && (
        <div className="education-admin-actions">
          <Link to="/education/new" className="btn btn-primary">
            Add Qualification
          </Link>
        </div>
      )}

      {loading ? (
        <p>Loading education...</p>
      ) : (
        <div className="education-list">
          {educationList.map((edu) => (
            <div className="education-card" key={edu._id}>
              <h2 className="education-degree">{edu.degree}</h2>
              <h3 className="education-institution">{edu.institution}</h3>
              <p className="education-dates">
                {edu.startYear} - {edu.endYear}
              </p>
              <p className="education-description">{edu.description}</p>

              {user && user.role === "admin" && (
                <div className="education-admin-controls">
                  <button onClick={() => handleEdit(edu._id)} className="btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(edu._id)} className="btn btn-danger">
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
