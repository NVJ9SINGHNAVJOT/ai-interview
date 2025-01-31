import { fetchApi } from "@/services/fetchApi";
import { authEndPoints } from "@/services/apis";
import { SignUpData } from "@/components/core/auth/SignUpForm";
import { User } from "@/redux/slices/authSlice";
import { LogInData } from "@/components/core/auth/LogInForm";
import { CommonRs } from "@/types/apis/common";
import { CheckUserApiRs, LogInApiRs, SignUpApiRs } from "@/types/apis/authApiRs";

export const sendOtpApi = async (emailId: string, type: "signup" | "login") => {
  return await fetchApi<CommonRs>(
    "POST",
    authEndPoints.OTP,
    { emailId: emailId, type: type },
    { "Content-Type": "application/json" }
  );
};

export const signUpApi = async (data: SignUpData) => {
  return await fetchApi<SignUpApiRs>("POST", authEndPoints.SIGNUP, data, {
    "Content-Type": "application/json",
  });
};

export const logInApi = async (data: LogInData) => {
  return await fetchApi<LogInApiRs>("POST", authEndPoints.LOGIN, data, {
    "Content-Type": "application/json",
  });
};

export const checkUserApi = async () => {
  return await fetchApi<CheckUserApiRs>("GET", authEndPoints.CHECK_USER);
};
