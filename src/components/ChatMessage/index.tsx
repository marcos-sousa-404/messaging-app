import { Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import computeBorderRadius from '@/components/ChatMessage/computeBorderRadius.ts';
import { memo } from 'react';

const ChatMessage = memo((props: ChatMessageProps) => {
  const { text, origin, createdAt, hasMessagesBefore, hasMessagesAfter } = props;
  const isSent = origin === 'sent';

  const computedBorderRadius = computeBorderRadius(hasMessagesBefore, isSent);

  const time = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(createdAt));

  const sentBackgroundColor = useColorModeValue('brand.500', 'brand.400');
  const receivedBackgroundColor = useColorModeValue('white', 'gray.700');
  const sentColor = useColorModeValue('white', 'white');
  const receivedColor = useColorModeValue('black', 'white');

  return (
    <Flex w="100%" justify={isSent ? 'flex-end' : 'flex-start'} mb={hasMessagesAfter ? 0.5 : 2}>
      <Stack
        direction={'row'}
        alignItems={'flex-end'}
        maxW="75%"
        bg={isSent ? sentBackgroundColor : receivedBackgroundColor}
        color={isSent ? sentColor : receivedColor}
        px={4}
        pt={2}
        pb={1}
        {...computedBorderRadius}
        boxShadow="sm"
        position="relative"
      >
        <Text fontSize="md" wordBreak="break-word" mb={1}>
          {text}
        </Text>

        <Text fontSize="xs" textAlign="right" opacity={0.8}>
          {time}
        </Text>
      </Stack>
    </Flex>
  );
});

export default ChatMessage;

export interface ChatMessageProps {
  text: string;
  origin: 'sent' | 'received';
  createdAt: string;
  hasMessagesBefore: boolean;
  hasMessagesAfter: boolean;
}
