import { Link } from "react-router-dom";
import Button from "../universal/Button";
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
      <Button
        buttonCategory="icon"
        buttonIcon="logoutIcon"
        size="md"
        clickFunction={onLogout}
      />
    </>
  ) : (
    <>
      <Button
        buttonCategory="auth"
        size="secondary"
        clickFunction={() => handleShowModal("register")}
        buttonText="Register"
      />
      <Button
        buttonCategory="auth"
        size="primary"
        clickFunction={() => handleShowModal("login")}
        buttonText="Login"
      />
    </>
  );
  return content;
};

export default NavAuth;
