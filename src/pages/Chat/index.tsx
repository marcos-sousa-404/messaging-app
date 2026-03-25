import { ChatSidebar, ChatView, Header } from '@/components';
import { Box } from '@chakra-ui/react';
import useChat from './useChat.ts';

const Chat = () => {
  const {
    startCreatingChat,
    stopCreatingChat,
    isCreatingChat,
    createChat,
    chatCreationInProgress,
    onMessageInputTextChange,
    messageInputText,
    handleSendMessage,
    isSendingMessage,
    chatsQuery,
    usersQuery,
  } = useChat();

  return (
    <Box>
      <Header />
      <Box as={'main'} height={'calc(100dvh - 4rem)'} display={'flex'}>
        <ChatSidebar
          createChat={createChat}
          stopCreatingChat={stopCreatingChat}
          chatCreationInProgress={chatCreationInProgress}
          isCreatingChat={isCreatingChat}
          startCreatingChat={startCreatingChat}
          chatsQuery={chatsQuery}
          usersQuery={usersQuery}
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
