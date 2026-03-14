import { useEffect, useState } from 'react';
import { getSocket } from '../socket';
import {
  clearAllChatListeners,
  emitConnected,
  emitDisconnected,
  emitJoinChat,
  onConnect,
  onDisconnect,
  onErrorMessage,
  onReceiveMessage,
  onUserStatus,
  onUserTyping,
} from '../events/chatEvents';
import { useQueryClient } from '@tanstack/react-query';
import { usePlaySound } from '@/hooks';
import notificationSound from '@/assets/sounds/new-notification.mp3';
import { useAuthStore, useChatStore } from '@/store';
import { chatStore } from '@/store/useChatStore.ts';

const useChatSocket = (chatId?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<Record<string, boolean>>({});
  const queryClient = useQueryClient();
  const { play: playNotificationSound } = usePlaySound(notificationSound, 0.5);

  const { setMessages, selectedChat } = useChatStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    onConnect(() => setIsConnected(true));
    onDisconnect(() => setIsConnected(false));

    onErrorMessage((error) => console.error(error));

    onReceiveMessage((data) => {
      const incomingChatId =
        typeof data.conversationId === 'string' ? data.conversationId : data.conversationId?._id;

      const isFromOtherUser = data.senderId?._id !== user?._id;

      const selectedChat = chatStore.getState().selectedChat;

      if (selectedChat?._id === incomingChatId) {
        setMessages((prev) => {
          const messageAlreadyExists = prev.some((msg) => msg._id === data._id);

          if (messageAlreadyExists) {
            return prev;
          }

          return [...prev, data];
        });
      }

      if (isFromOtherUser) {
        playNotificationSound();
      }

      void queryClient.invalidateQueries({ queryKey: ['chat-messages', incomingChatId] });
      void queryClient.invalidateQueries({ queryKey: ['chats'] });
    });

    onUserTyping((data) => setTypingUser(data.isTyping ? data.userName : null));
    onUserStatus((data) => setOnlineUsers((prev) => ({ ...prev, [data.userId]: data.isOnline })));

    if (chatId) {
      emitJoinChat(chatId);
      emitConnected(chatId);
    }

    return () => {
      if (chatId) emitDisconnected(chatId);
      clearAllChatListeners();
    };
  }, [chatId, selectedChat?._id, setMessages, user?._id, playNotificationSound, queryClient]);

  return {
    isConnected,
    typingUser,
    onlineUsers,
  };
};

export default useChatSocket;
