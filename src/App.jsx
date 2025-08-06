import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ARregistration from './pages/ARregistration'; 
import OtpVerification from './pages/Otpverification';
import RecruiterSignupForm from './pages/Recruiterregistration';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/recruiter" element={<RecruiterDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/ar-details" element={<ARregistration />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/recruiter-details" element={<RecruiterSignupForm />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
