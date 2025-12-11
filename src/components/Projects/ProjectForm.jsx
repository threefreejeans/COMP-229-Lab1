// src/components/Projects/ProjectForm.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../api/fetchClient";
import { AuthContext } from "../Common/AuthProvider";
import "./ProjectForm.css"; // optional: create for styling

export default function ProjectForm() {
  const { id } = useParams(); // undefined for "new"
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    completion: "",
    imageUrl: "", // optional direct URL
  });
  const [imageFile, setImageFile] = useState(null); // optional file upload
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadProject() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await apiFetch(`/api/projects/${id}`, { method: "GET" });
        if (mounted && data) {
          setForm({
            title: data.title || "",
            description: data.description || "",
            completion: data.completion ? data.completion.split("T")[0] : "",
            imageUrl: data.image || "",
          });
        }
      } catch (err) {
        console.error("Failed to load project:", err);
        setMessage(err.message || "Failed to load project");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadProject();
    return () => (mounted = false);
  }, [id]);

  if (!user || user.role !== "admin") {
    return <p className="access-denied">Access denied. Admins only.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setImageFile(file || null);
  };

  const validate = () => {
    if (!form.title.trim()) {
      setMessage("Title is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validate()) return;

    setLoading(true);
    try {
      // If a file is provided, use FormData so backend can accept multipart/form-data
      if (imageFile) {
        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("description", form.description);
        if (form.completion) fd.append("completion", form.completion);
        fd.append("image", imageFile);

        if (id) {
          await apiFetch(`/api/projects/${id}`, { method: "PUT", body: fd });
        } else {
          await apiFetch("/api/projects", { method: "POST", body: fd });
        }
      } else {
        // Send JSON payload (imageUrl optional)
        const payload = {
          title: form.title,
          description: form.description,
          completion: form.completion || null,
          image: form.imageUrl || null,
        };

        if (id) {
          await apiFetch(`/api/projects/${id}`, { method: "PUT", body: payload });
        } else {
          await apiFetch("/api/projects", { method: "POST", body: payload });
        }
      }

      navigate("/projects");
    } catch (err) {
      console.error("Save project error:", err);
      setMessage(err.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="project-form-container">
      <h2>{id ? "Edit Project" : "Create Project"}</h2>

      {message && <div className="form-message">{message}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="project-form">
          <label>
            Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Project title"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description"
            />
          </label>

          <label>
            Completion Date
            <input
              name="completion"
              type="date"
              value={form.completion}
              onChange={handleChange}
            />
          </label>

          <label>
            Image URL (optional)
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </label>

          <label>
            Or upload image file (optional)
            <input name="imageFile" type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          {form.imageUrl && !imageFile && (
            <div className="image-preview">
              <p>Preview from URL:</p>
              <img src={form.imageUrl} alt="preview" style={{ maxWidth: "240px" }} />
            </div>
          )}

          {imageFile && (
            <div className="image-preview">
              <p>Selected file: {imageFile.name}</p>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {id ? "Save Changes" : "Create Project"}
            </button>
            <button type="button" className="btn" onClick={() => navigate("/projects")}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
