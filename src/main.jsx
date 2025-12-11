// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Education from "./pages/Education.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";

import SignIn from "./components/Auth/SignIn.jsx";
import SignUp from "./components/Auth/SignUp.jsx";
import ProtectedRoute from "./components/Common/ProtectedRoute.jsx";
import EducationForm from "./components/Education/EducationForm.jsx";
import ProjectForm from "./components/Projects/ProjectForm.jsx";

import AuthProvider from "./components/Common/AuthProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Projects */}
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/projects/new"
            element={
              <ProtectedRoute adminOnly={true}>
                <ProjectForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/edit/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <ProjectForm />
              </ProtectedRoute>
            }
          />

          {/* Education */}
          <Route path="/education" element={<Education />} />
          <Route
            path="/education/new"
            element={
              <ProtectedRoute adminOnly={true}>
                <EducationForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/education/edit/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <EducationForm />
              </ProtectedRoute>
            }
          />

          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
