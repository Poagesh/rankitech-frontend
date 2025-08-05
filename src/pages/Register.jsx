// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // const response = await axios.post('http://localhost:8000/register', formData); 
    // console.log('Register Success:', response.data);

    navigate('/otp-verification', {
      state: {
        email: formData.email,
        role: formData.role,
      },
    });
  } catch (error) {
    console.error('Register Error:', error.response?.data || error.message);
    alert('Registration failed: ' + (error.response?.data?.detail || 'Unknown error'));
  }
};

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e8 0%, #e0f2f1 50%, #e1f5fe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      border: '1px solid #e8f5e8',
      maxWidth: '450px',
      width: '100%'
    },
    avatar: {
      width: '70px',
      height: '70px',
      background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      color: 'white',
      fontSize: '24px'
    },
    input: {
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa'
    },
    inputFocus: {
      borderColor: '#4caf50',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.1)'
    },
    select: {
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      cursor: 'pointer'
    },
    selectFocus: {
      borderColor: '#4caf50',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.1)'
    },
    button: {
      background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
      border: 'none',
      borderRadius: '12px',
      padding: '15px 25px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)'
    },
    link: {
      color: '#4caf50',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'color 0.3s ease'
    },
    roleIcon: {
      marginRight: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card} className="p-4 p-md-5">
        <div className="text-center mb-4">
          <div style={styles.avatar}>
            ✨
          </div>
          <h2 className="h3 fw-bold text-dark mb-2">Join Our Community!</h2>
          <p className="text-muted">Create your account and get started</p>
        </div>
        
        <div>
          <div className="mb-4">
            <label className="form-label fw-semibold text-dark">
              👤 Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              style={styles.input}
              placeholder="Enter your full name"
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold text-dark">
              📧 Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              style={styles.input}
              placeholder="your.email@example.com"
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold text-dark">
              🔒 Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              style={styles.input}
              placeholder="Create a secure password"
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold text-dark">
              🎭 Account Type
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
              style={styles.select}
              onFocus={(e) => Object.assign(e.target.style, styles.selectFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.select)}
            >
              <option value="user">
                🙋‍♂️ Job Seeker - Looking for opportunities
              </option>
              <option value="recruiter">
                🏢 Recruiter - Hiring talented professionals
              </option>
            </select>
          </div>

          <div className="mb-4">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="agreeTerms"
                style={{accentColor: '#4caf50'}}
                required
              />
              <label className="form-check-label text-muted" htmlFor="agreeTerms">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="btn w-100 mb-4"
            style={styles.button}
            onMouseEnter={(e) => Object.assign(e.target.style, {...styles.button, ...styles.buttonHover})}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
          >
            🎉 Create Account
          </button>
        </div>

        <div className="border-top pt-4">
          <p className="text-center text-muted mb-0">
            Already have an account?{' '}
            <Link 
              to="/" 
              style={styles.link}
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;