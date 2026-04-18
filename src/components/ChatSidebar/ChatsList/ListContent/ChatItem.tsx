import { memo } from 'react';
import type { User } from '@/types/User.ts';
import { Box } from '@chakra-ui/react';
import ChatCard from '@/components/ChatSidebar/ChatsList/ListContent/ChatCard.tsx';
import type { Chat } from '@/types/Chat.ts';

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

export default ChatItem;

interface ChatItemProps {
  item: Chat;
  userId?: string;
  handleSelect: (chat: Chat) => void;
  selectedChatId?: string;
  typingUserIds: string[];
}
