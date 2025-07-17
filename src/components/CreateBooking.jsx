import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const CreateBooking = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [userId, setUserId] = useState('');
  const [matchingRoutes, setMatchingRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [journeyDate, setJourneyDate] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentMode, setPaymentMode] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.sub);
    }
  }, []);

  const fetchAvailableSeats = async (busId, date) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/seats/available', {
        params: { busId, date },
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvailableSeats(res.data);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to fetch seats.');
    }
  };

  const handleSearchRoutes = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/routes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filtered = res.data.filter(
        (route) =>
          route.origin.toLowerCase() === origin.toLowerCase() &&
          route.destination.toLowerCase() === destination.toLowerCase()
      );
      setMatchingRoutes(filtered);
      setStep(1);
      setSelectedRoute(null);
    } catch (err) {
      console.error(err);
      setMessage('❌ Unauthorized or error fetching routes.');
    }
  };

  const handleShowAllRoutes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/routes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatchingRoutes(res.data);
      setStep(1);
      setSelectedRoute(null);
    } catch (err) {
      console.error(err);
      setMessage('❌ Unauthorized or error fetching routes.');
    }
  };

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
    setStep(2);
    setMessage('');
  };

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setJourneyDate(date);
    if (selectedRoute && date) {
      await fetchAvailableSeats(selectedRoute.bus.id, date);
    }
  };

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      // 1. Create Booking
      const bookingRes = await axios.post(
        'http://localhost:8080/api/bookings',
        {
          route: { id: selectedRoute.id },
          status: 'CONFIRMED',
          journeyDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const bookingId = bookingRes.data.id;

      // 2. Book Seats
      await axios.put(
        `http://localhost:8080/api/seats/book?bookingId=${bookingId}`,
        selectedSeats,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        
      );
      

      // 3. Create Payment
      const transactionId = 'TXN' + Math.floor(Math.random() * 1000000000);
      const paymentData = {
        amount: selectedRoute.fare * selectedSeats.length,
        status: 'SUCCESS',
        paymentMode,
        transactionId,
        paymentDate: new Date().toISOString(),
        booking: { id: bookingId },
      };

      await axios.post('http://localhost:8080/api/payments', paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('✅ Booking successful! Booking ID: ' + bookingId);
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Booking failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h2 style={styles.heading}>🚌 Book Your Journey</h2>

        {step === 1 && (
          <div style={styles.card}>
            <form onSubmit={handleSearchRoutes} style={styles.form}>
              <input type="text" placeholder="From" value={origin} onChange={(e) => setOrigin(e.target.value)} required style={styles.input} />
              <input type="text" placeholder="To" value={destination} onChange={(e) => setDestination(e.target.value)} required style={styles.input} />
              <button type="submit" style={styles.primaryButton}>🔍 Search</button>
              <button type="button" onClick={handleShowAllRoutes} style={styles.secondaryButton}>📋 Show All</button>
            </form>

            {matchingRoutes.length > 0 && (
              <div style={styles.routesGrid}>
                {matchingRoutes.map((route) => (
                  <div key={route.id} style={styles.routeCard}>
                    <h4>{route.bus.busName}</h4>
                    <p><strong>From:</strong> {route.origin} ➡️ {route.destination}</p>
                    <p><strong>Fare:</strong> ₹{route.fare}</p>
                    <p><strong>Time:</strong> {route.arrivalTime}</p>
                    <button onClick={() => handleSelectRoute(route)} style={styles.successButton}>📩 Book This</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 2 && selectedRoute && (
          <div style={styles.card}>
            <h3>🎟️ Confirm Booking</h3>
            <p><strong>Bus:</strong> {selectedRoute.bus.busName}</p>
            <p><strong>Route:</strong> {selectedRoute.origin} ➡️ {selectedRoute.destination}</p>

            <form onSubmit={handleBooking}>
              <input
                type="date"
                value={journeyDate}
                onChange={handleDateChange}
                required
                min={new Date().toISOString().split("T")[0]}
                style={styles.input}
              />

              {availableSeats.length > 0 && (
                <>
                  <p style={{ marginTop: '20px' }}><strong>💺 Select Seats:</strong></p>
                  <div style={styles.seatGrid}>
                    {availableSeats.map((seat) => (
                      <div
                        key={seat.id}
                        onClick={() => toggleSeat(seat.id)}
                        style={{
                          ...styles.seat,
                          backgroundColor: selectedSeats.includes(seat.id) ? '#28a745' : '#e9ecef',
                          color: selectedSeats.includes(seat.id) ? '#fff' : '#343a40',
                        }}
                      >
                        {seat.seatNumber}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div style={{ marginTop: '20px' }}>
                <label><strong>💳 Select Payment Mode:</strong></label><br />
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  required
                  style={{ ...styles.input, maxWidth: '300px', marginTop: '10px' }}
                >
                  <option value="">Select Payment Mode</option>
                  <option value="CARD">Card</option>
                  <option value="UPI">UPI</option>
                  <option value="NETBANKING">Net Banking</option>
                  <option value="WALLET">Wallet</option>
                </select>
              </div>
              <div>
                <p style={{ marginTop: '20px' }}><strong>Total Fare: ₹</strong>
                {selectedRoute.fare * selectedSeats.length}</p>
              </div>

              <div style={styles.buttonRow}>
                <button type="submit" style={styles.primaryButton}>✅ Confirm</button>
                <button type="button" onClick={() => { setStep(1); setSelectedRoute(null); setJourneyDate(''); setSelectedSeats([]); }} style={styles.secondaryButton}>❌ Cancel</button>
              </div>

              {message && (
                <div style={styles.messageBox(message.includes('successful'))}>
                  {message}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  page: {
    padding: '40px 20px',
    background: 'linear-gradient(to right, #fff4f4, #fffafa)',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
    textAlign: 'center',
  },
  heading: {
    color: '#dc3545',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
    maxWidth: '960px',
    margin: 'auto',
    transition: '0.3s ease',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #ced4da',
    fontSize: '16px',
    minWidth: '220px',
    outline: 'none',
  },
  primaryButton: {
    padding: '12px 24px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  },
  secondaryButton: {
    padding: '12px 24px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  successButton: {
    marginTop: '12px',
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold',
  },
  routesGrid: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    marginTop: '30px',
  },
  routeCard: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '12px',
    padding: '18px',
    textAlign: 'left',
    transition: '0.2s',
    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
  },
  seatGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',
    marginTop: '10px',
  },
  seat: {
    padding: '12px 0',
    borderRadius: '8px',
    border: '1px solid #adb5bd',
    textAlign: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '30px',
  },
  messageBox: (success) => ({
    marginTop: '25px',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    color: success ? '#155724' : '#721c24',
    backgroundColor: success ? '#d4edda' : '#f8d7da',
    border: success ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
  }),
};

export default CreateBooking;
