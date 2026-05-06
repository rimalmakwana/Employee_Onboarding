import { useState } from "react";

function AddressInfo({ formData, handleChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  // Check if fields are filled
  const validate = () => {
    let newErrors = {};

    if (!formData.city.trim()) {
      newErrors.city = "This field is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "This field is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "This field is required";
    }

    return newErrors;
  };

  // When Next is clicked
  const handleNext = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      // Show errors
      setErrors(validationErrors);
    } else {
      // All good, go to next step
      setErrors({});
      onNext();
    }
  };

  return (
    <div>
      <h2>Address Information</h2>
      <p className="form-subtitle">Where are you based?</p>

      {/* City */}
      <div className="form-group">
        <label>City <span>*</span></label>
        <input
          type="text"
          name="city"
          placeholder="e.g. Bengaluru"
          value={formData.city}
          onChange={handleChange}
          className={errors.city ? "error-input" : ""}
        />
        {errors.city && <p className="error">{errors.city}</p>}
      </div>

      {/* State and Pincode side by side */}
      <div className="two-columns">

        <div className="form-group">
          <label>State <span>*</span></label>
          <input
            type="text"
            name="state"
            placeholder="e.g. Karnataka"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? "error-input" : ""}
          />
          {errors.state && <p className="error">{errors.state}</p>}
        </div>

        <div className="form-group">
          <label>Pincode <span>*</span></label>
          <input
            type="text"
            name="pincode"
            placeholder="e.g. 560001"
            value={formData.pincode}
            onChange={handleChange}
            className={errors.pincode ? "error-input" : ""}
          />
          {errors.pincode && <p className="error">{errors.pincode}</p>}
        </div>

      </div>

      {/* Back and Next buttons */}
      <div className="button-container">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <button className="next-btn" onClick={handleNext}>Next →</button>
      </div>
    </div>
  );
}

export default AddressInfo;
