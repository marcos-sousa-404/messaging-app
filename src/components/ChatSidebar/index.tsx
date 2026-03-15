import { Box, Show, useColorModeValue } from '@chakra-ui/react';
import ChatsList, { type ChatsListProps } from '../ChatsList';
import { useChatStore } from '@/store';
import { memo } from 'react';

const ChatSidebar = memo((props: ChatsListProps) => {
  const { chatsListOpen } = useChatStore();
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <Show breakpoint="(min-width: 768px)">
        <Box
          w="350px"
          borderRight="1px solid"
          borderColor={borderColor}
          boxShadow="4px 0px 8px rgba(0, 0, 0, 0.05)"
        >
          <ChatsList {...props} />
        </Box>
      </Show>

      {chatsListOpen && (
        <Show breakpoint="(max-width: 767px)">
          <ChatsList {...props} />
        </Show>
      )}
    </>
  );
});

export default ChatSidebar;
