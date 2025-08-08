import React from 'react';
import { User, LogOut, Briefcase } from 'lucide-react';

const Header = ({ Name, onProfileClick, onLogout }) => {
  const styles = {
    header: {
      background: 'linear-gradient(135deg, #2196f3, #1976d2)',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 15px rgba(33, 150, 243, 0.2)',
      color: 'white',
      margin: '20px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '24px',
      fontWeight: '700',
      gap: '10px'
    },
    profileSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    profileButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      borderRadius: '25px',
      padding: '8px 16px',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: '500'
    },
    logoutButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      borderRadius: '50%',
      padding: '10px',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Briefcase size={28} />
        <span>Rankitech</span>
      </div>
      
      <div style={styles.profileSection}>
        <button 
          style={styles.profileButton}
          onClick={onProfileClick}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <User size={18} />
          <span>{Name}</span>
        </button>
        
        <button 
          style={styles.logoutButton}
          onClick={onLogout}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;