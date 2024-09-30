import { useEffect, useState } from "react";

interface FetchResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useFetch<T>({ url }: { url: string }): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data: T) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [url]);

  return { data, error, loading };
}
