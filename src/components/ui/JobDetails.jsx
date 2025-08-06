import React, { useState } from 'react';
import { ArrowLeft, Edit3, Save, X, Users, Eye, Star } from 'lucide-react';

const JobDetails = ({ job, onBack, onUpdateJob, onViewApplications, onViewTopMatches }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: job.title,
    description: job.description,
    skills: job.skills
  });

  const handleSave = () => {
    onUpdateJob(job.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: job.title,
      description: job.description,
      skills: job.skills
    });
    setIsEditing(false);
  };

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
    detailsCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      maxWidth: '800px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '30px'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#2e2e2e',
      marginBottom: '10px'
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
      fontWeight: '500'
    },
    saveButton: {
      background: 'linear-gradient(135deg, #2196f3, #1e88e5',
      marginRight: '10px'
    },
    cancelButton: {
      background: 'linear-gradient(135deg, #f44336, #d32f2f)'
    },
    section: {
      marginBottom: '30px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#2e2e2e',
      marginBottom: '10px'
    },
    input: {
      width: '100%',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa'
    },
    textarea: {
      width: '100%',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      minHeight: '120px',
      resize: 'vertical'
    },
    text: {
      color: '#555',
      lineHeight: '1.6',
      fontSize: '16px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginTop: '30px'
    },
    statCard: {
      background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
      padding: '20px',
      borderRadius: '15px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid #90caf9'
    },
    statNumber: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1976d2',
      marginBottom: '5px'
    },
    statLabel: {
      color: '#555',
      fontSize: '14px',
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
        Back to Jobs
      </button>

      <div style={styles.detailsCard}>
        <div style={styles.header}>
          <div>
            {isEditing ? (
              <input
                type="text"
                style={{...styles.input, fontSize: '28px', fontWeight: '700'}}
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
              />
            ) : (
              <h1 style={styles.title}>{job.title}</h1>
            )}
          </div>
          
          <div>
            {isEditing ? (
              <>
                <button
                  style={{...styles.editButton, ...styles.saveButton}}
                  onClick={handleSave}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  style={{...styles.editButton, ...styles.cancelButton}}
                  onClick={handleCancel}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <X size={16} />
                  Cancel
                </button>
              </>
            ) : (
              <button
                style={styles.editButton}
                onClick={() => setIsEditing(true)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <Edit3 size={16} />
                Edit
              </button>
            )}
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Job Description</h3>
          {isEditing ? (
            <textarea
              style={styles.textarea}
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
            />
          ) : (
            <p style={styles.text}>{job.description}</p>
          )}
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Required Skills</h3>
          {isEditing ? (
            <input
              type="text"
              style={styles.input}
              value={editData.skills}
              onChange={(e) => setEditData({...editData, skills: e.target.value})}
            />
          ) : (
            <p style={styles.text}>{job.skills}</p>
          )}
        </div>

        <div style={styles.statsGrid}>
          <div
            style={styles.statCard}
            onClick={() => onViewApplications(job)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.statNumber}>{job.applications}</div>
            <div style={styles.statLabel}>
              <Users size={16} style={{marginRight: '5px'}} />
              Applications Received
            </div>
          </div>

          <div
            style={styles.statCard}
            onClick={() => onViewTopMatches(job)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.statNumber}>{job.topMatches}</div>
            <div style={styles.statLabel}>
              <Star size={16} style={{marginRight: '5px'}} />
              Top Matches
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;