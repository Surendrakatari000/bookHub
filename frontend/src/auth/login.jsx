import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/islogged";
import { FiEye, FiEyeOff } from "react-icons/fi";

import SideImage from "./components/sideImage";
import "./index.css";

// ✅ 1. Define the Form component OUTSIDE the Login component
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
        <br />
        <input
          type="email"
          id="email"
          name="email"
          value={userDetails.email}
          required
          onChange={(e) =>
            setUserDetails((pre) => ({ ...pre, email: e.target.value }))
          }
        />
      </div>
      <div className="password-con">
        <label htmlFor="password">Password</label>
        <br />
        <div className="password-wrapper">
          <input
            className="input-pass"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails((pre) => ({ ...pre, password: e.target.value }))
            }
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
      <button className="log-button" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

// 2. The main Login Component
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);
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
      const response = await fetch("http://localhost:4073/auth/login", {
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
      setIsLoggedIn(true);
      navigate("/", { replace: true });
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
          <img
            alt="bookHub logo"
            className="image-bookHub-logo"
            src={logoUrl}
          />
          {error.isError && (
            <p className="error-message">{error.errorMessage}</p>
          )}

          {/* ✅ 3. Call the separate component and pass the props */}
          <LoginForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            loading={loading}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            loginHandler={loginHandler}
          />

          <p className="register-para">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="register-link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
