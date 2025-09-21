import { authEndPoints } from "@/services/apis";
import { SignUpData } from "@/components/core/auth/SignUpForm";
import { LogInData } from "@/components/core/auth/LogInForm";
import { CommonRs, IdRs } from "@/types/routeApiRs/common";
import { CheckUserApiRs, LogInApiRs } from "@/types/routeApiRs/authRoutesApiRs";
import { createRoute } from "@/services/apiRoute";

export const authRoutes = {
  sendOtpApi: createRoute<[{ emailId: string; type: "signup" | "login" }], CommonRs>((data) => ({
    method: "POST",
    url: authEndPoints.OTP,
    data,
  })),

  signUpApi: createRoute<[SignUpData], IdRs>((data) => ({
    method: "POST",
    url: authEndPoints.SIGNUP,
    data,
  })),

  logInApi: createRoute<[LogInData], LogInApiRs>((data) => ({
    method: "POST",
    url: authEndPoints.LOGIN,
    data,
  })),

  checkUserApi: createRoute<[], CheckUserApiRs>(() => ({
    method: "GET",
    url: authEndPoints.CHECK_USER,
  })),
};
