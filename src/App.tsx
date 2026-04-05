import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import DriverDirectory from './pages/DriverDirectory';
import DriverProfile from './pages/DriverProfile';
import Login from './pages/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import AddDriver from './pages/AddDriver';
import VehicleDirectory from './pages/VehicleDirectory';
import AddVehicle from './pages/AddVehicle';
import TripDispatch from './pages/TripDispatch';
import LiveTracking from './pages/LiveTracking';
import AttendanceLog from './pages/AttendanceLog';
import BulkAttendanceUpdate from './pages/BulkAttendanceUpdate';
import SalaryPayout from './pages/SalaryPayout';
import Reports from './pages/Reports';
import { Settings } from 'lucide-react';

// Placeholder components for other routes
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
      <Settings size={32} />
    </div>
    <h1 className="text-2xl font-black text-on-surface uppercase tracking-tight">{title}</h1>
    <p className="text-on-surface-variant font-medium max-w-xs">This module is currently being optimized for precision logistics.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout title="Dashboard"><Dashboard /></Layout>} />
          <Route path="/drivers" element={<Layout title="Drivers"><DriverDirectory /></Layout>} />
          <Route path="/drivers/:id" element={<DriverProfile />} />
          <Route path="/drivers/new" element={<Layout title="Add Driver"><AddDriver /></Layout>} />
          <Route path="/vehicles" element={<Layout title="Vehicles"><VehicleDirectory /></Layout>} />
          <Route path="/vehicles/new" element={<Layout title="Add Vehicle"><AddVehicle /></Layout>} />
          <Route path="/trips" element={<Layout title="Trips"><TripDispatch /></Layout>} />
          <Route path="/trips/new" element={<Layout title="Dispatch"><TripDispatch /></Layout>} />
          <Route path="/live" element={<Layout title="Live Map"><LiveTracking /></Layout>} />
          <Route path="/attendance" element={<Layout title="Attendance"><AttendanceLog /></Layout>} />
          <Route path="/attendance/bulk" element={<Layout title="Bulk Update"><BulkAttendanceUpdate /></Layout>} />
          <Route path="/salary" element={<Layout title="Salary"><SalaryPayout /></Layout>} />
          <Route path="/reports" element={<Layout title="Reports"><Reports /></Layout>} />
          <Route path="/support" element={<Layout title="Support"><Placeholder title="Support" /></Layout>} />
          <Route path="/settings" element={<Layout title="Settings"><Placeholder title="Settings" /></Layout>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
