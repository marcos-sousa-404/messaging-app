import getApi from '@/api/http/getApi.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { PaginatedData } from '@/types/PaginatedData.ts';
import type { InfiniteQueryFnParams } from '@/types/InfiniteQueryFnParams.ts';
import { getApiPaginationParams } from '@/helpers';
import getNextPageParam from '@/helpers/getNextPageParam.ts';
import type { UseChatMessagesParams } from '@/api/http/queries/useChatMessages.ts';
import type { ChatMessage } from '@/types/ChatMessage.ts';

const getChatMessages = async (queryFnParams: InfiniteQueryFnParams, chatId: string) => {
  const api = getApi();

  const paginationParams = getApiPaginationParams({ ...queryFnParams, limit: 20 });

  return api.get<PaginatedData<ChatMessage>>(`/messages/${chatId}`, { params: paginationParams });
};

const useInfiniteChatMessages = (params: UseChatMessagesParams) => {
  const { chatId } = params;

  return useInfiniteQuery({
    queryKey: ['infinite-chat-messages', chatId],
    enabled: !!chatId,
    initialPageParam: 1,
    queryFn: (params) => getChatMessages(params, chatId!),
    getNextPageParam: (lastPage) => getNextPageParam(lastPage),
  });
};

export default useInfiniteChatMessages;
