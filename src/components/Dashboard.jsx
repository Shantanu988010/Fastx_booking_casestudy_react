import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    { label: '🎫 Make Bookings', path: '/book', description: 'See your ticket booking details.' },
    { label: '🚍 Available Buses', path: '/available-buses', description: 'Browse buses running across routes.' },
    { label: '🛣️ Available Routes', path: '/available-routes', description: 'Explore routes and timings.' },
    { label: '🪪 Profile', path: '/profile', description: 'Manage your personal information.' },
    { label: '💺 Seats', path: '/seats/:busId', description: 'Check and choose available seats.' },
    { label: '📅 My Bookings', path: '/my-bookings', description: 'Track and manage your bookings.' },
  ];

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        
        {/* Banner with Image and Overlaid Text */}
        <div style={styles.bannerContainer}>
          <img
            src="/images/bus22.jpg" // 🔁 Make sure this is in public/images/
            alt="Bus Banner"
            style={styles.bannerImage}
          />
          <div style={styles.bannerText}>
            <h2 style={styles.bannerHeading}>FastX User Dashboard</h2>
            <p style={styles.bannerSubheading}>Choose an action to get started</p>
          </div>
        </div>

        {/* Action Cards */}
        <div style={styles.grid}>
          {cards.map((card, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <h5 style={styles.cardTitle}>{card.label}</h5>
              <p style={styles.description}>{card.description}</p>
              <button
                style={styles.button}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#dc3545';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#dc3545';
                }}
                onClick={() => navigate(card.path)}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    padding: '0px 20px 40px',
    background: 'linear-gradient(to right, #fff4f4, #fffafa)',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
    textAlign: 'center',
  },

  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '12px',
    margin: '30px 0',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.7)',
  },
  bannerText: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    textAlign: 'center',
  },
  bannerHeading: {
    fontSize: '52px',
    fontWeight: 'bold',
    margin: 0,
  },
  bannerSubheading: {
    fontSize: '20px',
    marginTop: '10px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '50px',
    maxWidth: '1100px',
    margin: '0 auto',
    width: '100%',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '50px 30px',
    height: '240px',
    borderRadius: '18px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
    transition: 'transform 0.3s ease',
    display: 'flex',
    border: '3px solid #e0e0e0',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#343a40',
    marginBottom: '10px',
  },
  description: {
    fontSize: '15px',
    color: '#6c757d',
    marginBottom: '20px',
    flexGrow: 1,
  },
  button: {
    padding: '12px 24px',
    border: '2px solid #dc3545',
    backgroundColor: 'transparent',
    color: '#dc3545',
    fontSize: '15px',
    borderRadius: '50px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
  },
};

export default Dashboard;
