import { useState } from "react";

// formData and handleChange come from parent (Onboarding.jsx)
function WorkDetails({ formData, handleChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  // Validate fields
  const validate = () => {
    let newErrors = {};

    if (!formData.department) {
      newErrors.department = "This field is required";
    }

    if (!formData.role) {
      newErrors.role = "This field is required";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "This field is required";
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
      onNext(); // go to next step
    }
  };

  return (
    <div>
      <h2>Work Details</h2>
      <p className="form-subtitle">Help us place you in the right team</p>

      {/* Department */}
      <div className="form-group">
        <label>
          Department <span>*</span>
        </label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={errors.department ? "error-input" : ""}
        >
          <option value="">-- Select Department --</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
        {errors.department && <p className="error">{errors.department}</p>}
      </div>

      {/* Role */}
      <div className="form-group">
        <label>
          Role <span>*</span>
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={errors.role ? "error-input" : ""}
        >
          <option value="">-- Select Role --</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="HR Manager">HR Manager</option>
          <option value="Accountant">Accountant</option>
        </select>
        {errors.role && <p className="error">{errors.role}</p>}
      </div>

      {/* Experience */}
      <div className="form-group">
        <label>
          Experience (years) <span>*</span>
        </label>
        <input
          type="number"
          name="experience"
          placeholder="e.g. 2"
          value={formData.experience}
          onChange={handleChange}
          className={errors.experience ? "error-input" : ""}
        />
        {errors.experience && <p className="error">{errors.experience}</p>}
      </div>

      {/* Buttons */}
      <div className="button-container">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <button className="next-btn" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default WorkDetails;
