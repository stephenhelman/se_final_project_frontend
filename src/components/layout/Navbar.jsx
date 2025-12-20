import BrandInfo from "./BrandInfo";
import NavAuth from "./NavAuth";
import { Link } from "react-router-dom";

import "../../blocks/Navbar.css";
const Navbar = () => {
  return (
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
          <NavAuth />
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
