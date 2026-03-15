import { Button } from '@/components';
import type { User } from '@/types/User';
import { Box, Divider } from '@chakra-ui/react';
import type { Chat } from '@/types/Chat.ts';
import ListContent from '@/components/ChatsList/ListContent';
import { useAuthStore, useChatStore } from '@/store';
import { memo, useCallback } from 'react';

const ChatsList = memo(
  ({
    chatsLoading,
    usersLoading,
    isCreatingChat,
    startCreatingChat,
    stopCreatingChat,
    ...rest
  }: ChatsListProps) => {
    const loading = isCreatingChat ? usersLoading : chatsLoading;
    const { user } = useAuthStore();
    const { setSelectedChat } = useChatStore();
    const { setChatsListOpen, chatsListOpen } = useChatStore();

    const handleSelect = useCallback(
      (chat: Chat) => {
        setSelectedChat(chat);
        if (chatsListOpen) setChatsListOpen(false);
      },
      [chatsListOpen, setChatsListOpen, setSelectedChat],
    );

    return (
      <Box h="100%" w="100%" display="flex" flexDirection="column">
        <Box p={3}>
          <Button
            size="sm"
            width="full"
            onClick={isCreatingChat ? stopCreatingChat : startCreatingChat}
            colorScheme={isCreatingChat ? 'red' : 'brand'}
          >
            {isCreatingChat ? 'Cancelar' : 'Nova conversa'}
          </Button>
        </Box>

        <Divider />

        <Box p={3} py={2} flex={1} overflowY="auto">
          <ListContent
            loading={loading}
            isCreatingChat={isCreatingChat}
            userId={user?._id}
            handleSelect={handleSelect}
            {...rest}
          />
        </Box>
      </Box>
    );
  },
);

export default ChatsList;

export interface ChatsListProps {
  chats: Chat[];
  users: User[];
  chatsLoading: boolean;
  usersLoading: boolean;
  isCreatingChat: boolean;
  startCreatingChat: () => void;
  stopCreatingChat: () => void;
  createChat: (recipientId: string) => void;
  chatCreationInProgress: boolean;
}
