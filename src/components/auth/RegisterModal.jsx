import { useState } from "react";

import AuthModal from "./AuthModal";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";

import icons from "../../utils/imageUtils";

const RegisterModal = ({ onClose, isOpen, onSwitch, activeModal }) => {
  const { register, error: authError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength (basic)
    if (values.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (result.ok) {
        // Successfully registered
        onClose?.();
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthModal
      title="Register"
      description="It only takes a moment"
      submitText={isSubmitting ? "Registering..." : "Register"}
      redirectText="Already have an account?"
      target="Login"
      onClose={onClose}
      onSwitch={onSwitch}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isActive={activeModal === "login"}
      activeModal={activeModal}
    >
      <fieldset className="auth-modal__form-content">
        <div className="auth-modal__input-group">
          <img
            src={icons.userIcon}
            alt="User Icon"
            className="auth-modal__input-icon"
          />
          <input
            className="auth-modal__input"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Username"
            required
            disabled={isSubmitting}
          />
        </div>
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
            alt="Password Lock Icon"
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
        <div className="auth-modal__input-group">
          <img
            src={icons.passwordIcon}
            alt="Password Lock  Icon"
            className="auth-modal__input-icon"
          />
          <input
            className="auth-modal__input"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
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

export default RegisterModal;
