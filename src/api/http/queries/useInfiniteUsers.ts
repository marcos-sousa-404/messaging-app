import getApi from '@/api/http/getApi.ts';
import type { User } from '@/types/User';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { PaginatedData } from '@/types/PaginatedData.ts';
import type { InfiniteQueryFnParams } from '@/types/InfiniteQueryFnParams.ts';
import { getApiPaginationParams } from '@/helpers';
import getNextPageParam from '@/helpers/getNextPageParam.ts';

const getUsers = async (queryFnParams: UseInfiniteUsersParams & InfiniteQueryFnParams) => {
  const api = getApi();

  const paginationParams = getApiPaginationParams(queryFnParams);

  return api.get<PaginatedData<User>>('/users', {
    params: {
      ...paginationParams,
      search: queryFnParams.search,
    },
  });
};

const useInfiniteUsers = (params: UseInfiniteUsersParams) => {
  return useInfiniteQuery({
    queryKey: ['infinite-users', params.search],
    initialPageParam: 1,
    queryFn: (baseParams) => getUsers({ ...baseParams, ...params }),
    getNextPageParam: (lastPage) => getNextPageParam(lastPage),
  });
};

export default useInfiniteUsers;

export interface UseInfiniteUsersParams {
  search?: string;
}
