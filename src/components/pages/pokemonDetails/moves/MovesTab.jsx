import { useState } from "react";
import MovesTable from "./MovesTable";
import Button from "../../../universal/Button";
import InfoModal from "../../../universal/InfoModal";

import "../../../../blocks/Moves.css";

const MovesTab = ({ pokemon, isBreakpoint }) => {
  const [moveType, setMoveType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [moveFlavor, setMoveFlavor] = useState("");
  const [coordinates, setCoordinates] = useState({ x: "", y: "" });

  const handleShowInfo = (e, flavorText) => {
    setCoordinates({ x: e.pageX, y: e.pageY });
    setMoveFlavor(flavorText);
    setShowModal(true);
  };

  const handleHideInfo = () => {
    setMoveFlavor("");
    setShowModal(false);
  };

  const handleToggleMoveType = (value) => {
    setMoveType((prev) => {
      return prev !== value ? value : "";
    });
  };

  const moves = pokemon.moves.filter((move) => move.method === moveType);
  return (
    <>
      <section className="tabs__moves moves">
        <div
          className={`moves__section-wrapper ${
            moveType === "level-up" ? "moves__section-wrapper_active" : ""
          }`}
        >
          <div className="moves__header">
            <h4 className="moves__title">Level Up Moves</h4>
            <Button
              buttonCategory="icon"
              buttonType="button"
              buttonIcon={moveType === "level-up" ? "showIcon" : "hideIcon"}
              clickFunction={() => handleToggleMoveType("level-up")}
            />
          </div>
          {moveType === "level-up" && (
            <div className="moves__table-wrapper">
              <MovesTable
                type={moveType}
                moves={moves}
                showInfo={handleShowInfo}
                isBreakpoint={isBreakpoint}
              />
            </div>
          )}
        </div>
        <div
          className={`moves__section-wrapper ${
            moveType === "machine" ? "moves__section-wrapper_active" : ""
          }`}
        >
          <div className="moves__header">
            <h4 className="moves__title">TM/HM Moves</h4>
            <Button
              buttonCategory="icon"
              buttonType="button"
              buttonIcon={moveType === "machine" ? "showIcon" : "hideIcon"}
              clickFunction={() => handleToggleMoveType("machine")}
            />
          </div>
          {moveType === "machine" && (
            <div className="moves__table-wrapper">
              <MovesTable
                type={moveType}
                moves={moves}
                showInfo={handleShowInfo}
                isBreakpoint={isBreakpoint}
              />
            </div>
          )}
        </div>
      </section>
      {showModal && (
        <InfoModal
          text={moveFlavor}
          isOpen={showModal}
          onClose={handleHideInfo}
          isBreakpoint={isBreakpoint}
          coordinates={coordinates}
        />
      )}
    </>
  );
};

export default MovesTab;
