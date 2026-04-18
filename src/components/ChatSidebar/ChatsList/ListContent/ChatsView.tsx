import type { Chat } from '@/types/Chat.ts';
import useChatStore from '@/store/useChatStore.ts';
import GenericList from '@/components/GenericList';
import { memo, useMemo } from 'react';
import type { UseChatOutput } from '@/pages/Chat/useChat.ts';
import ChatItem from '@/components/ChatSidebar/ChatsList/ListContent/ChatItem.tsx';

const ChatsView = memo((props: ChatsViewProps) => {
  const { chatsQuery, userId, handleSelect } = props;
  const { data: chats, hasNextPage, fetchNextPage, isFetchingNextPage } = chatsQuery;
  const { selectedChat, typingUserIds } = useChatStore();

  const itemProps = useMemo(
    () => ({
      userId,
      handleSelect,
      selectedChatId: selectedChat?._id,
      typingUserIds,
    }),
    [userId, handleSelect, selectedChat?._id, typingUserIds],
  );

  return (
    <GenericList
      items={chats}
      keyExtractor={(chat) => chat._id}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      ItemComponent={ChatItem}
      itemProps={itemProps}
    />
  );
});

export default ChatsView;

export interface ChatsViewProps {
  chatsQuery: UseChatOutput['chatsQuery'];
  userId?: string;
  handleSelect: (chat: Chat) => void;
}
