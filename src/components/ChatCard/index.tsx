import {
  Avatar,
  Badge,
  Card,
  CardBody,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

const ChatCard = (props: ChatCardProps) => {
  const { name, avatarUrl, lastMessage, unreadCount = 0, isSelected, onClick } = props;

  const bg = useColorModeValue('white', 'gray.800');
  const hoverColor = useColorModeValue('gray.100', 'gray.700');
  const messageColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Card
      onClick={onClick}
      cursor={'pointer'}
      _hover={{ backgroundColor: hoverColor }}
      w="full"
      bg={isSelected ? hoverColor : bg}
      boxShadow="sm"
    >
      <CardBody>
        <HStack spacing={4} align="center">
          <Avatar name={name} src={avatarUrl ?? ''} />

          <VStack align="start" spacing={0} flex="1">
            <Text fontWeight="bold">{name}</Text>
            <Text fontSize="sm" color={messageColor} noOfLines={1}>
              {lastMessage}
            </Text>
          </VStack>

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

export interface ChatCardProps {
  name: string;
  avatarUrl?: string | null;
  lastMessage: string;
  unreadCount?: number;
  isSelected?: boolean;
  onClick?: () => void;
}
