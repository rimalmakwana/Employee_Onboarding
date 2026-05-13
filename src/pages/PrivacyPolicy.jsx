import { Link } from "react-router-dom";
import { SECTIONS } from "../lib/privacySections";

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