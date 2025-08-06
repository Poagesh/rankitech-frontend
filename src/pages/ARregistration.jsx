import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const steps = [
  'Basic Info',
  'Permanent Address',
  'Education Details',
  'Projects',
  'Skills',
  'Experiences',
  'Achievements',
  'Extra Curricular Activities',
];

const validationRules = {
  0: {
    name: { required: true, minLength: 2 },
    dob: { required: true },
    gender: { required: true },
    college: { required: true },
    institution_roll_no: { required: true },
    primary_email: { required: true, email: true },
    personal_email: { required: false, email: true },
    mobile_no: { required: true, phone: true },
    password: { required: true, minLength: 6 },
  },
  1: {
    country: { required: true },
    pincode: { required: true, pattern: /^\d{6}$/ },
    state: { required: true },
    district: { required: true },
    city: { required: true },
    address_line: { required: true, minLength: 10 },
  },
  2: {
    level: { required: true },
    institution_name: { required: true },
    degree: { required: true },
    specialization: { required: true },
    register_number: { required: true },
    cgpa: { required: true, min: 0, max: 10 },
    board: { required: true },
    year_of_pass_out: { required: true, min: 1990, max: new Date().getFullYear() + 5 },
    percentage: { required: true, min: 0, max: 100 },
  },
  3: {
    project_title: { required: true },
    techstack: { required: true },
    description: { required: true, minLength: 20 },
    project_link: { required: false, url: true },
  },
  4: {
    technical_skills: { required: true },
    languages: { required: true },
    subjects: { required: true },
  },
  5: {
    job_role: { required: true },
    organization: { required: true },
    duration: { required: true },
    description: { required: true, minLength: 20 },
  },
  6: {
    title: { required: true },
    description: { required: true, minLength: 20 },
  },
  7: {
    title: { required: true },
    description: { required: true, minLength: 20 },
  },
};

const stepIcons = {
  0: '👤',
  1: '🏠',
  2: '🎓',
  3: '💼',
  4: '🚀',
  5: '💪',
  6: '🏆',
  7: '🎭',
};

const InputField = ({ label, name, type = 'text', value, onChange, onBlur, error, touched, section }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fw-semibold">
        {label}
        {validationRules[section]?.[name]?.required && <span className="text-danger ms-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        className={`form-control ${error && touched ? 'is-invalid' : ''}`}
        name={name}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && touched && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

const TextareaField = ({ label, name, value, onChange, onBlur, error, touched, section }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fw-semibold">
        {label}
        {validationRules[section]?.[name]?.required && <span className="text-danger ms-1">*</span>}
      </label>
      <textarea
        id={name}
        className={`form-control ${error && touched ? 'is-invalid' : ''}`}
        name={name}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        rows="4"
      />
      {error && touched && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

const ARregistration = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [educationDetails, setEducationDetails] = useState([{}]);
  const [projects, setProjects] = useState([{}]);
  const [experiences, setExperiences] = useState([{}]);
  const [achievements, setAchievements] = useState([{}]);
  const [activities, setActivities] = useState([{}]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value, rules) => {
    if (!rules) return '';
    if (rules.required && (!value || value.toString().trim() === '')) {
      return `${name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} is required`;
    }
    if (value) {
      if (rules.minLength && value.length < rules.minLength) return `Must be at least ${rules.minLength} characters`;
      if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
      if (rules.phone && !/^[6-9]\d{9}$/.test(value)) return 'Invalid 10-digit mobile number';
      if (rules.pattern && !rules.pattern.test(value)) return name === 'pincode' ? 'Invalid 6-digit pincode' : 'Invalid format';
      if (rules.min && parseFloat(value) < rules.min) return `Must be at least ${rules.min}`;
      if (rules.max && parseFloat(value) > rules.max) return `Must be at most ${rules.max}`;
      if (rules.url && !/^https?:\/\/.+/.test(value)) return 'Invalid URL';
    }
    return '';
  };

  const validateStep = (stepIndex) => {
    const stepRules = validationRules[stepIndex];
    if (!stepRules) return true;

    const stepErrors = {};
    let isValid = true;

    if (stepIndex === 2) {
      educationDetails.forEach((edu, index) => {
        Object.keys(stepRules).forEach(fieldName => {
          const value = edu[fieldName];
          const error = validateField(fieldName, value, stepRules[fieldName]);
          if (error) {
            stepErrors[`${fieldName}_${index}`] = error;
            isValid = false;
          }
        });
      });
    } else if (stepIndex === 3) {
      projects.forEach((proj, index) => {
        Object.keys(stepRules).forEach(fieldName => {
          const value = proj[fieldName];
          const error = validateField(fieldName, value, stepRules[fieldName]);
          if (error) {
            stepErrors[`${fieldName}_${index}`] = error;
            isValid = false;
          }
        });
      });
    } else if (stepIndex === 5) {
      experiences.forEach((exp, index) => {
        Object.keys(stepRules).forEach(fieldName => {
          const value = exp[fieldName];
          const error = validateField(fieldName, value, stepRules[fieldName]);
          if (error) {
            stepErrors[`${fieldName}_${index}`] = error;
            isValid = false;
          }
        });
      });
    } else if (stepIndex === 6) {
      achievements.forEach((ach, index) => {
        Object.keys(stepRules).forEach(fieldName => {
          const value = ach[fieldName];
          const error = validateField(fieldName, value, stepRules[fieldName]);
          if (error) {
            stepErrors[`${fieldName}_${index}`] = error;
            isValid = false;
          }
        });
      });
    } else if (stepIndex === 7) {
      activities.forEach((act, index) => {
        Object.keys(stepRules).forEach(fieldName => {
          const value = act[fieldName];
          const error = validateField(fieldName, value, stepRules[fieldName]);
          if (error) {
            stepErrors[`${fieldName}_${index}`] = error;
            isValid = false;
          }
        });
      });
    } else {
      Object.keys(stepRules).forEach(fieldName => {
        const value = formData[fieldName];
        const error = validateField(fieldName, value, stepRules[fieldName]);
        if (error) {
          stepErrors[fieldName] = error;
          isValid = false;
        }
      });
    }

    setErrors(prev => ({ ...prev, ...stepErrors }));
    return isValid;
  };

  const handleChange = (e, index, section) => {
    const { name, value } = e.target;
    const fieldValue = value;

    if (section === 'education_details') {
      const updated = [...educationDetails];
      updated[index] = { ...updated[index], [name]: fieldValue };
      setEducationDetails(updated);
    } else if (section === 'projects') {
      const updated = [...projects];
      updated[index] = { ...updated[index], [name]: fieldValue };
      setProjects(updated);
    } else if (section === 'experiences') {
      const updated = [...experiences];
      updated[index] = { ...updated[index], [name]: fieldValue };
      setExperiences(updated);
    } else if (section === 'achievements') {
      const updated = [...achievements];
      updated[index] = { ...updated[index], [name]: fieldValue };
      setAchievements(updated);
    } else if (section === 'activities') {
      const updated = [...activities];
      updated[index] = { ...updated[index], [name]: fieldValue };
      setActivities(updated);
    } else {
      setFormData(prev => ({ ...prev, [name]: fieldValue }));
      setTouched(prev => ({ ...prev, [name]: true }));
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setServerError('');
  };

  const handleBlur = (name, index, section) => {
    const stepRules = validationRules[step];
    if (!stepRules?.[name]) return;

    if (section) {
      const data = section === 'education_details' ? educationDetails :
                   section === 'projects' ? projects :
                   section === 'experiences' ? experiences :
                   section === 'achievements' ? achievements : activities;
      const error = validateField(name, data[index]?.[name], stepRules[name]);
      setErrors(prev => ({ ...prev, [`${name}_${index}`]: error }));
      setTouched(prev => ({ ...prev, [`${name}_${index}`]: true }));
    } else {
      const error = validateField(name, formData[name], stepRules[name]);
      setErrors(prev => ({ ...prev, [name]: error }));
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const addFieldSet = (section) => {
    if (section === 'education_details') setEducationDetails(prev => [...prev, {}]);
    else if (section === 'projects') setProjects(prev => [...prev, {}]);
    else if (section === 'experiences') setExperiences(prev => [...prev, {}]);
    else if (section === 'achievements') setAchievements(prev => [...prev, {}]);
    else if (section === 'activities') setActivities(prev => [...prev, {}]);
  };

  const handleSubmit = async () => {
  if (validateStep(step)) {
    setIsSubmitting(true);
    setServerError('');
    try {
      const formDataPayload = new FormData();

      // Append basic fields
      const basicFields = [
        'name', 'dob', 'gender', 'college', 'institution_roll_no',
        'primary_email', 'personal_email', 'mobile_no', 'password',
        'country', 'pincode', 'state', 'district', 'city', 'address_line'
      ];
      basicFields.forEach(field => {
        if (formData[field]) {
          formDataPayload.append(field, formData[field]);
        }
      });

      // Append complex fields
      formDataPayload.append('education_details', JSON.stringify(educationDetails));
      formDataPayload.append('projects', JSON.stringify(projects));
      const technicalSkills = formData.technical_skills?.split(',').map(skill => ({ skill: skill.trim() })) || [];
      const languages = formData.languages?.split(',').map(lang => ({ language: lang.trim() })) || [];
      const subjects = formData.subjects?.split(',').map(sub => ({ subject: sub.trim() })) || [];
      formDataPayload.append('technical_skills', JSON.stringify(technicalSkills));
      formDataPayload.append('languages', JSON.stringify(languages));
      formDataPayload.append('subjects', JSON.stringify(subjects));
      formDataPayload.append('experiences', JSON.stringify(experiences));
      formDataPayload.append('achievements', JSON.stringify(achievements));
      formDataPayload.append('extra_curricular_activities', JSON.stringify(activities));

      const response = await axios.post('http://localhost:8000/api/ar-register', formDataPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Reset form and navigate
      setFormData({});
      setEducationDetails([{}]);
      setProjects([{}]);
      setExperiences([{}]);
      setAchievements([{}]);
      setActivities([{}]);
      setErrors({});
      setTouched({});
      setStep(0);
      toast.success('Registration completed successfully!', {
      position: 'top-right',
      autoClose: 3000,
      });

      setTimeout(() => {
      navigate('/');
      }, 500); // give time for toast to appear


    } catch (error) {
      console.error('Submission error:', error);
      setServerError(error.response?.data?.detail || 'An error occurred during submission');
    } finally {
      setIsSubmitting(false);
    }
  }
};


  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2 className="h4 mb-4 fw-bold">
              <span className="fs-3 me-2">{stepIcons[0]}</span> Personal Information
            </h2>
            <div className="row g-3">
              <div className="col-md-6">
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  error={errors.name}
                  touched={touched.name}
                  section={step}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  onBlur={() => handleBlur('dob')}
                  error={errors.dob}
                  touched={touched.dob}
                  section={step}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={() => handleBlur('gender')}
                  error={errors.gender}
                  touched={touched.gender}
                  section={step}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="College/Institution"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  onBlur={() => handleBlur('college')}
                  error={errors.college}
                  touched={touched.college}
                  section={step}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="Institution Roll Number"
                  name="institution_roll_no"
                  value={formData.institution_roll_no}
                  onChange={handleChange}
                  onBlur={() => handleBlur('institution_roll_no')}
                  error={errors.institution_roll_no}
                  touched={touched.institution_roll_no}
                  section={step}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="Primary Email Address"
                  name="primary_email"
                  type="email"
                  value={formData.primary_email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('primary_email')}
                  error={errors.primary_email}
                  touched={touched.primary_email}
                  section={step}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="Personal Email Address"
                  name="personal_email"
                  type="email"
                  value={formData.personal_email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('personal_email')}
                  error={errors.personal_email}
                  touched={touched.personal_email}
                  section={step}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="Mobile Number"
                  name="mobile_no"
                  type="tel"
                  value={formData.mobile_no}
                  onChange={handleChange}
                  onBlur={() => handleBlur('mobile_no')}
                  error={errors.mobile_no}
                  touched={touched.mobile_no}
                  section={step}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                  section={step}
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h2 className="h4 mb-4 fw-bold">
              <span className="fs-3 me-2">{stepIcons[1]}</span> Permanent Address
            </h2>
            <div className="row g-3">
              <div className="col-md-6">
                <InputField
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  onBlur={() => handleBlur('country')}
                  error={errors.country}
                  touched={touched.country}
                  section={step}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  onBlur={() => handleBlur('pincode')}
                  error={errors.pincode}
                  touched={touched.pincode}
                  section={step}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={() => handleBlur('state')}
                  error={errors.state}
                  touched={touched.state}
                  section={step}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  onBlur={() => handleBlur('district')}
                  error={errors.district}
                  touched={touched.district}
                  section={step}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={() => handleBlur('city')}
                  error={errors.city}
                  touched={touched.city}
                  section={step}
                />
              </div>
            </div>
            <TextareaField
              label="Complete Address"
              name="address_line"
              value={formData.address_line}
              onChange={handleChange}
              onBlur={() => handleBlur('address_line')}
              error={errors.address_line}
              touched={touched.address_line}
              section={step}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="h4 mb-4 fw-bold">
              <span className="fs-3 me-2">{stepIcons[2]}</span> Educational Background
            </h2>
            {educationDetails.map((edu, i) => (
              <div key={i} className="card mb-3">
                <div className="card-body">
                  <h3 className="h5 mb-3 border-bottom pb-2">Education #{i + 1}</h3>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <InputField
                        label="Level (e.g., college, school)"
                        name="level"
                        value={edu.level}
                        onChange={(e) => handleChange(e, i, 'education_details')}
                        onBlur={() => handleBlur('level', i, 'education_details')}
                        error={errors[`level_${i}`]}
                        touched={touched[`level_${i}`]}
                        section={step}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        label="Institution Name"
                        name="institution_name"
                        value={edu.institution_name}
                        onChange={(e) => handleChange(e, i, 'education_details')}
                        onBlur={() => handleBlur('institution_name', i, 'education_details')}
                        error={errors[`institution_name_${i}`]}
                        touched={touched[`institution_name_${i}`]}
                        section={step}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        label="Degree"
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleChange(e, i, 'education_details')}
                        onBlur={() => handleBlur('degree', i, 'education_details')}
                        error={errors[`degree_${i}`]}
                        touched={touched[`degree_${i}`]}
                        section={step}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        label="Specialization"
                        name="specialization"
                        value={edu.specialization}
                        onChange={(e) => handleChange(e, i, 'education_details')}
                        onBlur={() => handleBlur('specialization', i, 'education_details')}
                        error={errors[`specialization_${i}`]}
                        touched={touched[`specialization_${i}`]}
                        section={step}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        label="Register Number"
                        name="register_number"
                        value={edu.register_number}
                        onChange={(e) => handleChange(e, i, 'education_details')}
                        onBlur={() => handleBlur('register_number', i, 'education_details')}
                        error={errors[`register_number_${i}`]}
                        touched={touched[`register_number_${i}`]}
                        section={step}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        label="CGPA"
                        name="cgpa"
                        type="number"
                        value={edu.cgpa}
                        onChange={(e) => handleChange(e, i, 'education_details')}
                        onBlur={() => handleBlur('cgpa', i, 'education_details')}
                        error={errors[`cgpa_${i}`]}
                        touched={touched[`cgpa_${i}`]}
                        section={step}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        label="Board"
                        name="board"
                        value={edu.board}
                        onChange={(e) => handleChange(e, i, 'education_details')}
                        onBlur={() => handleBlur('board', i, 'education_details')}
                        error={errors[`board_${i}`]}
                        touched={touched[`board_${i}`]}
                        section={step}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        label="Year of Passing"
                        name="year_of_pass_out"
                        type="number"
                        value={edu.year_of_pass_out}
                        onChange={(e) => handleChange(e, i, 'education_details')}
                        onBlur={() => handleBlur('year_of_pass_out', i, 'education_details')}
                        error={errors[`year_of_pass_out_${i}`]}
                        touched={touched[`year_of_pass_out_${i}`]}
                        section={step}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        label="Percentage"
                        name="percentage"
                        type="number"
                        value={edu.percentage}
                        onChange={(e) => handleChange(e, i, 'education_details')}
                        onBlur={() => handleBlur('percentage', i, 'education_details')}
                        error={errors[`percentage_${i}`]}
                        touched={touched[`percentage_${i}`]}
                        section={step}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={() => addFieldSet('education_details')}
            >
              <span>➕</span> Add Another Education
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="h4 mb-4 fw-bold">
              <span className="fs-3 me-2">{stepIcons[3]}</span> Project Details
            </h2>
            {projects.map((proj, i) => (
              <div key={i} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title text-primary mb-3">💼 Project #{i + 1}</h5>
                  <InputField
                    label="Project Title"
                    name="project_title"
                    value={proj.project_title}
                    onChange={(e) => handleChange(e, i, 'projects')}
                    onBlur={() => handleBlur('project_title', i, 'projects')}
                    error={errors[`project_title_${i}`]}
                    touched={touched[`project_title_${i}`]}
                    section={step}
                  />
                  <InputField
                    label="Technology Stack"
                    name="techstack"
                    value={proj.techstack}
                    onChange={(e) => handleChange(e, i, 'projects')}
                    onBlur={() => handleBlur('techstack', i, 'projects')}
                    error={errors[`techstack_${i}`]}
                    touched={touched[`techstack_${i}`]}
                    section={step}
                  />
                  <TextareaField
                    label="Description"
                    name="description"
                    value={proj.description}
                    onChange={(e) => handleChange(e, i, 'projects')}
                    onBlur={() => handleBlur('description', i, 'projects')}
                    error={errors[`description_${i}`]}
                    touched={touched[`description_${i}`]}
                    section={step}
                  />
                  <InputField
                    label="Project Link (Optional)"
                    name="project_link"
                    type="url"
                    value={proj.project_link}
                    onChange={(e) => handleChange(e, i, 'projects')}
                    onBlur={() => handleBlur('project_link', i, 'projects')}
                    error={errors[`project_link_${i}`]}
                    touched={touched[`project_link_${i}`]}
                    section={step}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={() => addFieldSet('projects')}
            >
              <span>➕</span> Add Another Project
            </button>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="h4 mb-4 fw-bold">
              <span className="fs-3 me-2">{stepIcons[4]}</span> Skills & Expertise
            </h2>
            <div className="card mb-3">
              <div className="card-body">
                <TextareaField
                  label="Technical Skills (comma separated)"
                  name="technical_skills"
                  value={formData.technical_skills}
                  onChange={handleChange}
                  onBlur={() => handleBlur('technical_skills')}
                  error={errors.technical_skills}
                  touched={touched.technical_skills}
                  section={step}
                />
                <TextareaField
                  label="Programming Languages"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  onBlur={() => handleBlur('languages')}
                  error={errors.languages}
                  touched={touched.languages}
                  section={step}
                />
                <TextareaField
                  label="Core Subjects"
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleChange}
                  onBlur={() => handleBlur('subjects')}
                  error={errors.subjects}
                  touched={touched.subjects}
                  section={step}
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="h4 mb-4 fw-bold">
              <span className="fs-3 me-2">{stepIcons[5]}</span> Work Experience
            </h2>
            {experiences.map((exp, i) => (
              <div key={i} className="card mb-3 border-primary-subtle">
                <div className="card-body">
                  <h5 className="card-title text-primary mb-3">🏢 Experience #{i + 1}</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <InputField
                        label="Job Role"
                        name="job_role"
                        value={exp.job_role}
                        onChange={(e) => handleChange(e, i, 'experiences')}
                        onBlur={() => handleBlur('job_role', i, 'experiences')}
                        error={errors[`job_role_${i}`]}
                        touched={touched[`job_role_${i}`]}
                        section={step}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        label="Organization"
                        name="organization"
                        value={exp.organization}
                        onChange={(e) => handleChange(e, i, 'experiences')}
                        onBlur={() => handleBlur('organization', i, 'experiences')}
                        error={errors[`organization_${i}`]}
                        touched={touched[`organization_${i}`]}
                        section={step}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        label="Duration"
                        name="duration"
                        value={exp.duration}
                        onChange={(e) => handleChange(e, i, 'experiences')}
                        onBlur={() => handleBlur('duration', i, 'experiences')}
                        error={errors[`duration_${i}`]}
                        touched={touched[`duration_${i}`]}
                        section={step}
                      />
                    </div>
                  </div>
                  <TextareaField
                    label="Description"
                    name="description"
                    value={exp.description}
                    onChange={(e) => handleChange(e, i, 'experiences')}
                    onBlur={() => handleBlur('description', i, 'experiences')}
                    error={errors[`description_${i}`]}
                    touched={touched[`description_${i}`]}
                    section={step}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={() => addFieldSet('experiences')}
            >
              <span>➕</span> Add Another Experience
            </button>
          </div>
        );
      case 6:
        return (
          <div>
            <h2 className="h4 mb-4 fw-bold">
              <span className="fs-3 me-2">{stepIcons[6]}</span> Achievements
            </h2>
            {achievements.map((ach, i) => (
              <div key={i} className="card mb-3 border-danger-subtle">
                <div className="card-body">
                  <h5 className="card-title text-danger mb-3">🎖️ Achievement #{i + 1}</h5>
                  <InputField
                    label="Achievement Title"
                    name="title"
                    value={ach.title}
                    onChange={(e) => handleChange(e, i, 'achievements')}
                    onBlur={() => handleBlur('title', i, 'achievements')}
                    error={errors[`title_${i}`]}
                    touched={touched[`title_${i}`]}
                    section={step}
                  />
                  <TextareaField
                    label="Description"
                    name="description"
                    value={ach.description}
                    onChange={(e) => handleChange(e, i, 'achievements')}
                    onBlur={() => handleBlur('description', i, 'achievements')}
                    error={errors[`description_${i}`]}
                    touched={touched[`description_${i}`]}
                    section={step}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-danger d-flex align-items-center gap-2"
              onClick={() => addFieldSet('achievements')}
            >
              <span>🏆</span> Add Another Achievement
            </button>
          </div>
        );
      case 7:
        return (
          <div>
            <h2 className="h4 mb-4 fw-bold">
              <span className="fs-3 me-2">{stepIcons[7]}</span> Extra Curricular Activities
            </h2>
            {activities.map((act, i) => (
              <div key={i} className="card mb-3 border-success-subtle">
                <div className="card-body">
                  <h5 className="card-title text-success mb-3">🎨 Activity #{i + 1}</h5>
                  <InputField
                    label="Activity Title"
                    name="title"
                    value={act.title}
                    onChange={(e) => handleChange(e, i, 'activities')}
                    onBlur={() => handleBlur('title', i, 'activities')}
                    error={errors[`title_${i}`]}
                    touched={touched[`title_${i}`]}
                    section={step}
                  />
                  <TextareaField
                    label="Description"
                    name="description"
                    value={act.description}
                    onChange={(e) => handleChange(e, i, 'activities')}
                    onBlur={() => handleBlur('description', i, 'activities')}
                    error={errors[`description_${i}`]}
                    touched={touched[`description_${i}`]}
                    section={step}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-success d-flex align-items-center gap-2"
              onClick={() => addFieldSet('activities')}
            >
              <span>🎭</span> Add Another Activity
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const hasStepErrors = () => {
    const stepRules = validationRules[step];
    if (!stepRules) return false;
    if ([2, 3, 5, 6, 7].includes(step)) {
      const data = step === 2 ? educationDetails :
                   step === 3 ? projects :
                   step === 5 ? experiences :
                   step === 6 ? achievements : activities;
      return data.some((_, index) =>
        Object.keys(stepRules).some(fieldName => errors[`${fieldName}_${index}`] && touched[`${fieldName}_${index}`])
      );
    }
    return Object.keys(stepRules).some(fieldName => errors[fieldName] && touched[fieldName]);
  };

  return (
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient( 135deg, #e8f5e8 0%, #e0f2f1 50%, #e1f5fe 100%)' }}>
      <div className="container">
        <div className="card shadow-lg mx-auto" style={{ maxWidth: '800px' }}>
          <div className="card-body p-5">
            <div className="card bg-primary text-white text-center mb-4">
              <div className="card-body">
                <div className="fs-1 mb-2">{stepIcons[step]}</div>
                <h1 className="card-title h3">{steps[step]}</h1>
                <p className="card-text">Step {step + 1} of {steps.length}</p>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
              {steps.map((_, index) => (
                <span
                  key={index}
                  className={`d-inline-block rounded-circle ${index === step ? 'bg-primary' : index < step ? 'bg-success' : 'bg-secondary'}`}
                  style={{ width: '12px', height: '12px' }}
                ></span>
              ))}
            </div>

            <div className="progress mb-4" style={{ height: '12px' }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: `${(step + 1) * (100 / steps.length)}%` }}
                aria-valuenow={(step + 1) * (100 / steps.length)}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>

            {serverError && (
              <div className="alert alert-danger mb-4">
                <div className="d-flex align-items-center">
                  <span className="fs-5 me-2">❌</span>
                  <strong>{serverError}</strong>
                </div>
              </div>
            )}

            {hasStepErrors() && Object.keys(touched).length > 0 && (
              <div className="alert alert-warning mb-4">
                <div className="d-flex align-items-center mb-2">
                  <span className="fs-5 me-2">⚠️</span>
                  <strong>Please fix the following errors:</strong>
                </div>
                <ul className="mb-0 ps-4">
                  {Object.entries(errors)
                    .filter(([key, error]) => error && touched[key])
                    .map(([key, error]) => (
                      <li key={key} className="small">{error}</li>
                    ))}
                </ul>
              </div>
            )}

            <div>{renderStep()}</div>

            <div className="d-flex justify-content-between mt-5 pt-4 border-top">
              <button
                className="btn btn-outline-secondary"
                onClick={prevStep}
                disabled={step === 0}
              >
                ← Back
              </button>
              <button
                className="btn btn-primary"
                onClick={step === steps.length - 1 ? handleSubmit : nextStep}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : step === steps.length - 1 ? '✅ Submit' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARregistration;