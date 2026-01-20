const RedirectText = ({ redirectText, target, onSwitch }) => {
  return (
    <div className="auth-modal__redirect">
      <p className="auth-modal__redirect-text">{redirectText}</p>
      <button
        className="auth-modal__redirect-link"
        onClick={() => onSwitch(target.toLowerCase())}
      >
        {target}
      </button>
    </div>
  );
};

export default RedirectText;
