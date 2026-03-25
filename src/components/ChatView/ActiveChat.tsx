import { memo, useEffect, useLayoutEffect, useRef } from 'react';
import { Box, Flex, Spinner, VStack } from '@chakra-ui/react';
import { useAuthStore, useChatStore } from '@/store';
import ChatMessage from '../ChatMessage';
import NoMessages from '@/components/ChatView/NoMessages.tsx';
import Loading from '@/components/ChatView/Loading.tsx';
import DateMarker from '../DateMarker';
import shouldShowDateMarker from '@/components/ChatView/shouldShowDateMarker.ts';
import { TypingIndicator } from '@/components';
import { useOnScrollEnd } from '@/hooks';

const ActiveChat = memo(() => {
  const {
    selectedChat,
    messages,
    messagesLoading,
    typingUserIds,
    otherUser,
    fetchNextMessagesPage,
    hasNextMessagesPage,
    isFetchingNextMessagesPage,
  } = useChatStore();
  const { user } = useAuthStore();

  const otherUserIsTyping = otherUser && typingUserIds.includes(otherUser?._id);

  const { scrollRef } = useOnScrollEnd({
    direction: 'up',
    onScrollEnd: fetchNextMessagesPage,
    disable: !hasNextMessagesPage || isFetchingNextMessagesPage,
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  const reversedMessages = messages ? [...messages].reverse() : [];
  const newestMessageId = messages?.[0]?._id;
  const oldestMessageId = reversedMessages[0]?._id;

  const previousScrollHeight = useRef(0);
  const previousOldestMessageId = useRef(oldestMessageId);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView();
  };

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    if (
      oldestMessageId &&
      previousOldestMessageId.current &&
      previousOldestMessageId.current !== oldestMessageId
    ) {
      const heightDifference = container.scrollHeight - previousScrollHeight.current;
      container.scrollTop += heightDifference;
    }

    previousScrollHeight.current = container.scrollHeight;
    previousOldestMessageId.current = oldestMessageId;
  }, [reversedMessages.length, oldestMessageId, scrollRef]);

  useEffect(() => {
    if (newestMessageId) {
      scrollToBottom();
    }
  }, [newestMessageId, selectedChat?._id]);

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
    <Flex
      ref={scrollRef}
      as={'div'}
      overflowY="auto"
      flex="1 1 auto"
      minH={0}
      p={4}
      direction="column"
    >
      <VStack spacing={0} align="stretch">
        {hasNextMessagesPage && (
          <Box mx={'auto'} py={2} height={'60px'}>
            {isFetchingNextMessagesPage && <Spinner size={'md'} color={'brand.500'} />}
          </Box>
        )}
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
