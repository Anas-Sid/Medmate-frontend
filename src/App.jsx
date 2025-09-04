import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import Availibilty from './pages/Availibilty';
import Portal from './pages/Portal';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PatientDashboard from './pages/PatientDashboard';
import Bookappointment from './pages/Bookappointment';
import DoctorBookingCard from './components/patientdashboradcomponent/DoctorBookingCard';
import PatientChat from './pages/PatientChat';
import DoctorChat from './pages/DoctorChat';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Portal />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <ProtectedRoute>
            <PatientList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/availibilty"
        element={
          <ProtectedRoute>
            <Availibilty />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient"
        element={
          <ProtectedRoute>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/apointmentbook"
        element={
          <ProtectedRoute>
            <Bookappointment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/:id"
        element={
          <ProtectedRoute>
            <DoctorBookingCard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/chat"
        element={
          <ProtectedRoute>
            <DoctorChat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/chat"
        element={
          <ProtectedRoute>
            <PatientChat />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
