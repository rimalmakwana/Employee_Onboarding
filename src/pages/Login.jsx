import { useCookies } from "react-cookie";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { supabase } from "../lib/supabase";

import TextInput from "../components/ui/TextInput";

import { ArrowRight, Loader2 } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  // Cookies
  const [cookies, setCookie] = useCookies([
    "access_token",
    "refresh_token",
    "expires_at",
    "expires_in",
    "token_type",
  ]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Session data
      const session = data.session;

      // Store cookies
      setCookie("access_token", session.access_token, {
        path: "/",
        maxAge: 3600,
      });

      setCookie("user_email", data.user.email, {
        path: "/",
        maxAge: 3600,
      });

      setCookie("refresh_token", session.refresh_token, {
        path: "/",
        maxAge: 3600,
      });

      setCookie("expires_at", session.expires_at, {
        path: "/",
        maxAge: 3600,
      });

      setCookie("expires_in", session.expires_in, {
        path: "/",
        maxAge: 3600,
      });

      setCookie("token_type", session.token_type, {
        path: "/",
        maxAge: 3600,
      });

      setCookie("user_name", data.user.user_metadata.full_name, {
        path: "/",
        maxAge: 3600,
      });

      // Navigate after successful login
      navigate("/onboarding");
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
            <h1 className="page-title">Welcome Back</h1>

            <p className="page-subtitle">
              Login using your Supabase account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
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

            {/* Error Message */}
            {error && (
              <div
                className="
                  bg-danger-light
                  text-danger
                  px-4 py-3
                  rounded-lg
                  text-sm
                "
              >
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
                  Logging In...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-text-secondary">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;