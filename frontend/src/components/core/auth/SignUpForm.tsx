import { CiMail } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useState } from "react";
import OtpInput from "@/components/core/auth/OtpInput";

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  otp: string;
};

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [otpFields, setOtpFields] = useState<string[]>(new Array(6).fill(""));
  const [toggleOtp, setToggleOtp] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<SignUpData>();

  const formHandler = async (data: SignUpData) => {
    // send otp for user signup
    if (toggleOtp === false) {
      console.log(data);
      setToggleOtp(true);
      return;
    }

    data.otp = otpFields.join("");
    console.log(data);
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
                  minLength: 1,
                  maxLength: 30,
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
                  minLength: 1,
                  maxLength: 30,
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
                {...register("email", {
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
        disabled={loading || (toggleOtp === true && otpFields.includes(""))}
        type="submit"
        className="ml-[0] mr-[0] my-[20px] bg-[#2d79f3] border-[none] text-[white] text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};
