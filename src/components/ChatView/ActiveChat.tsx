import { Flex, Spinner, VStack } from '@chakra-ui/react';
import { useAuthStore, useChatStore } from '@/store';
import ChatMessage from '../ChatMessage';
import NoMessages from '@/components/ChatView/NoMessages.tsx';

const ActiveChat = () => {
  const { selectedChat, messages, messagesLoading } = useChatStore();
  const { user } = useAuthStore();

  if (!selectedChat) return null;

  if (!messagesLoading && (!messages || messages.length === 0)) {
    return <NoMessages />;
  }

  return (
    <Flex overflowY="scroll" p={4} direction="column">
      {messagesLoading ? (
        <Flex justify="center" align="center" h="100%">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <VStack spacing={0} align="stretch">
          {messages.map((msg) => (
            <ChatMessage
              key={msg._id}
              text={msg.text}
              origin={msg.senderId?._id === user?._id ? 'sent' : 'received'}
            />
          ))}
        </VStack>
      )}
    </Flex>
  );
};

export default ActiveChat;
