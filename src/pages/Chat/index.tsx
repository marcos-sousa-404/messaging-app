import { ChatsList, ChatView, Header } from '@/components';
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
    chatCreationInProgress,
    selectedChat,
    onMessageInputTextChange,
    messageInputText,
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
        <ChatView
          selectedChat={selectedChat}
          onMessageInputTextChange={onMessageInputTextChange}
          messageInputText={messageInputText}
        />
      </Box>
    </Box>
  );
};

export default Chat;
