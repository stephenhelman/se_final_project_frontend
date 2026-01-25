const ButtonRow = ({ buttons, isBreakpoint, direction, isVisible }) => {
  const classNames = [
    "button-row",
    isBreakpoint
      ? `button-row_type_mobile button-row_type_mobile-${direction}`
      : "",
    (buttons.length > 1) & isBreakpoint
      ? `button-row_type_${direction}-long`
      : "",
    isVisible ? `button-row_type_mobile-${direction}_visible` : "",
  ].join(" ");
  return <div className={classNames}>{buttons}</div>;
};

export default ButtonRow;
