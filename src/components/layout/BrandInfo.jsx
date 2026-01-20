import { Link } from "react-router-dom";

import icons from "../../utils/imageUtils";

const BrandInfo = () => {
  return (
    <Link to="/" className="navbar__link navbar__brand-info">
      <img
        src={icons.logoIcon}
        alt="Pokemon Trainer Hub Logo"
        className="navbar__logo"
      />
      <h3 className="navbar__title">Pokémon Trainer Hub</h3>
    </Link>
  );
};

export default BrandInfo;
