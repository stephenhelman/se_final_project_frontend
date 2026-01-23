import Button from "./Button";
import { useState } from "react";

const SortMenu = ({ sortOptions, handleSelect, values, isBreakpoint }) => {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setSortMenuOpen((prev) => !prev);
  };

  const handleSelectOption = (option) => {
    handleSelect("sortBy", option.id);
    setSortMenuOpen(false);
  };

  if (isBreakpoint) {
    return (
      <div className="sort-menu__options">
        {sortOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={
              "sort-menu__item" +
              (values.sortBy === option.id ? " sort-menu__item_active" : "")
            }
            onClick={() => {
              handleSelectOption(option);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="searchbar__sort-menu sort-menu">
      <Button
        buttonCategory="ghost"
        buttonText="Sort"
        buttonType="button"
        clickFunction={handleOpenMenu}
        isActive={sortMenuOpen}
      />

      {sortMenuOpen && (
        <div className="sort-menu__options">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={
                "sort-menu__item" +
                (values.sortBy === option.id ? " sort-menu__item_active" : "")
              }
              onClick={() => {
                handleSelectOption(option);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortMenu;
