import { ContactUsQuery } from "@/components/core/about/ContactUs";
import { fetchApi } from "@/services/fetchApi";
import { queryEndPoints } from "@/services/apis";
import { CommonRs } from "@/types/apis/common";

export const sendQueryApi = async (data: ContactUsQuery) => {
  return await fetchApi<CommonRs>("POST", queryEndPoints.CREATE_QUERY, data, {
    "Content-Type": "application/json",
  });
};
