import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AvailableRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/routes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoutes(res.data);
      } catch (err) {
        console.error('Error fetching routes:', err);
        setError('❌ Failed to load routes.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [token]);

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h2 style={styles.heading}>🗺️ Available Routes</h2>

        {loading && <p style={styles.infoText}>⏳ Loading available routes...</p>}
        {error && <p style={styles.errorText}>{error}</p>}
        {!loading && !error && routes.length === 0 && (
          <p style={styles.infoText}>No routes found at the moment.</p>
        )}

        <div style={styles.grid}>
          {routes.map((route) => (
            <div key={route.id} style={styles.card}>
              <h4 style={styles.routeTitle}>{route.origin} ➡️ {route.destination}</h4>
              <div style={styles.details}>
                <p><strong>📏 Distance:</strong> {route.distanceInKm} km</p>
                <p><strong>💸 Fare:</strong> ₹{route.fare}</p>
                <p><strong>🕒 Departure:</strong> {route.departureTime}</p>
                <p><strong>🛬 Arrival:</strong> {route.arrivalTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    padding: '30px 16px',
    background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    textAlign: 'center',
    color: '#dc3545',
    marginBottom: '30px',
    fontWeight: 'bold',
    fontSize: '28px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
    border: '1px solid #e0e0e0',
    transition: 'transform 0.2s ease-in-out',
  },
  routeTitle: {
    color: '#343a40',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
  },
  details: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#555',
  },
  infoText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: '16px',
    marginBottom: '20px',
  },
  errorText: {
    textAlign: 'center',
    color: '#dc3545',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
};

export default AvailableRoutes;
