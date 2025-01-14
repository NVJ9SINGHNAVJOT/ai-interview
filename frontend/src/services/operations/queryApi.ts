import { ContactUsQuery } from "@/components/core/about/ContactUs";
import { fetchApi } from "@/services/fetchApi";
import { queryEndPoints } from "@/services/apis";

export const sendQueryApi = async (data: ContactUsQuery) => {
  return await fetchApi<{ message: string }>("POST", queryEndPoints.CREATE_QUERY, data, {
    "Content-Type": "application/json",
  });
};
