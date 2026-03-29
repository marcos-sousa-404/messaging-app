import getApi from '@/api/http/getApi.ts';
import type { Chat } from '@/types/Chat';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { PaginatedData } from '@/types/PaginatedData.ts';
import type { InfiniteQueryFnParams } from '@/types/InfiniteQueryFnParams.ts';
import { getApiPaginationParams } from '@/helpers';
import getNextPageParam from '@/helpers/getNextPageParam.ts';

const getChats = async (queryFnParams: UseInfiniteChatsParams & InfiniteQueryFnParams) => {
  const api = getApi();

  const paginationParams = getApiPaginationParams(queryFnParams);

  return api.get<PaginatedData<Chat>>('/conversations', {
    params: {
      ...paginationParams,
      search: queryFnParams.search,
    },
  });
};

const useInfiniteChats = (params: UseInfiniteChatsParams) => {
  return useInfiniteQuery({
    queryKey: ['infinite-chats', params.search],
    initialPageParam: 1,
    queryFn: (baseParams) => getChats({ ...baseParams, ...params }),
    getNextPageParam: (lastPage) => getNextPageParam(lastPage),
  });
};

export default useInfiniteChats;

export interface UseInfiniteChatsParams {
  search?: string;
}
