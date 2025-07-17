import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3 fixed-top">
      <div className="container">
        {/* Brand Title */}
        <span
          className="navbar-brand fw-bold fs-2"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          onClick={() => navigate('/')}
        >
          <span style={{ color: '#212529' }}>Fast</span>
          <span style={{ color: '#ffc107' }}>X</span>&nbsp;
          <em style={{ color: '#343a40', fontSize: '1.3rem' }}>Bus Booking</em>
        </span>

        {/* Toggle for mobile */}
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
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link fw-semibold">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/available-buses" className="nav-link fw-semibold">Buses</Link>
            </li>
            <li className="nav-item">
              <Link to="/available-routes" className="nav-link fw-semibold">Routes</Link>
            </li>
            <li className="nav-item">
              <Link to="/my-bookings" className="nav-link fw-semibold">My Bookings</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link fw-semibold">Profile</Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-danger btn-sm ms-2 px-3 rounded-pill">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
