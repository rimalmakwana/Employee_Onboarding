import { ArrowLeft, Check } from "lucide-react";

function ReviewSubmit({ formData, onBack, onSubmit, goToStep }) {

  // All sections data
  const sections = [
    {
      title: "PERSONAL INFO",
      step: 1,
      fields: [
        { label: "Full Name", value: formData.name },
        { label: "Email", value: formData.email },
        { label: "Phone", value: formData.phone },
      ],
    },

    {
      title: "WORK DETAILS",
      step: 2,
      fields: [
        { label: "Department", value: formData.department },
        { label: "Role", value: formData.role },
        { label: "Experience", value: `${formData.experience} yrs` },
      ],
    },

    {
      title: "ADDRESS",
      step: 3,
      fields: [
        { label: "Street", value: formData.street },
        { label: "City", value: formData.city },
        { label: "State", value: formData.state },
        { label: "Pincode", value: formData.pincode },
        { label: "Country", value: formData.country },
      ],
    },
  ];

  return (
    <div>
      <h2 className="page-title">
        Review & Submit
      </h2>

      <p className="page-subtitle">
        Confirm your details before submitting
      </p>

      {/* Dynamic Sections */}
      {sections.map((section, index) => (
        <div
          key={index}
          className="card mb-3.75"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3.75 text-xs text-text-secondary font-bold tracking-tight">
            <span>{section.title}</span>

            <button
              className="text-primary cursor-pointer text-sm font-medium hover:text-primary-hover transition-all duration-200"
              onClick={() => goToStep(section.step)}
            >
              Edit
            </button>
          </div>

          {/* Fields */}
          {section.fields.map((field, i) => (
            <div
              key={i}
              className="flex justify-between py-1.5 text-sm"
            >
              <span className="text-text-secondary">
                {field.label}
              </span>

              <span className="text-text-primary font-medium text-right max-w-2/3 break-words">
                {field.value}
              </span>
            </div>
          ))}
        </div>
      ))}

      {/* Buttons */}
      <div className="flex justify-between mt-2.5">

        {/* Back Button */}
        <button
          className="btn-secondary"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Submit Button */}
        <button
          className="btn-success"
          onClick={onSubmit}
        >
          Submit <Check size={18} />
        </button>
      </div>
    </div>
  );
}

export default ReviewSubmit;