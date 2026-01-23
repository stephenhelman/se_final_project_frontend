import "../../blocks/Checkbox.css";

const Checkbox = ({ checked, onChange, label, id, disabled = false }) => {
  const checkboxId =
    id || `checkbox-${label?.replace(/\s/g, "-").toLowerCase()}`;

  return (
    <div className="custom-checkbox">
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="custom-checkbox__input"
      />
      <label htmlFor={checkboxId} className="custom-checkbox__label">
        {label && <span className="custom-checkbox__text">{label}</span>}
        <span className="custom-checkbox__box">
          {checked && (
            <svg
              className="custom-checkbox__checkmark"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
