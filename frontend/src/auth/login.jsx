import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

import SideImage from "./components/sideImage";
import "./index.css";
const API_URL = import.meta.env.VITE_API_URL;

const LoginForm = ({
  showPassword,
  setShowPassword,
  loading,
  userDetails,
  setUserDetails,
  loginHandler,
}) => {
  return (
    <form className="form-con" onSubmit={loginHandler}>
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
            setUserDetails((pre) => ({ ...pre, email: e.target.value }))
          }
        />
      </div>
      <div className="password-con">
        <label htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input
            className="input-pass"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails((pre) => ({ ...pre, password: e.target.value }))
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
        <div className="forgot-password-row">
          <Link to="/auth/forgot-password" className="forgot-password-link">
            Forgot password?
          </Link>
        </div>
      </div>
      <button className="log-button" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { refreshAuth, setIsLoggedIn, setIsAdmin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const imageUrl =
    "https://res.cloudinary.com/dz39z2hyf/image/upload/v1758188768/3056c7bbe7efb0d3d71dcb5062f1e077527d7f5d_fcvcso.jpg";
  const logoUrl =
    "https://res.cloudinary.com/dz39z2hyf/image/upload/v1758258518/Screenshot_2025-09-19_103730_yivugm.png";

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({ isError: false, errorMessage: "" });

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        setError({
          isError: true,
          errorMessage: data.message || "Login failed",
        });
        return;
      }

      setError({ isError: false, errorMessage: "" });

      const isAdminFromLogin = Boolean(data.user_details?.isAdmin);
      const session = await refreshAuth();
      const isAdminUser = session.isLoggedIn
        ? session.isAdmin
        : isAdminFromLogin;

      if (!session.isLoggedIn) {
        setIsLoggedIn(true);
        setIsAdmin(isAdminFromLogin);
      }

      navigate(isAdminUser ? "/admin" : "/", { replace: true });
    } catch (err) {
      setError({
        isError: true,
        errorMessage: "Something went wrong. Try again!",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <SideImage imageUrl={imageUrl} />
      <div className="login-page-details-container">
        <div className="main-form-con">
          <img alt="bookHub logo" className="auth-logo" src={logoUrl} />
          <div className="auth-heading">
            <h1>Welcome back</h1>
            <p>Sign in to continue to your library.</p>
          </div>
          {error.isError && (
            <p className="error-message error-messeage">{error.errorMessage}</p>
          )}

          <LoginForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            loading={loading}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            loginHandler={loginHandler}
          />

          <p className="register-para registeer-para">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="register-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
