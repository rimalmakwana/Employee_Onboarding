import { useState } from "react";
import PersonalInfo from "../components/PersonalInfo";
import WorkDetails from "../components/WorkDetails";
import AddressInfo from "../components/AddressInfo";
import ReviewSubmit from "../components/ReviewSubmit";
import SuccessScreen from "../components/SuccessScreen";
import StepIndicator from "../components/StepIndicator";

const Onboarding = () => {
  // Track which step we are on (1, 2, 3, 4)
  const [currentStep, setCurrentStep] = useState(1);

  // Track if form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ALL form data stored here so it never gets lost
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

  // This updates any field by name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Go to next step
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Go to previous step
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Jump to any step (used by Edit buttons in Review)
  const goToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  // When Submit is clicked
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // When "Submit Another" is clicked — reset everything
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

  // If form is submitted, show success screen
  if (isSubmitted) {
    return (
      <div className="container max-w-[500px] mx-auto mt-[80px]">
        <div className="card py-10 px-[30px]">
          <SuccessScreen
            name={formData.name}
            email={formData.email}
            onSubmitAnother={handleReset}
          />
        </div>
      </div>
    );
  }

  // Otherwise show the normal onboarding form
  return (
    <div className="max-w-[700px] mx-auto p-5 my-10">
      
      <h2 className="text-3xl font-bold mb-1 text-text-primary">Employee Onboarding</h2>

      <p className="text-text-secondary mb-5 text-sm">Step {currentStep} of 4</p>

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
  );
};

export default Onboarding;
