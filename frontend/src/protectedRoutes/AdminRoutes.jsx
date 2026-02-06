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

const AdminRoutes = ({ children }) => {
  const { isLoggedIn, isAdmin, loading } = useContext(AuthContext);

  if (loading) return <Spinner />;

  if (!isLoggedIn) return <Navigate to="/auth/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  return children;
};

export default AdminRoutes;
