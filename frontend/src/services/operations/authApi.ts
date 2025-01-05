import { ApiResponse, fetchApi } from "@/services/fetchApi";
import { CommonRs } from "@/types/apis/common";
import { authEndPoints } from "@/services/apis";
import { SignUpData } from "@/components/core/auth/SignUpForm";
import { User } from "@/redux/slices/authSlice";

export const sendOtpApi = async (email: string, type: "signup" | "login"): Promise<ApiResponse<CommonRs>> => {
  return await fetchApi<CommonRs>(
    "POST",
    authEndPoints.OTP,
    { email: email, type: type },
    { "Content-Type": "application/json" }
  );
};

export const signUpApi = async (data: SignUpData): Promise<ApiResponse<User>> => {
  return await fetchApi<User>("POST", authEndPoints.SIGNUP, data, { "Content-Type": "application/json" });
};
