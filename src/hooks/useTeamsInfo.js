import { useState, useEffect } from "react";
import { mockTeams } from "../utils/constants";
import { hydratePokemonData } from "../utils/pokemonUtils";
import { buildTeamTypes } from "../utils/utils";
import useAppData from "./useAppData";

const useTeamsInfo = () => {
  const [teams, setTeams] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { pokemon, isLoading: dataLoading, error: dataError } = useAppData();

  useEffect(() => {
    if (dataLoading) return;
    if (dataError) {
      setError(dataError);
      setIsLoading(false);
      return;
    }

    if (!pokemon) {
      setTeams([]);
      setIsLoading(false);
    }

    setIsLoading(true);

    const hydratedWithPokemonInfo = mockTeams.map((team) => {
      return {
        ...team,
        players: hydratePokemonData(team.players, pokemon),
      };
    });

    const formatted = hydratedWithPokemonInfo.map((team) => {
      return buildTeamTypes(team);
    });
    setTeams(formatted);
    setIsLoading(false);
    setError(null);
  }, [dataLoading, dataError, pokemon]);

  return { teams, isLoading, error };
};

export default useTeamsInfo;
