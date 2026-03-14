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
  setMessages: (messages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
  setMessagesLoading: (loading: boolean) => void;
  chatsDrawerOpen: boolean;
  setChatsDrawerOpen: (open: boolean) => void;
  reset: () => void;
}

const defaultState = {
  selectedChat: null,
  messages: [],
  messagesLoading: false,
  otherUser: null,
  chatsDrawerOpen: false,
};

export const chatStore = createStore<ChatStore>()((set) => ({
  ...defaultState,
  setChatsDrawerOpen: (open: boolean) => set({ chatsDrawerOpen: open }),
  setSelectedChat: (selectedChat) =>
    set({
      selectedChat,
      ...(selectedChat === null ? { otherUser: null, messages: [], messagesLoading: false } : {}),
    }),
  setOtherUser: (otherUser: User | null) => set({ otherUser }),
  setMessages: (nextMessages) =>
    set((state) => ({
      messages: typeof nextMessages === 'function' ? nextMessages(state.messages) : nextMessages,
    })),
  setMessagesLoading: (messagesLoading) => set({ messagesLoading }),
  reset: () => set(defaultState),
}));

const useChatStore = () => useStore(chatStore);

export default useChatStore;
