import type { PaginatedData } from '@/types/PaginatedData.ts';
import type { AxiosResponse } from 'axios';

const getNextPageParam = <T>(lastPage: AxiosResponse<PaginatedData<T>>) => {
  const { currentPage, totalPages } = lastPage?.data?.meta ?? {};

  if (!currentPage || !totalPages) return undefined;

  return currentPage < totalPages ? currentPage + 1 : undefined;
};

export default getNextPageParam;
