import { Center, Spinner } from '@chakra-ui/react';
import EmptyState from '@/components/ChatsList/ListContent/EmptyState.tsx';
import UsersView from '@/components/ChatsList/ListContent/UsersView.tsx';
import type { User } from '@/types/User.ts';
import ChatsView from '@/components/ChatsList/ListContent/ChatsView.tsx';
import type { Chat } from '@/types/Chat.ts';

const ListContent = (props: ListContentProps) => {
  const {
    loading,
    isCreatingChat,
    users,
    chats,
    chatCreationInProgress,
    userId,
    createChat,
    handleSelect,
  } = props;

  if (loading) {
    return (
      <Center py={6}>
        <Spinner />
      </Center>
    );
  }

  if (isCreatingChat) {
    return users.length === 0 ? (
      <EmptyState message="Nenhum usuário disponível para iniciar uma conversa." />
    ) : (
      <UsersView
        users={users}
        chatCreationInProgress={chatCreationInProgress}
        createChat={createChat}
      />
    );
  }

  return chats.length === 0 ? (
    <EmptyState message="Você ainda não possui conversas. Clique em 'Nova conversa' para começar." />
  ) : (
    <ChatsView handleSelect={handleSelect} chats={chats} userId={userId} />
  );
};

export default ListContent;

export interface ListContentProps {
  loading: boolean;
  isCreatingChat: boolean;
  users: User[];
  chats: Chat[];
  userId?: string;
  chatCreationInProgress: boolean;
  createChat: (recipientId: string) => void;
  handleSelect: (chat: Chat) => void;
}
