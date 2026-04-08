import { useState, useCallback } from 'react';

interface TableSort {
  field: string;
  direction: 'asc' | 'desc';
}

interface UseTableReturn {
  sortBy: TableSort;
  setSortBy: (field: string) => void;
  sortData: <T extends Record<string, any>>(data: T[], dataType?: 'string' | 'number' | 'date') => T[];
}

export const useTable = (initialSortField: string = 'id'): UseTableReturn => {
  const [sortBy, setSortByState] = useState<TableSort>({
    field: initialSortField,
    direction: 'asc'
  });

  const setSortBy = (field: string) => {
    setSortByState(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortData = <T extends Record<string, any>>(data: T[], dataType: 'string' | 'number' | 'date' = 'string'): T[] => {
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortBy.field];
      const bVal = b[sortBy.field];

      if (aVal === undefined || bVal === undefined) return 0;

      let comparison = 0;
      if (dataType === 'number') {
        comparison = Number(aVal) - Number(bVal);
      } else if (dataType === 'date') {
        comparison = new Date(aVal).getTime() - new Date(bVal).getTime();
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortBy.direction === 'asc' ? comparison : -comparison;
    });

    return sorted;
  };

  return { sortBy, setSortBy, sortData };
};
