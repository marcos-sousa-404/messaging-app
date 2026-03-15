import { memo, useEffect, useRef } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { useAuthStore, useChatStore } from '@/store';
import ChatMessage from '../ChatMessage';
import NoMessages from '@/components/ChatView/NoMessages.tsx';
import Loading from '@/components/ChatView/Loading.tsx';
import DateMarker from '../DateMarker';
import shouldShowDateMarker from '@/components/ChatView/shouldShowDateMarker.ts';
import { TypingIndicator } from '@/components';

const ActiveChat = memo(() => {
  const { selectedChat, messages, messagesLoading, typingUserIds, otherUser } = useChatStore();
  const { user } = useAuthStore();

  const otherUserIsTyping = otherUser && typingUserIds.includes(otherUser?._id);

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

  useEffect(() => {
    if (otherUserIsTyping) {
      scrollToBottom();
    }
  }, [otherUserIsTyping]);

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
          const origin = msg.senderId?._id === user?._id ? 'sent' : 'received';

          return (
            <Box key={msg._id} w="100%">
              {showDateMarker && <DateMarker date={msg.createdAt} />}
              <ChatMessage
                text={msg.text}
                createdAt={msg.createdAt}
                origin={origin}
                hasMessagesBefore={isSameUserAbove}
                hasMessagesAfter={
                  origin === 'received' && otherUserIsTyping ? true : isSameUserBelow
                }
              />
            </Box>
          );
        })}
        {otherUserIsTyping && <TypingIndicator />}
        <Box ref={bottomRef} h="1px" />
      </VStack>
    </Flex>
  );
});

export default ActiveChat;
