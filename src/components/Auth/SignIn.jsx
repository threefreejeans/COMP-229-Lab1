// src/components/Auth/SignIn.jsx
import React, { useState, useContext } from "react";
import { apiFetch } from "../../api/fetchClient";
import { AuthContext } from "../Common/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const data = await apiFetch("/api/auth/signin", {
        method: "POST",
        body: form,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/"); // redirect to home or dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signin">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        <button type="submit">Sign In</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
