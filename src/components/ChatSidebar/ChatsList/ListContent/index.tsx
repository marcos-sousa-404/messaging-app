import { Center, Spinner } from '@chakra-ui/react';
import EmptyState from './EmptyState.tsx';
import UsersView from './UsersView.tsx';
import ChatsView from './ChatsView.tsx';
import type { Chat } from '@/types/Chat.ts';
import type { UseChatOutput } from '@/pages/Chat/useChat.ts';

const ListContent = (props: ListContentProps) => {
  const {
    loading,
    isCreatingChat,
    chatsQuery,
    usersQuery,
    chatCreationInProgress,
    userId,
    createChat,
    handleSelect,
  } = props;

  const { data: users } = usersQuery;
  const { data: chats } = chatsQuery;

  if (loading) {
    return (
      <Center py={6}>
        <Spinner color={'brand.500'} />
      </Center>
    );
  }

  if (isCreatingChat) {
    return users.length === 0 ? (
      <EmptyState message="Nenhum usuário disponível para iniciar uma conversa." />
    ) : (
      <UsersView
        usersQuery={usersQuery}
        chatCreationInProgress={chatCreationInProgress}
        createChat={createChat}
      />
    );
  }

  return chats.length === 0 ? (
    <EmptyState message="Você ainda não possui conversas. Clique em 'Nova conversa' para começar." />
  ) : (
    <ChatsView chatsQuery={chatsQuery} handleSelect={handleSelect} userId={userId} />
  );
};

export default ListContent;

export interface ListContentProps {
  loading: boolean;
  isCreatingChat: boolean;
  chatsQuery: UseChatOutput['chatsQuery'];
  usersQuery: UseChatOutput['usersQuery'];
  userId?: string;
  chatCreationInProgress: boolean;
  createChat: (recipientId: string) => void;
  handleSelect: (chat: Chat) => void;
}
