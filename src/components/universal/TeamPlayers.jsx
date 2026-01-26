const TeamPlayers = ({ team, page }) => {
  //If the page is teams => this will build a row of 6 pokemon sprites

  //if page is team-builder => this will render a 3x2 grid of pokemon cards

  return (
    <ul
      className={page === "team-builder" ? "form__team" : "teams__team-players"}
    >
      {team}
    </ul>
  );
};

export default TeamPlayers;
