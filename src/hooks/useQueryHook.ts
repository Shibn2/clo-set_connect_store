import { useCallback, useEffect, useState } from 'react';

type QueryParams = Record<string, string>;

//  Utility: Get all query params as an object
function getAllParams(): QueryParams {
  const urlParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlParams.entries());
}

function useQuery() {
  const [query, setQuery] = useState<QueryParams>(getAllParams);

  //  Update local query state when browser history changes
  useEffect(() => {
    const handlePopState = () => {
      setQuery(getAllParams());
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  //  Get value by key
  const get = useCallback(
    (key: string): string => {
      return query[key] ?? '';
    },
    [query],
  );

  // Set one or more query params
  const set = useCallback((queryParamObject: Partial<QueryParams>, replace: boolean = false) => {
    const urlParams = new URLSearchParams(window.location.search);

    Object.entries(queryParamObject).forEach(([key, value]) => {
      if (value === '' || value === undefined || value === null) {
        urlParams.delete(key);
      } else {
        urlParams.set(key, value);
      }
    });

    const queryString = urlParams.toString();
    const updatedUrl = window.location.pathname + (queryString ? `?${queryString}` : '');

    if (replace) {
      window.history.replaceState({}, '', updatedUrl);
    } else {
      window.history.pushState({}, '', updatedUrl);
    }

    setQuery(getAllParams());
  }, []);

  // Clear all query params
  const clearAll = useCallback(() => {
    window.history.replaceState({}, '', window.location.pathname);
    setQuery({});
  }, []);

  return {
    get,
    set,
    clearAll,
    getAll: (): QueryParams => query,
  };
}

export default useQuery;
