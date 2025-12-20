import AuthModal from "./AuthModal";

const RegisterAuthModal = () => {
  return (
    <AuthModal
      title="Register"
      description="It only takes a moment"
      submitText="Register"
      redirectTest="Already have an account?"
      target="Login"
    >
      <div>
        <img src="" alt="" />
        <input type="text" required placeholder="Username" />
      </div>
      <div>
        <img src="" alt="" />
        <input type="email" required placeholder="email" />
      </div>
      <div>
        <img src="" alt="" />
        <input type="password" required placeholder="Password" />
      </div>
      <div>
        <img src="" alt="" />
        <input type="password" required placeholder="Confirm Password" />
      </div>
      <p>Forgot password?</p>
    </AuthModal>
  );
};

export default RegisterAuthModal;
