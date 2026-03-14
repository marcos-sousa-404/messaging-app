import getApi from '@/api/http/getApi.ts';
import type { Chat } from '@/types/Chat';
import { useQuery } from '@tanstack/react-query';
import type { PaginatedData } from '@/types/PaginatedData.ts';

const chats = async () => {
  const api = getApi();

  return api.get<PaginatedData<Chat>>('/conversations');
};

const useChats = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: chats,
  });
};

export default useChats;
