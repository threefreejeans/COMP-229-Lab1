// src/pages/Contact.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/fetchClient";
import { AuthContext } from "../components/Common/AuthProvider";
import "./Contact.css";

export default function Contact() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")?.[0] || "",
    lastName: user?.name?.split(" ")?.slice(1).join(" ") || "",
    contactNumber: "",
    email: user?.email || "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please provide your full name.");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required.");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Please enter a message.");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      firstName: user?.name?.split(" ")?.[0] || "",
      lastName: user?.name?.split(" ")?.slice(1).join(" ") || "",
      contactNumber: "",
      email: user?.email || "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validate()) return;

    setLoading(true);
    try {
      // POST to backend; backend should accept { firstname, lastname, contactNumber, email, message }
      const payload = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        contactNumber: formData.contactNumber,
        email: formData.email,
        message: formData.message,
      };

      await apiFetch("/api/contacts", { method: "POST", body: payload });

      setSuccess("Message sent successfully.");
      resetForm();

      // optional: redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 900);
    } catch (err) {
      setError(err.message || "Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-heading">Contact Me</h1>

      <div className="contact-content">
        {/* Contact Info Panel */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Email: santoskian26@gmail.com</p>
          <p>Phone: +1 647-675-479</p>
          <p>Location: Toronto, ON, Canada</p>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}

          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                resetForm();
                setError("");
                setSuccess("");
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
