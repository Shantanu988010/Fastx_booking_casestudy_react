import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateBooking from './components/CreateBooking';
import AdminDashboard from './admin/AdminDashboard';
import AllBookings from './admin/AllBookings';
import ManageBuses from './admin/ManageBuses';
import ManageRoutes from './admin/ManageRoutes';
import AllUsers from './admin/AllUsers';
import Profile from './components/Profile';
import AvailableBuses from './components/AvailableBuses';
import SeatsPage from './components/SeatsPage';
import AvailableRoutes from './components/AvailableRoutes';
import MyBookings from './components/MyBookings';
import Home from './components/Home';
import AdminPaymentDetails from './admin/AdminPaymentDetails';









function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<CreateBooking />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<AllBookings />} />
        <Route path="/admin/buses" element={<ManageBuses />} />
        <Route path="/admin/routes" element={<ManageRoutes />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/available-buses" element={<AvailableBuses />} />
        <Route path="/seats/:busId" element={<SeatsPage />} />
        <Route path="/available-routes" element={<AvailableRoutes />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin/payments" element={<AdminPaymentDetails />} />
        
        


      </Routes>
    </Router>
  );
}

export default App;
