import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, [token]);

  return (
    <>
    <AdminNavbar/>
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Bookings</h2>

      <div className="table-responsive">
        <table className="table table-hover table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Booking ID</th>
              <th>User Name</th>
              <th>Journey Date</th>
              <th>Total Fare</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No bookings found</td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.user?.name || 'N/A'}</td>
                  
                  <td>{booking.journeyDate}</td>
                  <td>₹{booking.totalFare}</td>
                  <td>
                    <span className={`badge ${booking.status === 'CANCELLED' ? 'bg-danger' : 'bg-success'}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default AllBookings;
