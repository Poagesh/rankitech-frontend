import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ARregistration from './pages/ARregistration'; 
import OtpVerification from './pages/Otpverification';
import RecruiterSignupForm from './pages/Recruiterregistration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helper to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('access_token') !== null;
};

// Optional: Guarded route wrapper (for later)
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ar-details" element={<ARregistration />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/recruiter-details" element={<RecruiterSignupForm />} />

        {/* Protected Routes */}
        <Route
          path="/user"
          element={
            // <ProtectedRoute>
              <UserDashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter"
          element={
            // <ProtectedRoute>
              <RecruiterDashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            // <ProtectedRoute>
              <AdminDashboard />
            // </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
