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
      <h2 className="text-[25px] font-bold mb-4">Address Information</h2>

      <p className="text-gray-500 mb-5">Where are you based?</p>

      {/* City */}
      <div className="mb-5">
        <label>
          City <span>*</span>
        </label>

        <TextInput
          type="text"
          name="city"
          placeholder="e.g. Bengaluru"
          value={formData.city}
          onChange={handleChange}
          error={!!errors.city}
        />

        {errors?.city && <p className="text-red-500 text-[12px] mt-[5px]">{errors.city}</p>}
      </div>

      {/* State and Pincode side by side */}
      <div className="flex gap-[10px]">
        {/* State */}
        <div className="flex-1">
          <label>
            State <span>*</span>
          </label>

          <TextInput
            type="text"
            name="state"
            placeholder="e.g. Karnataka"
            value={formData.state}
            onChange={handleChange}
            error={!!errors.state}
          />

          {errors?.state && <p className="text-red-500 text-[12px] mt-[5px]">{errors.state}</p>}
        </div>

        {/* Pincode */}
        <div className="mb-5">
          <label>
            Pincode <span>*</span>
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

          {errors?.pincode && <p className="text-red-500 text-[12px] mt-[5px]">{errors.pincode}</p>}
        </div>
      </div>

      {/* Render the Map */}
      <div className="w-full h-[300px] mt-5 rounded-[12px] overflow-hidden">
        <GoogleMap
          zoom={12}
          center={location}
          mapContainerClassName="w-full h-full"
        >
          <Marker position={location} />
        </GoogleMap>
      </div>

      {/* Back and Next buttons */}
      <div className="flex justify-between mt-[10px]">
        {/* Back Button */}
        <button
          className="bg-gray-100 hover:bg-[#e5e7eb] text-[#111] border border-gray-200 py-3 px-6 rounded-[6px] cursor-pointer text-[14px] font-medium flex items-center justify-center gap-2 transition-all duration-200"
          onClick={onBack}
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Next Button */}
        <button
          className="bg-[#5b4df5] hover:bg-[#4a3de0] disabled:bg-[#b0aae8] 
    disabled:cursor-not-allowed text-white py-3 px-6 rounded-[6px] 
    cursor-pointer text-[14px] font-semibold flex items-center justify-center gap-2 transition-all duration-200"
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
