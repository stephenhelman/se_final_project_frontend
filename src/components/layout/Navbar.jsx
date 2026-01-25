import { useState } from "react";
import { Link } from "react-router-dom";

import BrandInfo from "./BrandInfo";
import NavAuth from "./NavAuth";
import useAuth from "../../hooks/useAuth";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import NavMenu from "./NavMenu";
import Button from "../universal/Button";

import useWindowWidth from "../../hooks/useWindowWidth";

import "../../blocks/Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeModal, setActiveModal] = useState("");
  const { isMobile, isTablet } = useWindowWidth();
  const [showAuthMenu, setShowAuthMenu] = useState(false);

  const handleShowModal = (modal) => {
    if (modal === activeModal) return;
    if (isMobile || isTablet) {
      setShowAuthMenu(false);
    }
    setActiveModal(modal);
  };

  const handleShowMenu = () => {
    setShowAuthMenu((prev) => !prev);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleLogout = () => {
    logout();
  };

  const mobileContent = (
    <Button
      buttonCategory="icon"
      size="md"
      buttonIcon="menuIcon"
      clickFunction={handleShowMenu}
    />
  );

  const desktopContent = (
    <>
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
    </>
  );

  return (
    <>
      <header className="navbar">
        <ul className="navbar__content">
          <li className="navbar__list-item navbar__brand-info-wrapper">
            <BrandInfo />
          </li>
          {isMobile || isTablet ? mobileContent : desktopContent}
        </ul>
        {(isMobile || isTablet) && (
          <NavMenu
            showAuthMenu={showAuthMenu}
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
            handleRegister={() => handleShowModal("register")}
            handleLogin={() => handleShowModal("login")}
            reset={() => setShowAuthMenu(false)}
          />
        )}
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
