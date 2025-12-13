import { iconConfig } from "../../utils/imageUtils";

const NavAuth = () => {
  const { logoIcon, logoutIcon } = iconConfig;
  return (
    <>
      <p className="navbar__user-name">Stephen H</p>
      <img src={logoIcon} alt="avatar" className="navbar__avatar" />
      <button className="navbar__logout">
        <img src={logoutIcon} alt="logout" />
      </button>
    </>
  );
};

export default NavAuth;
