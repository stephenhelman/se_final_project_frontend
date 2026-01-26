import { useState, useEffect, useCallback } from "react";
import { mockTeams } from "../utils/constants";
import { buildTeamTypes } from "../utils/utils";

const useTeamsData = (pokemonList = []) => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonList.length) return;
    const loadTeams = () => {
      setIsLoading(true);
      setError(null);

      try {
        const serverTeams = mockTeams;

        const hydratedTeams = serverTeams.map((team) => {
          const players = team.players
            .map((playerId) => {
              return pokemonList.find((p) => p.id === playerId);
            })
            .filter(Boolean);

          return {
            ...team,
            players,
            types: buildTeamTypes(players),
          };
        });

        setTeams(hydratedTeams);
        setError(null);
      } catch (err) {
        console.error("Error loading teams:", err);
        setError(err.message || "Failed to load teams");
      } finally {
        setIsLoading(false);
      }
    };

    loadTeams();
  }, [pokemonList]);

  const createTeam = useCallback(
    (teamData) => {
      try {
        if (!teamData.players || teamData.players.length === 0) {
          throw new Error("Cannot save a team with no Pokemon");
        }

        const teamToSave = {
          name: teamData.name,
          description: teamData.description,
          pokemonIds: teamData.players.map((p) => p.id),
        };

        const savedTeam = {
          ...teamToSave,
          id: teams.length + 1,
          isFavorite: false,
          lastUpdated: new Date().toISOString(),
          players: teamToSave.pokemonIds,
        };

        const hydratedTeam = {
          ...savedTeam,
          players: savedTeam.players
            .map((id) => pokemonList.find((p) => p.id === id))
            .filter(Boolean),
          types: buildTeamTypes({
            players: savedTeam.players
              .map((id) => pokemonList.find((p) => p.id === id))
              .filter(Boolean),
          }),
        };

        setTeams((prev) => [...prev, hydratedTeam]);
        return { ok: true, data: hydratedTeam };
      } catch (err) {
        console.error("Error creating team:", err);
        return { ok: false, error: err.message };
      }
    },
    [teams, pokemonList],
  );

  const updateTeam = useCallback(
    (teamId, teamData) => {
      try {
        if (!teamData.players || teamData.players.length === 0) {
          throw new Error("Cannot save a team with no Pokemon");
        }

        const teamToSave = {
          name: teamData.name,
          description: teamData.description,
          pokemonIds: teamData.players.map((p) => p.id),
        };

        const savedTeam = {
          ...teamToSave,
          id: teamId,
          lastUpdated: new Date().toISOString(),
          players: teamToSave.pokemonIds,
        };

        const hydratedTeam = {
          ...savedTeam,
          players: savedTeam.players
            .map((id) => pokemonList.find((p) => p.id === id))
            .filter(Boolean),
          types: buildTeamTypes({
            players: savedTeam.players
              .map((id) => pokemonList.find((p) => p.id === id))
              .filter(Boolean),
          }),
        };

        setTeams((prev) =>
          prev.map((team) => (team.id === teamId ? hydratedTeam : team)),
        );

        return { ok: true, data: hydratedTeam };
      } catch (err) {
        console.error("Error updating team:", err);
        return { ok: false, error: err.message };
      }
    },
    [pokemonList],
  );

  const deleteTeam = useCallback((teamId) => {
    try {
      setTeams((prev) => prev.filter((team) => team.id !== teamId));
      return { ok: true };
    } catch (err) {
      console.error("Error deleting team:", err);
      return { ok: false, error: err.message };
    }
  }, []);

  const toggleFavorite = useCallback((teamId) => {
    try {
      setTeams((prev) =>
        prev.map((team) =>
          team.id === teamId ? { ...team, isFavorite: !team.isFavorite } : team,
        ),
      );
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  }, []);

  return {
    teams,
    isLoading,
    error,
    createTeam,
    updateTeam,
    deleteTeam,
    toggleFavorite,
  };
};

export default useTeamsData;
