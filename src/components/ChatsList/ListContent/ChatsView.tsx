import { ChatCard } from '@/components';
import { Box } from '@chakra-ui/react';
import type { User } from '@/types/User.ts';
import type { Chat } from '@/types/Chat.ts';
import useChatStore from '@/store/useChatStore.ts';
import GenericList from '@/components/GenericList';
import { memo, useMemo } from 'react';
import type { UseChatOutput } from '@/pages/Chat/useChat.ts';

const ChatItem = memo(
  ({ item, userId, handleSelect, selectedChatId, typingUserIds }: ChatItemProps) => {
    const otherUser = item.participants.find((participant: User) => participant._id !== userId);

    if (!otherUser) return null;

    const avatarUrl = otherUser.image ? otherUser.image : null;
    const isTyping = typingUserIds.includes(otherUser._id);
    const lastMessage = isTyping
      ? 'Digitando...'
      : typeof item.lastMessage === 'string'
        ? item.lastMessage
        : item.lastMessage?.text || '';

    return (
      <Box>
        <ChatCard
          name={otherUser.name}
          lastMessage={lastMessage}
          avatarUrl={avatarUrl}
          isSelected={selectedChatId === item._id}
          onClick={() => handleSelect(item)}
        />
      </Box>
    );
  },
);

interface ChatItemProps {
  item: Chat;
  userId?: string;
  handleSelect: (chat: Chat) => void;
  selectedChatId?: string;
  typingUserIds: string[];
}

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
