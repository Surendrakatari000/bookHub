import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { Oval } from "react-loader-spinner";
import SideImage from "./components/sideImage";
import "./index.css";

const API_URL = import.meta.env.VITE_API_URL;

// ---------------------------------------------------------------------------
// Step Indicator
// ---------------------------------------------------------------------------
const StepIndicator = ({ currentStep }) => {
  const steps = ["Email", "OTP", "Password"];
  return (
    <div className="step-indicator">
      {steps.map((label, i) => (
        <div key={label} className="step-item">
          <div
            className={`step-circle ${
              i + 1 < currentStep
                ? "step-done"
                : i + 1 === currentStep
                ? "step-active"
                : ""
            }`}
          >
            {i + 1 < currentStep ? "✓" : i + 1}
          </div>
          <span
            className={`step-label ${
              i + 1 <= currentStep ? "step-label-active" : ""
            }`}
          >
            {label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`step-connector ${
                i + 1 < currentStep ? "step-connector-done" : ""
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// OTP Input (reused pattern from verify-email)
// ---------------------------------------------------------------------------
const OtpInput = ({ otp, setOtp, disabled }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5)
      inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasted)) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="otp-input-container">
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          className={`otp-digit-input ${digit ? "otp-digit-filled" : ""}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main ForgotPassword Component
// ---------------------------------------------------------------------------
const ForgotPassword = () => {
  const navigate = useNavigate();
  const imageUrl =
    "https://res.cloudinary.com/dz39z2hyf/image/upload/v1758188768/3056c7bbe7efb0d3d71dcb5062f1e077527d7f5d_fcvcso.jpg";

  // Multi-step state: 1 = email, 2 = OTP, 3 = new password, 4 = success
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Step 1: Send email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      await res.json();
      // Always move to step 2 (don't reveal if email exists)
      setStep(2);
      setCountdown(60);
      setCanResend(false);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP & reset password in step 3
  const otpString = otp.join("");

  const handleVerifyAndReset = useCallback(async () => {
    if (step !== 3 || loading) return;

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpString, newPassword }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Reset failed");
        if (data.message?.includes("OTP")) {
          // OTP issue — go back to OTP step
          setStep(2);
          setOtp(["", "", "", "", "", ""]);
        }
      } else {
        setStep(4);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [step, loading, newPassword, confirmPassword, email, otpString]);

  // Move from step 2 to step 3 when OTP is complete
  const handleOtpProceed = () => {
    if (otpString.length === 6) {
      setError("");
      setStep(3);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    setCanResend(false);
    setCountdown(60);
    setError("");

    try {
      await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
    } catch {
      setError("Failed to resend OTP");
    }
  };

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, "$1***$3")
    : "";

  return (
    <div className="login-page-container">
      <SideImage imageUrl={imageUrl} />
      <div className="login-page-details-container">
        <div className="main-form-con">
          {step < 4 && <StepIndicator currentStep={step} />}

          {/* ── Step 1: Enter Email ── */}
          {step === 1 && (
            <form className="otp-card" onSubmit={handleSendOtp}>
              <div className="otp-icon">🔑</div>
              <h1>Forgot Password?</h1>
              <p className="otp-subtitle">
                Enter your email and we'll send you a code to reset your
                password.
              </p>

              <div className="fp-input-group">
                <label htmlFor="fp-email">Email Address</label>
                <input
                  type="email"
                  id="fp-email"
                  placeholder="you@example.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="fp-input"
                />
              </div>

              {error && <p className="otp-error">{error}</p>}

              <button
                className="otp-submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>

              <Link to="/auth/login" className="fp-back-link">
                <FiArrowLeft /> Back to Login
              </Link>
            </form>
          )}

          {/* ── Step 2: Enter OTP ── */}
          {step === 2 && (
            <div className="otp-card">
              <div className="otp-icon">📧</div>
              <h1>Check Your Email</h1>
              <p className="otp-subtitle">
                We've sent a 6-digit code to
                <br />
                <strong>{maskedEmail}</strong>
              </p>

              <OtpInput otp={otp} setOtp={setOtp} disabled={false} />

              {error && <p className="otp-error">{error}</p>}

              <button
                className="otp-submit-btn"
                onClick={handleOtpProceed}
                disabled={otpString.length !== 6}
              >
                Continue
              </button>

              <div className="otp-resend-section">
                {canResend ? (
                  <button className="otp-resend-btn" onClick={handleResend}>
                    Resend OTP
                  </button>
                ) : (
                  <p className="otp-countdown">
                    Resend code in <strong>{countdown}s</strong>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Step 3: New Password ── */}
          {step === 3 && (
            <form
              className="otp-card"
              onSubmit={(e) => {
                e.preventDefault();
                handleVerifyAndReset();
              }}
            >
              <div className="otp-icon">🔒</div>
              <h1>Set New Password</h1>
              <p className="otp-subtitle">
                Your identity has been verified. Create a new password.
              </p>

              <div className="fp-input-group">
                <label htmlFor="new-password">New Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="new-password"
                    placeholder="At least 8 characters"
                    value={newPassword}
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="fp-input"
                    style={{ paddingRight: "44px" }}
                  />
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="fp-input-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="password-wrapper">
                  <input
                    type={showConfirm ? "text" : "password"}
                    id="confirm-password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="fp-input"
                    style={{ paddingRight: "44px" }}
                  />
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {error && <p className="otp-error">{error}</p>}

              <button
                className="otp-submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <Oval color="#fff" secondaryColor="#cbd5e1" height={18} width={18} />
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}

          {/* ── Step 4: Success ── */}
          {step === 4 && (
            <div className="otp-card">
              <div className="otp-success-icon">✓</div>
              <h1>Password Reset!</h1>
              <p className="otp-subtitle">
                Your password has been reset successfully.
                <br />
                You can now sign in with your new password.
              </p>
              <button
                className="otp-submit-btn"
                onClick={() => navigate("/auth/login", { replace: true })}
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
