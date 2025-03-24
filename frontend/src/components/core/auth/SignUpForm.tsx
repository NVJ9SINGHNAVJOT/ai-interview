import { useForm } from "react-hook-form";
import { useState } from "react";
import OtpInput from "@/components/core/auth/OtpInput";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { setAuthLoading, setAuthUser } from "@/redux/slices/authSlice";
import FormField from "@/components/form/FormField";
import CustomInput from "@/components/form/CustomInput";
import { authRoutes } from "@/services/operations/authRoutes";

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
      const { error, response } = await authRoutes.sendOtpApi(data.emailId, "signup");
      dispatch(setAuthLoading(false));
      if (error) {
        toast.error("Error Occurred!");
        return;
      }
      toast.success(response.message);
      setToggleOtp(true);
      return;
    }

    data.otp = otpFields.join("");
    const { error, response } = await authRoutes.signUpApi(data);
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
          <FormField title="First Name" error={errors.firstName}>
            <CustomInput
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
          </FormField>
          {/* last name */}
          <FormField title="Last Name" error={errors.lastName}>
            <CustomInput
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
          </FormField>
          {/* email */}
          <FormField title="Email" error={errors.emailId}>
            <CustomInput
              type="email"
              {...register("emailId", {
                required: true,
                maxLength: 255,
                setValueAs(value: string) {
                  return value.trim();
                },
              })}
            />
          </FormField>
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
