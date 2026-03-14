import { Box, VStack } from '@chakra-ui/react';
import { UserCard } from '@/components';
import type { User } from '@/types/User';
import getUserProfilePictureUrl from '@/api/getUserProfilePictureUrl.ts';

const UsersView = ({ users, chatCreationInProgress, createChat }: UsersViewProps) => (
  <VStack spacing={2} align="stretch">
    {users.map((user) => {
      const avatarUrl = user.image ? getUserProfilePictureUrl(user.image) : null;

      return (
        <Box
          key={user._id}
          cursor={chatCreationInProgress ? 'auto' : 'pointer'}
          onClick={() => !chatCreationInProgress && createChat(user._id)}
        >
          <UserCard
            disabled={chatCreationInProgress}
            name={user.name}
            email={user.email}
            avatarUrl={avatarUrl}
          />
        </Box>
      );
    })}
  </VStack>
);

export default UsersView;

interface UsersViewProps {
  users: User[];
  chatCreationInProgress: boolean;
  createChat: (id: string) => void;
}
