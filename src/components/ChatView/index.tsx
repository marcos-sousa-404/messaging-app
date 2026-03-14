import type { Chat } from '@/types/Chat.ts';
import NoChatSelected from '@/components/ChatView/NoChatSelected.tsx';
import ActiveChat from '@/components/ChatView/ActiveChat.tsx';
import { Icon, Input, Stack, useColorModeValue } from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';
import type { ChangeEventHandler } from 'react';
import Button from '@/components/Button';

const ChatView = (props: ChatViewProps) => {
  const { selectedChat, onMessageInputTextChange, messageInputText } = props;
  const backgroundColor = useColorModeValue('gray.100', 'gray.900');
  const inputBackgroundColor = useColorModeValue('white', 'gray.800');

  if (!selectedChat) return <NoChatSelected />;

  return (
    <Stack flex={1} bg={backgroundColor}>
      <ActiveChat />
      <Stack direction={'row'} mb={'12px'} marginX={'auto'} width={'calc(100% - 24px)'}>
        <Input
          bg={inputBackgroundColor}
          placeholder={'Digite uma mensagem'}
          alignSelf={'flex-end'}
          value={messageInputText}
          onChange={onMessageInputTextChange}
        />
        <Button colorScheme={'brand'}>
          <Icon as={FaPaperPlane} />
        </Button>
      </Stack>
    </Stack>
  );
};

export default ChatView;

export interface ChatViewProps {
  selectedChat: Chat | null;
  onMessageInputTextChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  messageInputText: string;
}
