import getApi from '@/api/http/getApi.ts';
import type { User } from '@/types/User';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { PaginatedData } from '@/types/PaginatedData.ts';
import type { InfiniteQueryFnParams } from '@/types/InfiniteQueryFnParams.ts';
import { getApiPaginationParams } from '@/helpers';
import getNextPageParam from '@/helpers/getNextPageParam.ts';

const getUsers = async (queryFnParams: InfiniteQueryFnParams) => {
  const api = getApi();

  const paginationParams = getApiPaginationParams(queryFnParams);

  return api.get<PaginatedData<User>>('/users', {
    params: paginationParams,
  });
};

const useInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: ['infinite-users'],
    initialPageParam: 1,
    queryFn: getUsers,
    getNextPageParam: (lastPage) => getNextPageParam(lastPage),
  });
};

export default useInfiniteUsers;
