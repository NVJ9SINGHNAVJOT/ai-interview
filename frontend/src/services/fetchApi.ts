export type ApiError = { status: number; message: string };

export type ApiResponse<T> = { error: null; response: T } | { error: ApiError; response: null };

export type FetchApiOptions = {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD";
  url: string;
  data?: object | FormData;
  signal?: AbortSignal;
  headers?: Record<string, string>;
  params?: Record<string, string>;
};

export async function fetchApi<T>(options: FetchApiOptions): Promise<ApiResponse<T>> {
  try {
    const { method, url: initialUrl, data, signal, headers, params } = options;
    const requestHeaders = new Headers();

    if (headers) {
      Object.entries(headers).forEach(([key, value]) => requestHeaders.append(key, value));
    }

    // Append server key for backend authorization
    requestHeaders.append("Authorization", process.env.SERVER_KEY as string);

    // Add query parameters to the URL
    let url = initialUrl;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    let requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      credentials: "include",
      signal: signal,
    };

    // Attach body only if method is NOT GET or HEAD and data is provided
    if (method !== "GET" && method !== "HEAD" && data != null) {
      if (data instanceof FormData) {
        // For FormData, do not set Content-Type; browser sets it automatically
        requestOptions.body = data;
      } else {
        // For JSON, set Content-Type to application/json (unless already set)
        if (!requestHeaders.has("Content-Type")) {
          requestHeaders.append("Content-Type", "application/json");
        }
        requestOptions.body = JSON.stringify(data);
      }
    }

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

    return { error: null, response: responseData as T };
  } catch (e: any) {
    return { error: { status: 0, message: "message" in e ? e.message : "Unknown error" }, response: null };
  }
}
