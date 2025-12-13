import { iconConfig } from "../../../utils/imageUtils";
import { useNavigate } from "react-router-dom";

const DetailsHeader = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleBackButtonClicked = () => {
    navigate(-1);
  };

  const { backIcon, favoriteIcon } = iconConfig;
  return (
    <header className="pokemon-details__header">
      <button
        className="pokemon-details__header-button"
        onClick={handleBackButtonClicked}
      >
        <img
          src={backIcon}
          alt="back button"
          className="pokemon-details__header-icon"
        />
      </button>
      <div className="pokemon-details__title">
        <p className="pokemon-details__id">{pokemon.formattedId}</p>
        <h3 className="pokemon-details__name">{pokemon.name}</h3>
      </div>
      <button className="pokemon-details__header-button">
        <img
          src={favoriteIcon}
          alt="favorite button"
          className="pokemon-details__header-icon"
        />
      </button>
    </header>
  );
};

export default DetailsHeader;
