import { useState } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAddressGeocoding } from "../hooks/useAddressGeocoding";
import TextInput from "./ui/TextInput";
import SelectInput from "./ui/SelectInput";

function AddressInfo({ formData, handleChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});
  const [autocomplete, setAutocomplete] = useState(null);

  // Combine address for hook
  const address = `
    ${formData.street}
    ${formData.city}
    ${formData.state}
    ${formData.country}
  `;

  // Fetch location and map script using custom hook
  const { location, isLoaded } = useAddressGeocoding(address);

  // Check if fields are filled
  const validate = () => {
    let newErrors = {};

    if (!formData.street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (formData.pincode.trim().length !== 6) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    return newErrors;
  };

  // Check if all fields are filled
  const isFormFilled =
    formData.street.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.state.trim() !== "" &&
    formData.country.trim() !== "" &&
    formData.pincode.trim() !== "";

  const onAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const addressComponents = place.address_components;

      if (!addressComponents) return;

      let city = "";
      let state = "";
      let country = "";
      let pincode = "";
      
      const placeName = place.name || "";
      const fullAddress = place.formatted_address || "";
      
      // Combine name and address, but avoid duplicating name if it's already there
      let street = fullAddress.includes(placeName) 
        ? fullAddress 
        : `${placeName}${placeName && fullAddress ? ", " : ""}${fullAddress}`;

      addressComponents.forEach((component) => {
        const types = component.types;
        if (types.includes("locality")) city = component.long_name;
        if (types.includes("administrative_area_level_1")) state = component.long_name;
        if (types.includes("country")) country = component.long_name;
        if (types.includes("postal_code")) pincode = component.long_name;
      });

      // Update all fields at once
      const updates = [
        { name: "street", value: street },
        { name: "city", value: city },
        { name: "state", value: state },
        { name: "country", value: country },
        { name: "pincode", value: pincode.slice(0, 6) },
      ];

      updates.forEach((upd) => {
        handleChange({ target: { name: upd.name, value: upd.value } });
      });
    }
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

      {/* Street Autocomplete */}
      <div className="mb-5">
        <label className="form-label">
          Street <span className="text-danger">*</span>
        </label>
        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <TextInput
            type="text"
            name="street"
            placeholder="Search your street..."
            value={formData.street}
            onChange={handleChange}
            error={!!errors.street}
          />
        </Autocomplete>
        {errors?.street && <p className="error-text">{errors.street}</p>}
      </div>

      {/* City and State */}
      <div className="flex gap-4 mb-5">
        <div className="flex-1">
          <label className="form-label">
            City <span className="text-danger">*</span>
          </label>
          <TextInput
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            error={!!errors.city}
          />
          {errors?.city && <p className="error-text">{errors.city}</p>}
        </div>

        <div className="flex-1">
          <label className="form-label">
            State/Province <span className="text-danger">*</span>
          </label>
          <TextInput
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            error={!!errors.state}
          />
          {errors?.state && <p className="error-text">{errors.state}</p>}
        </div>
      </div>

      {/* Pincode and Country */}
      <div className="flex gap-4 mb-5">
        <div className="flex-1">
          <label className="form-label">
            Zip/Postal code <span className="text-danger">*</span>
          </label>
          <TextInput
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            error={!!errors.pincode}
          />
          {errors?.pincode && <p className="error-text">{errors.pincode}</p>}
        </div>

        <div className="flex-1">
          <label className="form-label">
            Country <span className="text-danger">*</span>
          </label>
          <SelectInput
            name="country"
            value={formData.country}
            onChange={handleChange}
            error={!!errors.country}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
          </SelectInput>
          {errors?.country && <p className="error-text">{errors.country}</p>}
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
