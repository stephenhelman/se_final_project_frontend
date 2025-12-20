import AuthModal from "./AuthModal";

const LoginAuthModal = () => {
  return (
    <AuthModal
      title="Login"
      description="Welcome back!"
      submitText="Login"
      redirectTest="Don't have an account?"
      target="Register"
    >
      <div>
        <img src="" alt="" />
        <input type="email" required placeholder="email" />
      </div>
      <div>
        <img src="" alt="" />
        <input type="password" required placeholder="Password" />
      </div>
      <p>Forgot password?</p>
    </AuthModal>
  );
};

export default LoginAuthModal;
