import { CiMail } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useState } from "react";
import OtpInput from "@/components/core/auth/OtpInput";
import { sendOtpApi, signUpApi } from "@/services/operations/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { setAuthLoading, setAuthUser } from "@/redux/slices/authSlice";

export type SignUpData = {
  firstName: string;
  lastName: string;
  emailId: string;
  otp: string;
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const authLoading = useAppSelector((state) => state.auth.authLoading);
  const [otpFields, setOtpFields] = useState<string[]>(new Array(6).fill(""));
  const [toggleOtp, setToggleOtp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();

  const formHandler = async (data: SignUpData) => {
    dispatch(setAuthLoading(true));
    // send otp for user signup
    if (toggleOtp === false) {
      const { error, response } = await sendOtpApi(data.emailId, "signup");
      dispatch(setAuthLoading(false));
      if (error) {
        // INFO: For now message is only show for 400 status
        toast.error(error.status === 400 ? error.message : "Error Occurred!");
        return;
      }
      toast.success(response.message);
      setToggleOtp(true);
      return;
    }

    data.otp = otpFields.join("");
    const { error, response } = await signUpApi(data);
    dispatch(setAuthLoading(false));
    if (error) {
      // INFO: For now message is only show for 400 status
      toast.error(error.status === 400 ? error.message : "Error Occurred!");
      return;
    }
    toast.success(response.message);
    dispatch(
      setAuthUser({ id: response.data.id, firstName: data.firstName, lastName: data.lastName, emailId: data.emailId })
    );
  };

  return (
    <form onSubmit={handleSubmit(formHandler)} className="ct-sign-in-form flex flex-col gap-3">
      {/* heading */}
      <p className=" text-white self-center text-4xl py-4 font-semibold">Sign Up</p>

      {toggleOtp === false ? (
        // fields
        <div className=" flex flex-col gap-y-4">
          {/* first name */}
          <div className=" flex flex-col gap-y-[0.15rem]">
            <label className=" text-[#f1f1f1] font-semibold">First Name </label>
            <div className=" focus-within:border-[1.5px] focus-within:border-[solid] focus-within:border-[#2d79f3] border-[1.5px] border-[solid] border-[#333] rounded-[10px] h-[50px] flex items-center pl-[10px] [transition:0.2s_ease-in-out] bg-[#2b2b2b]">
              <input
                type="text"
                className=" focus:outline-none ml-[10px] rounded-[10px] border-[none] w-full h-full bg-[#2b2b2b] text-[#f1f1f1]"
                placeholder="Enter First Name"
                required
                {...register("firstName", {
                  required: true,
                  minLength: 2,
                  maxLength: 40,
                  pattern: /^[a-zA-Z]{2,}$/,
                })}
              />
            </div>
          </div>
          {/* last name */}
          <div className=" flex flex-col gap-y-[0.15rem]">
            <label className=" text-[#f1f1f1] font-semibold">Last Name </label>
            <div className=" focus-within:border-[1.5px] focus-within:border-[solid] focus-within:border-[#2d79f3] border-[1.5px] border-[solid] border-[#333] rounded-[10px] h-[50px] flex items-center pl-[10px] [transition:0.2s_ease-in-out] bg-[#2b2b2b]">
              <input
                type="text"
                className=" focus:outline-none ml-[10px] rounded-[10px] border-[none] w-full h-full bg-[#2b2b2b] text-[#f1f1f1]"
                placeholder="Enter Last Name "
                required
                {...register("lastName", {
                  required: true,
                  minLength: 2,
                  maxLength: 40,
                  pattern: /^[a-zA-Z]{2,}$/,
                })}
              />
            </div>
          </div>
          {/* email */}
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

export default SignUpForm;
