import React, { useState } from 'react';

const steps = [
  'Basic Info',
  'Permanent Address',
  'Education Details',
  'Projects',
  'Skills',
  'Experiences',
  'Achievements',
  'Extra Curricular Activities',
  'Resume',
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
    xii_percentage: { required: true, min: 0, max: 100 },
  },
  3: {
    project_title: { required: true },
    techstack: { required: true },
    project_description: { required: true, minLength: 20 },
    project_link: { required: false, url: true },
  },
  4: {
    technical_skills: { required: true },
    languages: { required: true },
    subjects: { required: true },
  },
  8: {
    resume: { required: true, fileType: ['.pdf', '.doc', '.docx'] },
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
  8: '📄',
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
  const [experiences, setExperiences] = useState([{}]);
  const [achievements, setAchievements] = useState([{}]);
  const [activities, setActivities] = useState([{}]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      if (rules.fileType && value instanceof File) {
        const extension = '.' + value.name.split('.').pop().toLowerCase();
        if (!rules.fileType.includes(extension)) return `Supported formats: ${rules.fileType.join(', ')}`;
      }
    }
    return '';
  };

  const validateStep = (stepIndex) => {
    const stepRules = validationRules[stepIndex];
    if (!stepRules) return true;

    const stepErrors = {};
    let isValid = true;

    Object.keys(stepRules).forEach((fieldName) => {
      const value = formData[fieldName];
      const error = validateField(fieldName, value, stepRules[fieldName]);
      if (error) {
        stepErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors((prev) => ({ ...prev, ...stepErrors }));
    return isValid;
  };

  const handleChange = (e, index, section) => {
    const { name, value, files } = e.target;
    const fieldValue = files ? files[0] : value;

    if (section) {
      const updated = [...(section === 'experiences' ? experiences : section === 'achievements' ? achievements : activities)];
      updated[index] = { ...updated[index], [name]: fieldValue };
      section === 'experiences'
        ? setExperiences(updated)
        : section === 'achievements'
        ? setAchievements(updated)
        : setActivities(updated);
    } else {
      setFormData((prev) => ({ ...prev, [name]: fieldValue }));
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name) => {
    const stepRules = validationRules[step];
    if (stepRules?.[name]) {
      const error = validateField(name, formData[name], stepRules[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  const addFieldSet = (section) => {
    if (section === 'experiences') setExperiences((prev) => [...prev, {}]);
    else if (section === 'achievements') setAchievements((prev) => [...prev, {}]);
    else if (section === 'activities') setActivities((prev) => [...prev, {}]);
  };

  const handleSubmit = async () => {
    if (validateStep(step)) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Form submitted:', { formData, experiences, achievements, activities });
        // Reset form
        setFormData({});
        setExperiences([{}]);
        setAchievements([{}]);
        setActivities([{}]);
        setErrors({});
        setTouched({});
        setStep(0);
        alert('Registration completed successfully!');
      } catch (error) {
        console.error('Submission error:', error);
        alert('An error occurred during submission');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

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
            <div className="card mb-3">
              <div className="card-body">
                <h3 className="h5 mb-3 border-bottom pb-2">Higher Secondary Education</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <InputField
                      label="Degree"
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      onBlur={() => handleBlur('degree')}
                      error={errors.degree}
                      touched={touched.degree}
                      section={step}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="Specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      onBlur={() => handleBlur('specialization')}
                      error={errors.specialization}
                      touched={touched.specialization}
                      section={step}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="College Name"
                      name="college_name"
                      value={formData.college_name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('college_name')}
                      error={errors.college_name}
                      touched={touched.college_name}
                      section={step}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="Register Number"
                      name="register_number"
                      value={formData.register_number}
                      onChange={handleChange}
                      onBlur={() => handleBlur('register_number')}
                      error={errors.register_number}
                      touched={touched.register_number}
                      section={step}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="CGPA/Percentage"
                      name="cgpa"
                      type="number"
                      value={formData.cgpa}
                      onChange={handleChange}
                      onBlur={() => handleBlur('cgpa')}
                      error={errors.cgpa}
                      touched={touched.cgpa}
                      section={step}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="Year of Passing"
                      name="passout_year_college"
                      type="number"
                      value={formData.passout_year_college}
                      onChange={handleChange}
                      onBlur={() => handleBlur('passout_year_college')}
                      error={errors.passout_year_college}
                      touched={touched.passout_year_college}
                      section={step}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h3 className="h5 mb-3 border-bottom pb-2">Class X Details</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <InputField
                      label="School Name"
                      name="x_school"
                      value={formData.x_school}
                      onChange={handleChange}
                      onBlur={() => handleBlur('x_school')}
                      error={errors.x_school}
                      touched={touched.x_school}
                      section={step}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="Board"
                      name="x_board"
                      value={formData.x_board}
                      onChange={handleChange}
                      onBlur={() => handleBlur('x_board')}
                      error={errors.x_board}
                      touched={touched.x_board}
                      section={step}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="Year of Passing"
                      name="x_year"
                      type="number"
                      value={formData.x_year}
                      onChange={handleChange}
                      onBlur={() => handleBlur('x_year')}
                      error={errors.x_year}
                      touched={touched.x_year}
                      section={step}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="Percentage"
                      name="x_percentage"
                      type="number"
                      value={formData.x_percentage}
                      onChange={handleChange}
                      onBlur={() => handleBlur('x_percentage')}
                      error={errors.x_percentage}
                      touched={touched.x_percentage}
                      section={step}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h3 className="h5 mb-3 border-bottom pb-2">Class XII Details</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <InputField
                      label="School Name"
                      name="xii_school"
                      value={formData.xii_school}
                      onChange={handleChange}
                      onBlur={() => handleBlur('xii_school')}
                      error={errors.xii_school}
                      touched={touched.xii_school}
                      section={step}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="Board"
                      name="xii_board"
                      value={formData.xii_board}
                      onChange={handleChange}
                      onBlur={() => handleBlur('xii_board')}
                      error={errors.xii_board}
                      touched={touched.xii_board}
                      section={step}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="Year of Passing"
                      name="xii_year"
                      type="number"
                      value={formData.xii_year}
                      onChange={handleChange}
                      onBlur={() => handleBlur('xii_year')}
                      error={errors.xii_year}
                      touched={touched.xii_year}
                      section={step}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="Percentage"
                      name="xii_percentage"
                      type="number"
                      value={formData.xii_percentage}
                      onChange={handleChange}
                      onBlur={() => handleBlur('xii_percentage')}
                      error={errors.xii_percentage}
                      touched={touched.xii_percentage}
                      section={step}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="h4 mb-4 fw-bold">
              <span className="fs-3 me-2">{stepIcons[3]}</span> Project Details
            </h2>
            <div className="card mb-3">
              <div className="card-body">
                <InputField
                  label="Project Title"
                  name="project_title"
                  value={formData.project_title}
                  onChange={handleChange}
                  onBlur={() => handleBlur('project_title')}
                  error={errors.project_title}
                  touched={touched.project_title}
                  section={step}
                />
                <InputField
                  label="Technology Stack"
                  name="techstack"
                  value={formData.techstack}
                  onChange={handleChange}
                  onBlur={() => handleBlur('techstack')}
                  error={errors.techstack}
                  touched={touched.techstack}
                  section={step}
                />
                <TextareaField
                  label="Project Description"
                  name="project_description"
                  value={formData.project_description}
                  onChange={handleChange}
                  onBlur={() => handleBlur('project_description')}
                  error={errors.project_description}
                  touched={touched.project_description}
                  section={step}
                />
                <InputField
                  label="Project Link (Optional)"
                  name="project_link"
                  type="url"
                  value={formData.project_link}
                  onChange={handleChange}
                  onBlur={() => handleBlur('project_link')}
                  error={errors.project_link}
                  touched={touched.project_link}
                  section={step}
                />
              </div>
            </div>
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
                        section={step}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        label="Company Name"
                        name="company_name"
                        value={exp.company_name}
                        onChange={(e) => handleChange(e, i, 'experiences')}
                        section={step}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        label="Duration"
                        name="duration"
                        value={exp.duration}
                        onChange={(e) => handleChange(e, i, 'experiences')}
                        section={step}
                      />
                    </div>
                  </div>
                  <TextareaField
                    label="Job Description"
                    name="experience_description"
                    value={exp.experience_description}
                    onChange={(e) => handleChange(e, i, 'experiences')}
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
                    name="achievement_title"
                    value={ach.achievement_title}
                    onChange={(e) => handleChange(e, i, 'achievements')}
                    section={step}
                  />
                  <TextareaField
                    label="Description"
                    name="achievement_description"
                    value={ach.achievement_description}
                    onChange={(e) => handleChange(e, i, 'achievements')}
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
                    name="activity_title"
                    value={act.activity_title}
                    onChange={(e) => handleChange(e, i, 'activities')}
                    section={step}
                  />
                  <TextareaField
                    label="Description"
                    name="activity_description"
                    value={act.activity_description}
                    onChange={(e) => handleChange(e, i, 'activities')}
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
      case 8:
        return (
          <div>
            <h2 className="h4 mb-4 fw-bold">
              <span className="fs-3 me-2">{stepIcons[8]}</span> Resume Upload
            </h2>
            <div className="card mb-3">
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="resume" className="form-label fw-semibold">
                    Upload Resume <span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    id="resume"
                    type="file"
                    className={`form-control ${errors.resume && touched.resume ? 'is-invalid' : ''}`}
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    onBlur={() => handleBlur('resume')}
                  />
                  <div className="form-text fst-italic">
                    📎 Supported formats: PDF, DOC, DOCX (Max size: 5MB)
                  </div>
                  {errors.resume && touched.resume && <div className="invalid-feedback">{errors.resume}</div>}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const hasStepErrors = () => {
    const stepRules = validationRules[step];
    if (!stepRules) return false;
    return Object.keys(stepRules).some((fieldName) => errors[fieldName] && touched[fieldName]);
  };

  return (
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
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

            {hasStepErrors() && Object.keys(touched).length > 0 && (
              <div className="alert alert-warning mb-4">
                <div className="d-flex align-items-center mb-2">
                  <span className="fs-5 me-2">⚠️</span>
                  <strong>Please fix the following errors:</strong>
                </div>
                <ul className="mb-0 ps-4">
                  {Object.entries(errors)
                    .filter(([_, error]) => error && touched[_])
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
                disabled={isSubmitting || step === steps.length - 1}
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