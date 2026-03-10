import {
  Card,
  CardBody,
  Text,
  Avatar,
  VStack,
  HStack,
  Badge,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';

export interface ChatCardProps {
  name: string;
  avatarUrl?: string;
  lastMessage: string;
  unreadCount?: number;
}

const ChatCard = ({
  name,
  avatarUrl,
  lastMessage,
  unreadCount = 0,
}: ChatCardProps) => {
  const bg = useColorModeValue('white', 'gray.800');
  const messageColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Card w="full" bg={bg} boxShadow="sm">
      <CardBody>
        <HStack spacing={4} align="center">
          <Avatar name={name} src={avatarUrl} />

          <VStack align="start" spacing={0} flex="1">
            <Text fontWeight="bold">{name}</Text>
            <Text fontSize="sm" color={messageColor} noOfLines={1}>
              {lastMessage}
            </Text>
          </VStack>

          <Spacer />

          {unreadCount > 0 && (
            <Badge colorScheme="green" borderRadius="full" px={2}>
              {unreadCount}
            </Badge>
          )}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ChatCard;