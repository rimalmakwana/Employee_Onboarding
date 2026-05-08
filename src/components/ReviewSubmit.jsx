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
        { label: "City", value: formData.city },
        { label: "State", value: formData.state },
        { label: "Pincode", value: formData.pincode },
      ],
    },
  ];

  return (
    <div>
      <h2 className="text-[25px] font-bold mb-4">
        Review & Submit
      </h2>

      <p className="text-gray-500 mb-5">
        Confirm your details before submitting
      </p>

      {/* Dynamic Sections */}
      {sections.map((section, index) => (
        <div
          key={index}
          className="bg-[#fafafa] border border-[#ebebeb] rounded-[8px] py-[15px] px-5 mb-[15px]"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-[15px] text-[12px] text-gray-500 font-bold tracking-[0.5px]">
            <span>{section.title}</span>

            <button
              className="bg-none border-none text-[#5b4df5] cursor-pointer text-[13px] font-medium"
              onClick={() => goToStep(section.step)}
            >
              Edit
            </button>
          </div>

          {/* Fields */}
          {section.fields.map((field, i) => (
            <div
              key={i}
              className="flex justify-between py-[6px] text-[14px]"
            >
              <span className="text-gray-500">
                {field.label}
              </span>

              <span className="text-[#111] font-medium text-right max-w-[65%] overflow-hidden text-ellipsis break-words line-clamp-2">
                {field.value}
              </span>
            </div>
          ))}
        </div>
      ))}

      {/* Buttons */}
      <div className="flex justify-between mt-[10px]">
        <button
          className="bg-gray-100 text-[#111] border border-gray-200 py-3 px-6 rounded-[6px] cursor-pointer text-[14px] font-medium flex items-center justify-center gap-2"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <button className="submit-btn" onClick={onSubmit}>
          Submit <Check />
        </button>
      </div>
    </div>
  );
}

export default ReviewSubmit;