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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "This field is required";
    }

    return newErrors;
  };

  // Check if all fields are filled
  const isFormFilled =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "";

  // middle function for phone — only allows numbers, + and spaces
  const handlePhoneChange = (e) => {
    // Remove anything that is NOT a number, +, or space
    const onlyNumbers = e.target.value.replace(/[^0-9+ ]/g, "");

    // Call parent's handleChange with the cleaned value
    handleChange({ target: { name: "phone", value: onlyNumbers } });
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
          type="tel"
          name="phone"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={handlePhoneChange}
          className={errors.phone ? "error-input" : ""}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      <div className="button-container" style={{ justifyContent: "flex-end" }}>
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={!isFormFilled}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default PersonalInfo;