import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const RecruiterSignupForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    designation: "",
    companyName: "",
    website: "",
    industry: "",
    type: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit number";
    if (!formData.designation) newErrors.designation = "Designation is required";
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!/^https?:\/\/.+\..+/.test(formData.website)) newErrors.website = "Enter a valid URL";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.type) newErrors.type = "Company type is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully!");
      console.log(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const gradientStyle = {
    background: "transparent",
    color: "#333",
    border: "none",
  };
  const iconStyle = {
  color: '#1e88e5',
};
const buttonStyle = {
  backgroundColor: '#1e88e5',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
};

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
      
    >
      <div className="card shadow-lg p-4 bg-white text-dark" style={{ maxWidth: "500px", width: "100%" }}>
        <h4 className="mb-4 text-center fw-bold" style={gradientStyle}>
          <i className="bi bi-person-badge-fill me-2 p-2 rounded-circle" style={iconStyle}></i>
          Recruiter Signup
        </h4>
        <form onSubmit={handleSubmit}>
          {/* Phone Number */}
          <div className="mb-3">
            <label className="form-label d-flex align-items-center">
              <i className="bi bi-telephone-fill me-2 p-2 rounded-circle" style={iconStyle}></i>
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          {/* Designation */}
          <div className="mb-3">
            <label className="form-label d-flex align-items-center">
             <i className="bi bi-person-workspace me-2 p-2 rounded-circle" style={iconStyle}></i>
              Designation
            </label>
            <input
              type="text"
              name="designation"
              className={`form-control ${errors.designation ? "is-invalid" : ""}`}
              value={formData.designation}
              onChange={handleChange}
              placeholder="e.g. HR Manager"
            />
            {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
          </div>

          {/* Company Name */}
          <div className="mb-3">
            <label className="form-label d-flex align-items-center">
             <i className="bi bi-building me-2 p-2 rounded-circle" style={iconStyle}></i>
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Infosys"
            />
            {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
          </div>

          {/* Website */}
          <div className="mb-3">
            <label className="form-label d-flex align-items-center">
              <i className="bi bi-globe2 me-2 p-2 rounded-circle" style={iconStyle}></i>
              Company Website
            </label>
            <input
              type="url"
              name="website"
              className={`form-control ${errors.website ? "is-invalid" : ""}`}
              value={formData.website}
              onChange={handleChange}
              placeholder="e.g. https://company.com"
            />
            {errors.website && <div className="invalid-feedback">{errors.website}</div>}
          </div>

          {/* Industry */}
          <div className="mb-3">
            <label className="form-label d-flex align-items-center">
             <i className="bi bi-briefcase-fill me-2 p-2 rounded-circle" style={iconStyle}></i>
              Industry
            </label>
            <input
              type="text"
              name="industry"
              className={`form-control ${errors.industry ? "is-invalid" : ""}`}
              value={formData.industry}
              onChange={handleChange}
              placeholder="e.g. IT, Finance"
            />
            {errors.industry && <div className="invalid-feedback">{errors.industry}</div>}
          </div>

          {/* Company Type */}
          <div className="mb-4">
            <label className="form-label d-flex align-items-center">
              <i className="bi bi-diagram-3-fill me-2 p-2 rounded-circle" style={iconStyle}></i>
              Company Type
            </label>
            <select
              name="type"
              className={`form-select ${errors.type ? "is-invalid" : ""}`}
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
              <option value="Startup">Startup</option>
              <option value="MNC">MNC</option>
              <option value="Government">Government</option>
            </select>
            {errors.type && <div className="invalid-feedback">{errors.type}</div>}
          </div>

          <button type="submit" className="btn w-100 fw-bold" style={buttonStyle}>
  <i className="bi bi-box-arrow-in-right me-2" style={iconStyle}></i>Submit
</button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterSignupForm;
