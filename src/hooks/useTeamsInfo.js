import { useState, useEffect } from "react";
import { useDataContext } from "./useDataContext";
import { mockTeams } from "../utils/constants";
import { hydratePokemonData } from "../utils/pokemonUtils";
import { buildTeamTypes } from "../utils/utils";

export const useTeamsInfo = () => {
  const [teams, setTeams] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    pokemonList,
    isLoading: dataLoading,
    error: dataError,
  } = useDataContext();

  useEffect(() => {
    if (dataLoading) return;
    if (dataError) {
      setError(dataError);
      setIsLoading(false);
      return;
    }

    if (!pokemonList || !pokemonList.length) {
      setTeams([]);
      setIsLoading(false);
    }

    setIsLoading(true);

    //get team information from api
    const hydratedWithPokemonInfo = mockTeams.map((team) => {
      return {
        ...team,
        players: hydratePokemonData(team.players, pokemonList),
      };
    });

    const formatted = hydratedWithPokemonInfo.map((team) => {
      return buildTeamTypes(team);
    });
    setTeams(formatted);
    setIsLoading(false);
    setError(null);
  }, [dataLoading, dataError, pokemonList]);

  return { teams, isLoading, error };
};
