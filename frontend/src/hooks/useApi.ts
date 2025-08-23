import { useRef, useState } from "react";
import type { ApiError, ApiResponse } from "@/services/fetchApi";

export function useApi<T, Options>(apiFn: (options: Options) => Promise<ApiResponse<T>>) {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Add autoCancel param (default false)
  const execute = async (options: Options, autoCancel: boolean = false) => {
    if (autoCancel) {
      abortControllerRef.current?.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setResponse(null);

    // Inject signal into options
    const result = await apiFn({ ...options, signal: controller.signal });
    if (result.error) {
      setError(result.error);
    } else {
      setResponse(result.response);
    }

    setLoading(false);
    return result;
  };

  const cancel = () => {
    abortControllerRef.current?.abort();
  };

  return { execute, cancel, response, error, loading };
}
