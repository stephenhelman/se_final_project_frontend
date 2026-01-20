import { Link } from "react-router-dom";
import icons from "../../utils/imageUtils";

const NavAuth = ({ user, isAuthenticated, onLogout, handleShowModal }) => {
  const content = isAuthenticated ? (
    <>
      <p className="navbar__user-name">{user.username}</p>
      <Link to="/" className="navbar__avatar">
        <img
          src={icons.logoIcon}
          alt="avatar"
          className="navbar__avatar-image"
        />
      </Link>
      <button className="navbar__logout" onClick={onLogout}>
        <img src={icons.logoutIcon} alt="logout" />
      </button>
    </>
  ) : (
    <>
      <button
        className="button button_type_ghost"
        onClick={() => handleShowModal("register")}
      >
        Register
      </button>
      <button
        className="button button_type_primary"
        onClick={() => handleShowModal("login")}
      >
        Login
      </button>
    </>
  );
  return content;
};

export default NavAuth;
