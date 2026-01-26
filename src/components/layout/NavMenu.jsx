import { Link } from "react-router-dom";

const NavMenu = ({
  isAuthenticated,
  handleLogout,
  handleRegister,
  handleLogin,
  reset,
  showAuthMenu,
  user,
}) => {
  const content = isAuthenticated ? (
    <>
      <li className="nav-menu__list-item nav-menu__user">
        <p className="nav-menu__user-greeting">Welcome back</p>
        <p className="nav-menu__user-name">{user.username}</p>
      </li>
      <li className="nav-menu__list-item">
        <Link to="/" onClick={reset} className="nav-menu__link">
          Pokedex
        </Link>
      </li>
      <li className="nav-menu__list-item">
        <Link to="/teams" onClick={reset} className="nav-menu__link">
          Teams
        </Link>
      </li>
      <li className="nav-menu__list-item">
        <Link to="/" onClick={reset} className="nav-menu__link">
          Edit Profile
        </Link>
      </li>
      <li className="nav-menu__list-item">
        <p
          className="nav-menu__link"
          role="button"
          onClick={handleLogout}
          to="/teams"
        >
          Logout
        </p>
      </li>
    </>
  ) : (
    <>
      <li className="nav-menu__list-item">
        <p role="button" onClick={handleRegister} className="nav-menu__link">
          Register
        </p>
      </li>
      <li className="nav-menu__list-item">
        <p role="button" onClick={handleLogin} className="nav-menu__link">
          Login
        </p>
      </li>
      <li className="nav-menu__list-item">
        <Link to="/" onClick={reset} className="nav-menu__link">
          Pokedex
        </Link>
      </li>
      <li className="nav-menu__list-item">
        <Link to="/teams" onClick={reset} className="nav-menu__link">
          Teams
        </Link>
      </li>
    </>
  );
  return (
    <ul className={`nav-menu ${showAuthMenu ? "nav-menu_visible" : ""}`}>
      {content}
    </ul>
  );
};

export default NavMenu;
