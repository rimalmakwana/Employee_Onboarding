import { useState } from "react";
import { supabase } from "../lib/supabase";
import TextInput from "../components/ui/TextInput";
import { ArrowRight, Loader2 } from "lucide-react";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      setMessage(
        "Registration successful. Please check your email for verification."
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-page-y">
      <div className="w-full max-w-125">
        <div className="card shadow-md">
          {/* Header */}
          <div className="mb-6">
            <h1 className="page-title">Create Account</h1>
            <p className="page-subtitle">
              Register your account using Supabase authentication
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="form-label">Full Name</label>
              <TextInput
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Email Address</label>
              <TextInput
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <TextInput
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Success Message */}
            {message && (
              <div className="bg-success-light text-success px-4 py-3 rounded-lg text-sm">
                {message}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-danger-light text-danger px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Register
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;