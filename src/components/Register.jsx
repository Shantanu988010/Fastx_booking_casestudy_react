import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OGNavbar from './OGNavbar';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    address: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...formData,
      role: 'USER'
    };

    try {
      const res = await axios.post('http://localhost:8080/auth/register', payload);
      console.log(res.data);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Try again.');
    }
  };

  return (
    <>
      <OGNavbar />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          background: "linear-gradient(135deg, #fff5f5, #ffe6e6, #fff0f0)",
          fontFamily: "'Segoe UI', sans-serif"
        }}
      >
        <div
          className="p-5 shadow rounded-4 bg-white"
          style={{
            width: '100%',
            maxWidth: '500px',
            border: "1px solid #f3dcdc"
          }}
        >
          <h2 className="text-center text-danger fw-bold mb-4">Create Account</h2>

          <form onSubmit={handleSubmit} className="d-grid gap-3">
            <input
              name="name"
              placeholder="Name"
              className="form-control"
              onChange={handleChange}
              value={formData.name}
              required
            />
            <input
              name="email"
              placeholder="Email"
              className="form-control"
              type="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <input
              name="password"
              placeholder="Password"
              className="form-control"
              type="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <input
              name="contactNumber"
              placeholder="Contact Number"
              className="form-control"
              onChange={handleChange}
              value={formData.contactNumber}
            />
            <input
              name="address"
              placeholder="Address"
              className="form-control"
              onChange={handleChange}
              value={formData.address}
            />

            <button type="submit" className="btn btn-danger btn-lg rounded-pill fw-semibold">
              Register
            </button>
          </form>

          {error && <p className="text-danger mt-3 text-center">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Register;
