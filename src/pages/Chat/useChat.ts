import { type ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
  emitTypingStart,
  emitTypingStop,
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
  const [isTyping, setIsTyping] = useState(false);
  const typingStopTimer = useRef<NodeJS.Timeout | null>(null);

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

  const startTypingStopTimer = () => {
    if (typingStopTimer.current) {
      clearTimeout(typingStopTimer.current);
    }
    typingStopTimer.current = setTimeout(() => {
      if (selectedChat) {
        emitTypingStop(selectedChat._id);
        setIsTyping(false);
      }
    }, 3000);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessageInputText('');
  }, [selectedChat?._id]);

  const onMessageInputTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageInputText(event.target.value);

    if (event.target.value.trim() === '') {
      stopTyping();
      return;
    }
    if (selectedChat && !isTyping) {
      emitTypingStart(selectedChat?._id);
      setIsTyping(true);
    }
    startTypingStopTimer();
  };

  const stopTyping = () => {
    if (selectedChat) emitTypingStop(selectedChat._id);
    setIsTyping(false);
    if (typingStopTimer.current) {
      clearTimeout(typingStopTimer.current);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedChat || !otherUser) return;

    await sendMessage({
      conversationId: selectedChat._id,
      text: messageInputText,
      receiverId: otherUser._id,
    });

    stopTyping();

    setMessageInputText('');
  };

  const { data: chatsData, isLoading: chatsLoading, refetch: refetchChats } = useChats();
  const chats = chatsData?.data?.data ?? [];

  const { data: usersData, isLoading: usersLoading } = useUsers();
  const users = usersData?.data?.data ?? [];

  const { mutateAsync: createChatMutation, isPending: creatingChat } = useCreateChatMutation();

  const startCreatingChat = useCallback(() => setIsCreatingChat(true), [setIsCreatingChat]);
  const stopCreatingChat = useCallback(() => setIsCreatingChat(false), [setIsCreatingChat]);

  const createChat = useCallback(
    async (recipientId: string) => {
      await createChatMutation({ recipientId });
      await refetchChats();
      setIsCreatingChat(false);
    },
    [createChatMutation, refetchChats],
  );

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
