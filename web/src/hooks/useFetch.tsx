import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface FetchResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

interface FetchProps {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  config?: AxiosRequestConfig;
  dependencies?: unknown[];
}

export function useFetch<T>({
  url,
  method = "GET",
  body,
  headers,
  config,
  dependencies = [],
}: FetchProps): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosConfig: AxiosRequestConfig = {
          url,
          method,
          headers,
          data: body,
          ...config,
        };

        const response: AxiosResponse<T> = await axios(axiosConfig);
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dependencies]);

  return { data, error, loading };
}
