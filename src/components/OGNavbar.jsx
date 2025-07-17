import React from "react";
import { Link } from "react-router-dom";

function OGNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Brand Logo/Title */}
        <Link
          className="navbar-brand fw-bold fs-2"
          to="/"
          style={{ display: "flex", alignItems: "center" }}
        >
          <span style={{ color: "#212529" }}>Fast</span>
          <span style={{ color: "#ffc107" }}>X</span>&nbsp;
          <em style={{ color: "#343a40", fontSize: "1.3rem" }}>Bus Booking</em>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link fw-semibold fs-5" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold fs-5" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default OGNavbar;
