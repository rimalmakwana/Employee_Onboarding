
import { Link } from "react-router-dom";


const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "We collect personal information you provide during onboarding, including your name, email, phone number, and address.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Your information is used to manage employee onboarding, communication, and internal company processes.",
  },
  {
    title: "3. Data Sharing",
    body: "We do not sell your personal information. Data may only be shared with trusted internal services.",
  },
  {
    title: "4. Data Security",
    body: "We use secure systems and encrypted connections to help protect your personal information.",
  },
  {
    title: "5. Your Rights",
    body: "You can request to access, update, or delete your personal information anytime.",
  },
];

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-bg px-4 py-page-y">
      
      <div className="max-w-3xl mx-auto">

       

        {/* Header */}
        <div className="mb-6">
          <h1 className="page-title">
            Privacy Policy
          </h1>

          <p className="page-subtitle">
            Please read our privacy policy carefully.
          </p>
        </div>

        {/* Card */}
        <div className="card shadow-md space-y-6">

          {SECTIONS.map((section) => (
            <div key={section.title}>

              <h2 className="text-sm font-semibold text-text-primary mb-2">
                {section.title}
              </h2>

              <p className="text-sm text-text-secondary leading-6">
                {section.body}
              </p>

            </div>
          ))}

          {/* Divider */}
          <hr className="border-border" />

          {/* Footer */}
          <p className="text-center text-sm text-text-secondary">
            Questions?{" "}
            
            <Link
              to="/contact-us"
              className="text-primary font-medium hover:underline"
            >
              Contact Us
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;