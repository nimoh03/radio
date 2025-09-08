import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TopWave from "@/components/Shared/TopWave";
import BottomWave from "@/components/Shared/BottomWave";
import shape1 from "@/images/shape-1.png";
import shape2 from "@/images/shape-2.png";
import shape3 from "@/images/shape-3.png";
import topWaveShape from "@/images/top-wave-shape-2.png";
import bottomWaveShape from "@/images/bottom-wave-shape-2.png";
import banner from "@/images/sign-up-img.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('https://api.technaija.fm/api/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Store authentication data if provided by the API
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        if (data.user) {
          localStorage.setItem('userData', JSON.stringify(data.user));
        }

        // Clear form
        setForm({ email: "", password: "" });
        
        // Navigate to the create episode page
        navigate('/user/create-episode');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    const x = document.getElementById("password");
    if (x.type === "password") {
      setShowPassword(true);
      x.type = "text";
    } else {
      x.type = "password";
      setShowPassword(false);
    }
  };

  return (
    <section className="sign-up auth-container inner-hero-section overflow-hidden texture-bg-1">
      <div className="top-wave-shape">
        <TopWave shapeImg={topWaveShape} />
      </div>
      <div className="circle-shape shape-1 alt d-none d-md-block">
        <img className="w-100" src={shape1} alt="shape" />
      </div>
      <div className="circle-shape shape-2 alt d-none d-md-block">
        <img className="w-100" src={shape2} alt="shape" />
      </div>
      <div className="circle-shape shape-3 alt d-none d-md-block">
        <img className="w-100" src={shape3} alt="shape" />
      </div>
      <div className="container pt-120 pb-120">
        <div className="row g-6 justify-content-between">
          <div className="col-lg-6">
            <div className="sign-up-form">
              <form
                onSubmit={handleFormSubmit}
                className="auth-form p-xl-8 p-4 bgc-2 rounded"
              >
                <div className="form-content mb-lg-10 mb-sm-8 mb-6">
                  <h3 className="mb-4">Welcome Back!</h3>
                  <p>Sign in to your account and join us</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger mb-4" role="alert">
                    {error}
                  </div>
                )}

                <div className="d-grid gap-lg-6 gap-4">
                  <div className="input-wrapper alt-color d-grid gap-4 w-100">
                    <label htmlFor="email">Enter Your Email ID</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your email ID here"
                      name="email"
                      onChange={handleChange}
                      value={form.email}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="input-wrapper alt-color d-grid gap-4 w-100">
                    <label htmlFor="password">Enter Your Password</label>
                    <div className="input-password d-flex align-items-center bgc-1 rounded-pill">
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        name="password"
                        onChange={handleChange}
                        value={form.password}
                        required
                        disabled={loading}
                      />
                      <span
                        className="cursor-pointer px-3"
                        onClick={togglePassword}
                        style={{ opacity: loading ? 0.5 : 1 }}
                      >
                        {showPassword ? (
                          <i className="ti ti-eye"></i>
                        ) : (
                          <i className="ti ti-eye-closed"></i>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-lg-10 mb-sm-8 mb-6">
                  <Link
                    to="#"
                    className="forgot-password d-block text-end fw-normal"
                  >
                    Forgot Password?
                  </Link>
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="tcp-1">
                      Sign Up
                    </Link>
                  </p>
                </div>
                <button 
                  type="submit" 
                  className="bttn-1" 
                  disabled={loading || !form.email || !form.password}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <span className="icon d-center icon-right">
                        <i className="ti ti-arrow-narrow-right"></i>
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className="col-xxl-5 col-lg-6">
            <div className="auth-banner">
              <img className="w-100" src={banner} alt="sign up" />
            </div>
          </div>
        </div>
      </div>
      <BottomWave shapeImg={bottomWaveShape} />
    </section>
  );
};

export default SignIn;