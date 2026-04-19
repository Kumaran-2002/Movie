import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MoviX</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
        <Link onClick={handleLogout} className="nav-link">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
