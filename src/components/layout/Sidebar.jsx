import { useState, useEffect } from "react";
import { pokemonSortOptions } from "../../utils/constants";

import TypeFiltersContent from "./filters/TypeFiltersContent";
import Button from "../universal/Button";
import SortMenu from "../universal/SortMenu";
import Checkbox from "../universal/Checkbox";

import useWindowWidth from "../../hooks/useWindowWidth";

import "../../blocks/Sidebar.css";

const Sidebar = ({
  filterFunction,
  clearArray,
  values,
  showFilterMenu,
  handleSelect,
  toggleState,
  handleReset,
  page,
}) => {
  const { isMobile, isTablet } = useWindowWidth();
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    setActiveFilter("");
  }, [showFilterMenu]);

  const handleClearFilters = () => {
    if (isMobile || isTablet || page === "team-builder") {
      return handleReset(["selectedTypes", "favoritesOnly", "sortBy"]);
    }
    clearArray({ name: "selectedTypes" });
  };

  const handleActiveFilterClicked = (filter) => {
    if (filter === activeFilter) {
      return setActiveFilter("");
    }
    setActiveFilter(filter);
  };

  if (isMobile || isTablet || page === "team-builder") {
    return (
      <section
        className={`sidebar sidebar_type_${page} ${showFilterMenu ? `sidebar_visible sidebar_visible_${page}` : ""}`}
      >
        <div className="sidebar__header">
          <h4 className="sidebar__title">Filters</h4>
          <Button
            buttonText="Clear"
            buttonType="button"
            buttonCategory="ghost"
            clickFunction={handleClearFilters}
          />
        </div>
        <ul className="sidebar-mobile__wrapper">
          <li className="sidebar-mobile__list-item">
            <div className="sidebar-mobile__filter-title-wrapper">
              <p className="sidebar-mobile__filter-title">Types</p>
              <Button
                buttonCategory="icon"
                buttonIcon={activeFilter === "types" ? "showIcon" : "hideIcon"}
                size="md"
                clickFunction={() => handleActiveFilterClicked("types")}
              />
            </div>
            {activeFilter === "types" && (
              <TypeFiltersContent
                filterFunction={filterFunction}
                selectedTypes={values.selectedTypes}
              />
            )}
          </li>
          <li className="sidebar-mobile__list-item">
            <div className="sidebar-mobile__filter-title-wrapper">
              <p className="sidebar-mobile__filter-title">Sort</p>
              <Button
                buttonCategory="icon"
                buttonIcon={activeFilter === "sort" ? "showIcon" : "hideIcon"}
                size="md"
                clickFunction={() => handleActiveFilterClicked("sort")}
              />
            </div>
            {activeFilter === "sort" && (
              <SortMenu
                sortOptions={pokemonSortOptions}
                handleSelect={handleSelect}
                values={values}
                isBreakpoint={Boolean(isMobile || isTablet)}
                page={page}
              />
            )}
          </li>
          <li className="sidebar-mobile__list-item">
            <Checkbox
              checked={values.favoritesOnly}
              onChange={() => toggleState("favoritesOnly")}
              label="Show Favorites Only"
              id="favorites-filter"
            />
          </li>
        </ul>
      </section>
    );
  }
  return (
    <section
      className={`sidebar sidebar_type_${page} ${showFilterMenu ? `sidebar_visible sidebar_visible_${page}` : ""}`}
    >
      <div className="sidebar__header">
        <h4 className="sidebar__title">Filters</h4>
        <Button
          buttonText="Clear"
          buttonType="button"
          buttonCategory="ghost"
          clickFunction={handleClearFilters}
        />
      </div>
      <TypeFiltersContent
        filterFunction={filterFunction}
        selectedTypes={values.selectedTypes}
      />
    </section>
  );
};

export default Sidebar;
