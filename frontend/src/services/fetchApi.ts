type ApiError = { status: number; message: string };

type ApiResponseBase<T> = { error: null; response: T } | { error: ApiError; response: null };

type ApiResponse = ApiResponseBase<{ message: string }>;

type ApiResponseData<T> = ApiResponseBase<{ message: string; data: T }>;

async function makeRequest<T>(
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD",
  url: string,
  data?: object | FormData | null,
  headers?: Record<string, string> | null,
  params?: Record<string, string>
): Promise<ApiResponseBase<T>> {
  try {
    const requestHeaders = new Headers();

    if (headers) {
      Object.entries(headers).forEach(([key, value]) => requestHeaders.append(key, value));
    }

    // Append server key for backend authorization
    requestHeaders.append("Authorization", process.env.SERVER_KEY as string);

    // Add query parameters to the URL
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      credentials: "include",
      body:
        data && headers?.["Content-Type"] === "application/json"
          ? JSON.stringify(data)
          : (data as FormData) || undefined,
    };

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    if (!response.ok) {
      return {
        error: {
          status: response.status,
          message: "message" in responseData ? responseData.message : "Unknown error",
        },
        response: null,
      };
    }

    return { error: null, response: responseData };
  } catch {
    return { error: { status: 0, message: "API call error" }, response: null };
  }
}

export async function fetchApi(
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD",
  url: string,
  data?: object | FormData | null,
  headers?: Record<string, string> | null,
  params?: Record<string, string>
): Promise<ApiResponse> {
  return makeRequest<{ message: string }>(method, url, data, headers, params);
}

export async function fetchApiData<T>(
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD",
  url: string,
  data?: object | FormData | null,
  headers?: Record<string, string> | null,
  params?: Record<string, string>
): Promise<ApiResponseData<T>> {
  return makeRequest<{ message: string; data: T }>(method, url, data, headers, params);
}
