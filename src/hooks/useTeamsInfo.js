import { useState, useEffect } from "react";
import { useDataContext } from "./useDataContext";
import { mockTeams } from "../utils/constants";
import { hydratePokemonData } from "../utils/pokemonUtils";

export const useTeamsInfo = () => {
  const [teams, setTeams] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { index, isLoading: dataLoading, error: dataError } = useDataContext();

  useEffect(() => {
    if (dataLoading) return;
    if (dataError) {
      setError(dataError);
      setIsLoading(false);
      return;
    }

    if (!index || !index.length) {
      setTeams([]);
      setIsLoading(false);
    }

    setIsLoading(true);

    //get team information from api
    const formatted = mockTeams.map((team) => {
      return {
        ...team,
        players: hydratePokemonData(team.players, index),
      };
    });
    setTeams(formatted);
    setIsLoading(false);
    setError(null);
  }, [dataLoading, dataError, index]);

  return { teams, isLoading, error };
};
