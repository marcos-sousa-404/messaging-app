import { ChatCard } from '@/components';
import { Box, VStack } from '@chakra-ui/react';
import type { User } from '@/types/User.ts';
import type { Chat } from '@/types/Chat.ts';
import getUserProfilePictureUrl from '@/api/getUserProfilePictureUrl.ts';
import useChatStore from '@/store/useChatStore.ts';

const ChatsView = ({ chats, userId }: ChatsViewProps) => {
  const { selectedChat, setSelectedChat } = useChatStore();

  return (
    <VStack spacing={2} align="stretch">
      {chats.map((chat) => {
        const otherUser = chat.participants.find((participant: User) => participant._id !== userId);
        if (!otherUser) return null;
        const avatarUrl = otherUser.image ? getUserProfilePictureUrl(otherUser.image) : null;

        return (
          <Box key={chat._id}>
            <ChatCard
              name={otherUser.name}
              lastMessage={''}
              avatarUrl={avatarUrl}
              unreadCount={0}
              isSelected={selectedChat?._id === chat._id}
              onClick={() => setSelectedChat(chat)}
            />
          </Box>
        );
      })}
    </VStack>
  );
};

export default ChatsView;

interface ChatsViewProps {
  chats: Chat[];
  userId?: string;
}
