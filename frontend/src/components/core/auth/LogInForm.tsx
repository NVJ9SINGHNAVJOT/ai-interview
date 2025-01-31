import { logInApi, sendOtpApi } from "@/services/operations/authApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SignUpData } from "@/components/core/auth/SignUpForm";
import OtpInput from "@/components/core/auth/OtpInput";
import { setAuthLoading, setAuthUser } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/store";

export type LogInData = Omit<SignUpData, "firstName" | "lastName">;

const LogInForm = () => {
  const dispatch = useDispatch();
  const authLoading = useAppSelector((state) => state.auth.authLoading);
  const [otpFields, setOtpFields] = useState<string[]>(new Array(6).fill(""));
  const [toggleOtp, setToggleOtp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInData>();
  const formHandler = async (data: LogInData) => {
    dispatch(setAuthLoading(true));
    // send otp for user login
    if (toggleOtp === false) {
      const { error, response } = await sendOtpApi(data.emailId, "login");
      dispatch(setAuthLoading(false));
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success(response.message);
      setToggleOtp(true);
      return;
    }

    data.otp = otpFields.join("");
    const { error, response } = await logInApi(data);
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(response.message);
    dispatch(
      setAuthUser({
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        emailId: data.emailId,
      })
    );
  };
  return (
    <form onSubmit={handleSubmit(formHandler)} className="ct-sign-in-form flex flex-col gap-3">
      {/* heading */}
      <p className=" text-white self-center text-4xl py-5 font-semibold">Log In</p>

      {toggleOtp === false ? (
        <div className=" flex flex-col gap-y-[0.15rem]">
          <label className=" text-[#f1f1f1] font-semibold">Email </label>
          <div className=" focus-within:border-[1.5px] focus-within:border-[solid] focus-within:border-[#2d79f3] border-[1.5px] border-[solid] border-[#333] rounded-[10px] h-[50px] flex items-center pl-[10px] [transition:0.2s_ease-in-out] bg-[#2b2b2b]">
            <CiMail className=" text-black size-6" />
            <input
              type="email"
              className=" focus:outline-none ml-[10px] rounded-[10px] border-[none] w-full h-full bg-[#2b2b2b] text-[#f1f1f1]"
              placeholder="Enter your Email"
              required
              {...register("emailId", {
                required: true,
              })}
            />
          </div>
        </div>
      ) : (
        <OtpInput otpFields={otpFields} setOtpFields={setOtpFields} />
      )}

      {/* button */}
      <button
        disabled={authLoading || (toggleOtp === true && otpFields.includes(""))}
        type="submit"
        className="ml-[0] mr-[0] my-[20px] bg-[#2d79f3] border-[none] text-[white] text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer"
      >
        {authLoading === false ? "Submit" : "Submitting..."}
      </button>
    </form>
  );
};

export default LogInForm;
