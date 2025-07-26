import { useRef, useState } from "react";
import type { ApiError, ApiResponse } from "@/services/fetchApi";

export function useApi<T, Args extends any[]>(apiFn: (...args: [...Args, AbortSignal?]) => Promise<ApiResponse<T>>) {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = async (...args: Args) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setResponse(null);

    const result = await apiFn(...args, controller.signal);
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
