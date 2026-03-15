import { ChatSidebar, ChatView, Header } from '@/components';
import { Box } from '@chakra-ui/react';
import useChat from './useChat.ts';

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
    onMessageInputTextChange,
    messageInputText,
    handleSendMessage,
    isSendingMessage,
  } = useChat();

  return (
    <Box>
      <Header />
      <Box as={'main'} height={'calc(100dvh - 4rem)'} display={'flex'}>
        <ChatSidebar
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
          onMessageInputTextChange={onMessageInputTextChange}
          messageInputText={messageInputText}
          handleSendMessage={handleSendMessage}
          isSendingMessage={isSendingMessage}
        />
      </Box>
    </Box>
  );
};

export default Chat;
