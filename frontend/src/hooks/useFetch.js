import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

/**
 * Generic GET hook.
 * apiClient already unwraps the { success, message, data } envelope,
 * so the resolved value IS the payload. data.data holds the actual object.
 */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setLoading(true);
    apiClient.get(url)
      .then((payload) => {
        if (!cancelled) {
          // payload is the envelope { success, message, data }
          setData(payload?.data ?? payload);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.response?.data?.message || 'An error occurred');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}
