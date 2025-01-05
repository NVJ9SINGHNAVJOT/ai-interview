import { ApiResponse, fetchApi } from "@/services/fetchApi";
import { CommonRs } from "@/types/apis/common";
import { authEndPoints } from "@/services/apis";

export const sendOtpApi = async (email: string, newUser: "yes" | "no"): Promise<ApiResponse<CommonRs>> => {
  return await fetchApi<CommonRs>(
    "POST",
    authEndPoints.OTP,
    { email: email, newUser: newUser },
    { "Content-Type": "application/json" }
  );
};
