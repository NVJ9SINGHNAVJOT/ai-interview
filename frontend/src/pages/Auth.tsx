import { Navigate, useNavigate, useParams } from "react-router-dom";
import SignUpForm from "@/components/core/auth/SignUpForm";
import LogInForm from "@/components/core/auth/LogInForm";

const Auth = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  if (type !== "login" && type !== "signup") {
    return <Navigate to="/error" />;
  }
  return (
    <div className="w-full min-h-[calc(100%-3.8rem)] bg-neutral-800 flex justify-center items-center">
      {/* auth forms */}
      <section className=" flex flex-col bg-black w-[25rem] rounded-2xl px-7 py-5">
        {type === "login" ? <LogInForm /> : <SignUpForm />}
        <p className="text-center text-[#f1f1f1] text-[14px] mx-[0] my-[5px]">
          {type === "login" ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => navigate(`/auth/${type === "login" ? "signup" : "login"}`)}
            className="text-[14px] ml-[5px] text-[#2d79f3] font-medium cursor-pointer"
          >
            {type === "login" ? "Sign Up" : "Log In"}
          </span>
        </p>
      </section>
    </div>
  );
};

export default Auth;
