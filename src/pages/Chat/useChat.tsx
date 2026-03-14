import { type ChangeEventHandler, useState } from 'react';
import { useChats, useCreateChatMutation, useUsers } from '@/api';
import { useChatStore } from '@/store';

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
