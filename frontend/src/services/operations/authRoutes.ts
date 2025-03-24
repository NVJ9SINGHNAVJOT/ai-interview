import { fetchApi } from "@/services/fetchApi";
import { authEndPoints } from "@/services/apis";
import { SignUpData } from "@/components/core/auth/SignUpForm";
import { LogInData } from "@/components/core/auth/LogInForm";
import { CommonRs, IdRs } from "@/types/routeApiRs/common";
import { CheckUserApiRs, LogInApiRs } from "@/types/routeApiRs/authRoutesApiRs";

export const authRoutes = {
  sendOtpApi: async (emailId: string, type: "signup" | "login") => {
    return await fetchApi<CommonRs>(
      "POST",
      authEndPoints.OTP,
      { emailId: emailId, type: type },
      { "Content-Type": "application/json" }
    );
  },

  signUpApi: async (data: SignUpData) => {
    return await fetchApi<IdRs>("POST", authEndPoints.SIGNUP, data, {
      "Content-Type": "application/json",
    });
  },

  logInApi: async (data: LogInData) => {
    return await fetchApi<LogInApiRs>("POST", authEndPoints.LOGIN, data, {
      "Content-Type": "application/json",
    });
  },

  checkUserApi: async () => {
    return await fetchApi<CheckUserApiRs>("GET", authEndPoints.CHECK_USER);
  },
};
