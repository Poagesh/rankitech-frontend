import { useState } from 'react';
import { Link } from 'react-router-dom';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
    // TODO: Call API
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
      maxWidth: '400px',
      width: '100%'
    },
    avatar: {
      width: '70px',
      height: '70px',
      background: 'linear-gradient(135deg, #2196f3, #1e88e5',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      color: '#333',
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
      borderColor: '#1e88e5',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.1)'
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
      boxShadow: '0 4px 15px rgba(76, 86, 175, 0.3)'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(83, 76, 175, 0.4)'
    },
    link: {
      color: '#1e88e5',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'color 0.3s ease'
    },
    forgotLink: {
      color: '#1e88e5',
      textDecoration: 'none',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card} className="p-4 p-md-5">
        <div className="text-center mb-4">
          <div style={styles.avatar}>
            👤
          </div>
          <h2 className="h3 fw-bold text-dark mb-2">Welcome Back!</h2>
          <p className="text-muted">We're excited to see you again</p>
        </div>
        
        <div>
          <div className="mb-4">
            <label className="form-label fw-semibold text-dark">
              📧 Email Address
            </label>
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

          <div className="mb-4">
            <label className="form-label fw-semibold text-dark">
              🔒 Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              style={styles.input}
              placeholder="Enter your secure password"
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="rememberMe"
                style={{accentColor: '#4caf50'}}
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
            onClick={handleSubmit}
            className="btn w-100 mb-4"
            style={styles.button}
            onMouseEnter={(e) => Object.assign(e.target.style, {...styles.button, ...styles.buttonHover})}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
          >
            🚀 Sign In
          </button>
        </div>

        <div className="border-top pt-4">
          <p className="text-center text-muted mb-0">
            New to our platform?{' '}
            <Link 
              to="/register" 
              style={styles.link}
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;