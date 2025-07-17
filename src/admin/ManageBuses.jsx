import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [editingBusId, setEditingBusId] = useState(null);
  const [editedBus, setEditedBus] = useState({});
  const [newBus, setNewBus] = useState({
    busName: '',
    busNumber: '',
    busType: 'SEATER',
    totalSeats: '',
    chargingPoint: false,
    waterBottle: false,
    tv: false,
  });

  const token = localStorage.getItem('token');

  const fetchBuses = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/buses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuses(res.data);
    } catch (err) {
      console.error('Failed to fetch buses', err);
    }
  }, [token]);

  useEffect(() => {
    fetchBuses();
  }, [fetchBuses]);

  const handleEdit = (bus) => {
    setEditingBusId(bus.id);
    setEditedBus({ ...bus });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBus((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/buses/${editingBusId}`, editedBus, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchBuses();
      setEditingBusId(null);
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleNewBusChange = (e) => {
    const { name, value } = e.target;
    setNewBus((prev) => ({
      ...prev,
      [name]: name === 'totalSeats' ? Number(value) : value,
    }));
  };

  const handleNewBusCheckbox = (e) => {
    const { name, checked } = e.target;
    setNewBus((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleAddBus = async () => {
    try {
      await axios.post('http://localhost:8080/api/buses', newBus, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewBus({
        busName: '',
        busNumber: '',
        busType: 'SEATER',
        totalSeats: '',
        chargingPoint: false,
        waterBottle: false,
        tv: false,
      });
      fetchBuses();
    } catch (err) {
      console.error('Error adding new bus', err);
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="container mt-5">
      <h2 className="text-center mb-4">🚌 Manage Buses</h2>

      <div className="card p-3 mb-4">
        <h4>Add New Bus</h4>
        <div className="row g-2">
          <div className="col-md-4">
            <input
              className="form-control"
              name="busName"
              placeholder="Bus Name"
              value={newBus.busName}
              onChange={handleNewBusChange}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              name="busNumber"
              placeholder="Bus Number"
              value={newBus.busNumber}
              onChange={handleNewBusChange}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              name="busType"
              value={newBus.busType}
              onChange={handleNewBusChange}
            >
              <option value="SEATER">SEATER</option>
              <option value="SEMI_SLEEPER">SEMI_SLEEPER</option>
              <option value="SLEEPER_AC">SLEEPER_AC</option>
              <option value="SLEEPER_NON_AC">SLEEPER_NON_AC</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              name="totalSeats"
              type="number"
              placeholder="Total Seats"
              value={newBus.totalSeats}
              onChange={handleNewBusChange}
            />
          </div>
          <div className="col-md-3">
            <label>
              <input
                type="checkbox"
                name="chargingPoint"
                checked={newBus.chargingPoint}
                onChange={handleNewBusCheckbox}
              /> Charging Point
            </label>
          </div>
          <div className="col-md-3">
            <label>
              <input
                type="checkbox"
                name="waterBottle"
                checked={newBus.waterBottle}
                onChange={handleNewBusCheckbox}
              /> Water Bottle
            </label>
          </div>
          <div className="col-md-3">
            <label>
              <input
                type="checkbox"
                name="tv"
                checked={newBus.tv}
                onChange={handleNewBusCheckbox}
              /> TV
            </label>
          </div>
          <div className="col-md-12 text-end">
            <button className="btn btn-success mt-2" onClick={handleAddBus}>
              ➕ Add Bus
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Bus Name</th>
              <th>Number</th>
              <th>Type</th>
              <th>Total Seats</th>
              <th>Charging Point</th>
              <th>Water</th>
              <th>TV</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.id}</td>
                <td>
                  {editingBusId === bus.id ? (
                    <input
                      name="busName"
                      value={editedBus.busName}
                      onChange={handleChange}
                    />
                  ) : (
                    bus.busName
                  )}
                </td>
                <td>
                  {editingBusId === bus.id ? (
                    <input
                      name="busNumber"
                      value={editedBus.busNumber}
                      onChange={handleChange}
                    />
                  ) : (
                    bus.busNumber
                  )}
                </td>
                <td>
                  {editingBusId === bus.id ? (
                    <select
                      name="busType"
                      value={editedBus.busType}
                      onChange={handleChange}
                    >
                      <option value="SEATER">SEATER</option>
                      <option value="SEMI_SLEEPER">SEMI_SLEEPER</option>
                      <option value="SLEEPER_AC">SLEEPER_AC</option>
                      <option value="SLEEPER_NON_AC">SLEEPER_NON_AC</option>
                    </select>
                  ) : (
                    bus.busType
                  )}
                </td>
                <td>
                  {editingBusId === bus.id ? (
                    <input
                      type="number"
                      name="totalSeats"
                      value={editedBus.totalSeats}
                      onChange={handleChange}
                    />
                  ) : (
                    bus.totalSeats
                  )}
                </td>
                <td>{bus.chargingPoint ? 'Yes' : 'No'}</td>
                <td>{bus.waterBottle ? 'Yes' : 'No'}</td>
                <td>{bus.tv ? 'Yes' : 'No'}</td>
                <td>
                  {editingBusId === bus.id ? (
                    <button className="btn btn-success btn-sm" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(bus)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ManageBuses;
