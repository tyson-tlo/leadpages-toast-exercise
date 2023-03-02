import { useEffect } from "react";
import { useState } from "react";

const defaultOptions = {
  retries: 3,
  retryDelay: 1000,
  incrmeentingDelay: true,
  onSuccess: () => {},
  onFailure: () => {},
  fetchOnInit: true,
};

export default function useFetchWithRetry(fetch, options = defaultOptions) {
  const fetchOptions = { ...defaultOptions, ...options };
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // add retry logic
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch();
      setData(response);
      fetchOptions.onSuccess(response);
    } catch (error) {
      setError(error);
      fetchOptions.onFailure(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchOptions.fetchOnInit) fetchData();
  }, []);

  return { data, loading, error, fetchData };
}
