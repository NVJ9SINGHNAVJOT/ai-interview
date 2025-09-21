import { ContactUsQuery } from "@/components/core/about/ContactUs";
import { queryEndPoints } from "@/services/apis";
import { CommonRs } from "@/types/routeApiRs/common";
import { createRoute } from "@/services/apiRoute";

export const queryRoutes = {
  sendQueryApi: createRoute<[ContactUsQuery], CommonRs>((data) => ({
    method: "POST",
    url: queryEndPoints.CREATE_QUERY,
    data,
  })),
};
