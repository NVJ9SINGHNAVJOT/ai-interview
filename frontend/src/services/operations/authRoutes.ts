import { fetchApi } from "@/services/fetchApi";
import { authEndPoints } from "@/services/apis";
import { SignUpData } from "@/components/core/auth/SignUpForm";
import { LogInData } from "@/components/core/auth/LogInForm";
import { CommonRs, IdRs } from "@/types/routeApiRs/common";
import { CheckUserApiRs, LogInApiRs } from "@/types/routeApiRs/authRoutesApiRs";

export const authRoutes = {
  sendOtpApi: async (data: { emailId: string; type: "signup" | "login" }) => {
    return await fetchApi<CommonRs>({
      method: "POST",
      url: authEndPoints.OTP,
      data,
    });
  },

  signUpApi: async (data: SignUpData) => {
    return await fetchApi<IdRs>({
      method: "POST",
      url: authEndPoints.SIGNUP,
      data,
    });
  },

  logInApi: async (data: LogInData) => {
    return await fetchApi<LogInApiRs>({
      method: "POST",
      url: authEndPoints.LOGIN,
      data,
    });
  },

  checkUserApi: async () => {
    return await fetchApi<CheckUserApiRs>({
      method: "GET",
      url: authEndPoints.CHECK_USER,
    });
  },
};
