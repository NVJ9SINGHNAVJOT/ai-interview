import { useNavigate } from "react-router-dom";

const SignInButton = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/auth/signup")} className="ct-signInButton">
      Sign In
    </div>
  );
};

export default SignInButton;
