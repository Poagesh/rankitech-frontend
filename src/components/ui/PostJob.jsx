import React, { useState } from 'react';
import { ArrowLeft, Briefcase, FileText, Users, MapPin, Clock, DollarSign, Layers } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostJob = ({ onBack }) => {
  const recruiterId = localStorage.getItem('user_id');

  const [jobData, setJobData] = useState({
    recruiter_id: recruiterId,
    job_title: '',
    experience_level: '',
    job_description: '',
    location: '',
    employment_type: '',
    required_skills: '',
    preferred_skills: '',
    salary_range: '',
    deadline_to_apply: '',
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const cleanedJobData = {
    ...jobData,
    required_skills: jobData.required_skills.split(',').map(skill => skill.trim()),
    preferred_skills: jobData.preferred_skills
      ? jobData.preferred_skills.split(',').map(skill => skill.trim())
      : [],
  };

  try {
    await axios.post('http://localhost:8000/api/new-job', cleanedJobData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // optional
      },
    });

    toast('Job posted successfully!');
    setJobData({
      recruiter_id: recruiterId,
      job_title: '',
      experience_level: '',
      job_description: '',
      location: '',
      employment_type: '',
      required_skills: '',
      preferred_skills: '',
      salary_range: '',
      deadline_to_apply: '',
    });
  } catch (err) {
    console.error('Failed to post job:', err);
    toast('Something went wrong.');
  }
};

  const handleFocus = (e) => {
    e.target.style.borderColor = '#4caf50';
    e.target.style.backgroundColor = 'white';
    e.target.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#e0e0e0';
    e.target.style.backgroundColor = '#fafafa';
    e.target.style.boxShadow = 'none';
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
    formCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      maxWidth: '700px',
      margin: '0 auto'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#2e2e2e',
      textAlign: 'center',
      marginBottom: '30px'
    },
    inputGroup: {
      marginBottom: '25px'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: '600',
      color: '#2e2e2e',
      marginBottom: '8px',
      fontSize: '16px'
    },
    input: {
      width: '100%',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      backgroundColor: '#fafafa'
    },
    textarea: {
      width: '100%',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      backgroundColor: '#fafafa',
      minHeight: '120px',
      resize: 'vertical'
    },
    button: {
      background: 'linear-gradient(135deg, #2196f3, #1e88e5)',
      border: 'none',
      borderRadius: '12px',
      padding: '15px 30px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
      width: '100%',
      cursor: 'pointer'
    }
  };

  const fields = [
    { label: 'Job Title', icon: <Briefcase size={18} />, name: 'job_title', type: 'text', placeholder: 'e.g. Software Engineer' },
    { label: 'Experience Level', icon: <Layers size={18} />, name: 'experience_level', type: 'text', placeholder: 'e.g. Entry, Mid, Senior' },
    { label: 'Location', icon: <MapPin size={18} />, name: 'location', type: 'text', placeholder: 'e.g. Chennai, Remote' },
    { label: 'Employment Type', icon: <Clock size={18} />, name: 'employment_type', type: 'text', placeholder: 'e.g. Full-time' },
    { label: 'Required Skills', icon: <Users size={18} />, name: 'required_skills', type: 'text', placeholder: 'e.g. React, Node.js' },
    { label: 'Preferred Skills', icon: <Users size={18} />, name: 'preferred_skills', type: 'text', placeholder: 'e.g. Docker, AWS' },
    { label: 'Salary Range', icon: <DollarSign size={18} />, name: 'salary_range', type: 'text', placeholder: 'e.g. 10-15 LPA' },
    { label: 'Deadline to Apply', icon: <Clock size={18} />, name: 'deadline_to_apply', type: 'date' },
  ];

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

      <div style={styles.formCard}>
        <h2 style={styles.title}>Post New Job</h2>

        <form onSubmit={handleSubmit}>
          {fields.map(({ label, icon, name, type, placeholder }) => (
            <div key={name} style={styles.inputGroup}>
              <label style={styles.label}>
                {icon} {label}
              </label>
              <input
                type={type}
                style={styles.input}
                name={name}
                placeholder={placeholder}
                value={jobData[name]}
                onChange={(e) => setJobData({ ...jobData, [name]: e.target.value })}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required={name !== 'preferred_skills'}
              />
            </div>
          ))}

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <FileText size={18} />
              Job Description
            </label>
            <textarea
              style={styles.textarea}
              placeholder="Describe the role, responsibilities, and requirements..."
              value={jobData.job_description}
              onChange={(e) => setJobData({ ...jobData, job_description: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(76, 175, 80, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
            }}
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
