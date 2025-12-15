import { useDataContext } from "../../hooks/useDataContext";

const NavAuth = () => {
  const { iconConfig } = useDataContext();
  return (
    <>
      <p className="navbar__user-name">Stephen H</p>
      <img src={iconConfig.logoIcon} alt="avatar" className="navbar__avatar" />
      <button className="navbar__logout">
        <img src={iconConfig.logoutIcon} alt="logout" />
      </button>
    </>
  );
};

export default NavAuth;
