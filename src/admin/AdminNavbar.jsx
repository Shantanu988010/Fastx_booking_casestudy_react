import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm py-3 fixed-top">
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold fs-2"
          to="/admin/dashboard"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <span style={{ color: '#0f0103ff' }}>Fast</span>
          <span style={{ color: '#ffc107' }}>X</span>&nbsp;
          <em style={{ color: '#343a40', fontSize: '1.3rem' }}>Bus Booking</em>
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="adminNavbar">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/admin/buses">Buses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/admin/routes">Routes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/admin/users">Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/admin/bookings">Bookings</Link>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger ms-3 fw-semibold"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
