import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SelectInput from "./ui/SelectInput";
import TextInput from "./ui/TextInput";

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
    } else if (Number(formData.experience) > 40) {
      newErrors.experience = "Experience cannot exceed 40 years";
    } else if (Number(formData.experience) < 0) {
      newErrors.experience = "Experience cannot be negative";
    }

    return newErrors;
  };

  // Check if all fields are filled
  const isFormFilled =
    formData.department !== "" &&
    formData.role !== "" &&
    formData.experience.trim() !== "";

  // Handle Next button
  const handleNext = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-[25px] font-bold mb-4">
        Work Details
      </h2>

      <p className="text-gray-500 mb-5">
        Help us place you in the right team
      </p>

      {/* Department */}
      <div className="mb-5">
        <label className="block mb-2 text-[14px] font-medium">
          Department <span className="text-red-500">*</span>
        </label>

        <SelectInput
          name="department"
          value={formData.department}
          onChange={handleChange}
          error={!!errors.department}
        >
          <option value="">-- Select Department --</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </SelectInput>

        {errors.department && (
          <p className="text-red-500 text-[13px] mt-1">
            {errors.department}
          </p>
        )}
      </div>

      {/* Role */}
      <div className="mb-5">
        <label className="block mb-2 text-[14px] font-medium">
          Role <span className="text-red-500">*</span>
        </label>

        <SelectInput
          name="role"
          value={formData.role}
          onChange={handleChange}
          error={!!errors.role}
        >
          <option value="">-- Select Role --</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="HR Manager">HR Manager</option>
          <option value="Accountant">Accountant</option>
        </SelectInput>

        {errors.role && (
          <p className="text-red-500 text-[13px] mt-1">
            {errors.role}
          </p>
        )}
      </div>

      {/* Experience */}
      <div className="mb-5">
        <label className="block mb-2 text-[14px] font-medium">
          Experience (years)
          <span className="text-red-500">*</span>
        </label>

        <TextInput
          type="number"
          name="experience"
          placeholder="e.g. 2"
          value={formData.experience}
          onChange={handleChange}
          min="0"
          max="40"
          error={!!errors.experience}
        />

        {errors.experience && (
          <p className="text-red-500 text-[13px] mt-1">
            {errors.experience}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-[10px]">
        
        {/* Back Button */}
        <button
          className="bg-gray-100 hover:bg-[#e5e7eb] text-[#111] border border-gray-200 py-3 px-6 rounded-[6px] cursor-pointer text-[14px] font-medium flex items-center justify-center gap-2 transition-all duration-200"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Back
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

export default WorkDetails;