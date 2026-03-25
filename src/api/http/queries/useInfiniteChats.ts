import getApi from '@/api/http/getApi.ts';
import type { Chat } from '@/types/Chat';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { PaginatedData } from '@/types/PaginatedData.ts';
import type { InfiniteQueryFnParams } from '@/types/InfiniteQueryFnParams.ts';
import { getApiPaginationParams } from '@/helpers';
import getNextPageParam from '@/helpers/getNextPageParam.ts';

const getChats = async (queryFnParams: InfiniteQueryFnParams) => {
  const api = getApi();

  const paginationParams = getApiPaginationParams(queryFnParams);

  return api.get<PaginatedData<Chat>>('/conversations', {
    params: paginationParams,
  });
};

const useInfiniteChats = () => {
  return useInfiniteQuery({
    queryKey: ['infinite-chats'],
    initialPageParam: 1,
    queryFn: getChats,
    getNextPageParam: (lastPage) => getNextPageParam(lastPage),
  });
};

export default useInfiniteChats;
