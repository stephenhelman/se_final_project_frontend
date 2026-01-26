import { useState } from "react";

import AuthModal from "./AuthModal";
import ErrorMessage from "../universal/ErrorMessage";
import Button from "../universal/Button";

import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";

import useGlobalError from "../../hooks/useGlobalError";

import icons from "../../utils/imageUtils";
import Validator from "../../utils/Validator";

const RegisterModal = ({ onClose, isOpen, onSwitch, activeModal }) => {
  const { register } = useAuth();
  const { showError } = useGlobalError(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [passwordInput, setPasswordInput] = useState(true);
  const [confirmPasswordInput, setConfirmPasswordInput] = useState(true);

  const { values, handleChange } = useForm({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name } = e.target;
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

  const toggleShowConfirmPassword = () => {
    setConfirmPasswordInput((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError(null);

    const validator = new Validator(values);

    validator.field("username", "Username").required().minLength(6);
    validator.field("email", "Email").required().email();
    validator.field("password", "Password").required().strongPassword();
    validator
      .field("confirmPassword", "Confirm Password")
      .required()
      .matches("password", "Password");

    const errors = validator.getErrors();
    setFieldErrors(errors);
    if (!validator.isValid()) {
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
        onClose?.();
      } else {
        setGeneralError(result.error || "Registration failed");
      }
    } catch (err) {
      showError(err);
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
      error={generalError}
    >
      <fieldset className="auth-modal__form-content">
        <div className="auth-modal__input-wrapper">
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
              onChange={handleInputChange}
              placeholder="Username"
              disabled={isSubmitting}
            />
          </div>
          {fieldErrors.username && (
            <ErrorMessage type="form" message={fieldErrors.username} />
          )}
        </div>
        <div className="auth-modal__input-wrapper">
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
              onChange={handleInputChange}
              placeholder="Email"
              disabled={isSubmitting}
            />
          </div>
          {fieldErrors.email && (
            <ErrorMessage type="form" message={fieldErrors.email} />
          )}
        </div>
        <div className="auth-modal__input-wrapper">
          <div className="auth-modal__input-group">
            <img
              src={icons.passwordIcon}
              alt="Password Lock Icon"
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
              buttonIcon={
                passwordInput ? "hidePasswordIcon" : "showPasswordIcon"
              }
              size="md"
            />
          </div>
          {fieldErrors.password && (
            <ErrorMessage type="form" message={fieldErrors.password} />
          )}
        </div>
        <div className="auth-modal__input-wrapper">
          <div className="auth-modal__input-group">
            <img
              src={icons.passwordIcon}
              alt="Password Lock  Icon"
              className="auth-modal__input-icon"
            />
            <input
              className="auth-modal__input"
              type={confirmPasswordInput ? "password" : "text"}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              disabled={isSubmitting}
            />
            <Button
              buttonCategory="icon"
              clickFunction={toggleShowConfirmPassword}
              buttonIcon={
                confirmPasswordInput ? "hidePasswordIcon" : "showPasswordIcon"
              }
              size="md"
            />
          </div>
          {fieldErrors.confirmPassword && (
            <ErrorMessage type="form" message={fieldErrors.confirmPassword} />
          )}
        </div>
      </fieldset>
    </AuthModal>
  );
};

export default RegisterModal;
