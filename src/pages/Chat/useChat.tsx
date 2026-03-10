import useChats from "@/api/queries/useChats";
import useUsers from "@/api/queries/useUsers";
import useCreateChatMutation from "@/api/mutations/useCreateChatMutation";
import { useState } from "react";

const useChat = () => {
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  const { data: chatsData, isLoading: chatsLoading, refetch: refetchChats } = useChats();
  const chats = chatsData?.data ?? [];

  const { data: usersData, isLoading: usersLoading } = useUsers();
  const users = usersData?.data?.users ?? [];

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
    chatCreationInProgress: creatingChat
  };
};

export default useChat;