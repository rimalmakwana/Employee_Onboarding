import { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAddressGeocoding } from "../hooks/useAddressGeocoding";
import TextInput from "./ui/TextInput";

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
      <h2 className="page-title">Address Information</h2>

      <p className="page-subtitle">Where are you based?</p>

      {/* City */}
      <div className="mb-5">
        <label className="form-label">
          City <span className="text-danger">*</span>
        </label>

        <TextInput
          type="text"
          name="city"
          placeholder="e.g. Bengaluru"
          value={formData.city}
          onChange={handleChange}
          error={!!errors.city}
        />

        {errors?.city && <p className="error-text">{errors.city}</p>}
      </div>

      {/* State and Pincode side by side */}
      <div className="flex gap-2.5">
        {/* State */}
        <div className="flex-1">
          <label className="form-label">
            State <span className="text-danger">*</span>
          </label>

          <TextInput
            type="text"
            name="state"
            placeholder="e.g. Karnataka"
            value={formData.state}
            onChange={handleChange}
            error={!!errors.state}
          />

          {errors?.state && <p className="error-text">{errors.state}</p>}
        </div>

        {/* Pincode */}
        <div className="mb-5">
          <label className="form-label">
            Pincode <span className="text-danger">*</span>
          </label>

          <TextInput
            type="text"
            inputMode="numeric"
            name="pincode"
            placeholder="e.g. 560001"
            value={formData.pincode}
            onChange={handlePincodeChange}
            error={!!errors.pincode}
          />

          {errors?.pincode && <p className="error-text">{errors.pincode}</p>}
        </div>
      </div>

      {/* Render the Map */}
      <div className="w-full h-75 mt-5 rounded-xl overflow-hidden">
        <GoogleMap
          zoom={12}
          center={location}
          mapContainerClassName="w-full h-full"
        >
          <Marker position={location} />
        </GoogleMap>
      </div>

      {/* Back and Next buttons */}
      <div className="flex justify-between mt-2.5">
        {/* Back Button */}
        <button
          className="btn-secondary"
          onClick={onBack}
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Next Button */}
        <button
          className="btn-primary"
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
