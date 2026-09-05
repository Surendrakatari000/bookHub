import { useState, useContext } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SideImage from "./components/sideImage";
import "./index.css";
const API_URL = import.meta.env.VITE_API_URL;
// -----------------------------------------------------------------------------
// 1. SignUpForm Component
// -----------------------------------------------------------------------------
const SignUpForm = ({
  userDetails,
  setUserDetails,
  registerHandler,
  showPassword,
  setShowPassword,
  isSubmitting, // Received from parent
}) => {
  return (
    <form className="main-form-con" onSubmit={registerHandler}>
      <img
        alt="BookHub logo"
        className="auth-logo"
        src="https://res.cloudinary.com/dz39z2hyf/image/upload/v1758258518/Screenshot_2025-09-19_103730_yivugm.png"
      />
      <div className="auth-heading">
        <h1>Create your account</h1>
        <p>Join Book Hub and start building your library.</p>
      </div>

      <div className="form-con">
        <div className="name-con">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={userDetails.email}
            required
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>

        <div className="name-con">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Choose a username"
            autoComplete="username"
            required
            value={userDetails.userName}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, userName: e.target.value }))
            }
          />
        </div>

        <div className="password-con">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              required
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <button
              type="button"
              className="toggle-btn"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button className="log-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>

        <p className="register-para registeer-para">
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </p>
      </div>
    </form>
  );
};

// -----------------------------------------------------------------------------
// 2. Main Signup Component
// -----------------------------------------------------------------------------
const Signup = () => {
  const imageUrl =
    "https://res.cloudinary.com/dz39z2hyf/image/upload/v1758188768/3056c7bbe7efb0d3d71dcb5062f1e077527d7f5d_fcvcso.jpg";

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // State
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [error, setError] = useState({ isError: false, errorMessage: "" });

  // Redirect if already logged in
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    setError({ isError: false, errorMessage: "" });

    // Client-side Validation
    if (userDetails.password.length < 8) {
      setError({
        isError: true,
        errorMessage: "Password must be at least 8 characters long.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 409) {
        alert(data.message || "User already exists! Redirecting to login...");
        navigate("/auth/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Navigate to OTP verification page
      navigate("/auth/verify-otp", {
        state: { email: userDetails.email },
        replace: true,
      });
    } catch (err) {
      console.error(err);
      setError({
        isError: true,
        errorMessage: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page-container">
      <SideImage imageUrl={imageUrl} />

      <div className="login-page-details-container">
        {/* Error Message Banner */}
        {error.isError && (
          <div className="auth-error-banner">{error.errorMessage}</div>
        )}

        <SignUpForm
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          registerHandler={registerHandler}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default Signup;

