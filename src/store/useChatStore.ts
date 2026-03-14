import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand/react';
import type { Chat } from '@/types/Chat.ts';
import type { ChatMessage } from '@/types/ChatMessage.ts';
import type { User } from '@/types/User.ts';

interface ChatStore {
  selectedChat: Chat | null;
  messages: ChatMessage[];
  messagesLoading: boolean;
  otherUser: User | null;
  setOtherUser: (otherUser: User | null) => void;
  setSelectedChat: (chat: Chat | null) => void;
  setMessages: (messages: ChatMessage[]) => void;
  setMessagesLoading: (loading: boolean) => void;
}

const chatStoreStore = createStore<ChatStore>()((set) => ({
  selectedChat: null,
  messages: [],
  messagesLoading: false,
  otherUser: null,
  setSelectedChat: (selectedChat) =>
    set({
      selectedChat,
      ...(selectedChat === null ? { otherUser: null } : {}),
    }),
  setOtherUser: (otherUser: User | null) => set({ otherUser }),
  setMessages: (messages) => set({ messages }),
  setMessagesLoading: (messagesLoading) => set({ messagesLoading }),
}));

const useChatStore = () => useStore(chatStoreStore);

export default useChatStore;
