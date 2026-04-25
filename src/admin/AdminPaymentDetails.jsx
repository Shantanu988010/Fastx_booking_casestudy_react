import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const AdminPaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/payments/admin-view', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayments(res.data);
      } catch (error) {
        console.error('❌ Failed to fetch payments : ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [token]);

  return (
    <>
    <AdminNavbar/>
    <div className="container mt-5">
      <h2 className="text-center mb-4">💳 Admin Payment Details</h2>

      {loading ? (
        <p className="text-center">Loading payment data...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover border shadow-sm">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Booking ID</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="text-center align-middle">
              {payments.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.userName}</td>
                  <td>{p.userEmail}</td>
                  <td>{p.bookingId}</td>
                  <td>₹{p.amount.toFixed(2)}</td>
                  <td>{p.paymentMode}</td>
                  <td>
                    <span className={`badge rounded-pill ${p.status === 'SUCCESS' ? 'bg-success' : 'bg-danger'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{new Date(p.paymentDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminPaymentDetails;
