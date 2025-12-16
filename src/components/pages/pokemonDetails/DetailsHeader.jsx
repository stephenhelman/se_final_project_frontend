import { useNavigate, useLocation } from "react-router-dom";
import { useDataContext } from "../../../hooks/useDataContext";

const DetailsHeader = ({ pokemon }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleBackButtonClicked = () => {
    if (state?.from) {
      navigate(state.from);
    } else {
      navigate("/");
    }
  };

  const { iconConfig } = useDataContext();
  return (
    <header className="pokemon-details__header">
      <button
        className="pokemon-details__header-button"
        onClick={handleBackButtonClicked}
      >
        <img
          src={iconConfig.backIcon}
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
          src={iconConfig.favoriteIcon}
          alt="favorite button"
          className="pokemon-details__header-icon"
        />
      </button>
    </header>
  );
};

export default DetailsHeader;
