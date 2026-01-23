import Button from "../universal/Button";

const RedirectText = ({ redirectText, target, onSwitch }) => {
  return (
    <div className="auth-modal__redirect">
      <p className="auth-modal__redirect-text">{redirectText}</p>
      <Button
        buttonCategory="link"
        size="sm"
        buttonText={target}
        clickFunction={() => onSwitch(target.toLowerCase())}
      />
    </div>
  );
};

export default RedirectText;
