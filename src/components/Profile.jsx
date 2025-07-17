import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch user profile:', err);
        setMessage('❌ You are not authorized. Please log in.');
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        'http://localhost:8080/api/users/update',
        {
          name: user.name,
          contactNumber: user.contactNumber,
          address: user.address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditing(false);
      setMessage('✅ Profile updated successfully!');
    } catch (err) {
      console.error('❌ Error:', err.response?.data);
      setMessage('❌ Failed to update profile. Please try again.');
    }
  };

  if (!user) return <p className="text-center mt-5">⏳ Loading your profile...</p>;

  return (
    <>
    <Navbar/>
    
    <div className="container mt-5" style={styles.container}>
      <h2 className="text-center mb-4" style={styles.heading}>👤 My Profile</h2>
      {message && (
        <div
          className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`}
        >
          {message}
        </div>
      )}

      <div style={styles.card}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>📧 Email</label>
          <input type="text" value={user.email} className="form-control" readOnly />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>🛡️ Role</label>
          <input type="text" value={user.role} className="form-control" readOnly />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>📝 Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-control"
            readOnly={!isEditing}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>📞 Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={user.contactNumber}
            onChange={handleChange}
            className="form-control"
            readOnly={!isEditing}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>🏠 Address</label>
          <textarea
            name="address"
            value={user.address}
            onChange={handleChange}
            className="form-control"
            rows={3}
            readOnly={!isEditing}
          />
        </div>

        <div className="text-end mt-3">
          {!isEditing ? (
            <button className="btn btn-danger" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          ) : (
            <>
              <button className="btn btn-success me-2" onClick={handleUpdate}>
                💾 Save
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                ❌ Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '650px',
  },
  heading: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
    border: '1px solid #e0e0e0',
  },
  fieldGroup: {
    marginBottom: '20px',
  },
  label: {
    fontWeight: 600,
    marginBottom: '6px',
    display: 'block',
    color: '#343a40',
  },
};

export default Profile;
