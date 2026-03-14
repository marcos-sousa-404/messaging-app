import { Flex, VStack } from '@chakra-ui/react';
import { useAuthStore, useChatStore } from '@/store';
import ChatMessage from '../ChatMessage';
import NoMessages from '@/components/ChatView/NoMessages.tsx';
import Loading from '@/components/ChatView/Loading.tsx';

const ActiveChat = () => {
  const { selectedChat, messages, messagesLoading } = useChatStore();
  const { user } = useAuthStore();

  if (!selectedChat) return null;

  if (!messagesLoading && (!messages || messages.length === 0)) {
    return <NoMessages />;
  }

  if (messagesLoading) {
    return <Loading />;
  }

  return (
    <Flex overflowY="scroll" p={4} direction="column">
      <VStack spacing={0} align="stretch">
        {messages.map((msg) => (
          <ChatMessage
            key={msg._id}
            text={msg.text}
            origin={msg.senderId?._id === user?._id ? 'sent' : 'received'}
          />
        ))}
      </VStack>
    </Flex>
  );
};

export default ActiveChat;
