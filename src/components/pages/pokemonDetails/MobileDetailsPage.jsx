import { useState } from "react";
import ActiveTab from "./ActiveTab";
import Button from "../../universal/Button";
import ButtonRow from "../../universal/ButtonRow";

const MobileDetailsPage = ({ pokemon, isBreakpoint }) => {
  const [activeTab, setActiveTab] = useState("info");
  const infoButton = (
    <Button
      key="info"
      buttonCategory="nav-tab-right"
      buttonText="Info"
      buttonType="button"
      clickFunction={() => setActiveTab("info")}
      isActive={activeTab === "info"}
    />
  );

  const typesButton = (
    <Button
      key="types"
      buttonCategory="nav-tab-right"
      buttonText="Types"
      buttonType="button"
      clickFunction={() => setActiveTab("types")}
      isActive={activeTab === "types"}
    />
  );
  const statsButton = (
    <Button
      key="stats"
      buttonCategory="nav-tab-right"
      buttonText="Stats"
      buttonType="button"
      clickFunction={() => setActiveTab("stats")}
      isActive={activeTab === "stats"}
    />
  );
  const evolutionsButton = (
    <Button
      key="evolutions"
      buttonCategory="nav-tab-right"
      buttonText="Evolutions"
      buttonType="button"
      clickFunction={() => setActiveTab("evolutions")}
      isActive={activeTab === "evolutions"}
    />
  );
  const movesButton = (
    <Button
      key="moves"
      buttonCategory="nav-tab-right"
      buttonText="Moves"
      buttonType="button"
      clickFunction={() => setActiveTab("moves")}
      isActive={activeTab === "moves"}
    />
  );

  return (
    <>
      <ButtonRow
        buttons={[
          infoButton,
          typesButton,
          statsButton,
          evolutionsButton,
          movesButton,
        ].reverse()}
        isBreakpoint={isBreakpoint}
        direction="right"
      />
      <ActiveTab
        pokemon={pokemon}
        activeTab={activeTab}
        isBreakpoint={isBreakpoint}
      />
    </>
  );
};

export default MobileDetailsPage;
