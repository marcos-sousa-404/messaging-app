import { type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  emitTypingStart,
  emitTypingStop,
  useChatSocket,
  useCreateChatMutation,
  useSendMessageMutation,
} from '@/api';
import { useAuthStore, useChatStore } from '@/store';
import type { User } from '@/types/User.ts';
import useInfiniteChats from '@/api/http/queries/useInfiniteChats.ts';
import useInfiniteUsers from '@/api/http/queries/useInfiniteUsers.ts';
import useInfiniteChatMessages from '@/api/http/queries/useInfiniteChatMessages.ts';

const useChat = () => {
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [messageInputText, setMessageInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingStopTimer = useRef<NodeJS.Timeout | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const {
    selectedChat,
    otherUser,
    setMessages,
    setMessagesLoading,
    setOtherUser,
    setFetchNextMessagesPage,
    setHasNextMessagesPage,
    setIsFetchingNextMessagesPage,
  } = useChatStore();

  const { user } = useAuthStore();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const {
    data: chatMessagesData,
    isLoading: chatMessagesLoading,
    isFetchingNextPage: isFetchingNextMessagesPage,
    fetchNextPage: fetchNextMessagesPage,
    hasNextPage: hasNextMessagesPage,
  } = useInfiniteChatMessages({
    chatId: selectedChat?._id,
  });
  const chatMessagesPages = chatMessagesData?.pages;
  const chatMessages = useMemo(
    () => chatMessagesPages?.flatMap((page) => page.data.data) ?? [],
    [chatMessagesPages],
  );

  useEffect(() => {
    setFetchNextMessagesPage(fetchNextMessagesPage);
    setIsFetchingNextMessagesPage(isFetchingNextMessagesPage);
    setHasNextMessagesPage(hasNextMessagesPage);
  }, [
    fetchNextMessagesPage,
    isFetchingNextMessagesPage,
    hasNextMessagesPage,
    setFetchNextMessagesPage,
    setIsFetchingNextMessagesPage,
    setHasNextMessagesPage,
  ]);

  const { mutateAsync: sendMessage, isPending: isSendingMessage } = useSendMessageMutation();

  useEffect(() => {
    if (selectedChat) {
      setMessages(chatMessages);
      setMessagesLoading(chatMessagesLoading);

      const foundOtherUser = selectedChat.participants?.find(
        (participant: User) => participant._id !== user?._id,
      );

      if (foundOtherUser && otherUser?._id !== foundOtherUser._id) {
        setOtherUser(foundOtherUser);
      }
    }
  }, [
    chatMessages,
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

  const handleSendMessage = async (file?: File) => {
    if (!selectedChat || !otherUser) return;

    await sendMessage({
      conversationId: selectedChat._id,
      text: messageInputText,
      receiverId: otherUser._id,
      file,
    });

    stopTyping();
    setMessageInputText('');
  };

  const {
    data: chatsData,
    isLoading: chatsLoading,
    refetch: refetchChats,
    fetchNextPage: fetchNextChatsPage,
    isFetchingNextPage: isFetchingNextChatsPage,
    hasNextPage: hasNextPageChats,
  } = useInfiniteChats({
    search: !isCreatingChat ? debouncedSearch : '',
  });
  const chatsPages = chatsData?.pages;
  const chats = chatsPages?.flatMap((page) => page.data.data) ?? [];

  const {
    data: usersData,
    isLoading: usersLoading,
    fetchNextPage: fetchNextUsersPage,
    isFetchingNextPage: isFetchingNextUsersPage,
    hasNextPage: hasNextPageUsers,
  } = useInfiniteUsers({
    search: isCreatingChat ? debouncedSearch : '',
  });
  const usersPages = usersData?.pages;
  const users = usersPages?.flatMap((page) => page.data.data) ?? [];

  const { mutateAsync: createChatMutation, isPending: creatingChat } = useCreateChatMutation();

  const toggleIsCreatingChat = useCallback(() => {
    setSearchQuery('');
    setDebouncedSearch('');
    setIsCreatingChat((prev) => !prev);
  }, [setSearchQuery, setDebouncedSearch, setIsCreatingChat]);

  const startCreatingChat = useCallback(() => {
    if (isCreatingChat) return;

    toggleIsCreatingChat();
  }, [isCreatingChat, toggleIsCreatingChat]);
  const stopCreatingChat = useCallback(() => {
    if (!isCreatingChat) return;

    toggleIsCreatingChat();
  }, [isCreatingChat, toggleIsCreatingChat]);

  const createChat = useCallback(
    async (recipientId: string) => {
      await createChatMutation({ recipientId });
      await refetchChats();
      setIsCreatingChat(false);
    },
    [createChatMutation, refetchChats],
  );

  return {
    chatsQuery: {
      data: chats,
      isLoading: chatsLoading,
      fetchNextPage: fetchNextChatsPage,
      isFetchingNextPage: isFetchingNextChatsPage,
      hasNextPage: hasNextPageChats,
    },
    usersQuery: {
      data: users,
      isLoading: usersLoading,
      fetchNextPage: fetchNextUsersPage,
      isFetching: isFetchingNextUsersPage,
      hasNextPage: hasNextPageUsers,
    },
    searchQuery,
    onSearchChange,
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

export type UseChatOutput = ReturnType<typeof useChat>;
