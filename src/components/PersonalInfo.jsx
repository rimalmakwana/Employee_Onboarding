import { useState } from "react";

// formData and handleChange come from parent (Onboarding.jsx)
function PersonalInfo({ formData, handleChange, onNext }) {
  const [errors, setErrors] = useState({});

  // Validate fields
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "This field is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "This field is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "This field is required";
    }

    return newErrors;
  };

  // Handle Next button
  const handleNext = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onNext(); // go to step 2
    }
  };

  return (
    <div>
      <h2>Personal Information</h2>
      <p className="form-subtitle">Tell us about yourself</p>

      {/* Name */}
      <div className="form-group">
        <label>
          Full Name <span>*</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="e.g. Priya Sharma"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "error-input" : ""}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="form-group">
        <label>
          Email Address <span>*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="you@company.com"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error-input" : ""}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div className="form-group">
        <label>
          Phone Number <span>*</span>
        </label>
        <input
          type="number"
          name="phone"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "error-input" : ""}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      <div className="button-container">
        <button className="next-btn" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default PersonalInfo;