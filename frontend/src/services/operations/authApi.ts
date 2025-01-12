import { fetchApi } from "@/services/fetchApi";
import { authEndPoints } from "@/services/apis";
import { SignUpData } from "@/components/core/auth/SignUpForm";
import { User } from "@/redux/slices/authSlice";
import { LogInData } from "@/components/core/auth/LogInForm";

export const sendOtpApi = async (emailId: string, type: "signup" | "login") => {
  return await fetchApi<{ message: string }>(
    "POST",
    authEndPoints.OTP,
    { emailId: emailId, type: type },
    { "Content-Type": "application/json" }
  );
};

export const signUpApi = async (data: SignUpData) => {
  return await fetchApi<{ message: string; data: { id: number } }>("POST", authEndPoints.SIGNUP, data, {
    "Content-Type": "application/json",
  });
};

export const logInApi = async (data: LogInData) => {
  return await fetchApi<{ message: string; data: Omit<User, "emailId"> }>("POST", authEndPoints.LOGIN, data, {
    "Content-Type": "application/json",
  });
};

export const checkUserApi = async () => {
  return await fetchApi<{ message: string; data?: User }>("GET", authEndPoints.CHECK_USER);
};
