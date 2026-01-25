const ButtonRow = ({ buttons, isBreakpoint, direction, isVisible }) => {
  const classNames = [
    "button-row",
    isBreakpoint
      ? `button-row_type_mobile button-row_type_mobile-${direction}`
      : "",
    isVisible ? `button-row_type_mobile-${direction}_visible` : "",
  ].join(" ");
  return <div className={classNames}>{buttons}</div>;
};

export default ButtonRow;
