import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const ticketRefs = useRef({}); // store refs for each ticket

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error('❌ Error fetching bookings:', err);
        setError('Failed to load your bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const cancelBooking = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/bookings/${bookingId}/cancel`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: 'CANCELLED' } : b
        )
      );
    } catch (err) {
      console.error('❌ Error cancelling booking:', err);
      alert('Failed to cancel the booking.');
    }
  };

  const downloadPDF = (bookingId) => {
  const input = ticketRefs.current[bookingId];
  if (!input) return;

  // Temporarily make it visible off-screen
  input.style.display = 'block';
  input.style.position = 'absolute';
  input.style.left = '-9999px';

  setTimeout(() => {
    html2canvas(input, { useCORS: true, scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ticket-${bookingId}.pdf`);

      // Hide again after rendering
      input.style.display = 'none';
    }).catch((err) => {
      console.error('Error generating PDF:', err);
      input.style.display = 'none';
    });
  }, 300); // give the DOM time to render properly
};


  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h2 style={styles.heading}>🧾 My Bookings</h2>

        {loading && <p style={styles.infoText}>⏳ Loading bookings...</p>}
        {error && <p style={styles.errorText}>{error}</p>}
        {!loading && bookings.length === 0 && (
          <p style={styles.infoText}>No bookings found.</p>
        )}

        {!loading && bookings.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover border shadow-sm">
              <thead className="table-danger text-center">
                <tr>
                  <th>#</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Fare</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-center align-middle">
                {bookings.map((b, index) => (
                  <tr key={b.id}>
                    <td>{index + 1}</td>
                    <td>
                      {b.route
                        ? `${b.route.origin} → ${b.route.destination}`
                        : 'N/A'}
                    </td>
                    <td>{b.journeyDate}</td>
                    <td>
                      <span
                        className={`badge rounded-pill ${
                          b.status === 'CANCELLED'
                            ? 'bg-danger'
                            : 'bg-success'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td>₹{b.totalFare}</td>
                    <td>
                      {b.status !== 'CANCELLED' ? (
                        <>
                          <button
                            className="btn btn-sm btn-outline-danger me-2"
                            onClick={() => cancelBooking(b.id)}
                          >
                            ❌ Cancel
                          </button>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => downloadPDF(b.id)}
                          >
                            📄 Download Ticket
                          </button>
                        </>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Hidden ticket layout for each booking */}
        {bookings.map((b) => (
          <div
            key={b.id}
            ref={(el) => (ticketRefs.current[b.id] = el)}
            style={{
              padding: '20px',
              display: 'none',
              backgroundColor: 'white',
              width: '600px',
              fontFamily: "'Segoe UI', sans-serif",
              color: '#333',
              border: '1px solid #ccc',
            }}
          >
            <h2 style={{ color: '#dc3545' }}>🎫 FastX Ticket</h2>
            <p><strong>Booking ID:</strong> {b.id}</p>
            <p><strong>Route:</strong> {b.route?.origin} → {b.route?.destination}</p>
            <p><strong>Date:</strong> {b.journeyDate}</p>
            <p><strong>Status:</strong> {b.status}</p>
            <p><strong>Fare:</strong> ₹{b.totalFare}</p>
            <p style={{ marginTop: '30px' }}><em>Thank you for choosing FastX 🚍</em></p>
          </div>
        ))}
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
  },
  heading: {
    color: '#dc3545',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '30px',
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
    fontWeight: 'bold',
    marginBottom: '20px',
  },
};

export default MyBookings;
