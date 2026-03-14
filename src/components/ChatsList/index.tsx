import { Button } from '@/components';
import type { User } from '@/types/User';
import { Box, Divider } from '@chakra-ui/react';
import type { Chat } from '@/types/Chat.ts';
import ListContent from '@/components/ChatsList/ListContent';

const ChatsList = ({
  chatsLoading,
  usersLoading,
  isCreatingChat,
  startCreatingChat,
  stopCreatingChat,
  ...rest
}: ChatsListProps) => {
  const loading = isCreatingChat ? usersLoading : chatsLoading;

  return (
    <Box sx={{ width: '350px', height: '100%', boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.1)' }}>
      <Box p={3}>
        <Button
          size="sm"
          width="full"
          onClick={isCreatingChat ? stopCreatingChat : startCreatingChat}
          colorScheme={isCreatingChat ? 'red' : 'brand'}
        >
          {isCreatingChat ? 'Cancelar' : 'Novo chat'}
        </Button>
      </Box>

      <Divider />

      <Box p={3} py={2}>
        <ListContent loading={loading} isCreatingChat={isCreatingChat} {...rest} />
      </Box>
    </Box>
  );
};

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
