type ApiError = { status: number; message: string };

export type ApiResponse<T> =
  | { error: null; response: { message: string; data: T } }
  | { error: ApiError; response: null };

export async function fetchApi<T>(
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD",
  url: string,
  data?: object | FormData | null,
  headers?: { [key: string]: string } | null,
  params?: { [key: string]: string } // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ApiResponse<T>> {
  try {
    // only 'Content-Type' : 'application/json' header is used as input, otherwise header should be {}
    const requestHeaders = new Headers();

    if (headers) {
      Object.entries(headers ?? {}).forEach(([key, value]) => requestHeaders.append(key, value));
    }

    // Backend servers can be accessed with server key only
    requestHeaders.append("Authorization", process.env.SERVER_KEY as string);

    // parameters added to url
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    let requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      credentials: "include",
    };

    if (data) {
      if (headers?.["Content-Type"] === "application/json") {
        requestOptions = {
          ...requestOptions,
          body: JSON.stringify(data),
        };
      } else {
        requestOptions = {
          ...requestOptions,
          body: data as FormData,
        };
      }
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      return { error: { status: 500, message: "response not ok" }, response: null };
    }

    const responseData = await response.json();
    if (response.status < 200 || response.status > 299) {
      return {
        error: { status: response.status, message: "message" in responseData ? responseData.message : "unknown error" },
        response: null,
      };
    }

    return { error: null, response: responseData as { message: string; data: T } };
  } catch (error) {
    return { error: { status: 0, message: "api call error" }, response: null };
  }
}
