import { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAddressGeocoding } from "../hooks/useAddressGeocoding";

function AddressInfo({ formData, handleChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  // Combine address for hook
  const address = `
    ${formData.city}
    ${formData.state}
    ${formData.pincode}
  `;

  // Fetch location and map script using custom hook
  const { location, isLoaded } = useAddressGeocoding(address);

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
    } else if (formData.pincode.trim().length !== 6) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    return newErrors;
  };

  // Check if all fields are filled
  const isFormFilled =
    formData.city.trim() !== "" &&
    formData.state.trim() !== "" &&
    formData.pincode.trim() !== "";

  // Special handler for pincode — only allows numbers and max 6 digits
  const handlePincodeChange = (e) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");

    const limitedTo6 = onlyNumbers.slice(0, 6);

    handleChange({
      target: {
        name: "pincode",
        value: limitedTo6,
      },
    });
  };

  // When Next is clicked
  const handleNext = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onNext();
    }
  };

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <div>
      <h2>Address Information</h2>

      <p className="form-subtitle">Where are you based?</p>

      {/* City */}
      <div className="form-group">
        <label>
          City <span>*</span>
        </label>

        <input
          type="text"
          name="city"
          placeholder="e.g. Bengaluru"
          value={formData.city}
          onChange={handleChange}
          className={errors.city ? "error-input" : ""}
        />

        {errors?.city && <p className="error">{errors.city}</p>}
      </div>

      {/* State and Pincode side by side */}
      <div className="two-columns">
        {/* State */}
        <div className="form-group">
          <label>
            State <span>*</span>
          </label>

          <input
            type="text"
            name="state"
            placeholder="e.g. Karnataka"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? "error-input" : ""}
          />

          {errors?.state && (
  <p className="error">{errors.state}</p>
)}
        </div>

        {/* Pincode */}
        <div className="form-group">
          <label>
            Pincode <span>*</span>
          </label>

          <input
            type="text"
            inputMode="numeric"
            name="pincode"
            placeholder="e.g. 560001"
            value={formData.pincode}
            onChange={handlePincodeChange}
            className={errors.pincode ? "error-input" : ""}
          />

          {errors?.pincode && (
  <p className="error">{errors.pincode}</p>
)}
        </div>
      </div>

      {/* Render the Map */}
      <div className="map-wrapper">
        <GoogleMap
          zoom={12}
          center={location}
          mapContainerClassName="google-map-container"
        >
          <Marker position={location} />
        </GoogleMap>
      </div>

      {/* Back and Next buttons */}
      <div className="button-container">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>

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

export default AddressInfo;