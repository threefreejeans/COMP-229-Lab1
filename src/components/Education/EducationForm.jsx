// src/components/Education/EducationForm.jsx
import React, { useState, useEffect, useContext } from "react";
import { apiFetch } from "../../api/fetchClient";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Common/AuthProvider";

export default function EducationForm() {
  const { id } = useParams(); // id is undefined for "new"
  const [form, setForm] = useState({
    institution: "",
    degree: "",
    startYear: "",
    endYear: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await apiFetch(`/api/educations/${id}`, { method: "GET" });
        if (mounted && data) {
          setForm({
            institution: data.institution || "",
            degree: data.degree || "",
            startYear: data.startYear || "",
            endYear: data.endYear || "",
            description: data.description || "",
          });
        }
      } catch (err) {
        console.error("Failed to load education item:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [id]);

  if (!user || user.role !== "admin") {
    return <p>Access denied. Admins only.</p>;
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await apiFetch(`/api/educations/${id}`, { method: "PUT", body: form });
      } else {
        await apiFetch("/api/educations", { method: "POST", body: form });
      }
      navigate("/education");
    } catch (err) {
      alert(err.message || "Failed to save education entry");
    }
  };

  return (
    <div className="education-form-container">
      <h2>{id ? "Edit Qualification" : "Add Qualification"}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="education-form">
          <label>
            Institution
            <input name="institution" value={form.institution} onChange={handleChange} required />
          </label>
          <label>
            Degree
            <input name="degree" value={form.degree} onChange={handleChange} required />
          </label>
          <label>
            Start Year
            <input name="startYear" value={form.startYear} onChange={handleChange} />
          </label>
          <label>
            End Year
            <input name="endYear" value={form.endYear} onChange={handleChange} />
          </label>
          <label>
            Description
            <textarea name="description" value={form.description} onChange={handleChange} />
          </label>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn" onClick={() => navigate("/education")}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
