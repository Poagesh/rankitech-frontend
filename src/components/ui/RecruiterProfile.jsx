import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';

const RecruiterProfile = ({ recruiter, onBack }) => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e8 0%, #e0f2f1 50%, #e1f5fe 100%)',
      padding: '20px'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'white',
      border: 'none',
      borderRadius: '25px',
      padding: '10px 20px',
      cursor: 'pointer',
      marginBottom: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      color: '#2196f3',
      fontWeight: '500'
    },
    profileCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      maxWidth: '600px',
      margin: '0 auto'
    },
    avatar: {
      width: '120px',
      height: '120px',
      background: 'linear-gradient(135deg, #2196f3, #1976d2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 30px',
      color: 'white',
      fontSize: '48px',
      fontWeight: '700'
    },
    name: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#2e2e2e',
      textAlign: 'center',
      marginBottom: '10px'
    },
    title: {
      fontSize: '18px',
      color: '#666',
      textAlign: 'center',
      marginBottom: '30px'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginTop: '30px'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '15px',
      background: 'linear-gradient(135deg, #e8f5e8 0%, #e0f2f1 50%, #e1f5fe 100%)',
      borderRadius: '12px',
      border: '1px solid #e9ecef'
    },
    infoIcon: {
      color: '#2196f3'
    },
    infoText: {
      color: '#2e2e2e',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.backButton}
        onClick={onBack}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }}
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div style={styles.profileCard}>
        <div style={styles.avatar}>
          {recruiter.name.charAt(0)}
        </div>
        
        <h1 style={styles.name}>{recruiter.name}</h1>
        <p style={styles.title}>{recruiter.position}</p>
        
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <Mail size={20} style={styles.infoIcon} />
            <span style={styles.infoText}>{recruiter.email}</span>
          </div>
          
          <div style={styles.infoItem}>
            <Phone size={20} style={styles.infoIcon} />
            <span style={styles.infoText}>{recruiter.phone}</span>
          </div>
          
          <div style={styles.infoItem}>
            <MapPin size={20} style={styles.infoIcon} />
            <span style={styles.infoText}>{recruiter.location}</span>
          </div>
          
          <div style={styles.infoItem}>
            <Calendar size={20} style={styles.infoIcon} />
            <span style={styles.infoText}>Joined {recruiter.joinDate}</span>
          </div>
          
          <div style={styles.infoItem}>
            <Briefcase size={20} style={styles.infoIcon} />
            <span style={styles.infoText}>{recruiter.department}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;