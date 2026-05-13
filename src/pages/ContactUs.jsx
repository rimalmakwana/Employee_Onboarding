// src/pages/ContactUs.jsx

import { Send } from "lucide-react";

import TextInput from "../components/ui/TextInput";

function ContactUs() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-page-y">
      
      <div className="w-125 max-w-small">
        
        <div className="card shadow-md">

          {/* Header */}
          <div className="mb-6">
            <h1 className="page-title text-center">
              Contact Us
            </h1>

            <p className="page-subtitle text-center">
              Feel free to send us your message
            </p>
          </div>

          {/* Form UI */}
          <div className="space-y-5">

            {/* Name */}
            <div>
              <label className="form-label">
                Full Name
              </label>

              <TextInput
                type="text"
                placeholder="John Smith"
              />
            </div>

            {/* Email */}
            <div>
              <label className="form-label">
                Email Address
              </label>

              <TextInput
                type="email"
                placeholder="john@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label className="form-label">
                Message
              </label>

              <textarea
                rows={5}
                placeholder="Write your message here..."
                className="w-full border border-border rounded-md px-3 py-3 outline-none text-sm box-border resize-none focus:border-primary transition-colors duration-200"
              />
            </div>

            {/* Button */}
            <button className="btn-primary w-full">
              <Send size={17} />
              Send Message
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ContactUs;