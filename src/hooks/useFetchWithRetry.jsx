import { useEffect } from "react";
import { useState } from "react";

export default function useFetchWithRetry(
  fetch,
  options = {
    retries: 3,
    retryDelay: 1000,
    incrmeentingDelay: true,
    onSuccess: () => {},
    onFailure: () => {},
    fetchOnInit: true,
  }
) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch();
      setData(response);
      options.onSuccess(response);
    } catch (error) {
      setError(error);
      options.onFailure(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.fetchOnInit) fetchData();
  }, [fetch, options.fetchOnInit]);

  return { data, loading, error };
}
