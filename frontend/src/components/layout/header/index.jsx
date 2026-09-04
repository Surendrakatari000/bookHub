import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { AuthContext } from "../../../context/islogged";
import "./index.css";

const API_URL = import.meta.env.VITE_API_URL;

const Header = () => {
  const { clearAuth, isAdmin } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeNav = () => setIsOpen(false);

  const logoutHandler = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    clearAuth();
    closeNav();
    navigate("/auth/login");
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <NavLink to="/" onClick={closeNav} aria-label="Book Hub home">
            <img
              className="image-bookHub-logo"
              src="https://res.cloudinary.com/dz39z2hyf/image/upload/v1758258518/Screenshot_2025-09-19_103730_yivugm.png"
              alt="BookHub Logo"
            />
          </NavLink>
        </div>

        <button
          className="hamburger"
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        <nav className={`nav ${isOpen ? "show" : ""}`}>
          <NavLink to="/" end className="nav-link" onClick={closeNav}>
            Home
          </NavLink>
          <NavLink
            to={isAdmin ? "/admin/books" : "/books"}
            className="nav-link"
            onClick={closeNav}
          >
            Books
          </NavLink>
          <button className="Logout-button" type="button" onClick={logoutHandler}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
