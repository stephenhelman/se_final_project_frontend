import { useNavigate, useLocation } from "react-router-dom";

import PokemonCard from "../../universal/PokemonCard/PokemonCard";

const PokedexGrid = ({
  size,
  cardType,
  pokemon,
  lengthOfTeam,
  addToArray,
  removeFromArrayUsingId,
  scrollRef,
  saveScrollPosition,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const content = pokemon.map((pokemon) => {
    const handleInfoClick = () => {
      saveScrollPosition();
      navigate(`/pokemon/${pokemon.id}`, {
        state: { from: location.pathname },
      });
    };
    return (
      <li className="pokedex__list-item" key={pokemon.id}>
        <PokemonCard
          pokemon={pokemon}
          cardType={cardType}
          size={size}
          lengthOfTeam={lengthOfTeam}
          addToArray={addToArray}
          removeFromArrayUsingId={removeFromArrayUsingId}
          handleInfoClick={handleInfoClick}
        />
      </li>
    );
  });
  return (
    <div className="pokedex__wrapper" ref={scrollRef}>
      <ul className={`pokedex__grid pokedex__grid_type_${cardType}`}>
        {content}
      </ul>
    </div>
  );
};

export default PokedexGrid;
