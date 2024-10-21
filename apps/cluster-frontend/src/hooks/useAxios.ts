import { ErrorType } from "@/types";
import axiosClient from "@/utils/axiosClient";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useRef, useState } from "react";

const client = axiosClient();

// hook to batch the isFetching state for subsequent requests
export function useAxios<T>() {
  const [data, setData] = useState<AxiosResponse<T>>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // For the first request
  const [isFetching, setIsFetching] = useState(false); // For every request

  const firstRequest = useRef(true);

  const request = useCallback(
    async ({ url, method, data, params, ...rest }: AxiosRequestConfig) => {
      setIsFetching(true);

      if (firstRequest.current) {
        setIsLoading(true);
        firstRequest.current = false;
      }

      try {
        const response: AxiosResponse<T> = await client({
          url,
          method,
          data,
          params,
          ...rest,
        });
        setData(response);
        setError("");
        return { success: response };
      } catch (error) {
        const err = error as ErrorType;
        setError(err.response.data);
        return { error: err.response };
      } finally {
        setIsFetching(false);
        setIsLoading(false);
      }
    },
    []
  );

  return { data, error, isFetching, isLoading, request };
}
