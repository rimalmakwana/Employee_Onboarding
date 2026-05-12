import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import PersonalInfo from "../components/PersonalInfo";
import WorkDetails from "../components/WorkDetails";
import AddressInfo from "../components/AddressInfo";
import ReviewSubmit from "../components/ReviewSubmit";
import SuccessScreen from "../components/SuccessScreen";
import StepIndicator from "../components/StepIndicator";

const Onboarding = () => {
  const navigate = useNavigate();

  // Cookies
  const [cookies, , removeCookie] = useCookies([
    "access_token",
    "refresh_token",
    "expires_at",
    "expires_in",
    "token_type",
    "user_name",
  ]);

  // Current step
  const [currentStep, setCurrentStep] = useState(1);

  // Form submit state
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    // Step 1
    name: "",
    email: "",
    phone: "",

    // Step 2
    department: "",
    role: "",
    experience: "",

    // Step 3
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  // Handle inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Next step
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Previous step
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Go to step
  const goToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  // Submit form
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // Reset form
  const handleReset = () => {
    setCurrentStep(1);

    setIsSubmitted(false);

    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      role: "",
      experience: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });
  };

  // Logout
  const handleLogout = () => {
    removeCookie("access_token", { path: "/" });
    removeCookie("refresh_token", { path: "/" });
    removeCookie("expires_at", { path: "/" });
    removeCookie("expires_in", { path: "/" });
    removeCookie("token_type", { path: "/" });
    removeCookie("user_name", { path: "/" });
    removeCookie("user_email", { path: "/" });


    navigate("/");
  };

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="container max-w-md mx-auto mt-20">
        <div className="card py-10 px-8">
          <SuccessScreen
            name={formData.name}
            email={formData.email}
            onSubmitAnother={handleReset}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="bg-surface border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-5 py-3 flex justify-end">

          <div className="flex items-center gap-5">

            {/* User Info */}
            <div className="flex flex-col items-end leading-tight">

              <span className="text-xs text-text-secondary">
                Logged In User
              </span>

              <span className="text-sm font-semibold text-text-primary">
                {cookies.user_name}
              </span>

            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-border"></div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="
                bg-danger
                hover:bg-red-600
                text-white
                px-4
                py-2
                rounded-lg
                text-sm
                font-medium
                transition-all
                cursor-pointer
              "
            >
              Logout
            </button>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-5 my-10">

        <h2 className="text-3xl font-bold mb-1 text-text-primary">
          Employee Onboarding
        </h2>

        <p className="text-text-secondary mb-5 text-sm">
          Step {currentStep} of 4
        </p>

        <StepIndicator currentStep={currentStep} />

        <div className="card">

          {currentStep === 1 && (
            <PersonalInfo
              formData={formData}
              handleChange={handleChange}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <WorkDetails
              formData={formData}
              handleChange={handleChange}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <AddressInfo
              formData={formData}
              handleChange={handleChange}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && (
            <ReviewSubmit
              formData={formData}
              onBack={handleBack}
              onSubmit={handleSubmit}
              goToStep={goToStep}
            />
          )}

        </div>
      </div>
    </>
  );
};

export default Onboarding;