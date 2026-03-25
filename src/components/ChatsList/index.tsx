import { Button } from '@/components';
import { Box, Divider } from '@chakra-ui/react';
import type { Chat } from '@/types/Chat.ts';
import ListContent from '@/components/ChatsList/ListContent';
import { useAuthStore, useChatStore } from '@/store';
import { memo, useCallback } from 'react';
import { type UseChatOutput } from '@/pages/Chat/useChat.ts';

const ChatsList = memo(
  ({
    isCreatingChat,
    startCreatingChat,
    stopCreatingChat,
    chatsQuery,
    usersQuery,
    ...rest
  }: ChatsListProps) => {
    const loading = isCreatingChat ? usersQuery.isLoading : chatsQuery.isLoading;
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
            chatsQuery={chatsQuery}
            usersQuery={usersQuery}
            {...rest}
          />
        </Box>
      </Box>
    );
  },
);

export default ChatsList;

export interface ChatsListProps {
  chatsQuery: UseChatOutput['chatsQuery'];
  usersQuery: UseChatOutput['usersQuery'];
  isCreatingChat: boolean;
  startCreatingChat: () => void;
  stopCreatingChat: () => void;
  createChat: (recipientId: string) => void;
  chatCreationInProgress: boolean;
}
