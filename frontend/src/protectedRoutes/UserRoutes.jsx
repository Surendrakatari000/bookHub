import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/islogged";
import { ThreeCircles } from "react-loader-spinner";
import Header from "../components/layout/header";
import "./proteceted.css";

const Spinner = () => {
  return (
    <div>
      <Header />
      <div className="spiner-con">
        <ThreeCircles />
      </div>
    </div>
  );
};

const UserRoutes = ({ children }) => {
  const { isLoggedIn, loading, isAdmin } = useContext(AuthContext);

  if (loading) return <Spinner />;
  if (isAdmin) return <Navigate to="/admin" />;

  return isLoggedIn ? children : <Navigate to="/auth/login" />;
};

export default UserRoutes;
