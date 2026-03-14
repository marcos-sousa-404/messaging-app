import { type ChangeEvent, useEffect, useState } from 'react';
import {
  useChatMessages,
  useChats,
  useChatSocket,
  useCreateChatMutation,
  useSendMessageMutation,
  useUsers,
} from '@/api';
import { useAuthStore, useChatStore } from '@/store';
import type { User } from '@/types/User.ts';

const useChat = () => {
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [messageInputText, setMessageInputText] = useState('');

  const { selectedChat, otherUser, setMessages, setMessagesLoading, setOtherUser } = useChatStore();

  const { user } = useAuthStore();

  const { data: chatMessagesData, isLoading: chatMessagesLoading } = useChatMessages({
    chatId: selectedChat?._id,
  });

  const { mutateAsync: sendMessage, isPending: isSendingMessage } = useSendMessageMutation();

  useEffect(() => {
    if (selectedChat) {
      const messagesArray = chatMessagesData?.data?.data ?? [];
      setMessages(messagesArray);
      setMessagesLoading(chatMessagesLoading);

      const foundOtherUser = selectedChat.participants?.find(
        (participant: User) => participant._id !== user?._id,
      );

      if (foundOtherUser && otherUser?._id !== foundOtherUser._id) {
        setOtherUser(foundOtherUser);
      }
    }
  }, [
    chatMessagesData,
    chatMessagesLoading,
    selectedChat,
    user?._id,
    setMessages,
    setMessagesLoading,
    setOtherUser,
    otherUser?._id,
  ]);

  useChatSocket(selectedChat?._id);

  const onMessageInputTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageInputText(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!selectedChat || !otherUser) return;

    await sendMessage({
      conversationId: selectedChat._id,
      text: messageInputText,
      receiverId: otherUser._id,
    });

    setMessageInputText('');
  };

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
    chatCreationInProgress: creatingChat,
    onMessageInputTextChange,
    messageInputText,
    handleSendMessage,
    isSendingMessage,
  };
};

export default useChat;
