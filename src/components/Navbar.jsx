// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./Common/AuthProvider";
import "./Navbar.css";

export default function Navbar() {
  const { user, signOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo">
          <Link to="/" className="logo-link" onClick={() => setOpen(false)}>
            <div className="hexagon">
              <span>KS</span>
            </div>
          </Link>
        </div>

        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          aria-label="Toggle navigation"
          onClick={() => setOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li>
            <NavLink to="/" onClick={() => setOpen(false)} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={() => setOpen(false)}>
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" onClick={() => setOpen(false)}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/education" onClick={() => setOpen(false)}>
              Education
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" onClick={() => setOpen(false)}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setOpen(false)}>
              Contact Me
            </NavLink>
          </li>

          {/* Admin quick links */}
          {user && user.role === "admin" && (
            <>
              <li className="nav-sep" />
              <li>
                <NavLink to="/projects/new" onClick={() => setOpen(false)}>
                  Create Project
                </NavLink>
              </li>
              <li>
                <NavLink to="/education/new" onClick={() => setOpen(false)}>
                  Add Qualification
                </NavLink>
              </li>
            </>
          )}

          {/* Auth actions */}
          <li className="nav-auth">
            {!user ? (
              <>
                <NavLink to="/signin" onClick={() => setOpen(false)}>
                  Sign In
                </NavLink>
                <NavLink to="/signup" onClick={() => setOpen(false)}>
                  Sign Up
                </NavLink>
              </>
            ) : (
              <div className="signed-in">
                <span className="user-name">Hi, {user.name?.split(" ")[0] || user.email}</span>
                <button className="signout-btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
