import SideImage from "./components/sideImage";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";
import { AuthContext } from "../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { Oval } from "react-loader-spinner";

const API_URL = import.meta.env.VITE_API_URL;

const InProcess = () => (
  <div className="inprocess-con">
    <Oval color="#509beb" secondaryColor="#abc5e1" height={65} />
    <h1>Verifying Your Mail</h1>
    <p>
      Please wait while we verify your email address. <br />
      This will take a few moments.
    </p>
    <button disabled className="button-processing-card">
      Processing...
    </button>
  </div>
);

const Success = ({ refreshAuth }) => {
  const navigate = useNavigate();

  return (
    <div className="sucess-card-main-con">
      <img
        src="https://res.cloudinary.com/dz39z2hyf/image/upload/v1769226989/Screenshot_2026-01-24_092611_rxawgd.png"
        className="image-tick-sucess-card"
      />
      <h1>Email Verified Successfully </h1>
      <p>
        You email has been Successfully verified . You <br /> can now access
        your account
      </p>
      <button
        className="button-sucess-card"
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

const VerifyMail = () => {
  const { token } = useParams();
  const { refreshAuth } = useContext(AuthContext);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  const imageUrl =
    "https://res.cloudinary.com/dz39z2hyf/image/upload/v1769174643/Screenshot_2026-01-23_185307_ouvfvz.png";

  useEffect(() => {
    if (!token) {
      setError("Invalid or expired verification link");
      setPending(false);
      return;
    }

    const startTime = Date.now();

    const verifyEmail = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/verify-mail/${token}`, {
          credentials: "include",
        });

        const data = await response.json();

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(3000 - elapsedTime, 0);

        setTimeout(() => {
          if (!response.ok) {
            setError(data.message || "Verification failed");
            setPending(false);
          } else {
            setPending(false);
          }
        }, remainingTime);
      } catch {
        setTimeout(() => {
          setError("Something went wrong");
          setPending(false);
        }, 2000);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="login-page-container">
      <SideImage imageUrl={imageUrl} />
      <div className="login-page-details-container">
        <div className="main-form-con">
          {/* <img
            alt="BookHub logo"
            className="image-bookHub-logo"
            src="https://res.cloudinary.com/dz39z2hyf/image/upload/v1758258518/Screenshot_2025-09-19_103730_yivugm.png"
          /> */}

          {pending && !error && <InProcess />}
          {!pending && !error && <Success refreshAuth={refreshAuth} />}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default VerifyMail;
