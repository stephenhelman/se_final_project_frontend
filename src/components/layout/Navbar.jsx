import BrandInfo from "./BrandInfo";
import NavAuth from "./NavAuth";
import "../../blocks/Navbar.css";
const Navbar = () => {
  return (
    <header className="navbar">
      <ul className="navbar__content">
        <li className="navbar__list-item navbar__brand-info">
          <BrandInfo />
        </li>
        <li className="navbar__list-item navbar__links">
          <a className="navbar__link">Pokédex</a>
          <a className="navbar__link">Teams</a>
        </li>
        <li className="navbar__list-item navbar__auth">
          <NavAuth />
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
