import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AvailableBuses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/buses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBuses(response.data);
      } catch (err) {
        console.error('Error fetching buses:', err);
        setError('❌ Failed to load buses. You may not be authorized.');
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [token]);

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h2 style={styles.heading}>🚌 Available Buses</h2>

        {loading && <p style={styles.infoText}>⏳ Loading available buses...</p>}
        {error && <p style={styles.errorText}>{error}</p>}
        {!loading && !error && buses.length === 0 && (
          <p style={styles.infoText}>No buses are available at the moment.</p>
        )}

        <div style={styles.grid}>
          {buses.map((bus) => (
            <div key={bus.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span role="img" aria-label="bus" style={{ fontSize: 22 }}>🚌</span>
                <h4 style={styles.busName}>{bus.busName}</h4>
                <span style={styles.busType}>{bus.busType}</span>
              </div>

              <hr style={styles.divider} />

              <p><strong>Bus Number :</strong> <span style={styles.textValue}>{bus.busNumber}</span></p>
              <p><strong>Total Seats available :</strong> <span style={styles.textValue}>{bus.totalSeats}</span></p>

              <div style={styles.features}>
                <span style={{ ...styles.featureChip, backgroundColor: bus.waterBottle ? '#d4edda' : '#f8d7da' }}>
                  💧 Water: {bus.waterBottle ? 'Yes' : 'No'}
                </span>
                <span style={{ ...styles.featureChip, backgroundColor: bus.tv ? '#d1ecf1' : '#f8d7da' }}>
                  📺 TV: {bus.tv ? 'Yes' : 'No'}
                </span>
                <span style={{ ...styles.featureChip, backgroundColor: bus.chargingPoint ? '#fff3cd' : '#f8d7da' }}>
                  🔌 Charging: {bus.chargingPoint ? 'Available' : 'Not Available'}
                </span>
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

  divider: {
    border: '0.5px solid #ddd',
    margin: '10px 0',
  },
  textValue: {
    color: '#555',
  },
  card: {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '18px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
  border: '1px solid #e0e0e0',
  transition: 'transform 0.3s',
  fontSize: '15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
},

cardHeader: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '10px',
},

busName: {
  flex: 1,
  margin: 0,
  color: '#343a40',
  fontSize: '18px',
  fontWeight: '600',
  minWidth: '120px',
  wordBreak: 'break-word',
},

busType: {
  fontSize: '13px',
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '4px 10px',
  borderRadius: '20px',
  fontWeight: '500',
  whiteSpace: 'nowrap',
},

  features: {
    marginTop: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  featureChip: {
    padding: '6px 10px',
    borderRadius: '16px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#333',
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

export default AvailableBuses;
