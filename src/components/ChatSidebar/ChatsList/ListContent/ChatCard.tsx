import type { ReactNode } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Circle,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

const ChatCard = (props: ChatCardProps) => {
  const { name, avatarUrl, lastMessage, hasUnreadMessages, isSelected, onClick } = props;

  const bg = useColorModeValue('white', 'gray.800');
  const hoverColor = useColorModeValue('gray.100', 'gray.700');
  const messageColor = useColorModeValue('gray.500', 'gray.400');
  const dotColor = useColorModeValue('green.500', 'green.300');

  return (
    <Card
      onClick={onClick}
      cursor={'pointer'}
      _hover={{ backgroundColor: hoverColor }}
      w="full"
      bg={isSelected ? hoverColor : bg}
      boxShadow="sm"
      size={'sm'}
    >
      <CardBody>
        <HStack spacing={4} align="center">
          <Avatar name={name} src={avatarUrl ?? ''} />

          <VStack align="start" spacing={0} flex="1" overflow="hidden">
            <Text fontWeight="bold" noOfLines={1} w="full">
              {name}
            </Text>
            <Box
              fontSize="sm"
              color={messageColor}
              w="full"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {lastMessage}
            </Box>
          </VStack>

          {hasUnreadMessages && (
            <Box pr={1}>
              <Circle size="10px" bg={dotColor} />
            </Box>
          )}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ChatCard;

export interface ChatCardProps {
  name: string;
  avatarUrl?: string | null;
  lastMessage: ReactNode;
  hasUnreadMessages?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}
