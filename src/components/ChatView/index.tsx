import NoChatSelected from './NoChatSelected.tsx';
import ActiveChat from './ActiveChat';
import { Stack, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import type { ChangeEventHandler } from 'react';
import { useChatStore } from '@/store';
import ChatInput from './ChatInput';

const ChatView = (props: ChatViewProps) => {
  const { onMessageInputTextChange, messageInputText, handleSendMessage, isSendingMessage } = props;
  const { selectedChat, chatsListOpen } = useChatStore();
  const backgroundColor = useColorModeValue('gray.100', 'gray.900');

  const isMobile = useBreakpointValue({ base: true, md: false });

  if (!selectedChat && (!chatsListOpen || !isMobile)) return <NoChatSelected />;

  return (
    <Stack height={'calc(100dvh - 4rem)'} overflow={'hidden'} flex={1} bg={backgroundColor}>
      <ActiveChat />
      <Stack
        direction={'row'}
        mb={'12px'}
        flex={1}
        height={'10%'}
        alignItems={'flex-end'}
        marginX={'auto'}
        width={'calc(100% - 24px)'}
      >
        <ChatInput
          messageInputText={messageInputText}
          onMessageInputTextChange={onMessageInputTextChange}
          handleSendMessage={handleSendMessage}
          isSendingMessage={isSendingMessage}
        />
      </Stack>
    </Stack>
  );
};

export default ChatView;

export interface ChatViewProps {
  onMessageInputTextChange: ChangeEventHandler<HTMLInputElement>;
  messageInputText: string;
  handleSendMessage: (file?: File) => Promise<void>;
  isSendingMessage?: boolean;
}
