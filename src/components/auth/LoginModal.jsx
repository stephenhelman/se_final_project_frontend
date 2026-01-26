import { useState } from "react";

import AuthModal from "./AuthModal";
import ErrorMessage from "../universal/ErrorMessage";
import Validator from "../../utils/Validator";
import Button from "../universal/Button";

import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import useGlobalError from "../../hooks/useGlobalError";

import icons from "../../utils/imageUtils";

const LoginModal = ({ onClose, onSwitch, isOpen, activeModal }) => {
  const { login } = useAuth();
  const { showError } = useGlobalError();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [passwordInput, setPasswordInput] = useState(true);

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFieldErrors((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
    handleChange(e);
  };

  const toggleShowPassword = () => {
    setPasswordInput((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors(null);

    const validator = new Validator(values);

    validator.field("email", "Email").required().email();
    validator.field("password", "Password").required().minLength(6);

    const validationErrors = validator.getErrors();
    setFieldErrors(validationErrors);

    if (!validator.isValid()) return;

    setIsSubmitting(true);

    try {
      const result = await login({
        email: values.email.toLowerCase(),
        password: values.password,
      });

      if (result.ok) {
        onClose?.();
      } else {
        setGeneralError(result.error);
      }
    } catch (err) {
      showError(err);
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
      error={generalError}
    >
      <fieldset className="auth-modal__form-content">
        <div
          className={`auth-modal__input-group ${fieldErrors.email ? "auth-modal__input_error" : ""}`}
        >
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
            onChange={handleInputChange}
            placeholder="Email"
            disabled={isSubmitting}
          />
        </div>
        {fieldErrors.email && (
          <ErrorMessage type="form" message={fieldErrors.email} />
        )}

        <div
          className={`auth-modal__input-group ${fieldErrors.password ? "auth-modal__input_error" : ""}`}
        >
          <img
            src={icons.passwordIcon}
            alt="Pasword lock icon"
            className="auth-modal__input-icon"
          />
          <input
            className="auth-modal__input"
            type={passwordInput ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleInputChange}
            placeholder="Password"
            disabled={isSubmitting}
          />
          <Button
            buttonCategory="icon"
            clickFunction={toggleShowPassword}
            buttonIcon={passwordInput ? "hidePasswordIcon" : "showPasswordIcon"}
            size="md"
          />
        </div>
        {fieldErrors.password && (
          <ErrorMessage type="form" message={fieldErrors.password} />
        )}
        <div className="error error_type_form error_type_form-warning">
          <div>
            <p className="error__text">Stubbed Login Info</p>
            <p className="error__text">Username: Stephenhelman18@gmail.com</p>
            <p className="error__text">Password: Pokemon123!</p>
          </div>
        </div>
      </fieldset>
    </AuthModal>
  );
};

export default LoginModal;
