import getApi from '@/api/http/getApi.ts';
import { useQuery } from '@tanstack/react-query';
import type { PaginatedData } from '@/types/PaginatedData.ts';
import type { ChatMessage } from '@/types/ChatMessage.ts';

const getChatMessages = async (chatId: string) => {
  const api = getApi();

  return api.get<PaginatedData<ChatMessage>>(`/messages/${chatId}`, { params: { limit: 40 } });
};

const useChatMessages = (params: ChatMessagesParams) => {
  const { chatId } = params;

  return useQuery({
    queryKey: ['chat-messages', chatId],
    queryFn: () => getChatMessages(chatId!),
    enabled: !!chatId,
  });
};

export default useChatMessages;

export type ChatMessagesParams = {
  chatId?: string;
};
