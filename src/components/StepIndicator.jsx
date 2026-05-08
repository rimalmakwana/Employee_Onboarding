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
    <div className="flex items-center mb-[30px]">
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
            <div className="w-[90px] flex flex-col items-center">
              <div
                className={`
                  w-[35px]
                  h-[35px]
                  rounded-full
                  flex
                  items-center
                  justify-center
                  mb-[5px]
                  text-[14px]
                  ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-[#5b4df5] text-white"
                      : "bg-[#f0f0f0] text-[#777]"
                  }
                `}
              >
                {isCompleted ? "✓" : step.number}
              </div>

              <p
                className={`
                  text-center
                  text-[12px]
                  ${
                    isActive
                      ? "text-[#5b4df5] font-bold"
                      : "text-gray-500"
                  }
                `}
              >
                {step.label}
              </p>
            </div>

            {/* Line */}
            {!isLastStep && (
              <div
                className={`
                  flex-1
                  h-px
                  mt-[16px]
                  ${
                    isCompleted
                      ? "bg-[#5b4df5]"
                      : "bg-[#e2e2e2]"
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
