import { Box, Text, Avatar, VStack } from '@chakra-ui/react';

export interface UserCardProps {
  name: string;
  email: string;
}

const UserCard = ({ name, email }: UserCardProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={4}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      maxW="sm"
      w="full"
    >
      <Avatar name={name} />

      <VStack align="start" spacing={0}>
        <Text fontWeight="bold">{name}</Text>
        <Text fontSize="sm" color="gray.500">
          {email}
        </Text>
      </VStack>
    </Box>
  );
};

export default UserCard;