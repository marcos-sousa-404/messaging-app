import { Card, CardBody, Text, Avatar, VStack, useColorModeValue, HStack } from '@chakra-ui/react';

export interface UserCardProps {
  name: string;
  email: string;
}

const UserCard = ({ name, email }: UserCardProps) => {
  const bg = useColorModeValue('white', 'gray.800');
  const emailColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Card maxW="sm" w="full" bg={bg} boxShadow="sm">
      <CardBody>
        <HStack spacing={4} align="center">
          <Avatar name={name} />
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
