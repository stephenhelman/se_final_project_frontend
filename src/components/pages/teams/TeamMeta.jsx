import { format } from "date-fns";

const TeamMeta = ({ numPokemon, updated }) => {
  const lastUpdated = format(updated, "MM/dd/yyyy hh:mm aa");
  return (
    <div className="teams__meta-info">
      <p className="teams__number-display">{numPokemon} Pokémon</p>
      <p className="teams__last-updated">Last Updated: {lastUpdated}</p>
    </div>
  );
};

export default TeamMeta;
