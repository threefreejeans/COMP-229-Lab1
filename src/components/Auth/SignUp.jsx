// src/components/Auth/SignUp.jsx
import React, { useState } from "react";
import { apiFetch } from "../../api/fetchClient";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      await apiFetch("/api/users", { method: "POST", body: form });
      setMessage("Signup successful. Redirecting to sign in...");
      setTimeout(() => navigate("/signin"), 1000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} />
        </label>
        <button type="submit">Sign Up</button>
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
}
