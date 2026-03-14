import useChats from '@/api/queries/useChats';
import useUsers from '@/api/queries/useUsers';
import useCreateChatMutation from '@/api/mutations/useCreateChatMutation';
import { type ChangeEventHandler, useState } from 'react';
import useChatStore from '@/store/useChatStore.ts';

const useChat = () => {
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [messageInputText, setMessageInputText] = useState('');
  const { selectedChat } = useChatStore();

  const onMessageInputTextChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (
    event,
  ) => setMessageInputText(event.target.value);

  // TO DO: implement pagination and infinite scroll
  const { data: chatsData, isLoading: chatsLoading, refetch: refetchChats } = useChats();
  const chats = chatsData?.data?.data ?? [];

  const { data: usersData, isLoading: usersLoading } = useUsers();
  const users = usersData?.data?.data ?? [];

  const { mutateAsync: createChatMutation, isPending: creatingChat } = useCreateChatMutation();

  const startCreatingChat = () => setIsCreatingChat(true);
  const stopCreatingChat = () => setIsCreatingChat(false);

  const createChat = async (recipientId: string) => {
    await createChatMutation({ recipientId });
    await refetchChats();
    setIsCreatingChat(false);
  };

  return {
    chats,
    chatsLoading,
    users,
    usersLoading,
    startCreatingChat,
    stopCreatingChat,
    isCreatingChat,
    createChat,
    creatingChat,
    chatCreationInProgress: creatingChat,
    selectedChat,
    onMessageInputTextChange,
    messageInputText,
  };
};

export default useChat;
