import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, Phone, MapPin, Calendar, GraduationCap, Edit3, Save, X, 
  User, Home, Briefcase, Code, Globe, Award, BookOpen, Star 
} from 'lucide-react';
import axios from 'axios';

const ConsultantProfile = ({ consultant, onBack, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({
    name: consultant?.name || '',
    primary_email: consultant?.primary_email || '',
    personal_email: consultant?.personal_email || '',
    mobile_no: consultant?.mobile_no || '',
    college: consultant?.college || '',
    institution_roll_no: consultant?.institution_roll_no || '',
    gender: consultant?.gender || '',
    country: consultant?.country || '',
    state: consultant?.state || '',
    district: consultant?.district || '',
    city: consultant?.city || '',
    pincode: consultant?.pincode || '',
    address_line: consultant?.address_line || '',
    dob: consultant?.dob ? consultant.dob.split('T')[0] : ''
  });

  const token = localStorage.getItem('access_token');
  const user_id = localStorage.getItem('user_id');

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const updatePayload = {
        name: editData.name?.trim(),
        primary_email: editData.primary_email?.trim(),
        personal_email: editData.personal_email?.trim() || null,
        mobile_no: editData.mobile_no?.trim(),
        college: editData.college?.trim(),
        institution_roll_no: editData.institution_roll_no?.trim(),
        gender: editData.gender?.trim(),
        country: editData.country?.trim(),
        state: editData.state?.trim(),
        district: editData.district?.trim(),
        city: editData.city?.trim(),
        pincode: editData.pincode?.trim(),
        address_line: editData.address_line?.trim(),
        dob: editData.dob || null
      };

      console.log('📤 Updating consultant profile:', updatePayload);

      const response = await axios.put(
        `http://localhost:8000/api/consultant_profiles/${user_id}`, 
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
        onUpdate(response.data);
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
      name: consultant?.name || '',
      primary_email: consultant?.primary_email || '',
      personal_email: consultant?.personal_email || '',
      mobile_no: consultant?.mobile_no || '',
      college: consultant?.college || '',
      institution_roll_no: consultant?.institution_roll_no || '',
      gender: consultant?.gender || '',
      country: consultant?.country || '',
      state: consultant?.state || '',
      district: consultant?.district || '',
      city: consultant?.city || '',
      pincode: consultant?.pincode || '',
      address_line: consultant?.address_line || '',
      dob: consultant?.dob ? consultant.dob.split('T')[0] : ''
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
      maxWidth: '900px',
      margin: '0 auto',
      overflow: 'hidden',
      wordWrap: 'break-word'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '40px',
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
      background: 'linear-gradient(135deg, #4CAF50, #388E3C)',
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
      background: 'linear-gradient(135deg, #4CAF50, #388E3C)'
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
    college: {
      fontSize: '16px',
      color: '#4CAF50',
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
    select: {
      width: '100%',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      boxSizing: 'border-box',
      marginBottom: '10px'
    },
    section: {
      marginBottom: '40px'
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
    twoColumnGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
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
      minWidth: 0
    },
    infoIcon: {
      color: '#4CAF50',
      minWidth: '20px',
      marginTop: '2px',
      flexShrink: 0
    },
    infoContent: {
      flex: 1,
      minWidth: 0,
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
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '10px'
    },
    skillTag: {
      background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
      color: '#2e7d32',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500'
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
      borderTop: '4px solid #4CAF50',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  if (!consultant) {
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
              {(editData.name || consultant.name || 'C').charAt(0)}
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
                  style={{...styles.input, ...styles.college, textAlign: 'center'}}
                  value={editData.college}
                  onChange={(e) => setEditData({...editData, college: e.target.value})}
                  placeholder="College/University"
                />
              </>
            ) : (
              <>
                <h1 style={styles.name}>{consultant.name}</h1>
                <p style={styles.college}>{consultant.college}</p>
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

        {/* Personal Information */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <User size={20} />
            Personal Information
          </h3>
          
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <Mail size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Primary Email</div>
                {isEditing ? (
                  <input
                    type="email"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.primary_email}
                    onChange={(e) => setEditData({...editData, primary_email: e.target.value})}
                    placeholder="primary@email.com"
                  />
                ) : (
                  <span style={styles.infoText}>{consultant.primary_email || 'Not provided'}</span>
                )}
              </div>
            </div>

            <div style={styles.infoItem}>
              <Mail size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Personal Email</div>
                {isEditing ? (
                  <input
                    type="email"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.personal_email}
                    onChange={(e) => setEditData({...editData, personal_email: e.target.value})}
                    placeholder="personal@email.com (optional)"
                  />
                ) : (
                  <span style={styles.infoText}>{consultant.personal_email || 'Not provided'}</span>
                )}
              </div>
            </div>
            
            <div style={styles.infoItem}>
              <Phone size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Mobile Number</div>
                {isEditing ? (
                  <input
                    type="tel"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.mobile_no}
                    onChange={(e) => setEditData({...editData, mobile_no: e.target.value})}
                    placeholder="+91 98765 43210"
                  />
                ) : (
                  <span style={styles.infoText}>{consultant.mobile_no || 'Not provided'}</span>
                )}
              </div>
            </div>

            <div style={styles.infoItem}>
              <Calendar size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Date of Birth</div>
                {isEditing ? (
                  <input
                    type="date"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.dob}
                    onChange={(e) => setEditData({...editData, dob: e.target.value})}
                  />
                ) : (
                  <span style={styles.infoText}>
                    {consultant.dob ? new Date(consultant.dob).toLocaleDateString() : 'Not provided'}
                  </span>
                )}
              </div>
            </div>

            <div style={styles.infoItem}>
              <User size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Gender</div>
                {isEditing ? (
                  <select
                    style={{...styles.select, margin: 0, fontSize: '14px'}}
                    value={editData.gender}
                    onChange={(e) => setEditData({...editData, gender: e.target.value})}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <span style={styles.infoText}>{consultant.gender || 'Not specified'}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <GraduationCap size={20} />
            Academic Information
          </h3>
          
          <div style={styles.twoColumnGrid}>
            <div style={styles.infoItem}>
              <BookOpen size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Institution Roll Number</div>
                {isEditing ? (
                  <input
                    type="text"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.institution_roll_no}
                    onChange={(e) => setEditData({...editData, institution_roll_no: e.target.value})}
                    placeholder="Roll Number"
                  />
                ) : (
                  <span style={styles.infoText}>{consultant.institution_roll_no || 'Not provided'}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <Home size={20} />
            Address Information
          </h3>
          
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <Globe size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Country</div>
                {isEditing ? (
                  <input
                    type="text"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.country}
                    onChange={(e) => setEditData({...editData, country: e.target.value})}
                    placeholder="Country"
                  />
                ) : (
                  <span style={styles.infoText}>{consultant.country || 'Not provided'}</span>
                )}
              </div>
            </div>

            <div style={styles.infoItem}>
              <MapPin size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>State</div>
                {isEditing ? (
                  <input
                    type="text"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.state}
                    onChange={(e) => setEditData({...editData, state: e.target.value})}
                    placeholder="State/Province"
                  />
                ) : (
                  <span style={styles.infoText}>{consultant.state || 'Not provided'}</span>
                )}
              </div>
            </div>

            <div style={styles.infoItem}>
              <MapPin size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>City</div>
                {isEditing ? (
                  <input
                    type="text"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.city}
                    onChange={(e) => setEditData({...editData, city: e.target.value})}
                    placeholder="City"
                  />
                ) : (
                  <span style={styles.infoText}>{consultant.city || 'Not provided'}</span>
                )}
              </div>
            </div>

            <div style={styles.infoItem}>
              <MapPin size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>District</div>
                {isEditing ? (
                  <input
                    type="text"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.district}
                    onChange={(e) => setEditData({...editData, district: e.target.value})}
                    placeholder="District"
                  />
                ) : (
                  <span style={styles.infoText}>{consultant.district || 'Not provided'}</span>
                )}
              </div>
            </div>

            <div style={styles.infoItem}>
              <Home size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Pincode</div>
                {isEditing ? (
                  <input
                    type="text"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.pincode}
                    onChange={(e) => setEditData({...editData, pincode: e.target.value})}
                    placeholder="PIN/ZIP Code"
                  />
                ) : (
                  <span style={styles.infoText}>{consultant.pincode || 'Not provided'}</span>
                )}
              </div>
            </div>

            <div style={styles.infoItem} styles={{gridColumn: '1 / -1'}}>
              <Home size={20} style={styles.infoIcon} />
              <div style={styles.infoContent}>
                <div style={styles.infoLabel}>Address Line</div>
                {isEditing ? (
                  <input
                    type="text"
                    style={{...styles.input, margin: 0, fontSize: '14px'}}
                    value={editData.address_line}
                    onChange={(e) => setEditData({...editData, address_line: e.target.value})}
                    placeholder="Street Address"
                  />
                ) : (
                  <span style={styles.infoText}>{consultant.address_line || 'Not provided'}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        {consultant.technical_skills && consultant.technical_skills.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <Code size={20} />
              Technical Skills
            </h3>
            <div style={styles.skillsContainer}>
              {consultant.technical_skills.map((skill, index) => (
                <span key={index} style={styles.skillTag}>
                  {skill.skill_name || skill.name || skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {consultant.languages && consultant.languages.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <Globe size={20} />
              Languages
            </h3>
            <div style={styles.skillsContainer}>
              {consultant.languages.map((lang, index) => (
                <span key={index} style={styles.skillTag}>
                  {lang.language_name || lang.name || lang} {lang.proficiency && `- ${lang.proficiency}`}
                </span>
              ))}
            </div>
          </div>
        )}
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
          .twoColumnGrid {
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

export default ConsultantProfile;
