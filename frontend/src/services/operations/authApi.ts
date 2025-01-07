import { fetchApi, fetchApiData } from "@/services/fetchApi";
import { authEndPoints } from "@/services/apis";
import { SignUpData } from "@/components/core/auth/SignUpForm";
import { User } from "@/redux/slices/authSlice";

export const sendOtpApi = async (email: string, type: "signup" | "login") => {
  return await fetchApi(
    "POST",
    authEndPoints.OTP,
    { email: email, type: type },
    { "Content-Type": "application/json" }
  );
};

export const signUpApi = async (data: SignUpData) => {
  return await fetchApiData<User>("POST", authEndPoints.SIGNUP, data, { "Content-Type": "application/json" });
};
