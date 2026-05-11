// List of all 4 steps
const steps = [
  { number: 1, label: "Personal Info" },
  { number: 2, label: "Work Details" },
  { number: 3, label: "Address Info" },
  { number: 4, label: "Review" },
];

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="flex items-center mb-7.5">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isLastStep = index === steps.length - 1;

        return (
          <div
            key={step.number}
            className={`flex items-start ${
              isLastStep ? "flex-none" : "flex-1"
            }`}
          >
            {/* Circle + Label */}
            <div className="w-22.5 flex flex-col items-center">
              <div
                className={`
                  w-8.75 h-8.75 rounded-full
                  flex items-center justify-center
                  mb-1.25 text-sm
                  ${
                    isCompleted
                      ? "bg-success text-white"          
                      : isActive
                      ? "bg-primary text-white"         
                      : "bg-bg-light text-text-secondary" 
                  }
                `}
              >
                {isCompleted ? "✓" : step.number}
              </div>

              <p
                className={`
                  text-center text-xs
                  ${
                    isActive
                      ? "text-primary font-bold"         
                      : "text-text-secondary"            
                  }
                `}
              >
                {step.label}
              </p>
            </div>

            {/* Connector Line */}
            {!isLastStep && (
              <div
                className={`
                  flex-1 h-px mt-4
                  ${
                    isCompleted
                      ? "bg-primary"                     
                      : "bg-border"                      
                  }
                `}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
