import { useState, useEffect } from "react";

import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

function AddressInfo({ formData, handleChange, onNext, onBack }) {

  const [errors, setErrors] = useState({});

  // Store latitude & longitude
  const [location, setLocation] = useState({
    lat: 12.9716,
    lng: 77.5946,
  });

  // Load Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD4_jwDxzh63O8Q96lztzjJckHAo2LWt-Q",
  });

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

  // Fetch location from Google Maps
  const fetchLocation = async () => {

    // Combine address
    const address = `
      ${formData.city}
      ${formData.state}
      ${formData.pincode}
    `;

    // Don't search if empty
    if (!address.trim()) return;

    try {

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyD4_jwDxzh63O8Q96lztzjJckHAo2LWt-Q`
      );

      const data = await response.json();

      // If result found
      if (data.results.length > 0) {

        const coordinates =
          data.results[0].geometry.location;

        setLocation({
          lat: coordinates.lat,
          lng: coordinates.lng,
        });
      }

    } catch (error) {

      console.log("Location fetch error:", error);

    }
  };

  // Automatically fetch location when inputs change
  useEffect(() => {

    // Delay API call
    const timer = setTimeout(() => {

      fetchLocation();

    }, 1000);

    // Cleanup
    return () => clearTimeout(timer);

  }, [
    formData.city,
    formData.state,
    formData.pincode,
  ]);

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

      <p className="form-subtitle">
        Where are you based?
      </p>

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

        {errors.city && (
          <p className="error">{errors.city}</p>
        )}

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

          {errors.state && (
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

          {errors.pincode && (
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

        <button
          className="back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

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

export default AddressInfo;
