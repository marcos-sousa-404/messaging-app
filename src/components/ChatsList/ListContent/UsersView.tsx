import { Box } from '@chakra-ui/react';
import { UserCard } from '@/components';
import { getUserProfilePictureUrl } from '@/helpers';
import GenericList from '@/components/GenericList';
import { memo, useMemo } from 'react';
import type { UseChatOutput } from '@/pages/Chat/useChat.ts';
import type { User } from '@/types/User.ts';

const UserItem = memo(({ item, chatCreationInProgress, createChat }: UserItemProps) => {
  const avatarUrl = item.image ? getUserProfilePictureUrl(item.image) : null;

  return (
    <Box
      cursor={chatCreationInProgress ? 'auto' : 'pointer'}
      onClick={() => !chatCreationInProgress && createChat(item._id)}
    >
      <UserCard
        disabled={chatCreationInProgress}
        name={item.name}
        email={item.email}
        avatarUrl={avatarUrl}
      />
    </Box>
  );
});

interface UserItemProps {
  item: User;
  chatCreationInProgress: boolean;
  createChat: (id: string) => void;
}

const UsersView = memo(({ usersQuery, chatCreationInProgress, createChat }: UsersViewProps) => {
  const { data: users, hasNextPage, fetchNextPage, isFetching } = usersQuery;

  const itemProps = useMemo(
    () => ({
      chatCreationInProgress,
      createChat,
    }),
    [chatCreationInProgress, createChat],
  );

  return (
    <GenericList
      items={users}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetching}
      keyExtractor={(user) => user._id}
      ItemComponent={UserItem}
      itemProps={itemProps}
    />
  );
});

export default UsersView;

export interface UsersViewProps {
  usersQuery: UseChatOutput['usersQuery'];
  chatCreationInProgress: boolean;
  createChat: (id: string) => void;
}
