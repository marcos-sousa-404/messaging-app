import { useEffect, useRef } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { useAuthStore, useChatStore } from '@/store';
import ChatMessage from '../ChatMessage';
import NoMessages from '@/components/ChatView/NoMessages.tsx';
import Loading from '@/components/ChatView/Loading.tsx';
import DateMarker from '../DateMarker';
import shouldShowDateMarker from '@/components/ChatView/shouldShowDateMarker.ts';

const ActiveChat = () => {
  const { selectedChat, messages, messagesLoading } = useChatStore();
  const { user } = useAuthStore();

  const bottomRef = useRef<HTMLDivElement>(null);

  const reversedMessages = messages ? [...messages].reverse() : [];

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
    <Flex overflowY="auto" p={4} direction="column">
      <VStack spacing={0} align="stretch">
        {reversedMessages.map((msg, index) => {
          const isSameUserAbove =
            index > 0 && reversedMessages[index - 1].senderId?._id === msg.senderId?._id;

          const isSameUserBelow =
            index < reversedMessages.length - 1 &&
            reversedMessages[index + 1].senderId?._id === msg.senderId?._id;

          const showDateMarker = shouldShowDateMarker(msg, index, reversedMessages);

          return (
            <Box key={msg._id} w="100%">
              {showDateMarker && <DateMarker date={msg.createdAt} />}
              <ChatMessage
                text={msg.text}
                createdAt={msg.createdAt}
                origin={msg.senderId?._id === user?._id ? 'sent' : 'received'}
                hasMessagesBefore={isSameUserAbove}
                hasMessagesAfter={isSameUserBelow}
              />
            </Box>
          );
        })}
        <Box ref={bottomRef} h="1px" />
      </VStack>
    </Flex>
  );
};

export default ActiveChat;
