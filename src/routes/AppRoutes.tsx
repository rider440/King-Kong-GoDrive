import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/auth/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import Dashboard from '@/pages/Dashboard/Dashboard';
import DriverList from '@/pages/Driver/DriverList';
import DriverProfile from '@/pages/Driver/DriverProfile';
import Login from '@/pages/Auth/Login';
import AddDriver from '@/pages/Driver/AddDriver';
import VehicleList from '@/pages/Vehicle/VehicleList';
import AddVehicle from '@/pages/Vehicle/AddVehicle';
import VehicleProfile from '@/pages/Vehicle/VehicleProfile';
import TripDispatch from '@/pages/Trip/TripDispatch';
import LiveTracking from '@/pages/Trip/LiveTracking';
import AttendanceLog from '@/pages/Attendance/AttendanceLog';
import BulkAttendanceUpdate from '@/pages/Attendance/BulkAttendanceUpdate';
import SalaryPayout from '@/pages/Salary/SalaryPayout';
import Reports from '@/pages/Reports/Reports';

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
      <span className="text-3xl font-black">?</span>
    </div>
    <h1 className="text-2xl font-black text-on-surface uppercase tracking-tight">{title}</h1>
    <p className="text-on-surface-variant font-medium max-w-xs">This module is currently being optimized for precision logistics.</p>
  </div>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Layout title="Dashboard"><Dashboard /></Layout>} />
      <Route path="/drivers" element={<Layout title="Drivers"><DriverList /></Layout>} />
      <Route path="/drivers/:id" element={<DriverProfile />} />
      {/* Driver actions are now handled via popup on the list page */}
      {/* <Route path="/drivers/:id/view" element={<Layout title="View Driver"><AddDriver /></Layout>} /> */}
      {/* <Route path="/drivers/:id/edit" element={<Layout title="Edit Driver"><AddDriver /></Layout>} /> */}
      {/* <Route path="/drivers/new" element={<Layout title="Add Driver"><AddDriver /></Layout>} /> */}
      
      <Route path="/vehicles" element={<Layout title="Vehicles"><VehicleList /></Layout>} />
      <Route path="/vehicles/:id" element={<VehicleProfile />} />
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
);

export default AppRoutes;
