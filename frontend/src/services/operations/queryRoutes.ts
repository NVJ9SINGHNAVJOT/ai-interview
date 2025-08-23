import { ContactUsQuery } from "@/components/core/about/ContactUs";
import { fetchApi } from "@/services/fetchApi";
import { queryEndPoints } from "@/services/apis";
import { CommonRs } from "@/types/routeApiRs/common";

export const queryRoutes = {
  sendQueryApi: async (data: ContactUsQuery) => {
    return await fetchApi<CommonRs>({
      method: "POST",
      url: queryEndPoints.CREATE_QUERY,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
