import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

import { useContext } from "react";
import { AuthContext } from "../../../context/islogged";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn  , isAdmin} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await fetch("http://localhost:4073/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setIsLoggedIn(false);
    navigate("/auth/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to={"/"}>
          <img
            className="image-bookHub-logo"
            src="https://res.cloudinary.com/dz39z2hyf/image/upload/v1758258518/Screenshot_2025-09-19_103730_yivugm.png"
            alt="BookHub Logo"
          />
        </Link>
      </div>

      <button className="hamburger" onClick={toggleNav}>
        ☰
      </button>

      <nav className={`nav ${isOpen ? "show" : ""}`}>
        <Link to="/">
          <h2>Home</h2>
        </Link>
        {isAdmin ? (
          <Link to="/admin/books">
            <h2>Books</h2>
          </Link>
        ) : (
          <Link to="/books">
            <h2>Books</h2>
          </Link>
        )}

        <Link to="/auth/login">
          <button className="Logout-button" onClick={logoutHandler}>
            Logout
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
