import { ChatCard, UserCard, Button } from '@/components';
import { useAuthStore } from '@/store/useAuthStore';
import type { User } from '@/types/User';
import { Box, Divider, VStack, Spinner, Center, Text } from '@chakra-ui/react';

interface ChatsListProps {
  chats: any[];
  users: any[];
  chatsLoading: boolean;
  usersLoading: boolean;
  isCreatingChat: boolean;
  startCreatingChat: () => void;
  stopCreatingChat: () => void;
  createChat: (recipientId: string) => void;
  chatCreationInProgress: boolean;
}

const ChatsList = ({
  chats,
  users,
  chatsLoading,
  usersLoading,
  isCreatingChat,
  startCreatingChat,
  stopCreatingChat,
  createChat,
  chatCreationInProgress
}: ChatsListProps) => {
  const { user } = useAuthStore();
  const userId = user?._id;
  const loading = isCreatingChat ? usersLoading : chatsLoading;

  return (
    <Box sx={{ width: '270px', height: '100%', boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.1)' }}>
      <Box p={3}>
        <Button
          size="sm"
          width="full"
          onClick={isCreatingChat ? stopCreatingChat : startCreatingChat}
          colorScheme={isCreatingChat ? 'red' : 'brand'}
          variant={isCreatingChat ? 'outline' : 'solid'}
        >
          {isCreatingChat ? 'Cancelar' : 'Novo chat'}
        </Button>
      </Box>

      <Divider />

      {loading ? (
        <Center py={6}>
          <Spinner />
        </Center>
      ) : (
        <>
          {isCreatingChat && users.length === 0 && (
            <Center py={6} px={4}>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Nenhum usuário disponível para iniciar uma conversa.
              </Text>
            </Center>
          )}

          {!isCreatingChat && chats.length === 0 && (
            <Center py={6} px={4}>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Você ainda não possui conversas. Clique em "Novo chat" para começar.
              </Text>
            </Center>
          )}

          <VStack spacing={0} align="stretch">
            {isCreatingChat
              ? users.map((user) => (
                <Box
                  key={user._id}
                  cursor={chatCreationInProgress ? 'auto' : 'pointer'}
                  onClick={() => createChat(user._id)}
                >
                  <UserCard disabled={chatCreationInProgress} name={user.name} email={user.email} />
                  <Divider />
                </Box>
              ))
              : chats.map((chat) => (
                <Box key={chat.id}>
                  <ChatCard
                    name={chat.participants.find((participant: User) => participant._id !== userId).name}
                    lastMessage={chat.lastMessage ?? ''}
                    avatarUrl={chat.avatarUrl ?? ''}
                    unreadCount={chat.unreadCount ?? 0}
                  />
                  <Divider />
                </Box>
              ))}
          </VStack>
        </>
      )}
    </Box>
  );
};

export default ChatsList;