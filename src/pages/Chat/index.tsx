// pages/Chat/index.tsx
import { Header } from '@/components';
import ChatsList from '@/components/ChatsList';
import { Box } from '@chakra-ui/react';
import useChat from './useChat';

const Chat = () => {
  const {
    users = [],
    usersLoading,
    startCreatingChat,
    stopCreatingChat,
    isCreatingChat,
    chats,
    chatsLoading,
    createChat,
    chatCreationInProgress
  } = useChat();

  return (
    <Box>
      <Header />
      <Box as={'main'} height={'calc(100vh - 4rem)'} display={'flex'}>
        <ChatsList
        createChat={createChat}
          stopCreatingChat={stopCreatingChat}
          chats={chats}
          chatCreationInProgress={chatCreationInProgress}
          users={users}
          chatsLoading={chatsLoading}
          usersLoading={usersLoading}
          isCreatingChat={isCreatingChat}
          startCreatingChat={startCreatingChat}
        />
      </Box>
    </Box>
  );
};

export default Chat;