import { Box } from '@chakra-ui/react';
import { UserCard } from '@/components';
import type { User } from '@/types/User';
import { getUserProfilePictureUrl } from '@/helpers';
import GenericList from '@/components/GenericList';

const UsersView = ({ users, chatCreationInProgress, createChat }: UsersViewProps) => (
  <GenericList
    items={users}
    keyExtractor={(user) => user._id}
    renderItem={(user) => {
      const avatarUrl = user.image ? getUserProfilePictureUrl(user.image) : null;

      return (
        <Box
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
    }}
  />
);

export default UsersView;

export interface UsersViewProps {
  users: User[];
  chatCreationInProgress: boolean;
  createChat: (id: string) => void;
}
