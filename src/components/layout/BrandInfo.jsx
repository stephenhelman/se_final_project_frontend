import { Link } from "react-router-dom";
import useDataContext from "../../hooks/useDataContext";

const BrandInfo = () => {
  const { iconConfig } = useDataContext();
  return (
    <Link to="/" className="navbar__link navbar__brand-info">
      <img
        src={iconConfig.logoIcon}
        alt="Pokemon Trainer Hub Logo"
        className="navbar__logo"
      />
      <h3 className="navbar__title">Pokémon Trainer Hub</h3>
    </Link>
  );
};

export default BrandInfo;
