// useApi.tsx
import { useRef, useState } from "react";
import { fetchApi, type ApiError, type ApiResponse } from "@/services/fetchApi";
import { ApiRoute } from "@/services/apiRoute";

export function useApi<A extends any[], R>(route: ApiRoute<A, R>) {
  const [response, setResponse] = useState<R | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = async (...args: A): Promise<ApiResponse<R>> => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setResponse(null);

    const result = await fetchApi<R>({
      ...route.build(...args),
      signal: controller.signal,
    });

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
