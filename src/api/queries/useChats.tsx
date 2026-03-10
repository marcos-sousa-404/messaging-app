import getApi from '@/api/getApi.ts';
import type { Chat } from '@/types/Chat';
import { useQuery } from '@tanstack/react-query';

const chats = async () => {
  const api = getApi();

  return api.get<ChatsData>('/conversations');
}

const useChats = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: chats,
  });
}

export default useChats;

export type ChatsData = Chat[]