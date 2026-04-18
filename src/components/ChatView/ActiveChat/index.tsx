import { memo } from 'react';
import { Box, Flex, Spinner, VStack } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';
import NoMessages from '@/components/ChatView/NoMessages.tsx';
import Loading from '@/components/ChatView/Loading.tsx';
import DateMarker from './DateMarker';
import TypingIndicator from './TypingIndicator';
import useActiveChat from '@/components/ChatView/ActiveChat/useActiveChat.ts';
import getChatMessageProps from '@/components/ChatView/ActiveChat/getChatMessageProps.ts';
import ImageViewer from '@/components/ImageViewer';

const ActiveChat = memo(() => {
  const {
    selectedChat,
    messagesLoading,
    reversedMessages,
    otherUserIsTyping,
    hasNextMessagesPage,
    isFetchingNextMessagesPage,
    scrollRef,
    bottomRef,
    user,
    previewImage,
    setPreviewImage,
  } = useActiveChat();

  if (!selectedChat) return null;

  if (messagesLoading) {
    return <Loading />;
  }

  if (reversedMessages.length === 0) {
    return <NoMessages />;
  }

  return (
    <>
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
            const { showDateMarker, ...chatMessageProps } = getChatMessageProps({
              index,
              msg,
              reversedMessages,
              userId: user?._id,
              otherUserIsTyping,
            });

            return (
              <Box key={msg._id} w="100%">
                {showDateMarker && <DateMarker date={msg.createdAt} />}
                <ChatMessage
                  {...chatMessageProps}
                  onImageClick={() => {
                    if (msg.fileUrl) {
                      setPreviewImage({ src: msg.fileUrl, alt: msg.fileName });
                    }
                  }}
                />
              </Box>
            );
          })}
          {otherUserIsTyping && <TypingIndicator />}
          <Box ref={bottomRef} h="1px" />
        </VStack>
      </Flex>

      <ImageViewer image={previewImage} onClose={() => setPreviewImage(null)} />
    </>
  );
});

export default ActiveChat;
