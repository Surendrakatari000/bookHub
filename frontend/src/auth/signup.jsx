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
// 2. SentMailUI Component
// -----------------------------------------------------------------------------
const SentMailUI = ({ email }) => {
  const [resendMessage, setResendMessage] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    setResendMessage(""); // Clear previous messages
    try {
      const response = await fetch(`${API_URL}/auth/resend-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setResendMessage("Verification email sent successfully!");
      } else {
        setResendMessage(data.message || "Failed to resend email");
      }
    } catch (error) {
      console.error(error);
      setResendMessage("Network error. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="mailSent-card">
      <img
        src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
        alt="Success"
        className="image-tick-sucess-card"
      />
      <h1>Verify Your Email</h1>
      <p style={{ color: "#64748b", lineHeight: "1.5" }}>
        We've sent a verification link to <strong>{email}</strong>.<br />
        Please check your inbox and click the link to verify your account.
      </p>

      <button
        className="button-mailsent-card"
        onClick={handleResend}
        disabled={isResending}
      >
        {isResending ? "Sending..." : "Resend Verification Email"}
      </button>

      {resendMessage && (
        <p
          className="sent-again-para"
          style={{ color: resendMessage.includes("success") ? "green" : "red" }}
        >
          {resendMessage}
        </p>
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// 3. Main Signup Component
// -----------------------------------------------------------------------------
const Signup = () => {
  const imageUrl =
    "https://res.cloudinary.com/dz39z2hyf/image/upload/v1758188768/3056c7bbe7efb0d3d71dcb5062f1e077527d7f5d_fcvcso.jpg";

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // State
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Moved state up
  const [mailSent, setMailSent] = useState(false);
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

    setIsSubmitting(true); // Start loading

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
      {/* Assuming SideImage renders an <img className="login-page-image" /> 
         to match the CSS structure we defined. 
      */}
      <SideImage imageUrl={imageUrl} />

      <div className="login-page-details-container">
        {/* Error Message Banner */}
        {error.isError && !mailSent && (
          <div className="auth-error-banner">{error.errorMessage}</div>
        )}

        {mailSent ? (
          <SentMailUI email={userDetails.email} />
        ) : (
          <SignUpForm
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            registerHandler={registerHandler}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isSubmitting={isSubmitting} // Pass loading state down
          />
        )}
      </div>
    </div>
  );
};

export default Signup;

// import { useState, useContext } from "react";
// import { useNavigate, Navigate } from "react-router-dom";
// import { AuthContext } from "../context/islogged";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import SideImage from "./components/sideImage";

// import "./index.css";

// const SignUpForm = ({
//   userDetails,
//   setUserDetails,
//   registerHandler,
//   showPassword,
//   setShowPassword,
// }) => {
//  const  [isSubmit , setIsSubmit] = useState(false)
//   return (
//     <form className="form-con" onSubmit={registerHandler}>
//       <div className="name-con">
//         <label htmlFor="email">Email</label>
//         <br />
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={userDetails.email}
//           required
//           onChange={(e) =>
//             setUserDetails((pre) => ({ ...pre, email: e.target.value }))
//           }
//         />
//       </div>
//       <div className="name-con">
//         <label htmlFor="username">Username</label>
//         <br />
//         <input
//           type="text"
//           id="username"
//           name="username"
//           required
//           value={userDetails.userName}
//           onChange={(e) =>
//             setUserDetails((pre) => ({ ...pre, userName: e.target.value }))
//           }
//         />
//       </div>
//       <div className="password-con">
//         <label htmlFor="password">Password</label>
//         <br />

//         <div className="password-wrapper">
//           <input
//             className="input-pass"
//             type={showPassword ? "text" : "password"}
//             id="password"
//             name="password"
//             required
//             value={userDetails.password}
//             onChange={(e) =>
//               setUserDetails((pre) => ({ ...pre, password: e.target.value }))
//             }
//           />
//           <button
//             type="button"
//             className="toggle-btn"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FiEyeOff /> : <FiEye />}
//           </button>
//         </div>
//       </div>

//       {isSubmit ? (
//         <button className="log-button" disabled>
//           Processing ..
//         </button>
//       ) : (
//         <button
//           className="log-button"
//           type="submit"
//           onClick={() => setIsSubmit(true)}
//         >
//           signup
//         </button>
//       )}
//     </form>
//   );
// };

// const SentMailUI = ({ email }) => {
//   const [resendMessage, setResendMessage] = useState("");

//   const handleResend = async () => {
//     try {
//       const response = await fetch("http://localhost:4073/auth/resend-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//         credentials: "include",
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setResendMessage("Verification email sent again ");
//       } else {
//         setResendMessage(data.message || "Failed to resend email");
//       }
//     } catch (error) {
//       console.error(error);
//       setResendMessage("Something went wrong. Try again.");
//     }
//   };

//   return (
//     <div className="mailSent-card">
//       <h1>Verify Your Email Address</h1>
//       <p>
//         We've sent a verification link to your email. Please check <br /> your
//         inbox and click the link to verify your email.
//       </p>
//       <button className="button-mailsent-card" onClick={handleResend}>
//         Resend Verification Email
//       </button>
//       {resendMessage && <p className="sent-again-para">{resendMessage}</p>}
//     </div>
//   );
// };

// const Signup = () => {
//   const imageUrl =
//     "https://res.cloudinary.com/dz39z2hyf/image/upload/v1758188768/3056c7bbe7efb0d3d71dcb5062f1e077527d7f5d_fcvcso.jpg";
//   const { isLoggedIn } = useContext(AuthContext);
//   const [showPassword, setShowPassword] = useState(false);
//   const [userDetails, setUserDetails] = useState({
//     email: "",
//     userName: "",
//     password: "",
//   });

//   const [mailSent, setMailSent] = useState(false);
//   const [error, setError] = useState({ isError: false, errorMessage: "" });
//   const navigate = useNavigate();

//   if (isLoggedIn) {
//     return <Navigate to="/" />;
//   }

//   const registerHandler = async (e) => {
//     e.preventDefault();
//     if (userDetails.password.length < 8) {
//       setError({
//         isError: true,
//         errorMessage: "Password should be at least 8 characters",
//       });
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:4073/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userDetails),
//         credentials: "include",
//       });

//       const data = await response.json();

//       if (response.status === 409) {
//         alert(data.message || "User already registered");
//         navigate("/auth/login", { replace: true });
//         return;
//       }

//       if (!response.ok) {
//         setError({
//           isError: true,
//           errorMessage: data.message || "Registration failed",
//         });
//         return;
//       }

//       if (response.ok) {
//         setMailSent(true);
//         setError({ isError: false, errorMessage: "" });
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong. Try again.");
//     }
//   };

//   return (
//     <div className="login-page-container">
//       <SideImage imageUrl={imageUrl} />
//       <div className="login-page-details-container">
//         <div className="main-form-con">
//           <img
//             alt="BookHub logo"
//             className="image-bookHub-logo"
//             src="https://res.cloudinary.com/dz39z2hyf/image/upload/v1758258518/Screenshot_2025-09-19_103730_yivugm.png"
//           />

//           {mailSent ? (
//             <SentMailUI email={userDetails.email} />
//           ) : (
//             <SignUpForm
//               userDetails={userDetails}
//               setUserDetails={setUserDetails}
//               registerHandler={registerHandler}
//               showPassword={showPassword}
//               setShowPassword={setShowPassword}
//             />
//           )}

//           {error.isError && (
//             <p className="error-messeage">{error.errorMessage}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
