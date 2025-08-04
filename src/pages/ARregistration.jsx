import React, { useState } from "react";

const steps = [
  "Basic Info",
  "Permanent Address",
  "Education Details",
  "Projects",
  "Skills",
  "Experiences",
  "Achievements",
  "Extra Curricular Activities",
  "Resume"
];

const ARregistration = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [experiences, setExperiences] = useState([{}]);
  const [achievements, setAchievements] = useState([{}]);
  const [activities, setActivities] = useState([{}]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation rules for each step
  const validationRules = {
    0: { // Basic Info
      name: { required: true, minLength: 2 },
      dob: { required: true },
      gender: { required: true },
      college: { required: true },
      institution_roll_no: { required: true },
      primary_email: { required: true, email: true },
      personal_email: { required: false, email: true },
      mobile_no: { required: true, phone: true },
      password: { required: true, minLength: 6 }
    },
    1: { // Permanent Address
      country: { required: true },
      pincode: { required: true, pattern: /^\d{6}$/ },
      state: { required: true },
      district: { required: true },
      city: { required: true },
      address_line: { required: true, minLength: 10 }
    },
    2: { // Education Details
      degree: { required: true },
      specialization: { required: true },
      college_name: { required: true },
      register_number: { required: true },
      cgpa: { required: true, min: 0, max: 10 },
      passout_year_college: { required: true, min: 1990, max: new Date().getFullYear() + 5 },
      x_school: { required: true },
      x_board: { required: true },
      x_year: { required: true, min: 1990, max: new Date().getFullYear() },
      x_percentage: { required: true, min: 0, max: 100 },
      xii_school: { required: true },
      xii_board: { required: true },
      xii_year: { required: true, min: 1990, max: new Date().getFullYear() },
      xii_percentage: { required: true, min: 0, max: 100 }
    },
    3: { // Projects
      project_title: { required: true },
      techstack: { required: true },
      project_description: { required: true, minLength: 20 },
      project_link: { required: false, url: true }
    },
    4: { // Skills
      technical_skills: { required: true },
      languages: { required: true },
      subjects: { required: true }
    },
    8: { // Resume
      resume: { required: true, fileType: ['.pdf', '.doc', '.docx'] }
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    mainCard: {
      backgroundColor: 'white',
      borderRadius: '25px',
      padding: '40px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      border: 'none',
      backdropFilter: 'blur(10px)',
      maxWidth: '800px',
      margin: '0 auto'
    },
    stepHeader: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '20px',
      color: 'white',
      padding: '25px',
      marginBottom: '30px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
    },
    progressBar: {
      height: '12px',
      borderRadius: '10px',
      backgroundColor: '#e9ecef',
      marginBottom: '30px',
      overflow: 'hidden',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      borderRadius: '10px',
      transition: 'width 0.5s ease',
      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)'
    },
    inputGroup: {
      marginBottom: '25px'
    },
    label: {
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '8px',
      fontSize: '14px',
      display: 'block'
    },
    input: {
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '15px 18px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#f8fafc',
      width: '100%',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#667eea',
      backgroundColor: 'white',
      boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.1)',
      transform: 'translateY(-1px)'
    },
    inputError: {
      borderColor: '#e53e3e',
      backgroundColor: '#fef5f5'
    },
    textarea: {
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '15px 18px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#f8fafc',
      width: '100%',
      resize: 'vertical',
      minHeight: '100px',
      outline: 'none'
    },
    sectionCard: {
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      padding: '25px',
      marginBottom: '20px',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease'
    },
    sectionCardHover: {
      backgroundColor: 'white',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
      transform: 'translateY(-2px)'
    },
    sectionTitle: {
      color: '#2d3748',
      fontWeight: '700',
      fontSize: '18px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    subSectionTitle: {
      color: '#4a5568',
      fontWeight: '600',
      fontSize: '16px',
      marginTop: '25px',
      marginBottom: '15px',
      paddingBottom: '8px',
      borderBottom: '2px solid #e2e8f0'
    },
    button: {
      padding: '12px 30px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'none'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)'
    },
    primaryButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
    },
    secondaryButton: {
      backgroundColor: '#e2e8f0',
      color: '#4a5568',
      border: '2px solid #cbd5e0'
    },
    secondaryButtonHover: {
      backgroundColor: '#cbd5e0',
      transform: 'translateY(-1px)'
    },
    addButton: {
      background: 'linear-gradient(135deg, #4299e1, #3182ce)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    errorText: {
      color: '#e53e3e',
      fontSize: '13px',
      marginTop: '6px',
      fontWeight: '500'
    },
    alertCard: {
      backgroundColor: '#fef5e7',
      border: '1px solid #f6ad55',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '25px',
      color: '#744210'
    },
    navigationArea: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '30px',
      marginTop: '30px',
      borderTop: '2px solid #e2e8f0'
    },
    stepIndicator: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '25px',
      flexWrap: 'wrap'
    },
    stepDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#cbd5e0',
      transition: 'all 0.3s ease'
    },
    stepDotActive: {
      backgroundColor: '#667eea',
      transform: 'scale(1.3)',
      boxShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
    },
    stepDotCompleted: {
      backgroundColor: '#48bb78'
    }
  };

  // Step icons mapping
  const stepIcons = {
    0: '👤',
    1: '🏠', 
    2: '🎓',
    3: '💼',
    4: '🚀',
    5: '💪',
    6: '🏆',
    7: '🎭',
    8: '📄'
  };

  // Validation functions
  const validateField = (name, value, rules) => {
    const fieldRules = rules[name];
    if (!fieldRules) return '';

    if (fieldRules.required && (!value || value.toString().trim() === '')) {
      return `${name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} is required`;
    }

    if (value) {
      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        return `Must be at least ${fieldRules.minLength} characters`;
      }

      if (fieldRules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }

      if (fieldRules.phone && !/^[6-9]\d{9}$/.test(value)) {
        return 'Please enter a valid 10-digit mobile number';
      }

      if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
        if (name === 'pincode') return 'Please enter a valid 6-digit pincode';
        return 'Invalid format';
      }

      if (fieldRules.min && parseFloat(value) < fieldRules.min) {
        return `Must be at least ${fieldRules.min}`;
      }

      if (fieldRules.max && parseFloat(value) > fieldRules.max) {
        return `Must be at most ${fieldRules.max}`;
      }

      if (fieldRules.url && value && !/^https?:\/\/.+/.test(value)) {
        return 'Please enter a valid URL (starting with http:// or https://)';
      }

      if (fieldRules.fileType && value instanceof File) {
        const extension = '.' + value.name.split('.').pop().toLowerCase();
        if (!fieldRules.fileType.includes(extension)) {
          return `Please upload a file with extension: ${fieldRules.fileType.join(', ')}`;
        }
      }
    }

    return '';
  };

  const validateStep = (stepIndex) => {
    const stepRules = validationRules[stepIndex];
    if (!stepRules) return true;

    const stepErrors = {};
    let isValid = true;

    Object.keys(stepRules).forEach(fieldName => {
      const value = formData[fieldName];
      const error = validateField(fieldName, value, stepRules);
      if (error) {
        stepErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...stepErrors }));
    return isValid;
  };

  const handleChange = (e, index, section) => {
    const { name, value, files } = e.target;
    const fieldValue = files ? files[0] : value;
    
    if (section) {
      const updated = [...(section === "experiences" ? experiences : section === "achievements" ? achievements : activities)];
      updated[index][name] = fieldValue;
      section === "experiences" ? setExperiences(updated) : section === "achievements" ? setAchievements(updated) : setActivities(updated);
    } else {
      setFormData({ ...formData, [name]: fieldValue });
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
      
      // Mark field as touched
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleBlur = (name) => {
    const stepRules = validationRules[step];
    if (stepRules && stepRules[name]) {
      const error = validateField(name, formData[name], stepRules);
      setErrors(prev => ({ ...prev, [name]: error }));
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const addFieldSet = (section) => {
    if (section === "experiences") setExperiences([...experiences, {}]);
    else if (section === "achievements") setAchievements([...achievements, {}]);
    else if (section === "activities") setActivities([...activities, {}]);
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderInput = (label, name, type = "text", onChange, index = null, section = null, required = false) => {
    const hasError = errors[name] && touched[name];
    const isRequired = validationRules[step] && validationRules[step][name] && validationRules[step][name].required;
    
    return (
      <div style={styles.inputGroup}>
        <label style={styles.label}>
          {label}
          {isRequired && <span style={{color: '#e53e3e', marginLeft: '4px'}}>*</span>}
        </label>
        <input
          style={{
            ...styles.input,
            ...(hasError ? styles.inputError : {})
          }}
          name={name}
          type={type}
          onChange={(e) => (section !== null ? handleChange(e, index, section) : handleChange(e))}
          onBlur={() => section === null && handleBlur(name)}
          onFocus={(e) => {
            if (!hasError) {
              Object.assign(e.target.style, styles.inputFocus);
            }
          }}
          onBlurCapture={(e) => {
            Object.assign(e.target.style, styles.input);
            if (hasError) {
              Object.assign(e.target.style, styles.inputError);
            }
          }}
        />
        {hasError && (
          <div style={styles.errorText}>
            {errors[name]}
          </div>
        )}
      </div>
    );
  };

  const renderTextarea = (label, name, onChange, index = null, section = null) => {
    const hasError = errors[name] && touched[name];
    const isRequired = validationRules[step] && validationRules[step][name] && validationRules[step][name].required;
    
    return (
      <div style={styles.inputGroup}>
        <label style={styles.label}>
          {label}
          {isRequired && <span style={{color: '#e53e3e', marginLeft: '4px'}}>*</span>}
        </label>
        <textarea
          style={{
            ...styles.textarea,
            ...(hasError ? styles.inputError : {})
          }}
          name={name}
          rows="4"
          onChange={(e) => (section !== null ? handleChange(e, index, section) : handleChange(e))}
          onBlur={() => section === null && handleBlur(name)}
          onFocus={(e) => {
            if (!hasError) {
              Object.assign(e.target.style, styles.inputFocus);
            }
          }}
          onBlurCapture={(e) => {
            Object.assign(e.target.style, styles.textarea);
            if (hasError) {
              Object.assign(e.target.style, styles.inputError);
            }
          }}
        />
        {hasError && (
          <div style={styles.errorText}>
            {errors[name]}
          </div>
        )}
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <div style={styles.sectionTitle}>
              <span style={{fontSize: '1.5rem'}}>👤</span>
              Personal Information
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
              {renderInput("Full Name", "name")}
              {renderInput("Date of Birth", "dob", "date")}
              {renderInput("Gender", "gender")}
              {renderInput("College/Institution", "college")}
              {renderInput("Institution Roll Number", "institution_roll_no")}
              {renderInput("Primary Email Address", "primary_email", "email")}
              {renderInput("Personal Email Address", "personal_email", "email")}
              {renderInput("Mobile Number", "mobile_no", "tel")}
              {renderInput("Password", "password", "password")}
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <div style={styles.sectionTitle}>
              <span style={{fontSize: '1.5rem'}}>🏠</span>
              Permanent Address
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'}}>
              {renderInput("Country", "country")}
              {renderInput("Pincode", "pincode")}
              {renderInput("State", "state")}
              {renderInput("District", "district")}
              {renderInput("City", "city")}
            </div>
            {renderTextarea("Complete Address", "address_line")}
          </div>
        );
      case 2:
        return (
          <div>
            <div style={styles.sectionTitle}>
              <span style={{fontSize: '1.5rem'}}>🎓</span>
              Educational Background
            </div>
            
            <div style={styles.sectionCard}>
              <h3 style={styles.subSectionTitle}>Higher Secondary Education</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'}}>
                {renderInput("Degree", "degree")}
                {renderInput("Specialization", "specialization")}
                {renderInput("College Name", "college_name")}
                {renderInput("Register Number", "register_number")}
                {renderInput("CGPA/Percentage", "cgpa", "number")}
                {renderInput("Year of Passing", "passout_year_college", "number")}
              </div>
            </div>

            <div style={styles.sectionCard}>
              <h3 style={styles.subSectionTitle}>Class X Details</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'}}>
                {renderInput("School Name", "x_school")}
                {renderInput("Board", "x_board")}
                {renderInput("Year of Passing", "x_year", "number")}
                {renderInput("Percentage", "x_percentage", "number")}
              </div>
            </div>

            <div style={styles.sectionCard}>
              <h3 style={styles.subSectionTitle}>Class XII Details</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'}}>
                {renderInput("School Name", "xii_school")}
                {renderInput("Board", "xii_board")}
                {renderInput("Year of Passing", "xii_year", "number")}
                {renderInput("Percentage", "xii_percentage", "number")}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <div style={styles.sectionTitle}>
              <span style={{fontSize: '1.5rem'}}>💼</span>
              Project Details
            </div>
            <div style={styles.sectionCard}>
              {renderInput("Project Title", "project_title")}
              {renderInput("Technology Stack", "techstack")}
              {renderTextarea("Project Description", "project_description")}
              {renderInput("Project Link (Optional)", "project_link", "url")}
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <div style={styles.sectionTitle}>
              <span style={{fontSize: '1.5rem'}}>🚀</span>
              Skills & Expertise
            </div>
            <div style={styles.sectionCard}>
              {renderTextarea("Technical Skills (comma separated)", "technical_skills")}
              {renderTextarea("Programming Languages", "languages")}
              {renderTextarea("Core Subjects", "subjects")}
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <div style={styles.sectionTitle}>
              <span style={{fontSize: '1.5rem'}}>💪</span>
              Work Experience
            </div>
            {experiences.map((_, i) => (
              <div key={i} style={{
                ...styles.sectionCard,
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                border: '2px solid #cbd5e0'
              }}>
                <h5 style={{color: '#667eea', marginBottom: '20px', fontSize: '16px', fontWeight: '600'}}>
                  🏢 Experience #{i + 1}
                </h5>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                  {renderInput("Job Role", "job_role", "text", handleChange, i, "experiences")}
                  {renderInput("Company Name", "company_name", "text", handleChange, i, "experiences")}
                  {renderInput("Duration", "duration", "text", handleChange, i, "experiences")}
                </div>
                {renderTextarea("Job Description", "experience_description", handleChange, i, "experiences")}
              </div>
            ))}
            <button 
              type="button" 
              style={styles.addButton}
              onClick={() => addFieldSet("experiences")}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0px)'}
            >
              <span>➕</span> Add Another Experience
            </button>
          </div>
        );
      case 6:
        return (
          <div>
            <div style={styles.sectionTitle}>
              <span style={{fontSize: '1.5rem'}}>🏆</span>
              Achievements
            </div>
            {achievements.map((_, i) => (
              <div key={i} style={{
                ...styles.sectionCard,
                background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)',
                border: '2px solid #feb2b2'
              }}>
                <h5 style={{color: '#e53e3e', marginBottom: '20px', fontSize: '16px', fontWeight: '600'}}>
                  🎖️ Achievement #{i + 1}
                </h5>
                {renderInput("Achievement Title", "achievement_title", "text", handleChange, i, "achievements")}
                {renderTextarea("Description", "achievement_description", handleChange, i, "achievements")}
              </div>
            ))}
            <button 
              type="button" 
              style={{...styles.addButton, background: 'linear-gradient(135deg, #e53e3e, #c53030)'}}
              onClick={() => addFieldSet("achievements")}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0px)'}
            >
              <span>🏆</span> Add Another Achievement
            </button>
          </div>
        );
      case 7:
        return (
          <div>
            <div style={styles.sectionTitle}>
              <span style={{fontSize: '1.5rem'}}>🎭</span>
              Extra Curricular Activities
            </div>
            {activities.map((_, i) => (
              <div key={i} style={{
                ...styles.sectionCard,
                background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
                border: '2px solid #9ae6b4'
              }}>
                <h5 style={{color: '#38a169', marginBottom: '20px', fontSize: '16px', fontWeight: '600'}}>
                  🎨 Activity #{i + 1}
                </h5>
                {renderInput("Activity Title", "activity_title", "text", handleChange, i, "activities")}
                {renderTextarea("Description", "activity_description", handleChange, i, "activities")}
              </div>
            ))}
            <button 
              type="button" 
              style={{...styles.addButton, background: 'linear-gradient(135deg, #38a169, #2f855a)'}}
              onClick={() => addFieldSet("activities")}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0px)'}
            >
              <span>🎭</span> Add Another Activity
            </button>
          </div>
        );
      case 8:
        return (
          <div>
            <div style={styles.sectionTitle}>
              <span style={{fontSize: '1.5rem'}}>📄</span>
              Resume Upload
            </div>
            <div style={styles.sectionCard}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Upload Resume
                  <span style={{color: '#e53e3e', marginLeft: '4px'}}>*</span>
                </label>
                <input
                  style={{
                    ...styles.input,
                    ...(errors.resume && touched.resume ? styles.inputError : {})
                  }}
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  onBlur={() => handleBlur('resume')}
                />
                <div style={{
                  fontSize: '13px',
                  color: '#718096',
                  marginTop: '8px',
                  fontStyle: 'italic'
                }}>
                  📎 Supported formats: PDF, DOC, DOCX (Max size: 5MB)
                </div>
                {errors.resume && touched.resume && (
                  <div style={styles.errorText}>
                    {errors.resume}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Check if current step has validation errors
  const hasStepErrors = () => {
    const stepRules = validationRules[step];
    if (!stepRules) return false;
    
    return Object.keys(stepRules).some(fieldName => {
      const error = validateField(fieldName, formData[fieldName], stepRules);
      return error !== '';
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        {/* Header */}
        <div style={styles.stepHeader}>
          <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>
            {stepIcons[step]}
          </div>
          <h1 style={{fontSize: '2rem', margin: '0', fontWeight: '700'}}>
            {steps[step]}
          </h1>
          <p style={{fontSize: '1.1rem', margin: '10px 0 0 0', opacity: '0.9'}}>
            Step {step + 1} of {steps.length}
          </p>
        </div>
        
        {/* Step Indicators */}
        <div style={styles.stepIndicator}>
          {steps.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.stepDot,
                ...(index === step ? styles.stepDotActive : {}),
                ...(index < step ? styles.stepDotCompleted : {})
              }}
            />
          ))}
        </div>
        
        {/* Progress Bar */}
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${(step + 1) * (100 / steps.length)}%`
            }}
          />
        </div>
        
        {/* Validation Summary */}
        {hasStepErrors() && Object.keys(touched).length > 0 && (
          <div style={styles.alertCard}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
              <span style={{fontSize: '1.2rem', marginRight: '8px'}}>⚠️</span>
              <strong>Please fix the following errors before proceeding:</strong>
            </div>
            <ul style={{margin: '0', paddingLeft: '20px'}}>
              {Object.entries(errors).filter(([key, error]) => error && touched[key]).map(([key, error]) => (
                <li key={key} style={{marginBottom: '4px', fontSize: '14px'}}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Form Content */}
        <div style={{paddingTop: '20px'}}>
          {renderStep()}
        </div>
        
        {/* Navigation Buttons */}
        <div style={styles.navigationArea}>
          <button 
            style={{
              ...styles.button,
              ...styles.secondaryButton,
              opacity: step === 0 ? 0.5 : 1,
              cursor: step === 0 ? 'not-allowed' : 'pointer'
            }}
            onClick={prevStep} 
            disabled={step === 0}
            onMouseOver={(e) => {
              if (step !== 0) {
                Object.assign(e.target.style, styles.secondaryButtonHover);
              }
            }}
            onMouseOut={(e) => {
              Object.assign(e.target.style, styles.secondaryButton);
            }}
          >
            ← Back
          </button>
          <button 
            style={{
              ...styles.button,
              ...styles.primaryButton,
              opacity: step === steps.length - 1 ? 0.5 : 1,
              cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer'
            }}
            onClick={nextStep} 
            disabled={step === steps.length - 1}
            onMouseOver={(e) => {
              if (step !== steps.length - 1) {
                Object.assign(e.target.style, styles.primaryButtonHover);
              }
            }}
            onMouseOut={(e) => {
              Object.assign(e.target.style, styles.primaryButton);
            }}
          >
            {step === steps.length - 2 ? '✅ Submit' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ARregistration;