import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const ManageRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [editingRouteId, setEditingRouteId] = useState(null);
  const [editedRoute, setEditedRoute] = useState({});
  const [newRoute, setNewRoute] = useState({
    busId: '',
    origin: '',
    destination: '',
    fare: '',
    arrivalTime: ''
  });
  const [buses, setBuses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/routes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoutes(res.data);
      } catch (err) {
        console.error('Failed to fetch routes', err);
      }
    };

    const fetchBuses = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/buses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBuses(res.data);
      } catch (err) {
        console.error('Failed to fetch buses', err);
      }
    };

    fetchRoutes();
    fetchBuses();
  }, [token]);

  const handleEdit = (route) => {
    setEditingRouteId(route.id);
    setEditedRoute({ ...route });
  };

  const handleChange = (e) => {
    setEditedRoute((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/routes/${editingRouteId}`, editedRoute, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoutes((prev) =>
        prev.map((route) => (route.id === editingRouteId ? editedRoute : route))
      );
      setEditingRouteId(null);
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleNewRouteChange = (e) => {
    setNewRoute((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddRoute = async () => {
    try {
      const payload = {
        origin: newRoute.origin,
        destination: newRoute.destination,
        fare: Number(newRoute.fare),
        arrivalTime: newRoute.arrivalTime,
        bus: { id: Number(newRoute.busId) },
      };

      const res = await axios.post('http://localhost:8080/api/routes', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRoutes((prev) => [...prev, res.data]);
      setNewRoute({
        busId: '',
        origin: '',
        destination: '',
        fare: '',
        arrivalTime: '',
      });
    } catch (err) {
      console.error('Add route failed', err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Manage Routes</h2>

        <div className="mb-4 border p-3 rounded shadow-sm">
          <h4>Add New Route</h4>
          <div className="row">
            <div className="col-md-3">
              <select
                name="busId"
                value={newRoute.busId}
                onChange={handleNewRouteChange}
                className="form-control"
              >
                <option value="">Select Bus</option>
                {buses.map((bus) => (
                  <option key={bus.id} value={bus.id}>
                    {bus.busName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="origin"
                placeholder="Origin"
                value={newRoute.origin}
                onChange={handleNewRouteChange}
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={newRoute.destination}
                onChange={handleNewRouteChange}
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                name="fare"
                placeholder="Fare"
                value={newRoute.fare}
                onChange={handleNewRouteChange}
                className="form-control"
              />
            </div>
            <div className="col-md-3 mt-2">
              <input
                type="text"
                name="arrivalTime"
                placeholder="Arrival Time"
                value={newRoute.arrivalTime}
                onChange={handleNewRouteChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-success" onClick={handleAddRoute}>
              ➕ Add Route
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Bus</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Fare</th>
                <th>Arrival</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.id}>
                  <td>{route.id}</td>
                  <td>{route.bus?.busName || 'N/A'}</td>
                  <td>
                    {editingRouteId === route.id ? (
                      <input
                        name="origin"
                        value={editedRoute.origin}
                        onChange={handleChange}
                      />
                    ) : (
                      route.origin
                    )}
                  </td>
                  <td>
                    {editingRouteId === route.id ? (
                      <input
                        name="destination"
                        value={editedRoute.destination}
                        onChange={handleChange}
                      />
                    ) : (
                      route.destination
                    )}
                  </td>
                  <td>
                    {editingRouteId === route.id ? (
                      <input
                        type="number"
                        name="fare"
                        value={editedRoute.fare}
                        onChange={handleChange}
                      />
                    ) : (
                      route.fare
                    )}
                  </td>
                  <td>
                    {editingRouteId === route.id ? (
                      <input
                        name="arrivalTime"
                        value={editedRoute.arrivalTime}
                        onChange={handleChange}
                      />
                    ) : (
                      route.arrivalTime
                    )}
                  </td>
                  <td>
                    {editingRouteId === route.id ? (
                      <button className="btn btn-success btn-sm" onClick={handleSave}>
                        Save
                      </button>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => handleEdit(route)}>
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

export default ManageRoutes;
