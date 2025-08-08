// src/pages/Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });

      const { access_token, token_type, role, user_id } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('token_type', token_type);
      localStorage.setItem('role', role);
      localStorage.setItem('user_id', user_id);

      toast.success('Successfully Logged in');

      // Navigate based on role
      if (role === 'user') {
        navigate('/user');
      } else if (role === 'recruiter') {
        navigate('/recruiter');
      } else if (role === 'admin') {
        navigate('/admin');
      } else {
        toast.error('Unknown role');
      }

    } catch (error) {
      console.error(error);
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e8 0%, #e0f2f1 50%, #e1f5fe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      border: '1px solid #e8f5e8',
      maxWidth: '400px',
      width: '100%',
    },
    avatar: {
      width: '70px',
      height: '70px',
      background: 'linear-gradient(135deg, #2196f3, #1e88e5)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      color: '#333',
      fontSize: '24px',
    },
    input: {
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      width: '100%',
    },
    inputFocus: {
      borderColor: '#1e88e5',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.1)',
    },
    button: {
      background: 'linear-gradient(135deg, #2196f3, #1e88e5)',
      border: 'none',
      borderRadius: '12px',
      padding: '15px 25px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(76, 86, 175, 0.3)',
      cursor: 'pointer',
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(83, 76, 175, 0.4)',
    },
    link: {
      color: '#1e88e5',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'color 0.3s ease',
    },
    forgotLink: {
      color: '#1e88e5',
      textDecoration: 'none',
      fontSize: '14px',
    },
    passwordToggle: {
      position: 'absolute',
      right: '15px',
      top: '45px',
      cursor: 'pointer',
      color: '#888',
      userSelect: 'none',
    },
    passwordWrapper: {
      position: 'relative',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card} className="p-4 p-md-5">
        <div className="text-center mb-4">
          <div style={styles.avatar}>👤</div>
          <h2 className="h3 fw-bold text-dark mb-2">Welcome Back!</h2>
          <p className="text-muted">We're excited to see you again</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold text-dark">📧 Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              style={styles.input}
              placeholder="your.email@example.com"
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            />
          </div>

          <div className="mb-4" style={styles.passwordWrapper}>
            <label className="form-label fw-semibold text-dark">🔒 Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              style={styles.input}
              placeholder="Enter your secure password"
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                style={{ accentColor: '#4caf50' }}
              />
              <label className="form-check-label text-muted" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <a href="#" style={styles.forgotLink}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="btn w-100 mb-4"
            style={styles.button}
            onMouseEnter={(e) => Object.assign(e.target.style, { ...styles.button, ...styles.buttonHover })}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
          >
            🚀 Sign In
          </button>
        </form>

        <div className="border-top pt-4">
          <p className="text-center text-muted mb-0">
            New to our platform?{' '}
            <Link to="/register" style={styles.link}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
