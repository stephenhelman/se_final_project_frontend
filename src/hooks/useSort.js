import { useMemo } from "react";

const useSort = (
  itemList,
  {
    selectedTypes = [],
    searchTerm = "",
    sortBy = "id",
    favoritesOnly = false,
  } = {}
) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredAndSorted = useMemo(() => {
    if (!Array.isArray(itemList)) return [];

    let result = itemList;

    // 1) Filter by selected types
    if (selectedTypes.length > 0) {
      result = result.filter((pokemon) =>
        pokemon.types?.some((t) => selectedTypes.includes(t))
      );
    }

    // 2) Filter by search term (name or id)
    if (normalizedSearch) {
      result = result.filter((pokemon) => {
        const nameMatch = pokemon.name
          ?.toLowerCase()
          .includes(normalizedSearch);
        const idMatch =
          String(pokemon.id).includes(normalizedSearch) ||
          pokemon.formattedId?.toLowerCase().includes(normalizedSearch);

        return nameMatch || idMatch;
      });
    }

    // 3) Filter favorites only
    if (favoritesOnly) {
      result = result.filter((pokemon) => pokemon.isFavorite);
    }

    // 4) Sort
    const sorted = [...result].sort((a, b) => {
      switch (sortBy) {
        case "name-asc": {
          const nameA = a.name?.toLowerCase() ?? "";
          const nameB = b.name?.toLowerCase() ?? "";
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        }
        case "name-dec": {
          const nameA = a.name?.toLowerCase() ?? "";
          const nameB = b.name?.toLowerCase() ?? "";
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
          return 0;
        }
        case "height-asc": {
          const hA = a.attributes?.height ?? 0;
          const hB = b.attributes?.height ?? 0;
          return hA - hB;
        }
        case "height-dec": {
          const hA = a.attributes?.height ?? 0;
          const hB = b.attributes?.height ?? 0;
          return hB - hA;
        }
        case "weight-asc": {
          const wA = a.attributes?.weight ?? 0;
          const wB = b.attributes?.weight ?? 0;
          return wA - wB;
        }
        case "weight-dec": {
          const wA = a.attributes?.weight ?? 0;
          const wB = b.attributes?.weight ?? 0;
          return wB - wA;
        }
        case "length-asc": {
          const lA = a.players?.length ?? 0;
          const lB = b.players?.length ?? 0;
          return lA - lB;
        }
        case "length-dec": {
          const lA = a.players?.length ?? 0;
          const lB = b.players?.length ?? 0;
          return lB - lA;
        }
        case "updated-asc": {
          const uA = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
          const uB = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
          return uA - uB;
        }
        case "updated-dec": {
          const uA = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
          const uB = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
          return uB - uA;
        }

        case "id-dec": {
          return (b.id ?? 0) - (a.id ?? 0);
        }
        case "id-asc":
        default:
          return (a.id ?? 0) - (b.id ?? 0);
      }
    });

    return sorted;
  }, [itemList, selectedTypes, normalizedSearch, favoritesOnly, sortBy]);

  return filteredAndSorted;
};

export default useSort;
