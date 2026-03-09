import useLogout from '@/hooks/useLogout.ts';
import { Button, UserCard } from '@/components';
import useUsers from '@/api/queries/useUsers';

import {
  Box,
  Text,
  VStack,
  Spinner,
  Heading,
  Divider,
  HStack
} from '@chakra-ui/react';
import type { User } from '@/types/User';

const Chat = () => {
  const { logout } = useLogout();
  const { data: usersData, isLoading: usersLoading } = useUsers();
  const users = usersData?.data?.users ?? [];

  return (
    <Box
      w="100%"
      h="100vh"
      bg="gray.50"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={6}
    >
      <Box
        w="full"
        maxW="500px"
        bg="white"
        borderRadius="xl"
        boxShadow="lg"
        p={6}
      >
        <HStack justify="space-between" mb={4}>
          <Heading size="md">Usuários</Heading>

          <Button onClick={logout} colorScheme="brand" size="sm">
            Sair
          </Button>
        </HStack>

        <Divider mb={4} />

        {usersLoading ? (
          <VStack py={10}>
            <Spinner size="lg" />
            <Text color="gray.500">Usuários estão carregando...</Text>
          </VStack>
        ) : (
          <VStack spacing={3} align="stretch" maxH="400px" overflowY="auto">
            {users.map((user: User) => (
              <UserCard
                key={user._id}
                name={user.name}
                email={user.email}
              />
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default Chat;