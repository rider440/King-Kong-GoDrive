import { useState, useCallback } from 'react';

interface UseSearchReturn {
  query: string;
  results: string[];
  isSearching: boolean;
  setQuery: (query: string) => void;
  clearSearch: () => void;
  filterData: <T extends Record<string, any>>(data: T[], fields: (keyof T)[], searchTerm?: string) => T[];
}

export const useSearch = <T extends Record<string, any>>(): UseSearchReturn & {
  filterData: <U extends Record<string, any>>(data: U[], fields: (keyof U)[], searchTerm?: string) => U[];
} => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const filterData = useCallback(<U extends Record<string, any>>(
    data: U[],
    fields: (keyof U)[],
    searchTerm: string = query
  ): U[] => {
    if (!searchTerm.trim()) return data;

    const lowerQuery = searchTerm.toLowerCase();
    return data.filter(item =>
      fields.some(field =>
        String(item[field]).toLowerCase().includes(lowerQuery)
      )
    );
  }, [query]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setIsSearching(false);
  }, []);

  return {
    query,
    results: [],
    isSearching,
    setQuery,
    clearSearch,
    filterData
  };
};
