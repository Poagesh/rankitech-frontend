// src/pages/OtpVerification.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, role } = location.state || {};

  useEffect(() => {
    if (!email || !role) {
      navigate('/register');
    }
  }, [email, role, navigate]);

  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setIsValid(value.length === 6);
    }
  };

  const handleVerify = () => {
    alert(`Verifying OTP: ${otp} for ${email} as ${role}`);

    // Simulate verification success
    if (role === 'user') {
      navigate('/ar-registration', { state: { email } });
    } else if (role === 'recruiter') {
      navigate('/recruiter-signup', { state: { email } });
    } else {
      navigate('/register');
    }
  };

  const handleResend = () => {
    setOtp('');
    setIsValid(false);
    setCanResend(false);
    setTimer(60);
    alert('OTP has been resent!');
  };

  const gradient = 'linear-gradient(135deg, #e8f5e8 0%, #e0f2f1 50%, #e1f5fe 100%)';

  const styles = {
    container: {
      minHeight: '100vh',
      background: gradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      width: '100%',
      padding: '40px 30px'
    },
    avatar: {
      width: '70px',
      height: '70px',
      background: gradient,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      color: 'white',
      fontSize: '24px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2e2e2e',
      textAlign: 'center',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#666',
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '14px'
    },
    label: {
      fontWeight: '600',
      color: '#2e2e2e',
      marginBottom: '8px',
      display: 'block',
      fontSize: '14px'
    },
    input: {
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '18px',
      backgroundColor: '#fafafa',
      width: '100%',
      textAlign: 'center',
      letterSpacing: '8px',
      fontWeight: '600'
    },
    inputFocus: {
      borderColor: '#764ba2',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(118, 75, 162, 0.2)',
      outline: 'none'
    },
    button: {
      background: gradient,
      border: 'none',
      borderRadius: '12px',
      padding: '15px 25px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(118, 75, 162, 0.3)',
      width: '100%',
      cursor: 'pointer'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(118, 75, 162, 0.4)'
    },
    buttonDisabled: {
      background: '#e0e0e0',
      color: '#999',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    },
    resendButton: {
      background: 'transparent',
      border: '2px solid #764ba2',
      borderRadius: '8px',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#764ba2',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    resendButtonHover: {
      backgroundColor: '#764ba2',
      color: 'white',
      transform: 'translateY(-1px)'
    },
    timerText: {
      color: '#666',
      fontSize: '14px'
    },
    timerNumber: {
      color: '#764ba2',
      fontWeight: '700'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={styles.avatar}>🔐</div>
          <h2 style={styles.title}>OTP Verification</h2>
          <p style={styles.subtitle}>We've sent a 6-digit code to your device</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={styles.label}>🔑 Enter Verification Code</label>
          <input
            type="text"
            maxLength={6}
            inputMode="numeric"
            value={otp}
            onChange={handleChange}
            style={styles.input}
            placeholder="000000"
            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
            onBlur={(e) => Object.assign(e.target.style, styles.input)}
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={!isValid}
          style={isValid ? styles.button : { ...styles.button, ...styles.buttonDisabled }}
          onMouseEnter={(e) => {
            if (isValid) {
              Object.assign(e.target.style, { ...styles.button, ...styles.buttonHover });
            }
          }}
          onMouseLeave={(e) => {
            if (isValid) {
              Object.assign(e.target.style, styles.button);
            }
          }}
        >
          <span style={{ color: '#f093fb', marginRight: '8px' }}>✓</span> Verify Code
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {canResend ? (
            <button
              style={styles.resendButton}
              onClick={handleResend}
              onMouseEnter={(e) => Object.assign(e.target.style, { ...styles.resendButton, ...styles.resendButtonHover })}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.resendButton)}
            >
              🔄 Resend OTP
            </button>
          ) : (
            <span style={styles.timerText}>
              Resend OTP in <span style={styles.timerNumber}>{timer}s</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
