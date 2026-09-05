import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThreeCircles } from "react-loader-spinner";
import "./proteceted.css";

const Spinner = () => {
  return (
    <div>
      <div className="spiner-con">
        <ThreeCircles />
      </div>
    </div>
  );
};

const PublicOnlyRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) return <Spinner />;

  if (isLoggedIn) return <Navigate to="/" replace />;

  return children;
};

export default PublicOnlyRoute;
