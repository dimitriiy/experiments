import React from 'react';

export function useSWR<T = any, E = any>(
  _key: string,
  fetcher: () => T | Promise<T>
): {
  data?: T;
  error?: E;
  isLoading: boolean;
} {
  const [data, setData] = React.useState<T>();
  const [error, setError] = React.useState<E>();
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    function request() {
      try {
        setLoading(true);
        const processing = fetcher();

        if ('then' in processing) {
          processing.then((d) => setData(d)).catch((e) => setError(e));
        } else {
          setData(processing);
        }
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    request();
  }, []);

  return {
    data,
    error,
    isLoading,
  };
}
