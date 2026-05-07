import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ArrowRight } from "lucide-react";

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

    if (!formData.phone) {
      newErrors.phone = "This field is required";
    }

    return newErrors;
  };

  // Validate email on blur
  const handleEmailBlur = () => {
    let emailError = "";
    if (!formData.email.trim()) {
      emailError = "This field is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      emailError = "Please enter a valid email address";
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (emailError) {
        newErrors.email = emailError;
      } else {
        delete newErrors.email;
      }
      return newErrors;
    });
  };

  // Check if all fields are filled
  const isFormFilled =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone;

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
          onBlur={handleEmailBlur}
          className={errors.email ? "error-input" : ""}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      {/* Phone (Updated) */}
      <div className="form-group">
        <label>
          Phone Number <span>*</span>
        </label>

        <PhoneInput
          placeholder="Enter phone number"
          defaultCountry="IN"
          value={formData.phone}
          onChange={(value) =>
            handleChange({
              target: { name: "phone", value: value || "" },
            })
          }
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
          Next <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default PersonalInfo;