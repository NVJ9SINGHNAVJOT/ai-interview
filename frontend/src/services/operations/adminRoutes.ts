import { CommonRs, IdRs } from "@/types/routeApiRs/common";
import { fetchApi } from "@/services/fetchApi";
import { adminEndPoints } from "@/services/apis";
import { LogInData } from "@/components/core/auth/LogInForm";

export const adminRoutes = {
  sendOtpApi: async (emailId: string, type: "signup" | "login") => {
    return await fetchApi<CommonRs>(
      "POST",
      adminEndPoints.OTP,
      { emailId: emailId, type: type },
      { "Content-Type": "application/json" }
    );
  },

  signUpApi: async (data: { emailId: string; otp: string }) => {
    return await fetchApi<IdRs>("POST", adminEndPoints.SIGNUP, data, {
      "Content-Type": "application/json",
    });
  },

  logInApi: async (data: LogInData) => {
    return await fetchApi<IdRs>("POST", adminEndPoints.LOGIN, data, {
      "Content-Type": "application/json",
    });
  },
};
