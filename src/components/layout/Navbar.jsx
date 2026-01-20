import { useState } from "react";

import BrandInfo from "./BrandInfo";
import NavAuth from "./NavAuth";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

import "../../blocks/Navbar.css";
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeModal, setActiveModal] = useState("");

  const handleShowModal = (modal) => {
    if (modal === activeModal) return;
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="navbar">
        <ul className="navbar__content">
          <li className="navbar__list-item navbar__brand-info-wrapper">
            <BrandInfo />
          </li>
          <li className="navbar__list-item navbar__links">
            <Link to="/" className="navbar__link">
              <p className="navbar__link-text">Pokédex</p>
            </Link>

            <Link to="teams" className="navbar__link">
              <p className="navbar__link-text">Teams</p>
            </Link>
          </li>
          <li className="navbar__list-item navbar__auth">
            <NavAuth
              user={user}
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              handleShowModal={handleShowModal}
            />
          </li>
        </ul>
      </header>
      {activeModal === "login" && (
        <LoginModal
          onClose={handleCloseModal}
          onSwitch={handleShowModal}
          isOpen={activeModal === "login"}
          activeModal={activeModal}
        />
      )}
      {activeModal === "register" && (
        <RegisterModal
          onClose={handleCloseModal}
          onSwitch={handleShowModal}
          isOpen={activeModal === "register"}
          activeModal={activeModal}
        />
      )}
    </>
  );
};

export default Navbar;
