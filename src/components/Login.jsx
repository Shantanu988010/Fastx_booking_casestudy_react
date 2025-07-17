import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OGNavbar from './OGNavbar';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8080/auth/login', credentials);
      const { token, role, email } = res.data;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('email', email);

        if (role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      console.error(err);
      setError('❌ Invalid username or password');
    }
  };

  return (
    <>
      <OGNavbar />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{

          backgroundPosition: 'center',
          fontFamily: "'Segoe UI', sans-serif"
        }}
      >
        <div
          className="p-5 shadow rounded-4 bg-white"
          style={{
            width: '100%',
            maxWidth: '450px',
            border: "1px solid #f3dcdc",
            backdropFilter: 'blur(2px)'
          }}
        >
          <h2 className="text-center text-danger fw-bold mb-4">Login</h2>

          <form onSubmit={handleSubmit} className="d-grid gap-3">
            <input
              name="username"
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
              value={credentials.username}
              required
            />
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              value={credentials.password}
              required
            />
            <button type="submit" className="btn btn-danger btn-lg rounded-pill fw-semibold">
              Login
            </button>
          </form>

          {error && <p className="text-danger mt-3 text-center">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
