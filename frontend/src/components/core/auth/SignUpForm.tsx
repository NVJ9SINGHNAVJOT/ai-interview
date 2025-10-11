import { useForm } from "react-hook-form";
import { useState } from "react";
import OtpInput from "@/components/core/auth/OtpInput";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { setAuthLoading, setAuthUser } from "@/redux/slices/authSlice";
import { authRoutes } from "@/services/operations/authRoutes";
import { useApi } from "@/hooks/useApi";
import { FormField } from "@/components/common/FormFields";

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
  const { register, handleSubmit, control } = useForm<SignUpData>();

  const { execute: sendOtp } = useApi(authRoutes.sendOtpApi);
  const { execute: signUp } = useApi(authRoutes.signUpApi);

  const formHandler = async (data: SignUpData) => {
    dispatch(setAuthLoading(true));
    // send otp for user signup
    if (toggleOtp === false) {
      const { error, response } = await sendOtp({ emailId: data.emailId, type: "signup" });
      dispatch(setAuthLoading(false));
      if (error) {
        toast.error("Error Occurred!");
        return;
      }
      toast.success(response.message);
      setToggleOtp(true);
      return;
    }

    const signUpData = { ...data, otp: otpFields.join("") };
    const { error, response } = await signUp(signUpData);
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
          <FormField
            control={control}
            label="First Name"
            type="text"
            {...register("firstName", {
              required: true,
              minLength: 2,
              maxLength: 40,
              pattern: /^[a-zA-Z]{2,}$/,
              setValueAs(value: string) {
                return value.trim();
              },
            })}
          />

          {/* last name */}
          <FormField
            control={control}
            label="Last Name"
            type="text"
            {...register("lastName", {
              required: true,
              minLength: 2,
              maxLength: 40,
              pattern: /^[a-zA-Z]{2,}$/,
              setValueAs(value: string) {
                return value.trim();
              },
            })}
          />

          {/* email */}
          <FormField
            control={control}
            label="Email"
            type="email"
            {...register("emailId", {
              required: true,
              maxLength: 255,
              setValueAs(value: string) {
                return value.trim();
              },
            })}
          />
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
