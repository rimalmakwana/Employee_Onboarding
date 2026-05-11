import { useState } from "react";
import { ArrowRight } from "lucide-react";
import TextInput from "./ui/TextInput";
import PhoneInputField from "./ui/PhoneInputField";

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
      onNext();
    }
  };

  return (
    <div>
      <h2 className="mb-3 text-[25px] font-bold">Personal Information</h2>

      <p className="text-gray-500 mb-4">Tell us about yourself</p>

      {/* Name */}
      <div className="mb-5">
        <label className="block mb-2 text-[14px] font-medium">
          Full Name <span className="text-red-500">*</span>
        </label>

        <TextInput
          type="text"
          name="name"
          placeholder="e.g. Priya Sharma"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
        />

        {errors.name && (
          <p className="text-red-500 text-[13px] mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="block mb-2 text-[14px] font-medium">
          Email Address <span className="text-red-500">*</span>
        </label>

        <TextInput
          type="email"
          name="email"
          placeholder="you@company.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          error={!!errors.email}
        />

        {errors.email && (
          <p className="text-red-500 text-[13px] mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-5">
        <label className="block mb-2 text-[14px] font-medium">
          Phone Number <span className="text-red-500">*</span>
        </label>

        <PhoneInputField
          placeholder="Enter phone number"
          defaultCountry="IN"
          value={formData.phone}
          onChange={(value) =>
            handleChange({
              target: {
                name: "phone",
                value: value || "",
              },
            })
          }
          error={!!errors.phone}
        />

        {errors.phone && (
          <p className="text-red-500 text-[13px] mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-[10px]">
        <button
          className="bg-[#5b4df5] hover:bg-[#4a3de0] disabled:bg-[#b0aae8] 
          disabled:cursor-not-allowed text-white py-[10px] px-5 rounded-[8px] 
          cursor-pointer text-[14px] flex items-center justify-center gap-2 transition-all duration-200"
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
