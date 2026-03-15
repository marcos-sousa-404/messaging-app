import { ChatCard } from '@/components';
import { Box } from '@chakra-ui/react';
import type { User } from '@/types/User.ts';
import type { Chat } from '@/types/Chat.ts';
import { getUserProfilePictureUrl } from '@/helpers';
import useChatStore from '@/store/useChatStore.ts';
import GenericList from '@/components/GenericList';
import { memo } from 'react';

const ChatsView = memo((props: ChatsViewProps) => {
  const { chats, userId, handleSelect } = props;
  const { selectedChat, typingUserIds } = useChatStore();

  return (
    <GenericList
      items={chats}
      keyExtractor={(chat) => chat._id}
      renderItem={(chat) => {
        const otherUser = chat.participants.find((participant: User) => participant._id !== userId);

        if (!otherUser) return null;

        const avatarUrl = otherUser.image ? getUserProfilePictureUrl(otherUser.image) : null;
        const isTyping = typingUserIds.includes(otherUser._id);
        const lastMessage = isTyping ? 'Digitando...' : '';

        return (
          <Box>
            <ChatCard
              name={otherUser.name}
              lastMessage={lastMessage}
              avatarUrl={avatarUrl}
              unreadCount={0}
              isSelected={selectedChat?._id === chat._id}
              onClick={() => handleSelect(chat)}
            />
          </Box>
        );
      }}
    />
  );
});

export default ChatsView;

export interface ChatsViewProps {
  chats: Chat[];
  userId?: string;
  handleSelect: (chat: Chat) => void;
}
