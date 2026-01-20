import { useState } from "react";

import AuthModal from "./AuthModal";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";

import icons from "../../utils/imageUtils";

const LoginModal = ({ onClose, onSwitch, isOpen, activeModal }) => {
  const { login, error: authError } = useAuth();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await login({
        email: values.email,
        password: values.password,
      });

      if (result.ok) {
        // Successfully logged in
        onClose?.();
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthModal
      title="Login"
      description="Welcome back!"
      submitText={isSubmitting ? "Logging in..." : "Login"}
      redirectText="Don't have an account?"
      target="Register"
      onClose={onClose}
      onSwitch={onSwitch}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      activeModal={activeModal}
    >
      <fieldset className="auth-modal__form-content">
        <div className="auth-modal__input-group">
          <img
            src={icons.emailIcon}
            alt="Email Icon"
            className="auth-modal__input-icon"
          />
          <input
            className="auth-modal__input"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="auth-modal__input-group">
          <img
            src={icons.passwordIcon}
            alt="Pasword lock icon"
            className="auth-modal__input-icon"
          />
          <input
            className="auth-modal__input"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            required
            disabled={isSubmitting}
          />
        </div>
      </fieldset>
      {(error || authError) && (
        <div className="auth-modal__error">{error || authError}</div>
      )}
    </AuthModal>
  );
};

export default LoginModal;
