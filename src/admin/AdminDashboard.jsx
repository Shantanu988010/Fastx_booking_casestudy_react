import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: '📋 View All Bookings',
      description: 'Monitor and manage all user bookings in the system.',
      path: '/admin/bookings',
    },
    {
      title: '🚌 Manage Buses',
      description: 'Add, edit, or remove buses and update bus details.',
      path: '/admin/buses',
    },
    {
      title: '🗺️ Manage Routes',
      description: 'Define or modify travel routes, fares, and times.',
      path: '/admin/routes',
    },
    {
      title: '👤 View Users',
      description: 'See all registered users and their roles.',
      path: '/admin/users',
    },
    {
      title: '💰 View Payments',
      description: 'See all Transactions.',
      path: '/admin/payments',
    },
  ];

  return (
    <>
      <AdminNavbar />
      <div style={styles.page}>
        
        {/* Banner with Overlaid Text */}
        <div style={styles.bannerContainer}>
          <img
            src="/images/bus22.jpg"
            alt="Bus Banner"
            style={styles.bannerImage}
          />
          <div style={styles.bannerText}>
            <h2 style={styles.bannerHeading}>🛠️ Admin Panel - FastX</h2>
            <p style={styles.bannerSubheading}>Manage bookings, users, buses and routes</p>
          </div>
        </div>

        {/* Cards */}
        <div style={styles.grid}>
          {cards.map((card, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 18px 36px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.05)';
              }}
            >
              <h5 style={styles.cardTitle}>{card.title}</h5>
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
};

const styles = {
  page: {
    padding: '0px 20px 40px',
    background: 'linear-gradient(to right, #fff4f4, #fffafa)',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
    textAlign: 'center',
  },

  // Banner styles
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
    fontSize: '42px',
    fontWeight: 'bold',
    margin: 0,
  },
  bannerSubheading: {
    fontSize: '18px',
    marginTop: '10px',
  },

  // Grid and cards
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '50px',
    maxWidth: '1100px',
    margin: '0 auto',
    width: '100%',
    padding: '20px',
  },
  card: {
    background: 'linear-gradient(135deg, #fefefe, #fff0f0)',
    padding: '40px 30px',
    minHeight: '260px',
    borderRadius: '20px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.05)',
    border: '3px solid #e0e0e0',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#dc3545',
    marginBottom: '12px',
  },
  description: {
    fontSize: '15.5px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '20px',
    flexGrow: 1,
  },
  button: {
    padding: '12px 24px',
    border: '2px solid #dc3545',
    backgroundColor: 'transparent',
    color: '#dc3545',
    fontSize: '15px',
    borderRadius: '30px',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(220, 53, 69, 0.4)',
    transition: 'all 0.3s ease',
    width: '100%',
  },
};

export default AdminDashboard;
