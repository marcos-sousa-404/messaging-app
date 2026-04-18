import { Avatar, Card, CardBody, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';

const UserCard = (props: UserCardProps) => {
  const { name, email, disabled, avatarUrl } = props;

  const bg = useColorModeValue('white', 'gray.800');
  const emailColor = useColorModeValue('gray.500', 'gray.400');
  const hoverColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Card
      maxW="sm"
      w="full"
      bg={bg}
      boxShadow="sm"
      opacity={disabled ? 0.6 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
      transition="0.2s"
      _hover={!disabled ? { bg: hoverColor } : undefined}
      size={'sm'}
    >
      <CardBody>
        <HStack spacing={4} align="center">
          <Avatar name={name} src={avatarUrl ?? ''} />
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{name}</Text>
            <Text fontSize="sm" color={emailColor}>
              {email}
            </Text>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default UserCard;

export interface UserCardProps {
  name: string;
  email: string;
  disabled: boolean;
  avatarUrl: string | null;
}
