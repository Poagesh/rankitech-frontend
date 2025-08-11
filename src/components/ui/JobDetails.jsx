import React, { useState } from 'react';
import { ArrowLeft, Edit3, Save, X, Users, Star, Trash2 } from 'lucide-react';

const JobDetails = ({ job, onBack, onUpdateJob, onViewApplications, onViewTopMatches, onDeleteJob }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: job.title || '',
    description: job.description || '',
    skills: Array.isArray(job.required_skills) ? job.required_skills.join(', ') : (job.skills || ''),
    preferred_skills: Array.isArray(job.preferred_skills) ? job.preferred_skills.join(', ') : '',
    location: job.location || '',
    experience_level: job.experience_level || '',
    salary_range: job.salary_range || '',
    employment_type: job.employment_type || '',
    deadline_to_apply: job.deadline_to_apply ? job.deadline_to_apply.split('T')[0] : ''
  });

  const handleSave = () => {
    onUpdateJob(job.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: job.title || '',
      description: job.description || '',
      skills: Array.isArray(job.required_skills) ? job.required_skills.join(', ') : (job.skills || ''),
      preferred_skills: Array.isArray(job.preferred_skills) ? job.preferred_skills.join(', ') : '',
      location: job.location || '',
      experience_level: job.experience_level || '',
      salary_range: job.salary_range || '',
      employment_type: job.employment_type || '',
      deadline_to_apply: job.deadline_to_apply ? job.deadline_to_apply.split('T')[0] : ''
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      onDeleteJob(job.id);
    }
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
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '20px'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#2e2e2e',
      marginBottom: '10px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap'
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
      background: 'linear-gradient(135deg, #2196f3, #1e88e5)'
    },
    cancelButton: {
      background: 'linear-gradient(135deg, #f44336, #d32f2f)'
    },
    deleteButton: {
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
      backgroundColor: '#fafafa',
      boxSizing: 'border-box'
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
      resize: 'vertical',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      boxSizing: 'border-box'
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
    },
    twoColumnGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px'
    },
    '@media (max-width: 768px)': {
      twoColumnGrid: {
        gridTemplateColumns: '1fr'
      }
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
          <div style={{ flex: 1, minWidth: '300px' }}>
            {isEditing ? (
              <input
                type="text"
                style={{...styles.input, fontSize: '24px', fontWeight: '700'}}
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                placeholder="Job Title"
              />
            ) : (
              <h1 style={styles.title}>{job.title}</h1>
            )}
          </div>
          
          <div style={styles.buttonGroup}>
            {isEditing ? (
              <>
                <button
                  style={{...styles.editButton, ...styles.saveButton}}
                  onClick={handleSave}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  style={{...styles.editButton, ...styles.cancelButton}}
                  onClick={handleCancel}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <X size={16} />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  style={styles.editButton}
                  onClick={() => setIsEditing(true)}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <Edit3 size={16} />
                  Edit
                </button>
                <button
                  style={{...styles.editButton, ...styles.deleteButton}}
                  onClick={handleDelete}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </>
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
              placeholder="Enter detailed job description..."
            />
          ) : (
            <p style={styles.text}>{job.description || 'No description provided'}</p>
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
              placeholder="e.g., React, JavaScript, Node.js (comma separated)"
            />
          ) : (
            <p style={styles.text}>{job.skills || 'No skills specified'}</p>
          )}
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Preferred Skills</h3>
          {isEditing ? (
            <input
              type="text"
              style={styles.input}
              value={editData.preferred_skills}
              onChange={(e) => setEditData({...editData, preferred_skills: e.target.value})}
              placeholder="e.g., TypeScript, AWS, Docker (comma separated)"
            />
          ) : (
            <p style={styles.text}>
              {Array.isArray(job.preferred_skills) 
                ? job.preferred_skills.join(', ') 
                : (job.preferred_skills || 'None specified')
              }
            </p>
          )}
        </div>

        <div style={styles.twoColumnGrid}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Location</h3>
            {isEditing ? (
              <input
                type="text"
                style={styles.input}
                value={editData.location}
                onChange={(e) => setEditData({...editData, location: e.target.value})}
                placeholder="e.g., Remote, New York, NY"
              />
            ) : (
              <p style={styles.text}>{job.location || 'Not specified'}</p>
            )}
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Employment Type</h3>
            {isEditing ? (
              <select
                style={styles.select}
                value={editData.employment_type}
                onChange={(e) => setEditData({...editData, employment_type: e.target.value})}
              >
                <option value="">Select Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
                <option value="Temporary">Temporary</option>
              </select>
            ) : (
              <p style={styles.text}>{job.employment_type || 'Not specified'}</p>
            )}
          </div>
        </div>

        <div style={styles.twoColumnGrid}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Experience Level</h3>
            {isEditing ? (
              <select
                style={styles.select}
                value={editData.experience_level}
                onChange={(e) => setEditData({...editData, experience_level: e.target.value})}
              >
                <option value="">Select Experience Level</option>
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
                <option value="Lead">Lead/Principal</option>
                <option value="Any">Any Level</option>
              </select>
            ) : (
              <p style={styles.text}>{job.experience_level || 'Any'}</p>
            )}
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Application Deadline</h3>
            {isEditing ? (
              <input
                type="date"
                style={styles.input}
                value={editData.deadline_to_apply}
                onChange={(e) => setEditData({...editData, deadline_to_apply: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
            ) : (
              <p style={styles.text}>
                {job.deadline_to_apply 
                  ? new Date(job.deadline_to_apply).toLocaleDateString() 
                  : 'No deadline set'
                }
              </p>
            )}
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Salary Range</h3>
          {isEditing ? (
            <input
              type="text"
              style={styles.input}
              value={editData.salary_range}
              onChange={(e) => setEditData({...editData, salary_range: e.target.value})}
              placeholder="e.g., $80,000 - $120,000, Competitive, ₹8-12 LPA"
            />
          ) : (
            <p style={styles.text}>{job.salary_range || 'Competitive'}</p>
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
            <div style={styles.statNumber}>{job.applications || 0}</div>
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
            <div style={styles.statNumber}>{job.topMatches || 0}</div>
            <div style={styles.statLabel}>
              <Star size={16} style={{marginRight: '5px'}} />
              AI Top Matches
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
