import { Flex, Box, Text } from '@chakra-ui/react';

const ChatMessage = ({ text, origin }: ChatMessageProps) => {
  const isSent = origin === 'sent';

  return (
    <Flex w="100%" justify={isSent ? 'flex-end' : 'flex-start'} mb={2}>
      <Box
        maxW="75%"
        bg={isSent ? 'blue.500' : 'gray.200'}
        color={isSent ? 'white' : 'black'}
        px={4}
        py={2}
        borderRadius="xl"
        borderBottomRightRadius={isSent ? 'sm' : 'xl'}
        borderBottomLeftRadius={!isSent ? 'sm' : 'xl'}
        boxShadow="sm"
      >
        <Text fontSize="md" wordBreak="break-word">
          {text}
        </Text>
      </Box>
    </Flex>
  );
};

export default ChatMessage;

export interface ChatMessageProps {
  text: string;
  origin: 'sent' | 'received';
}
