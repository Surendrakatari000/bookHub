import SideImage from "./components/sideImage";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import { AuthContext } from "../context/AuthContext";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { Oval } from "react-loader-spinner";

const API_URL = import.meta.env.VITE_API_URL;

// ---------------------------------------------------------------------------
// OTP Input Component
// ---------------------------------------------------------------------------
const OtpInput = ({ otp, setOtp, disabled }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="otp-input-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          className={`otp-digit-input ${digit ? "otp-digit-filled" : ""}`}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Success Card
// ---------------------------------------------------------------------------
const SuccessCard = ({ refreshAuth }) => {
  const navigate = useNavigate();

  return (
    <div className="otp-card">
      <div className="otp-success-icon">✓</div>
      <h1>Email Verified!</h1>
      <p className="otp-subtitle">
        Your email has been successfully verified.
        <br />
        You can now access your account.
      </p>
      <button
        className="otp-submit-btn"
        onClick={async () => {
          const session = await refreshAuth();
          navigate(session.isAdmin ? "/admin" : "/", { replace: true });
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main VerifyOtp Component
// ---------------------------------------------------------------------------
const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshAuth } = useContext(AuthContext);

  const email = location.state?.email || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendMsg, setResendMsg] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const imageUrl =
    "https://res.cloudinary.com/dz39z2hyf/image/upload/v1769174643/Screenshot_2026-01-23_185307_ouvfvz.png";

  // Redirect if no email in state
  useEffect(() => {
    if (!email) {
      navigate("/auth/signup", { replace: true });
    }
  }, [email, navigate]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto-submit when all 6 digits entered
  const otpString = otp.join("");
  const handleVerify = useCallback(async () => {
    if (otpString.length !== 6 || isVerifying || verified) return;

    setIsVerifying(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpString }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Verification failed");
        setOtp(["", "", "", "", "", ""]);
      } else {
        setVerified(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setOtp(["", "", "", "", "", ""]);
    } finally {
      setIsVerifying(false);
    }
  }, [otpString, email, isVerifying, verified]);

  useEffect(() => {
    if (otpString.length === 6 && !isVerifying && !verified) {
      handleVerify();
    }
  }, [otpString, handleVerify, isVerifying, verified]);

  // Resend OTP handler
  const handleResend = async () => {
    setCanResend(false);
    setCountdown(60);
    setError("");
    setResendMsg("");

    try {
      const response = await fetch(`${API_URL}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setResendMsg("New OTP sent successfully!");
      } else {
        setResendMsg(data.message || "Failed to resend OTP");
      }
    } catch {
      setResendMsg("Network error. Please try again.");
    }
  };

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, "$1***$3")
    : "";

  if (!email) return null;

  return (
    <div className="login-page-container">
      <SideImage imageUrl={imageUrl} />
      <div className="login-page-details-container">
        <div className="main-form-con">
          {verified ? (
            <SuccessCard refreshAuth={refreshAuth} />
          ) : (
            <div className="otp-card">
              <div className="otp-icon">📧</div>
              <h1>Verify Your Email</h1>
              <p className="otp-subtitle">
                We've sent a 6-digit code to
                <br />
                <strong>{maskedEmail}</strong>
              </p>

              <OtpInput otp={otp} setOtp={setOtp} disabled={isVerifying} />

              {isVerifying && (
                <div className="otp-verifying">
                  <Oval color="#667eea" secondaryColor="#cbd5e1" height={22} width={22} />
                  <span>Verifying...</span>
                </div>
              )}

              {error && <p className="otp-error">{error}</p>}

              <button
                className="otp-submit-btn"
                onClick={handleVerify}
                disabled={otpString.length !== 6 || isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify Email"}
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
                {resendMsg && (
                  <p
                    className={`otp-resend-msg ${
                      resendMsg.includes("success") ? "success" : "error"
                    }`}
                  >
                    {resendMsg}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
