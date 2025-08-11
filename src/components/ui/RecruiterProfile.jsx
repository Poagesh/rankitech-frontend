import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase, Building, Edit3, Save, X, User } from 'lucide-react';
import axios from 'axios';

const RecruiterProfile = ({ recruiter, onBack, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({
    name: recruiter?.name || '',
    email: recruiter?.email || '',
    phone: recruiter?.phone || '',
    company: recruiter?.company || '',
    location: recruiter?.location || '',
    position: recruiter?.position || 'Recruiter',
    department: recruiter?.department || 'Human Resources'
  });

  const token = localStorage.getItem('access_token');
  const user_id = localStorage.getItem('user_id');

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const updatePayload = {
        name: editData.name?.trim(),
        email: editData.email?.trim(),
        phone_number: editData.phone?.trim(),
        company_name: editData.company?.trim(),
        location: editData.location?.trim()
      };

      console.log('📤 Updating recruiter profile:', updatePayload);

      const response = await axios.put(
        `http://localhost:8000/api/put-recruiter/${user_id}`, 
        updatePayload,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      console.log('✅ Profile updated:', response.data);

      if (onUpdate) {
        onUpdate({
          ...recruiter,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone_number,
          company: response.data.company_name,
          location: response.data.location
        });
      }

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('❌ Profile update failed:', error);
      console.error('❌ Response data:', error.response?.data);
      alert(error.response?.data?.detail || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: recruiter?.name || '',
      email: recruiter?.email || '',
      phone: recruiter?.phone || '',
      company: recruiter?.company || '',
      location: recruiter?.location || '',
      position: recruiter?.position || 'Recruiter',
      department: recruiter?.department || 'Human Resources'
    });
    setIsEditing(false);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e8 0%, #e0f2f1 50%, #e1f5fe 100%)',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '100vw',
      overflow: 'hidden'
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
      maxWidth: '700px',
      margin: '0 auto',
      overflow: 'hidden',
      wordWrap: 'break-word'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '20px'
    },
    avatarSection: {
      textAlign: 'center',
      flex: 1,
      minWidth: '250px',
      maxWidth: '100%'
    },
    avatar: {
      width: '120px',
      height: '120px',
      background: 'linear-gradient(135deg, #2196f3, #1976d2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      color: 'white',
      fontSize: '48px',
      fontWeight: '700'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    },
    editButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'linear-gradient(135deg, #ff9800, #f57c00)',
      border: 'none',
      borderRadius: '25px',
      padding: '10px 20px',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      whiteSpace: 'nowrap'
    },
    saveButton: {
      background: 'linear-gradient(135deg, #2196f3, #1e88e5)'
    },
    cancelButton: {
      background: 'linear-gradient(135deg, #f44336, #d32f2f)'
    },
    name: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#2e2e2e',
      marginBottom: '10px',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      hyphens: 'auto',
      lineHeight: '1.2'
    },
    title: {
      fontSize: '18px',
      color: '#666',
      marginBottom: '10px',
      wordWrap: 'break-word',
      overflowWrap: 'break-word'
    },
    company: {
      fontSize: '16px',
      color: '#2196f3',
      fontWeight: '600',
      wordWrap: 'break-word',
      overflowWrap: 'break-word'
    },
    input: {
      width: '100%',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      boxSizing: 'border-box',
      marginBottom: '10px',
      wordWrap: 'break-word'
    },
    section: {
      marginBottom: '30px'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#2e2e2e',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      wordWrap: 'break-word'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: '15px',
      border: '1px solid #e9ecef',
      overflow: 'hidden',
      minWidth: 0 // Important for text overflow
    },
    infoIcon: {
      color: '#2196f3',
      minWidth: '20px',
      marginTop: '2px',
      flexShrink: 0
    },
    infoContent: {
      flex: 1,
      minWidth: 0, // Important for text overflow
      overflow: 'hidden'
    },
    infoText: {
      color: '#2e2e2e',
      fontWeight: '500',
      fontSize: '16px',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
      lineHeight: '1.4',
      maxWidth: '100%'
    },
    infoLabel: {
      color: '#666',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '5px',
      display: 'block'
    },
    loadingOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #2196f3',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  if (!recruiter) {
    return (
      <div style={styles.container}>
        <div style={{...styles.profileCard, textAlign: 'center'}}>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner}></div>
        </div>
      )}
      
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
        <div style={styles.header}>
          <div style={styles.avatarSection}>
            <div style={styles.avatar}>
              {(editData.name || recruiter.name || 'R').charAt(0)}
            </div>
            
            {isEditing ? (
              <>
                <input
                  type="text"
                  style={{...styles.input, ...styles.name, textAlign: 'center'}}
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  style={{...styles.input, ...styles.title, textAlign: 'center'}}
                  value={editData.position}
                  onChange={(e) => setEditData({...editData, position: e.target.value})}
                  placeholder="Position/Title"
                />
                <input
                  type="text"
                  style={{...styles.input, ...styles.company, textAlign: 'center'}}
                  value={editData.company}
                  onChange={(e) => setEditData({...editData, company: e.target.value})}
                  placeholder="Company Name"
                />
              </>
            ) : (
              <>
                <h1 style={styles.name}>{recruiter.name}</h1>
                <p style={styles.title}>{recruiter.position}</p>
                <p style={styles.company}>{recruiter.company}</p>
              </>
            )}
          </div>
          
          <div style={styles.buttonGroup}>
            {isEditing ? (
              <>
                <button
                  style={{...styles.editButton, ...styles.saveButton}}
                  onClick={handleSave}
                  disabled={loading}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <Save size={16} />
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  style={{...styles.editButton, ...styles.cancelButton}}
                  onClick={handleCancel}
                  disabled={loading}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <X size={16} />
                  Cancel
                </button>
              </>
            ) : (
              <button
                style={styles.editButton}
                onClick={() => setIsEditing(true)}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <User size={20} />
            Contact Information
          </h3>
          
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <Mail size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Email Address</div>
                {isEditing ? (
                  <input
                    type="email"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    placeholder="email@company.com"
                  />
                ) : (
                  <span style={styles.infoText}>{recruiter.email || 'Not provided'}</span>
                )}
              </div>
            </div>
            
            <div style={styles.infoItem}>
              <Phone size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Phone Number</div>
                {isEditing ? (
                  <input
                    type="tel"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                ) : (
                  <span style={styles.infoText}>{recruiter.phone || 'Not provided'}</span>
                )}
              </div>
            </div>
            
            <div style={styles.infoItem}>
              <MapPin size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Location</div>
                {isEditing ? (
                  <input
                    type="text"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.location}
                    onChange={(e) => setEditData({...editData, location: e.target.value})}
                    placeholder="City, State/Country"
                  />
                ) : (
                  <span style={styles.infoText}>{recruiter.location || 'Not provided'}</span>
                )}
              </div>
            </div>
            
            <div style={styles.infoItem}>
              <Building size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Department</div>
                {isEditing ? (
                  <input
                    type="text"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.department}
                    onChange={(e) => setEditData({...editData, department: e.target.value})}
                    placeholder="Human Resources"
                  />
                ) : (
                  <span style={styles.infoText}>{recruiter.department || 'Not specified'}</span>
                )}
              </div>
            </div>
            
            <div style={styles.infoItem}>
              <Calendar size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Member Since</div>
                <span style={styles.infoText}>{recruiter.joinDate || 'Not available'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .infoGrid {
            grid-template-columns: 1fr !important;
          }
          .header {
            flex-direction: column !important;
            text-align: center !important;
          }
          .avatarSection {
            min-width: 100% !important;
          }
          .profileCard {
            padding: 20px !important;
          }
          .name {
            font-size: 24px !important;
          }
          .buttonGroup {
            width: 100%;
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 10px !important;
          }
          .profileCard {
            padding: 15px !important;
          }
          .infoItem {
            padding: 15px !important;
          }
          .editButton {
            padding: 8px 15px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default RecruiterProfile;
