import { useEffect, useRef, useState } from 'react';
import { getSocket } from '../socket';
import {
  emitConnected,
  emitDisconnected,
  emitJoinChat,
  emitTypingStop,
  onConnect,
  onDisconnect,
  onErrorMessage,
  onReceiveMessage,
  onUserStatus,
  onUserTyping,
} from '../events/chatEvents';
import { type InfiniteData, useQueryClient } from '@tanstack/react-query';
import { usePlaySound } from '@/hooks';
import notificationSound from '@/assets/sounds/new-notification.mp3';
import { useAuthStore, useChatStore } from '@/store';
import { chatStore } from '@/store/useChatStore.ts';
import type { ChatMessage } from '@/types/ChatMessage.ts';
import type { UserStatusData, UserTypingData } from '@/api/websocket/sockets/types.ts';
import type { PaginatedData } from '@/types/PaginatedData.ts';
import type { Chat } from '@/types/Chat.ts';
import type { AxiosResponse } from 'axios';

const useChatSocket = (chatId?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Record<string, boolean>>({});
  const queryClient = useQueryClient();
  const { play: playNotificationSound } = usePlaySound(notificationSound, 0.5);

  const { setMessages, setTypingUserIds } = useChatStore();
  const { user } = useAuthStore();

  const typingTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    const socket = getSocket();
    if (!socket.connected) socket.connect();

    onConnect(() => setIsConnected(true));
    onDisconnect(() => setIsConnected(false));
    onErrorMessage((error) => console.error('Socket Error:', error));

    const handleReceiveMessage = (data: ChatMessage) => {
      const incomingChatId =
        typeof data.conversationId === 'string' ? data.conversationId : data.conversationId?._id;

      const currentSelectedChat = chatStore.getState().selectedChat;

      if (incomingChatId) emitTypingStop(incomingChatId);

      if (currentSelectedChat?._id === incomingChatId) {
        setMessages((prev) => {
          if (prev.some((msg) => msg._id === data._id)) return prev;
          return [data, ...prev];
        });
      }

      if (data.senderId?._id !== user?._id) {
        playNotificationSound();
      }

      queryClient.setQueryData(
        ['infinite-chat-messages', incomingChatId],
        (oldData: InfiniteData<AxiosResponse<PaginatedData<ChatMessage>>> | undefined) => {
          if (!oldData?.pages?.length) return oldData;

          const newPages = [...oldData.pages];

          newPages[0] = {
            ...newPages[0],
            data: {
              ...newPages[0].data,
              data: [data, ...(newPages?.[0]?.data?.data || [])],
            },
          };

          return {
            ...oldData,
            pages: newPages,
          };
        },
      );

      queryClient.setQueryData(
        ['infinite-chats', ''],
        (oldData: InfiniteData<AxiosResponse<PaginatedData<Chat>>> | undefined) => {
          if (!oldData?.pages?.length) return oldData;

          const newPages = oldData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              data: [...(page.data?.data || [])],
            },
          }));

          let foundChat: Chat | undefined;
          let foundPageIndex = -1;
          let foundChatIndex = -1;

          for (let p = 0; p < newPages.length; p++) {
            const chatIndex = newPages[p].data.data.findIndex((c) => c._id === incomingChatId);
            if (chatIndex !== -1) {
              foundChat = newPages[p].data.data[chatIndex];
              foundPageIndex = p;
              foundChatIndex = chatIndex;
              break;
            }
          }

          if (foundChat) {
            newPages[foundPageIndex].data.data.splice(foundChatIndex, 1);

            const updatedChat = {
              ...foundChat,
              lastMessage: data,
              updatedAt: data.createdAt,
            };

            newPages[0].data.data.unshift(updatedChat);
          } else {
            void queryClient.invalidateQueries({ queryKey: ['infinite-chats'] });
            return oldData;
          }

          return {
            ...oldData,
            pages: newPages,
          };
        },
      );
    };

    const handleUserTyping = (data: UserTypingData) => {
      if (typingTimeouts.current[data.userId]) {
        clearTimeout(typingTimeouts.current[data.userId]);
        delete typingTimeouts.current[data.userId];
      }

      setTypingUserIds((prev) => {
        if (data.isTyping) {
          typingTimeouts.current[data.userId] = setTimeout(() => {
            setTypingUserIds((current) => current.filter((id) => id !== data.userId));
            delete typingTimeouts.current[data.userId];
          }, 5000);

          return Array.from(new Set([...prev, data.userId]));
        } else {
          return prev.filter((id) => id !== data.userId);
        }
      });
    };

    const handleUserStatus = (data: UserStatusData) => {
      setOnlineUsers((prev) => ({ ...prev, [data.userId]: data.isOnline }));
    };

    onReceiveMessage(handleReceiveMessage);
    onUserTyping(handleUserTyping);
    onUserStatus(handleUserStatus);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('user_typing', handleUserTyping);
      socket.off('user_status', handleUserStatus);

      Object.values(typingTimeouts.current).forEach(clearTimeout);
      typingTimeouts.current = {};
    };
  }, [user?._id, playNotificationSound, queryClient, setMessages, setTypingUserIds]);

  useEffect(() => {
    if (chatId) {
      emitJoinChat(chatId);
      emitConnected(chatId);

      return () => {
        emitDisconnected(chatId);
      };
    }
  }, [chatId]);

  return { isConnected, onlineUsers };
};

export default useChatSocket;
