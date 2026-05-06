import "./StepIndicator.css";

// List of all 4 steps
const steps = [
  { number: 1, label: "Personal Info" },
  { number: 2, label: "Work Details" },
  { number: 3, label: "Address Info" },
  { number: 4, label: "Review" },
];

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="step-container">

      {steps.map((step, index) => {

        // Is this step already completed?
        const isCompleted = step.number < currentStep;

        // Is this step the current active step?
        const isActive = step.number === currentStep;

        // Is this step the last one? (no line after it)
        const isLastStep = index === steps.length - 1;

        // Decide circle class
        let circleClass = "circle";
        if (isCompleted) circleClass = "circle completed";
        if (isActive)    circleClass = "circle current";

        // Decide label class
        let labelClass = "step-label";
        if (isActive) labelClass = "step-label active-label";

        // Decide line class
        let lineClass = "line";
        if (isCompleted) lineClass = "line done-line";

        return (
          <div key={step.number} className="step-wrapper">

            {/* Circle and label */}
            <div>
              <div className={circleClass}>
                {isCompleted ? "✓" : step.number}
              </div>
              <p className={labelClass}>{step.label}</p>
            </div>

            {/* Line between steps — don't show after last step */}
            {!isLastStep && <div className={lineClass}></div>}

          </div>
        );
      })}

    </div>
  );
};

export default StepIndicator;
