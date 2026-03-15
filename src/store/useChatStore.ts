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
  chatsListOpen: boolean;
  setChatsListOpen: (open: boolean) => void;
  setTypingUserIds: (messages: string[] | ((prev: string[]) => string[])) => void;
  typingUserIds: string[];
  reset: () => void;
}

const defaultState = {
  selectedChat: null,
  messages: [],
  messagesLoading: false,
  otherUser: null,
  chatsListOpen: true,
  typingUserIds: [],
};

export const chatStore = createStore<ChatStore>()((set) => ({
  ...defaultState,
  setTypingUserIds: (nextTypingUserIds) =>
    set((state) => ({
      typingUserIds:
        typeof nextTypingUserIds === 'function'
          ? nextTypingUserIds(state.typingUserIds)
          : nextTypingUserIds,
    })),
  setChatsListOpen: (open: boolean) => set({ chatsListOpen: open }),
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
