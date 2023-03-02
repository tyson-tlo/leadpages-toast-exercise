import { useEffect } from "react";
import { useState } from "react";

const defaultOptions = {
  retries: 3,
  retryDelay: 1000,
  incrementingDelay: true,
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
    let retries = 0;
    while (retries < fetchOptions.retries) {
      try {
        setLoading(true);
        const response = await fetch();
        setData(response);
        fetchOptions.onSuccess(response);
      } catch (error) {
        setError(error);
        if (error.status >= 500) {
          retries++;
          // retries here wait for the promise to resolve preventing retries from being passed with the wrong value
          // eslint-disable-next-line no-loop-func
          await new Promise((resolve) =>
            setTimeout(
              resolve,
              fetchOptions.retryDelay * (retries ? retries : 1)
            )
          );
        }
        fetchOptions.onFailure(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (fetchOptions.fetchOnInit) fetchData();
  }, []);

  return { data, loading, error, fetchData };
}
