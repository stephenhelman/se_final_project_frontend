import { Link } from "react-router-dom";
import useDataContext from "../../hooks/useDataContext";

const NavAuth = () => {
  const { iconConfig } = useDataContext();
  return (
    <>
      <p className="navbar__user-name">Stephen H</p>
      <Link to="/" className="navbar__avatar">
        <img
          src={iconConfig.logoIcon}
          alt="avatar"
          className="navbar__avatar-image"
        />
      </Link>
      <button className="navbar__logout">
        <img src={iconConfig.logoutIcon} alt="logout" />
      </button>
    </>
  );
};

export default NavAuth;
