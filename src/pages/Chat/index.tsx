import useLogout from '@/hooks/useLogout.ts';
import { Button, ThemeSwitcher, UserCard } from '@/components';
import useUsers from '@/api/queries/useUsers';

import {
  Box,
  Text,
  VStack,
  Spinner,
  Heading,
  Divider,
  HStack,
  Card,
  useColorModeValue,
} from '@chakra-ui/react';
import type { User } from '@/types/User';

const Chat = () => {
  const { logout } = useLogout();
  const { data: usersData, isLoading: usersLoading } = useUsers();
  const users = usersData?.data?.users ?? [];

  // Color mode aware values
  const cardBg = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const loadingTextColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={6}
      bg={useColorModeValue('gray.50', 'gray.900')} // optional page background
    >
      <Box position="absolute" top={4} right={4}>
        <ThemeSwitcher />
      </Box>

      <Card w="full" maxW="500px" borderRadius="xl" boxShadow="lg" p={6} bg={cardBg}>
        <HStack justify="space-between" mb={4}>
          <Heading size="md" color={headingColor}>
            Usuários
          </Heading>

          <Button onClick={logout} colorScheme="brand" size="sm">
            Sair
          </Button>
        </HStack>

        <Divider mb={4} />

        {usersLoading ? (
          <VStack py={10}>
            <Spinner size="lg" />
            <Text color={loadingTextColor}>Usuários estão carregando...</Text>
          </VStack>
        ) : (
          <VStack spacing={3} align="stretch" maxH="400px" overflowY="auto">
            {users.map((user: User) => (
              <UserCard key={user._id} name={user.name} email={user.email} />
            ))}
          </VStack>
        )}
      </Card>
    </Box>
  );
};

export default Chat;
