import { useEffect, useRef } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { useAuthStore, useChatStore } from '@/store';
import ChatMessage from '../ChatMessage';
import NoMessages from '@/components/ChatView/NoMessages.tsx';
import Loading from '@/components/ChatView/Loading.tsx';

const ActiveChat = () => {
  const { selectedChat, messages, messagesLoading } = useChatStore();
  const { user } = useAuthStore();

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  if (!selectedChat) return null;

  if (messagesLoading) {
    return <Loading />;
  }

  if (!messages || messages.length === 0) {
    return <NoMessages />;
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
        <Box ref={bottomRef} h="1px" />
      </VStack>
    </Flex>
  );
};

export default ActiveChat;
