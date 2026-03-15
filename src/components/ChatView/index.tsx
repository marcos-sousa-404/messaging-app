import NoChatSelected from '@/components/ChatView/NoChatSelected.tsx';
import ActiveChat from '@/components/ChatView/ActiveChat.tsx';
import { Icon, Input, Stack, useColorModeValue } from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';
import type { ChangeEventHandler } from 'react';
import Button from '@/components/Button';
import { useChatStore } from '@/store';

const ChatView = (props: ChatViewProps) => {
  const { onMessageInputTextChange, messageInputText, handleSendMessage } = props;
  const { selectedChat, chatsListOpen } = useChatStore();
  const backgroundColor = useColorModeValue('gray.100', 'gray.900');
  const inputBackgroundColor = useColorModeValue('white', 'gray.800');

  if (!selectedChat && !chatsListOpen) return <NoChatSelected />;

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
        <Input
          bg={inputBackgroundColor}
          placeholder={'Digite uma mensagem'}
          alignSelf={'flex-end'}
          value={messageInputText}
          onChange={onMessageInputTextChange}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              void handleSendMessage();
            }
          }}
        />
        <Button onClick={handleSendMessage} colorScheme={'brand'}>
          <Icon as={FaPaperPlane} />
        </Button>
      </Stack>
    </Stack>
  );
};

export default ChatView;

export interface ChatViewProps {
  onMessageInputTextChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  messageInputText: string;
  handleSendMessage: () => Promise<void>;
  isSendingMessage?: boolean;
}
